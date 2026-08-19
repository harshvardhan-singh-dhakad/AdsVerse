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

    // ── 2. Enforce Strict 1-Audit Per Website Domain Limit ─────────────────
    const domainDocRef = adminDb.collection('audited_domains').doc(domain);
    let domainSnap;
    try {
      domainSnap = await domainDocRef.get();
    } catch (e) {
      console.warn('[api/audit] Firestore domain fetch warning:', e);
    }

    let isDomainPreAudited = false;
    let availableCredits = 0;

    if (domainSnap && domainSnap.exists) {
      const dData = domainSnap.data();
      isDomainPreAudited = true;
      availableCredits = Number(dData?.paidCredits || 0);

      // If domain already audited and 0 paid credits remain -> Block and require ₹10 payment
      if (availableCredits <= 0) {
        return NextResponse.json(
          {
            error: 'domain_limit_reached',
            message: `Website "${domain}" has already used its 1 free audit report. Repeat in-depth audits require an instant ₹10 unlock pass.`,
            domain: domain,
            requiresPayment: true,
            price: 10,
          },
          { status: 402 }
        );
      }
    }

    // ── 3. Run SEO / GEO / AEO Analysis ────────────────────────────────────
    let analysisResult;
    try {
      analysisResult = await analyzeUrl(normalizedUrl);

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
      analysisResult.overallScore.score = Math.round(
        (analysisResult.categoryScores.onPage.score +
         analysisResult.categoryScores.technical.score +
         analysisResult.categoryScores.performance.score +
         analysisResult.categoryScores.accessibility.score +
         analysisResult.categoryScores.social.score) / 5
      );

      analysisResult.llmGeoAeo = llmResult;
    } catch (err: any) {
      return NextResponse.json(
        { error: err.message ?? 'Analysis failed' },
        { status: 500 }
      );
    }

    // ── 4. Record Domain Tracking & Decrement Credit ─────────────────────────
    try {
      if (isDomainPreAudited && availableCredits > 0) {
        await domainDocRef.update({
          paidCredits: FieldValue.increment(-1),
          lastAuditAt: FieldValue.serverTimestamp(),
          auditCount: FieldValue.increment(1),
          lastScore: analysisResult.overallScore.score,
        });
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

    // ── 5. Save Report to Firestore ─────────────────────────────────────────
    let uid = 'guest';
    if (idToken) {
      try {
        const decoded = await adminAuth.verifyIdToken(idToken);
        uid = decoded.uid;
      } catch {}
    }

    try {
      const reportRef = adminDb.collection('audit_reports').doc();
      await reportRef.set({
        id: reportRef.id,
        userId: uid,
        domain: domain,
        url: normalizedUrl,
        createdAt: FieldValue.serverTimestamp(),
        tier: availableCredits > 0 ? 'paid_10' : 'free_initial',
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
      creditsRemaining: Math.max(0, availableCredits - 1),
    });
  } catch (err: any) {
    console.error('[/api/audit] Unhandled error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
