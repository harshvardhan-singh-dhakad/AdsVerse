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
    const { url, idToken, userId, forcePaidAudit } = body as { 
      url: string; 
      idToken?: string; 
      userId?: string; 
      forcePaidAudit?: boolean;
    };

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Please enter a valid website URL.' }, { status: 400 });
    }

    const normalizedUrl = normalizeUrl(url);
    const domain = extractDomain(url);

    if (!domain || domain.length < 3) {
      return NextResponse.json({ error: 'Please enter a valid website domain.' }, { status: 400 });
    }

    // ── 2. Check User Profile & User Wallet Credits ─────────────────────────
    let uid = userId || 'guest';
    let userEmail = '';
    let userWalletCredits = 0;

    if (idToken) {
      try {
        const decoded = await adminAuth.verifyIdToken(idToken);
        uid = decoded.uid;
        userEmail = decoded.email || '';
      } catch {}
    }

    if (uid && uid !== 'guest') {
      try {
        const userDoc = await adminDb.collection('audit_users').doc(uid).get();
        if (userDoc.exists) {
          const uData = userDoc.data();
          userWalletCredits = Number(uData?.paidCredits || 0);
          if (!userEmail) userEmail = uData?.email || '';
        }
      } catch (e) {
        console.warn('[api/audit] User credits fetch warning:', e);
      }
    }

    // ── 3. Check Domain Paid Status ─────────────────────────────────────────
    const domainDocRef = adminDb.collection('audited_domains').doc(domain);
    let domainCredits = 0;
    try {
      const domainSnap = await domainDocRef.get();
      if (domainSnap.exists) {
        domainCredits = Number(domainSnap.data()?.paidCredits || 0);
      }
    } catch (e) {
      console.warn('[api/audit] Domain fetch warning:', e);
    }

    // Determine if this audit run is Paid (Unlocked)
    const isPaidAudit = !!forcePaidAudit || domainCredits > 0 || userWalletCredits > 0;

    // ── 4. Run SEO / GEO / AEO Analysis ────────────────────────────────────
    let analysisResult;
    try {
      analysisResult = await analyzeUrl(normalizedUrl);

      // Run live Gemini LLM AI GEO/AEO citations dynamically
      try {
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
      } catch (llmErr) {
        console.warn('[api/audit] Gemini GEO/AEO warning:', llmErr);
      }

      analysisResult.overallScore.score = Math.round(
        (analysisResult.lighthouseScores.performance * 0.25) +
        (analysisResult.categoryScores.onPage.score * 0.25) +
        (analysisResult.categoryScores.technical.score * 0.20) +
        (analysisResult.geoAeoScores.geo.score * 0.15) +
        (analysisResult.geoAeoScores.aeo.score * 0.15)
      );
    } catch (err: any) {
      console.error('[api/audit] Analysis failed:', err);
      return NextResponse.json(
        { error: err.message || 'Analysis failed. Please check the URL and try again.' },
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
        // First free audit tracking for this website domain
        await domainDocRef.set({
          domain: domain,
          firstUrl: normalizedUrl,
          lastAuditAt: FieldValue.serverTimestamp(),
          auditCount: FieldValue.increment(1),
          paidCredits: 0,
          lastScore: analysisResult.overallScore.score,
        }, { merge: true });
      }
    } catch (e) {
      console.warn('[api/audit] Firestore domain tracking warning:', e);
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
      console.warn('[api/audit] Lead logging warning:', e);
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
      console.warn('[api/audit] Report logging warning:', e);
    }

    // Standardized JSON response (Supports both `data` and `report` keys)
    return NextResponse.json({
      data: analysisResult,
      report: analysisResult,
      paidUnlocked: isPaidAudit,
      isPaid: isPaidAudit,
      reportId: `audit_${Date.now()}`,
      domain: domain,
      tier: isPaidAudit ? 'paid_10' : 'free_initial',
      creditsRemaining: Math.max(0, domainCredits + userWalletCredits - 1),
    });
  } catch (err: any) {
    console.error('[/api/audit] Unhandled error:', err);
    return NextResponse.json({ error: 'Internal server error. Please retry.' }, { status: 500 });
  }
}
