import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';
import { analyzeUrl } from '@/app/tools/seo-audit/actions';
import { runLlmGeoAeo, blendGeoScore, blendAeoScore } from '@/lib/gemini-geo-aeo';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { sendWeeklyReportEmail } from '@/lib/send-weekly-email';
import { sendWeeklyWhatsApp } from '@/lib/send-whatsapp';

export const maxDuration = 300; // 5 min serverless timeout

function normalizeUrl(url: string): string {
  if (!url.startsWith('http')) url = `https://${url}`;
  try {
    const u = new URL(url);
    return u.origin + u.pathname.replace(/\/$/, '');
  } catch {
    return url;
  }
}

async function getLatestReport(uid: string, url: string) {
  const snap = await adminDb
    .collection('audit_reports')
    .where('userId', '==', uid)
    .where('url', '==', url)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get();
  if (snap.empty) return null;
  return snap.docs[0].data();
}

export async function POST(req: NextRequest) {
  // Verify the cron secret
  const cronSecret = req.headers.get('x-cron-secret');
  if (cronSecret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: Array<{ uid: string; url: string; status: string; error?: string }> = [];

  try {
    // Fetch all active subscriptions
    const subsSnap = await adminDb
      .collection('subscriptions')
      .where('status', '==', 'active')
      .get();

    console.log(`[scheduled-audit] Found ${subsSnap.size} active subscriptions`);

    for (const subDoc of subsSnap.docs) {
      const subData = subDoc.data();
      const uid = subData.uid;
      const siteSlots: string[] = subData.siteSlots || [];

      if (!uid || siteSlots.length === 0) continue;

      // Get user details for notifications
      let userEmail = '';
      let displayName = 'there';
      let userPhone = '';
      try {
        const userRecord = await adminAuth.getUser(uid);
        userEmail = userRecord.email || '';
        displayName = userRecord.displayName || 'there';
        // Phone stored on subscription doc
        userPhone = subData.phone || '';
      } catch (e) {
        console.error(`[scheduled-audit] Could not get user ${uid}:`, e);
      }

      for (const rawUrl of siteSlots) {
        const siteUrl = normalizeUrl(rawUrl);
        try {
          // 1. Get the previous report for delta calculation
          const prevReport = await getLatestReport(uid, siteUrl);
          const prevScores = prevReport?.scores ?? { seo: 0, geo: 0, aeo: 0 };

          // 2. Run fresh analysis
          const analysisResult = await analyzeUrl(siteUrl);
          const llmResult = await runLlmGeoAeo({
            domain: siteUrl,
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

          const newScores = {
            seo: analysisResult.overallScore.score,
            geo: blendedGeo,
            aeo: blendedAeo,
            overall: analysisResult.overallScore.score,
          };

          // 3. Calculate trend deltas
          const trendDelta = {
            seo: newScores.seo - prevScores.seo,
            geo: newScores.geo - prevScores.geo,
            aeo: newScores.aeo - prevScores.aeo,
          };

          // 4. Save new audit_reports doc
          const reportRef = adminDb.collection('audit_reports').doc();
          await reportRef.set({
            id: reportRef.id,
            userId: uid,
            url: siteUrl,
            createdAt: FieldValue.serverTimestamp(),
            tier: 'paid',
            status: 'complete',
            isScheduled: true,
            scores: newScores,
            trendDelta,
            reportData: JSON.parse(JSON.stringify(analysisResult)),
            pdfUrl: null,
          });

          // 5. Send Email notification
          if (userEmail) {
            const trendLabel = trendDelta.seo === 0 ? '→ 0' : (trendDelta.seo > 0 ? `▲ +${trendDelta.seo}` : `▼ ${trendDelta.seo}`);
            try {
              await sendWeeklyReportEmail({
                to: userEmail,
                displayName,
                siteUrl,
                scores: { seo: newScores.seo, geo: newScores.geo, aeo: newScores.aeo },
                trendDelta,
                dashboardUrl: 'https://adsverse.in/dashboard',
              });
            } catch (emailErr) {
              console.error(`[scheduled-audit] Email failed for ${userEmail}:`, emailErr);
            }

            // 6. Send WhatsApp notification (if phone available)
            if (userPhone) {
              try {
                await sendWeeklyWhatsApp({
                  phoneNumber: userPhone,
                  siteUrl,
                  overallScore: newScores.seo,
                  trendLabel,
                  dashboardUrl: 'https://adsverse.in/dashboard',
                });
              } catch (waErr) {
                console.error(`[scheduled-audit] WhatsApp failed for ${userPhone}:`, waErr);
              }
            }
          }

          results.push({ uid, url: siteUrl, status: 'success' });
        } catch (err: any) {
          console.error(`[scheduled-audit] Failed for ${siteUrl}:`, err);
          results.push({ uid, url: siteUrl, status: 'error', error: err.message });
        }
      }
    }

    return NextResponse.json({ success: true, processed: results });
  } catch (err: any) {
    console.error('[scheduled-audit] Fatal error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
