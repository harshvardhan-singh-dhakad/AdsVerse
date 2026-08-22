import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase-server";
import { type Service as ServiceDef } from "@/lib/definitions";
import ServicesClient from "@/components/services/ServicesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Digital Marketing & AI Automation Services | AdsVerse" },
  description: "Explore 75+ AI-first digital marketing, SEO, Google & Meta Ads, WhatsApp AI bots, n8n workflows, and web design services by AdsVerse in Indore & across India.",
  alternates: {
    canonical: "https://adsverse.in/services",
  },
  openGraph: {
    title: "Digital Marketing, AI Automation & Web Design Services | AdsVerse",
    description: "75+ services: SEO, Google Ads, Meta Ads, WhatsApp AI bots, n8n automation and web development. AI-first digital marketing agency in Indore serving pan-India.",
    url: "https://adsverse.in/services",
    siteName: "AdsVerse",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://adsverse.in/images/og-adsverse-2026.png",
        width: 1200,
        height: 630,
        alt: "AdsVerse Digital Marketing, AI Automation & Web Design Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing, AI Automation & Web Design Services | AdsVerse",
    description: "75+ services: SEO, Google Ads, Meta Ads, WhatsApp AI bots, n8n automation. AI-first agency, Indore.",
    creator: "@Adsverse1",
  },
};


const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Digital Marketing, AI Automation & Web Design Services | AdsVerse",
  "description": "75+ digital marketing, AI automation and web design services — SEO, Google Ads, Meta Ads, WhatsApp bots, n8n workflows, web development. AI-first agency in Indore.",
  "url": "https://adsverse.in/services",
  "provider": {
    "@type": "Organization",
    "name": "AdsVerse",
    "url": "https://adsverse.in",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "AdsVerse Services",
  "url": "https://adsverse.in/services",
  "numberOfItems": 3,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "AI Automation Services", "url": "https://adsverse.in/services/ai-automation" },
    { "@type": "ListItem", "position": 2, "name": "Digital Marketing Agency in Indore", "url": "https://adsverse.in/services/digital-marketing" },
    { "@type": "ListItem", "position": 3, "name": "Web Design & Development", "url": "https://adsverse.in/services/web-design-development" },
  ],
};

async function getServices(): Promise<ServiceDef[]> {
  try {
    const q = query(collection(db, "services"), orderBy("displayOrder", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
      };
    }) as any[];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function ServicesPage() {
  const dbServices = await getServices();

  return (
    <>
      <script
        type="application/ld+json"
        id="webpage-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        id="itemlist-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />


      {/* ── FULL SERVICES LIST (existing ServicesClient component unchanged) ── */}
      <ServicesClient isHi={false} initialServices={dbServices} />
    </>
  );
}
