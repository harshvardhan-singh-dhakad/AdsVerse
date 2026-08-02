import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';

const GEMINI_MODEL = 'gemini-3.6-flash';
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

async function callGeminiJson(prompt: string): Promise<any> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');

  const res = await fetch(
    `${GEMINI_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json',
        },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
  return JSON.parse(text);
}

export async function GET(req: NextRequest) {
  try {
    const docRef = adminDb.collection('admin_competitor_radar').doc('latest');
    const snap = await docRef.get();
    if (snap.exists) {
      const data = snap.data();
      return NextResponse.json({
        success: true,
        radar: data,
        cachedAt: data?.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(),
      });
    }

    // If no cache, run initial generation
    return await generateAndSaveRadar();
  } catch (err: any) {
    console.error('[/api/admin/competitor-radar GET] Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    return await generateAndSaveRadar();
  } catch (err: any) {
    console.error('[/api/admin/competitor-radar POST] Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function generateAndSaveRadar() {
  const prompt = `You are an elite SEO & Competitor Intelligence Strategist for "AdsVerse" (https://adsverse.in), an AI-first digital marketing agency headquartered in Vijay Nagar, Indore.

Analyze the Indore & Indian digital marketing landscape (SEO, GEO, n8n workflow automation, WhatsApp AI chatbots, Google Ads, Meta Ads) and output a JSON object matching this schema:

{
  "competitorKeywords": [
    {
      "keyword": "best digital marketing agency in indore",
      "searchVolume": "High",
      "difficulty": "Medium",
      "intent": "Transactional",
      "competitorWinner": "Traditional Agencies (SEO gaps)",
      "adsverseAdvantage": "Highlight AI-first execution & WhatsApp automation"
    }
  ],
  "keywordGaps": [
    {
      "topic": "n8n workflow automation agency india",
      "reason": "Very low competition in India, high SMB intent",
      "priority": "High"
    }
  ],
  "blogTopicSuggestions": [
    {
      "id": "topic-1",
      "title": "Proposed Blog Headline",
      "targetKeyword": "Target Keyword Phrase",
      "category": "SEO / Automation / WhatsApp / GEO",
      "outline": ["H2 section 1", "H2 section 2", "H2 section 3"],
      "whyItRanks": "Explanation of search intent & conversion potential"
    }
  ],
  "actionableTips": [
    "Quick 1-line recommendation for Admin"
  ]
}

Provide 5 detailed competitor keywords, 4 keyword gaps, 5 high-impact blog topic suggestions, and 4 actionable admin tips. Respond with ONLY valid JSON matching the schema.`;

  const aiResult = await callGeminiJson(prompt);

  const docData = {
    ...aiResult,
    domain: 'adsverse.in',
    updatedAt: FieldValue.serverTimestamp(),
  };

  const docRef = adminDb.collection('admin_competitor_radar').doc('latest');
  await docRef.set(docData);

  return NextResponse.json({
    success: true,
    radar: docData,
    cachedAt: new Date(),
  });
}
