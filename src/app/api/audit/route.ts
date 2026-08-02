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
    const body = await req.json();
    const { url, idToken } = body as { url: string; idToken?: string };

    if (!url) {
      return NextResponse.json({ error: 'Missing url' }, { status: 400 });
    }

    const normalizedUrl = normalizeUrl(url);

    // ── 2. Handle Guest Audits (No idToken) ────────────────────────────────
    if (!idToken) {
      const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                       req.headers.get('x-real-ip') || 
                       'guest_ip';
      const guestRateId = hashKey(`guest_${clientIp}`, normalizedUrl);
      const guestRateRef = adminDb.collection('rate_limit').doc(guestRateId);
      const guestRateSnap = await guestRateRef.get();

      if (guestRateSnap.exists) {
        return NextResponse.json(
          {
            error: 'auth_required',
            message: 'You have completed your 1st free audit for this website. Please sign up or log in to run repeat audits and save your report history!',
          },
          { status: 401 }
        );
      }

      // Run analysis for first-time guest
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

      // Record rate limit for guest
      await guestRateRef.set({
        ip: clientIp,
        url: normalizedUrl,
        lastAuditAt: FieldValue.serverTimestamp(),
      });

      // Collect website lead automatically
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
        console.error('Failed to write guest audit lead:', e);
      }

      return NextResponse.json({
        report: analysisResult,
        reportId: `guest_${Date.now()}`,
        isGuest: true,
      });
    }

    // ── 3. Authenticated User flow ──────────────────────────────────────────
    let uid: string;
    let userEmail: string;
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      uid = decoded.uid;
      userEmail = decoded.email ?? '';
    } catch {
      return NextResponse.json({ error: 'Unauthorized — invalid token' }, { status: 401 });
    }

    // Get user plan from Firestore
    const userDocRef = adminDb.collection('audit_users').doc(uid);
    const userSnap = await userDocRef.get();

    let plan: 'free' | 'paid' | 'subscriber' = 'free';
    if (userSnap.exists) {
      plan = userSnap.data()?.plan ?? 'free';
    } else {
      // Create audit_users doc on first audit
      await userDocRef.set({
        uid,
        email: userEmail,
        plan: 'free',
        reportsRemaining: -1,
        subscriptionExpiry: null,
        createdAt: FieldValue.serverTimestamp(),
      });
    }

    // Check subscriptions collection
    const subDocRef = adminDb.collection('subscriptions').doc(uid);
    const subSnap = await subDocRef.get();
    let isTrackedUrl = false;
    if (subSnap.exists) {
      const subData = subSnap.data();
      if (subData?.status === 'active' && subData.siteSlots?.includes(normalizedUrl)) {
        isTrackedUrl = true;
        plan = 'paid'; // Treat as paid tier for this specific URL
      }
    }

    // Rate-limit check (free tier only)
    if (plan === 'free' && !isTrackedUrl) {
      const rateLimitId = hashKey(uid, normalizedUrl);
      const rateLimitRef = adminDb.collection('rate_limit').doc(rateLimitId);
      const rateLimitSnap = await rateLimitRef.get();

      if (rateLimitSnap.exists) {
        const lastAuditAt = rateLimitSnap.data()?.lastAuditAt as Timestamp | undefined;
        if (lastAuditAt) {
          const diffMs = Date.now() - lastAuditAt.toMillis();
          const twentyFourHoursMs = 24 * 60 * 60 * 1000;
          if (diffMs < twentyFourHoursMs) {
            const retryAfter = new Date(lastAuditAt.toMillis() + twentyFourHoursMs);
            const hoursLeft = Math.ceil((twentyFourHoursMs - diffMs) / (60 * 60 * 1000));
            const minutesLeft = Math.ceil(((twentyFourHoursMs - diffMs) % (60 * 60 * 1000)) / 60000);
            return NextResponse.json(
              {
                error: 'rate_limited',
                retryAfter: retryAfter.toISOString(),
                hoursLeft,
                minutesLeft,
              },
              { status: 429 }
            );
          }
        }
      }
    }

    // Run analysis
    let analysisResult;
    try {
      analysisResult = await analyzeUrl(normalizedUrl);

      // Run LLM GEO/AEO scoring
      const llmResult = await runLlmGeoAeo({
        domain: normalizedUrl,
        title: analysisResult.title,
        h1: analysisResult.h1s[0] ?? '',
        h2s: analysisResult.h2s,
        h3s: analysisResult.h3s,
        bodyExcerpt: analysisResult.bodyTextExcerpt,
        staticAeoScore: analysisResult.geoAeoScores.aeo.score,
      });

      // Blend scores
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

    // Write audit_reports doc
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

    // Update rate-limit doc (free tier)
    if (plan === 'free' && !isTrackedUrl) {
      const rateLimitId = hashKey(uid, normalizedUrl);
      await adminDb.collection('rate_limit').doc(rateLimitId).set({
        userId: uid,
        urlHash: normalizedUrl,
        lastAuditAt: FieldValue.serverTimestamp(),
      });
    }

    return NextResponse.json({
      report: analysisResult,
      reportId: reportRef.id,
    });
  } catch (err: any) {
    console.error('[/api/audit] Unhandled error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
