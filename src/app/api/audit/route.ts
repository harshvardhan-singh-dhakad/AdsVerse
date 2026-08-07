import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { analyzeUrl } from '@/app/tools/seo-audit/actions';
import { runLlmGeoAeo, blendGeoScore, blendAeoScore } from '@/lib/gemini-geo-aeo';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import crypto from 'crypto';

function normalizeUrl(url: string): string {
  if (!url.startsWith('http')) url = `https://${url}`;
  try {
    const u = new URL(url);
    return u.origin + u.pathname.replace(/\/$/, '');
  } catch {
    return url;
  }
}

function hashKey(userId: string, url: string): string {
  return crypto.createHash('sha256').update(`${userId}::${url}`).digest('hex');
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

    // ── 2. Handle Guest Audits (No idToken) ────────────────────────────────
    if (!idToken) {
      const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                       req.headers.get('x-real-ip') || 
                       'guest_ip';
      
      let isGuestRateLimited = false;
      try {
        const guestRateId = hashKey(`guest_${clientIp}`, normalizedUrl);
        const guestRateRef = adminDb.collection('rate_limit').doc(guestRateId);
        const guestRateSnap = await guestRateRef.get();
        if (guestRateSnap.exists) {
          isGuestRateLimited = true;
        }
      } catch (e) {
        console.warn('[api/audit] Guest rate limit check bypassed:', e);
      }

      if (isGuestRateLimited) {
        return NextResponse.json(
          {
            error: 'auth_required',
            message: 'You have completed your 1st free audit for this website. Please sign up or log in to run repeat audits and save your report history!',
          },
          { status: 401 }
        );
      }

      // Run analysis for guest
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
        analysisResult.llmGeoAeo = llmResult;
      } catch (err: any) {
        return NextResponse.json(
          { error: err.message ?? 'Analysis failed' },
          { status: 500 }
        );
      }

      // Record rate limit & leads in background (non-blocking)
      try {
        const guestRateId = hashKey(`guest_${clientIp}`, normalizedUrl);
        await adminDb.collection('rate_limit').doc(guestRateId).set({
          ip: clientIp,
          url: normalizedUrl,
          lastAuditAt: FieldValue.serverTimestamp(),
        });
      } catch (e) {
        console.warn('[api/audit] Failed to write guest rate limit:', e);
      }

      try {
        const hostname = new URL(normalizedUrl).hostname;
        const leadRef = adminDb.collection('audit_leads').doc();
        await leadRef.set({
          id: leadRef.id,
          name: 'Guest User',
          email: `guest@${hostname}`,
          website: normalizedUrl,
          submittedAt: FieldValue.serverTimestamp(),
          source: 'guest-seo-audit',
          ip: clientIp,
        });
      } catch (e) {
        console.warn('[api/audit] Failed to write guest audit lead:', e);
      }

      return NextResponse.json({
        report: analysisResult,
        reportId: `guest_${Date.now()}`,
        isGuest: true,
      });
    }

    // ── 3. Authenticated User flow ──────────────────────────────────────────
    let uid = 'guest';
    let userEmail = '';
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      uid = decoded.uid;
      userEmail = decoded.email ?? '';
    } catch {
      console.warn('[api/audit] Invalid idToken, proceeding as guest');
    }

    let plan: 'free' | 'paid' | 'subscriber' = 'free';
    try {
      const userDocRef = adminDb.collection('audit_users').doc(uid);
      const userSnap = await userDocRef.get();
      if (userSnap.exists) {
        plan = userSnap.data()?.plan ?? 'free';
      }
    } catch (e) {
      console.warn('[api/audit] Failed to fetch user plan from Firestore:', e);
    }

    // Run analysis
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

    // Save report in background
    try {
      const reportRef = adminDb.collection('audit_reports').doc();
      await reportRef.set({
        id: reportRef.id,
        userId: uid,
        url: normalizedUrl,
        createdAt: FieldValue.serverTimestamp(),
        tier: plan === 'free' ? 'free' : 'paid',
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
    });
  } catch (err: any) {
    console.error('[/api/audit] Unhandled error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
