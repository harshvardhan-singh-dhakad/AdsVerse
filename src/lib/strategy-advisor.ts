/**
 * strategy-advisor.ts — Server-side ONLY
 *
 * Uses Gemini AI to generate actionable "How to beat your competitors" strategy
 * based on real competitor data from the competitor engine.
 */

import type { CompetitorProfile } from './competitor-engine';

// ── Types ──────────────────────────────────────────────────────────────────────

export interface StrategyAction {
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  timeframe: '24h' | '1 week' | '1 month' | '3 months';
  category: 'Performance' | 'Content' | 'Technical SEO' | 'Schema' | 'Accessibility' | 'UX' | 'Off-Page';
  title: string;
  description: string;
  competitorBenchmark: string; // "Competitor X does Y"
  expectedImpact: string;
}

export interface CompetitorStrategyReport {
  summary: string; // 2-3 sentence executive overview
  yourVsAvg: {
    performance: number | null;  // your score vs competitor avg
    seo: number | null;
    accessibility: number | null;
    bestPractices: number | null;
    wordCount: number | null;
  };
  quickWins: StrategyAction[];   // Fix in 24h
  mediumWins: StrategyAction[];  // Fix in 1 week
  longTermWins: StrategyAction[]; // Fix in 1 month+
  contentGaps: string[];         // Topics competitors have but you don't
  schemaGaps: string[];          // Schema types competitors use but you don't
  generatedByAI: boolean;
}

// ── Gemini Strategy Prompt ────────────────────────────────────────────────────

export async function generateStrategyReport(params: {
  targetDomain: string;
  targetTitle: string;
  targetPerf: number;
  targetSeo: number;
  targetA11y: number;
  targetBP: number;
  targetWordCount: number;
  targetSchemas: string[];
  competitors: CompetitorProfile[];
}): Promise<CompetitorStrategyReport> {
  const { targetDomain, targetTitle, targetPerf, targetSeo, targetA11y, targetBP, targetWordCount, targetSchemas, competitors } = params;

  // Calculate competitor averages
  const validPerf = competitors.filter(c => c.performanceScore !== null);
  const avgPerf = validPerf.length ? Math.round(validPerf.reduce((s, c) => s + (c.performanceScore ?? 0), 0) / validPerf.length) : null;
  const validSeo = competitors.filter(c => c.seoScore !== null);
  const avgSeo = validSeo.length ? Math.round(validSeo.reduce((s, c) => s + (c.seoScore ?? 0), 0) / validSeo.length) : null;
  const avgWords = competitors.length ? Math.round(competitors.reduce((s, c) => s + c.wordCount, 0) / competitors.length) : null;

  // Find content & schema gaps
  const allCompetitorSchemas = [...new Set(competitors.flatMap(c => c.detectedSchemas))];
  const schemaGaps = allCompetitorSchemas.filter(s => !targetSchemas.includes(s));

  const allCompetitorTopics = [...new Set(competitors.flatMap(c => c.contentTopics))];
  const contentGaps = allCompetitorTopics.filter(t => t.length > 5).slice(0, 6);

  // Build basic strategy without AI first (as fallback)
  const basicStrategy = buildBasicStrategy({ 
    targetDomain, targetPerf, targetSeo, targetA11y, targetBP, targetWordCount, targetSchemas,
    competitors, avgPerf, avgSeo, avgWords, schemaGaps, contentGaps,
  });

  // Try Gemini AI for richer analysis
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || competitors.length === 0) {
    return { ...basicStrategy, generatedByAI: false };
  }

  const competitorSummary = competitors.map((c, i) => `
Competitor ${i + 1}: ${c.domain}
- SERP Position: #${c.serpRank}
- Performance: ${c.performanceScore ?? 'N/A'}/100, SEO: ${c.seoScore ?? 'N/A'}/100, A11y: ${c.accessibilityScore ?? 'N/A'}/100
- Word Count: ${c.wordCount} words
- Schema Types: ${c.detectedSchemas.join(', ') || 'None'}
- H1: "${c.h1}"
- Content Topics: ${c.contentTopics.slice(0, 5).join(', ')}
- LCP: ${c.lcp ? (c.lcp / 1000).toFixed(1) + 's' : 'N/A'}
`).join('\n');

  const prompt = `You are an expert SEO strategist. Analyze this website vs its real competitors and generate an actionable strategy.

TARGET WEBSITE: ${targetDomain}
Title: "${targetTitle}"
Scores: Performance=${targetPerf}, SEO=${targetSeo}, Accessibility=${targetA11y}, Best Practices=${targetBP}
Word Count: ${targetWordCount}
Schema Types: ${targetSchemas.join(', ') || 'None'}

REAL COMPETITORS (found from Google/DuckDuckGo SERP):
${competitorSummary}

GAPS ALREADY IDENTIFIED:
- Schema gaps (competitors have, target doesn't): ${schemaGaps.join(', ') || 'None'}
- Content topic gaps: ${contentGaps.slice(0, 4).join(', ')}

Generate a JSON strategy report with this EXACT structure:
{
  "summary": "2-3 sentence executive overview of competitive position",
  "quickWins": [
    {
      "priority": "Critical|High|Medium|Low",
      "timeframe": "24h",
      "category": "Performance|Content|Technical SEO|Schema|Accessibility|UX|Off-Page",
      "title": "Action title (max 60 chars)",
      "description": "Specific action to take (max 120 chars)",
      "competitorBenchmark": "Competitor X achieves Y (max 80 chars)",
      "expectedImpact": "Expected result (max 60 chars)"
    }
  ],
  "mediumWins": [ ... same structure, timeframe: "1 week" ... ],
  "longTermWins": [ ... same structure, timeframe: "1 month" or "3 months" ... ],
  "contentGaps": ["topic 1", "topic 2", "topic 3"]
}

Rules:
- quickWins: 2-3 actions that can be fixed in 24 hours (code changes, meta tags, schema)
- mediumWins: 2-3 actions requiring 1 week (content writing, page redesign)
- longTermWins: 2-3 strategic actions (backlinks, new pages, major rewrites)
- Be SPECIFIC to this domain's industry and competitors
- Only output valid JSON, nothing else`;

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.4 },
        }),
        signal: AbortSignal.timeout(15000),
      }
    );

    if (resp.ok) {
      const data = await resp.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (text) {
        const parsed = JSON.parse(text);
        return {
          summary: parsed.summary || basicStrategy.summary,
          yourVsAvg: { performance: avgPerf, seo: avgSeo, accessibility: null, bestPractices: null, wordCount: avgWords },
          quickWins: (parsed.quickWins || []).slice(0, 3),
          mediumWins: (parsed.mediumWins || []).slice(0, 3),
          longTermWins: (parsed.longTermWins || []).slice(0, 3),
          contentGaps: parsed.contentGaps || contentGaps,
          schemaGaps,
          generatedByAI: true,
        };
      }
    }
  } catch (err) {
    console.warn('[StrategyAdvisor] Gemini strategy generation failed:', err);
  }

  return { ...basicStrategy, generatedByAI: false };
}

// ── Basic Rule-Based Strategy (Gemini fallback) ───────────────────────────────

function buildBasicStrategy(p: {
  targetDomain: string; targetPerf: number; targetSeo: number; targetA11y: number; targetBP: number;
  targetWordCount: number; targetSchemas: string[]; competitors: CompetitorProfile[];
  avgPerf: number | null; avgSeo: number | null; avgWords: number | null;
  schemaGaps: string[]; contentGaps: string[];
}): CompetitorStrategyReport {
  const { targetPerf, targetSeo, targetA11y, targetWordCount, competitors, avgPerf, avgSeo, avgWords, schemaGaps, contentGaps } = p;
  const topComp = competitors[0];
  const quickWins: StrategyAction[] = [];
  const mediumWins: StrategyAction[] = [];
  const longTermWins: StrategyAction[] = [];

  // Quick wins
  if (schemaGaps.includes('FAQPage')) {
    quickWins.push({
      priority: 'High', timeframe: '24h', category: 'Schema',
      title: 'Add FAQPage Schema for Voice Search',
      description: 'Add JSON-LD FAQPage schema with 5+ Q&A pairs to your homepage',
      competitorBenchmark: topComp ? `${topComp.domain} uses FAQPage schema` : 'Top competitors use FAQ schema',
      expectedImpact: 'Win featured snippets & voice answers',
    });
  }

  if (targetSeo < 85) {
    quickWins.push({
      priority: 'Critical', timeframe: '24h', category: 'Technical SEO',
      title: 'Fix Meta Description & Title Tags',
      description: 'Ensure title is 50-60 chars with keyword. Meta desc 120-160 chars with CTA.',
      competitorBenchmark: avgSeo ? `Competitors avg SEO score: ${avgSeo}/100` : 'Competitors have optimized meta tags',
      expectedImpact: '+15-25% organic CTR improvement',
    });
  }

  if (targetA11y < 75) {
    quickWins.push({
      priority: 'Medium', timeframe: '24h', category: 'Accessibility',
      title: 'Add Alt Text to All Images',
      description: 'Every image tag must have descriptive alt="" attribute for A11y + SEO',
      competitorBenchmark: 'Google rewards accessible sites with ranking boosts',
      expectedImpact: 'Improve Accessibility score by 20+ pts',
    });
  }

  // Medium wins
  if (avgWords && targetWordCount < avgWords * 0.7) {
    mediumWins.push({
      priority: 'High', timeframe: '1 week', category: 'Content',
      title: `Expand Content to ${avgWords}+ Words`,
      description: `Your ${targetWordCount} word count is below competitors avg of ${avgWords} words.`,
      competitorBenchmark: `${topComp?.domain || 'Top competitor'} has ${topComp?.wordCount || avgWords} words`,
      expectedImpact: 'Rank for more long-tail keywords',
    });
  }

  if (avgPerf && targetPerf < avgPerf - 10) {
    mediumWins.push({
      priority: 'Critical', timeframe: '1 week', category: 'Performance',
      title: 'Fix Core Web Vitals — Speed Gap',
      description: 'Compress images to WebP, enable lazy loading, defer non-critical JS',
      competitorBenchmark: `Competitors avg Performance: ${avgPerf}/100 vs yours: ${targetPerf}/100`,
      expectedImpact: '+10-20% performance score improvement',
    });
  }

  // Long term
  longTermWins.push({
    priority: 'High', timeframe: '1 month', category: 'Content',
    title: 'Create Topic Cluster Content Pages',
    description: 'Build 5-10 supporting pages targeting related long-tail keywords',
    competitorBenchmark: topComp ? `${topComp.domain} covers ${topComp.contentTopics.length} topic areas` : 'Competitors have extensive content',
    expectedImpact: 'Establish topical authority in your niche',
  });

  longTermWins.push({
    priority: 'Medium', timeframe: '3 months', category: 'Off-Page',
    title: 'Build Local Business Citations & Reviews',
    description: 'Get listed on Google Business, Justdial, Sulekha with consistent NAP data',
    competitorBenchmark: 'Local SEO is critical for service businesses',
    expectedImpact: 'Rank in Google Maps Local Pack',
  });

  const perfDiff = avgPerf ? targetPerf - avgPerf : 0;
  const seoDiff = avgSeo ? targetSeo - avgSeo : 0;
  const summary = `Your site ${perfDiff >= 0 ? 'matches' : 'lags behind'} competitors in performance (${targetPerf} vs ${avgPerf ?? '?'} avg) and ${seoDiff >= 0 ? 'leads' : 'falls behind'} in SEO (${targetSeo} vs ${avgSeo ?? '?'} avg). ${schemaGaps.length > 0 ? `Missing schema types (${schemaGaps.join(', ')}) are quick wins.` : 'Your technical foundation is solid.'} Focus on content depth and schema to outrank competitors.`;

  return {
    summary,
    yourVsAvg: { performance: avgPerf, seo: avgSeo, accessibility: null, bestPractices: null, wordCount: avgWords },
    quickWins: quickWins.slice(0, 3),
    mediumWins: mediumWins.slice(0, 3),
    longTermWins: longTermWins.slice(0, 3),
    contentGaps,
    schemaGaps,
    generatedByAI: false,
  };
}
