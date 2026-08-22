/**
 * audit-stream/route.ts — Server-Sent Events (SSE) Streaming API
 *
 * Streams audit results phase-by-phase to the client so the UI
 * updates in real-time as each piece of data arrives:
 *
 *  Phase 1 (~2-5s):   Basic DOM audit (title, meta, h1, robots, schema)
 *  Phase 2 (~10-25s): Google PageSpeed Insights (real scores)
 *  Phase 3 (~5-15s):  DuckDuckGo SERP → find competitors
 *  Phase 4 (~20-40s): Per-competitor PSI + DOM scrape (parallel)
 *  Phase 5 (~5-10s):  Gemini AI strategy report generation
 *  Phase 6 (~5-10s):  Gemini GEO/AEO brand citations
 */

import { NextRequest } from 'next/server';
import { analyzeUrl } from '@/app/tools/seo-audit/actions';
import { runCompetitorAnalysis } from '@/lib/competitor-engine';
import { generateStrategyReport } from '@/lib/strategy-advisor';
import { runLlmGeoAeo, blendGeoScore, blendAeoScore } from '@/lib/gemini-geo-aeo';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 90; // 90 seconds max for streaming

// Helper to extract domain
function extractDomain(inputUrl: string): string {
  let clean = inputUrl.trim();
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) clean = `https://${clean}`;
  try {
    return new URL(clean).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return clean.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
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

// SSE encoder
function encodeEvent(phase: string, data: unknown, message?: string): string {
  const payload = { phase, data, message, timestamp: Date.now() };
  return `data: ${JSON.stringify(payload)}\n\n`;
}

export async function POST(req: NextRequest) {
  let body: any = {};
  try { body = await req.json(); } catch {}
  
  const { url, idToken, userId, device } = body as { url: string; idToken?: string; userId?: string; device?: 'mobile' | 'desktop' };

  if (!url || typeof url !== 'string') {
    return new Response(
      encodeEvent('error', null, 'Please enter a valid website URL.'),
      { status: 400, headers: { 'Content-Type': 'text/event-stream' } }
    );
  }

  const normalizedUrl = normalizeUrl(url);
  const domain = extractDomain(url);

  // Verify auth & paid status (optional)
  let uid = userId || 'guest';
  let userWalletCredits = 0;
  let domainCredits = 0;

  try {
    if (idToken) {
      try {
        const decoded = await adminAuth.verifyIdToken(idToken);
        uid = decoded.uid;
      } catch {}
    }
    if (uid && uid !== 'guest') {
      try {
        const userDoc = await adminDb.collection('audit_users').doc(uid).get();
        if (userDoc.exists) userWalletCredits = Number(userDoc.data()?.paidCredits || 0);
      } catch {}
    }
    try {
      const domainSnap = await adminDb.collection('audited_domains').doc(domain).get();
      if (domainSnap.exists) domainCredits = Number(domainSnap.data()?.paidCredits || 0);
    } catch {}
  } catch (e) {
    console.warn('[stream] Firebase Admin DB skipped (local dev mode):', (e as any)?.message);
  }

  const isPaidAudit = domainCredits > 0 || userWalletCredits > 0;

  // Create readable stream for SSE
  const stream = new ReadableStream({
    async start(controller) {
      const send = (phase: string, data: unknown, message?: string) => {
        try {
          controller.enqueue(new TextEncoder().encode(encodeEvent(phase, data, message)));
        } catch { /* stream closed */ }
      };

      try {
        // ── PHASE 1: Basic DOM Audit ──────────────────────────────────────────
        send('started', { domain, url: normalizedUrl }, '🔍 Analyzing website structure...');
        
        const analysisResult = await analyzeUrl(normalizedUrl, device || 'mobile');
        
        // Send basic result immediately (without PSI scores yet)
        send('basic_done', {
          title: analysisResult.title,
          metaDescription: analysisResult.metaDescription,
          h1s: analysisResult.h1s,
          wordCount: analysisResult.wordCount,
          hasSchema: analysisResult.hasSchema,
          hasRobotsTxt: analysisResult.hasRobotsTxt,
          categoryScores: analysisResult.categoryScores,
          recommendations: analysisResult.recommendations,
          geoAeoScores: analysisResult.geoAeoScores,
          overallScore: analysisResult.overallScore,
        }, '✅ Website structure analyzed');

        // ── PHASE 2: PSI Scores (already embedded in analyzeUrl) ─────────────
        send('psi_done', {
          lighthouseScores: analysisResult.lighthouseScores,
          pageSpeedMetrics: analysisResult.pageSpeedMetrics,
          psiDataSource: analysisResult.psiDataSource,
        }, analysisResult.psiDataSource === 'estimated'
          ? '⚠️ PSI data estimated (API slow) — scores are approximate'
          : '✅ Google PageSpeed scores loaded (real data)');

        // ── PHASE 3: Gemini GEO/AEO (parallel with competitor search) ─────────
        send('geo_aeo_started', null, '🤖 Running AI brand citation analysis...');

        const [llmResult, competitorResult] = await Promise.allSettled([
          // Gemini GEO/AEO
          runLlmGeoAeo({
            domain: normalizedUrl,
            title: analysisResult.title,
            h1: analysisResult.h1s[0] ?? '',
            h2s: analysisResult.h2s,
            h3s: analysisResult.h3s,
            bodyExcerpt: analysisResult.bodyTextExcerpt,
            staticAeoScore: analysisResult.geoAeoScores.aeo.score,
          }).catch(e => { console.warn('[stream] GEO/AEO error:', e); return null; }),
          // Competitor search (DuckDuckGo + Gemini keyword)
          runCompetitorAnalysis({
            targetUrl: normalizedUrl,
            targetDomain: domain,
            title: analysisResult.title,
            h1: analysisResult.h1s[0] ?? '',
            bodyExcerpt: analysisResult.bodyTextExcerpt,
            maxCompetitors: 3,
            onCompetitorFound: (comp) => {
              // Stream each competitor as it's analyzed
              send('competitor_analyzed', comp, `✅ Analyzed ${comp.domain}`);
            },
          }).catch(e => { console.warn('[stream] Competitor error:', e); return null; }),
        ]);

        // Apply GEO/AEO results
        const lResult = llmResult.status === 'fulfilled' ? llmResult.value : null;
        if (lResult) {
          const blendedGeo = blendGeoScore(analysisResult.geoAeoScores.geo.score, lResult);
          const blendedAeo = blendAeoScore(analysisResult.geoAeoScores.aeo.score, lResult);
          analysisResult.geoAeoScores.geo.score = blendedGeo;
          analysisResult.geoAeoScores.aeo.score = blendedAeo;
          analysisResult.llmGeoAeo = lResult;
          send('geo_aeo_done', { llmGeoAeo: lResult, geoAeoScores: analysisResult.geoAeoScores }, '✅ AI brand citation analysis complete');
        }

        const competitorData = competitorResult.status === 'fulfilled' ? competitorResult.value : null;
        
        // ── PHASE 4: AI Strategy Report ───────────────────────────────────────
        let strategyReport = null;
        if (competitorData && competitorData.competitors.length > 0) {
          analysisResult.competitorAnalysis = competitorData;
          send('competitors_done', competitorData, `✅ Found ${competitorData.competitors.length} competitors via "${competitorData.searchKeyword}"`);
          
          send('strategy_started', null, '🧠 Generating AI strategy report...');
          try {
            strategyReport = await generateStrategyReport({
              targetDomain: domain,
              targetTitle: analysisResult.title,
              targetPerf: analysisResult.lighthouseScores.performance,
              targetSeo: analysisResult.lighthouseScores.seo,
              targetA11y: analysisResult.lighthouseScores.accessibility,
              targetBP: analysisResult.lighthouseScores.bestPractices,
              targetWordCount: analysisResult.wordCount,
              targetSchemas: [],
              competitors: competitorData.competitors,
            });
            analysisResult.strategyReport = strategyReport;
            send('strategy_done', strategyReport, '✅ AI strategy report ready');
          } catch (e) {
            console.warn('[stream] Strategy error:', e);
          }
        } else {
          send('competitors_done', { competitors: [], searchKeyword: '' }, '⚠️ Competitor search returned no results');
        }

        // ── PHASE 5: Finalize Score ───────────────────────────────────────────
        analysisResult.overallScore.score = Math.round(
          analysisResult.categoryScores.onPage.score * 0.35 +
          analysisResult.categoryScores.technical.score * 0.20 +
          analysisResult.categoryScores.performance.score * 0.20 +
          analysisResult.geoAeoScores.geo.score * 0.13 +
          analysisResult.geoAeoScores.aeo.score * 0.12
        );

        // Save to Firestore
        try {
          const auditRef = adminDb.collection('audits').doc();
          await auditRef.set({
            domain, url: normalizedUrl, uid,
            overallScore: analysisResult.overallScore.score,
            isPaidAudit, createdAt: FieldValue.serverTimestamp(),
          });
        } catch {}

        // ── COMPLETE ─────────────────────────────────────────────────────────
        send('complete', analysisResult, '🎉 Full audit complete!');

      } catch (err: any) {
        send('error', null, err?.message || 'Audit failed. Please try again.');
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // disable nginx buffering
    },
  });
}
