import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { analyzeUrl } from '@/app/tools/seo-audit/actions';
import { runLlmGeoAeo, blendGeoScore, blendAeoScore } from '@/lib/gemini-geo-aeo';
import { FieldValue } from 'firebase-admin/firestore';

export function extractDomain(inputUrl: string): string {
  let clean = inputUrl.trim();
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = `https://${clean}`;
  }
  try {
    const u = new URL(clean);
    return u.hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return clean.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].replace(/^www\./, '');
  }
}

function normalizeUrl(url: string): string {
  if (!url.startsWith('http')) url = `https://${url}`;
  try {
    const u = new URL(url);
    return u.origin + u.pathname.replace(/\/$/, '');
  } catch {
    return url;
  }
}

export async function POST(req: NextRequest) {
  try {
    // ── 1. Parse body ──────────────────────────────────────────────────────
    const body = await req.json().catch(() => ({}));
    const { url, idToken } = body as { url: string; idToken?: string };

    if (!url) {
      return NextResponse.json({ error: 'Please enter a valid website URL.' }, { status: 400 });
    }

    const normalizedUrl = normalizeUrl(url);
    const domain = extractDomain(url);

    if (!domain || domain.length < 3) {
      return NextResponse.json({ error: 'Please enter a valid website domain.' }, { status: 400 });
    }

    // ── 2. Check User Profile & User Wallet Credits ─────────────────────────
    let uid = 'guest';
    let userEmail = '';
    let userWalletCredits = 0;

    if (idToken) {
      try {
        const decoded = await adminAuth.verifyIdToken(idToken);
        uid = decoded.uid;
        userEmail = decoded.email || '';
        const userDoc = await adminDb.collection('audit_users').doc(uid).get();
        if (userDoc.exists) {
          userWalletCredits = Number(userDoc.data()?.paidCredits || 0);
        }
      } catch {}
    }

    // ── 3. Enforce Strict 1-Audit Per Website Domain Limit ─────────────────
    const domainDocRef = adminDb.collection('audited_domains').doc(domain);
    let domainSnap;
    try {
      domainSnap = await domainDocRef.get();
    } catch (e) {
      console.warn('[api/audit] Firestore domain fetch warning:', e);
    }

    let isDomainPreAudited = false;
    let domainCredits = 0;

    if (domainSnap && domainSnap.exists) {
      const dData = domainSnap.data();
      isDomainPreAudited = true;
      domainCredits = Number(dData?.paidCredits || 0);

      // If domain already audited and 0 credits (neither domain credit nor user wallet credit)
      if (domainCredits <= 0 && userWalletCredits <= 0) {
        return NextResponse.json(
          {
            error: 'domain_limit_reached',
            message: `Website "${domain}" has already completed its 1 free audit report. Repeat in-depth audits require an instant ₹10 unlock pass.`,
            domain: domain,
            requiresPayment: true,
            price: 10,
          },
          { status: 402 }
        );
      }
    }

    const isPaidAudit = domainCredits > 0 || userWalletCredits > 0;

    // ── 4. Run SEO / GEO / AEO Analysis ────────────────────────────────────
    let analysisResult;
    try {
      analysisResult = await analyzeUrl(normalizedUrl);

      // Only run expensive Gemini LLM AI GEO/AEO citations on Paid Audits
      if (isPaidAudit) {
        const llmResult = await runLlmGeoAeo({
          domain: normalizedUrl,
          title: analysisResult.title,
          h1: analysisResult.h1s[0] ?? '',
          h2s: analysisResult.h2s,
          h3s: analysisResult.h3s,
          bodyExcerpt: analysisResult.bodyTextExcerpt,
          staticAeoScore: analysisResult.geoAeoScores.aeo.score,
        });

        const blendedGeo = blendGeoScore(analysisResult.geoAeoScores.geo.score, llmResult);
        const blendedAeo = blendAeoScore(analysisResult.geoAeoScores.aeo.score, llmResult);

        analysisResult.geoAeoScores.geo.score = blendedGeo;
        analysisResult.geoAeoScores.aeo.score = blendedAeo;
        analysisResult.llmGeoAeo = llmResult;
      } else {
        // Free Audit: Basic SEO only, GEO & AEO locked
        analysisResult.geoAeoScores.geo.score = 0;
        analysisResult.geoAeoScores.aeo.score = 0;
      }

      analysisResult.overallScore.score = Math.round(
        (analysisResult.categoryScores.onPage.score +
         analysisResult.categoryScores.technical.score +
         analysisResult.categoryScores.performance.score +
         analysisResult.categoryScores.accessibility.score +
         analysisResult.categoryScores.social.score) / 5
      );
    } catch (err: any) {
      return NextResponse.json(
        { error: err.message ?? 'Analysis failed' },
        { status: 500 }
      );
    }

    // ── 5. Record Domain Tracking & Decrement Credit ─────────────────────────
    try {
      if (isPaidAudit) {
        if (domainCredits > 0) {
          // Decrement domain credit
          await domainDocRef.update({
            paidCredits: FieldValue.increment(-1),
            lastAuditAt: FieldValue.serverTimestamp(),
            auditCount: FieldValue.increment(1),
            lastScore: analysisResult.overallScore.score,
          });
        } else if (userWalletCredits > 0 && uid !== 'guest') {
          // Decrement user wallet credit
          await adminDb.collection('audit_users').doc(uid).update({
            paidCredits: FieldValue.increment(-1),
            lastAuditAt: FieldValue.serverTimestamp(),
          });
          await domainDocRef.set({
            domain: domain,
            firstUrl: normalizedUrl,
            lastAuditAt: FieldValue.serverTimestamp(),
            auditCount: FieldValue.increment(1),
            paidCredits: 0,
            lastScore: analysisResult.overallScore.score,
          }, { merge: true });
        }
      } else {
        // First free audit for this website domain
        await domainDocRef.set({
          domain: domain,
          firstUrl: normalizedUrl,
          firstAuditAt: FieldValue.serverTimestamp(),
          lastAuditAt: FieldValue.serverTimestamp(),
          auditCount: 1,
          paidCredits: 0,
          lastScore: analysisResult.overallScore.score,
        });
      }
    } catch (e) {
      console.warn('[api/audit] Failed to update audited_domains in Firestore:', e);
    }

    // ── 6. Save Lead to `audit_leads` for Admin Dashboard ──────────────────
    try {
      const leadRef = adminDb.collection('audit_leads').doc();
      await leadRef.set({
        id: leadRef.id,
        name: userEmail ? (userEmail.split('@')[0] || 'User') : 'Website Visitor',
        email: userEmail || `visitor@${domain}`,
        website: normalizedUrl,
        domain: domain,
        submittedAt: FieldValue.serverTimestamp(),
        source: isPaidAudit ? 'paid-10rs-audit' : 'free-1st-audit',
        type: isPaidAudit ? 'paid' : 'free',
        tier: isPaidAudit ? 'paid_10' : 'free',
        price: isPaidAudit ? 10 : 0,
        score: analysisResult.overallScore.score,
        seoScore: analysisResult.overallScore.score,
        geoScore: analysisResult.geoAeoScores.geo.score,
        aeoScore: analysisResult.geoAeoScores.aeo.score,
      });
    } catch (e) {
      console.warn('[api/audit] Failed to write audit lead:', e);
    }

    // ── 7. Save Full Report to Firestore ────────────────────────────────────
    try {
      const reportRef = adminDb.collection('audit_reports').doc();
      await reportRef.set({
        id: reportRef.id,
        userId: uid,
        domain: domain,
        url: normalizedUrl,
        createdAt: FieldValue.serverTimestamp(),
        tier: isPaidAudit ? 'paid_10' : 'free_initial',
        type: isPaidAudit ? 'paid' : 'free',
        status: 'complete',
        scores: {
          seo: analysisResult.overallScore.score,
          geo: analysisResult.geoAeoScores.geo.score,
          aeo: analysisResult.geoAeoScores.aeo.score,
          overall: analysisResult.overallScore.score,
        },
        reportData: JSON.parse(JSON.stringify(analysisResult)),
        pdfUrl: null,
      });
    } catch (e) {
      console.warn('[api/audit] Failed to write audit report to Firestore:', e);
    }

    return NextResponse.json({
      report: analysisResult,
      reportId: `audit_${Date.now()}`,
      domain: domain,
      isPaid: isPaidAudit,
      tier: isPaidAudit ? 'paid_10' : 'free_initial',
      creditsRemaining: Math.max(0, domainCredits + userWalletCredits - 1),
    });
  } catch (err: any) {
    console.error('[/api/audit] Unhandled error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
