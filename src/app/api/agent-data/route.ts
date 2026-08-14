import { NextResponse } from 'next/server';
import { DM_CATEGORIES, AI_CATEGORIES } from '@/lib/services-data';
import { db } from '@/lib/firebase-server';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';

export async function GET() {
  try {
    let blogPosts: any[] = [];
    
    // Try to fetch recent blogs for the AI agent context
    try {
      const now = new Date().toISOString();
      const q = query(
        collection(db, "public_blogPosts"),
        where("publishedDate", "<=", now),
        orderBy("publishedDate", "desc"),
        limit(20)
      );
      const snap = await getDocs(q);
      
      if (snap && snap.docs) {
        blogPosts = snap.docs.map((doc: any) => {
          const data = doc.data();
          return {
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            category: data.category,
            url: `https://adsverse.in/blog/${data.slug}`
          };
        });
      }
    } catch (e) {
      console.warn("Failed to fetch blogs for agent data", e);
    }

    const payload = {
      agency_name: "AdsVerse",
      description: "AI-first digital marketing agency in Indore specializing in n8n automation, WhatsApp AI chatbots, Gemini API integrations, CRM automation, SEO, and performance advertising for Indian SMBs.",
      services: {
        digital_marketing: DM_CATEGORIES,
        ai_automation: AI_CATEGORIES
      },
      recent_articles: blogPosts,
      contact: {
        email: "contact@adsverse.in",
        phone: "+91-9685123339",
        booking_url: "https://adsverse.in/contact"
      }
    };

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate agent data feed" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
