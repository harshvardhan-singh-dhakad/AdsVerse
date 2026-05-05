
import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase-server";
import { type PricingPlan } from "@/lib/definitions";
import PricingClient from "@/components/pricing/PricingClient";

async function getPricingPlans(): Promise<PricingPlan[]> {
  try {
    const q = query(collection(db, "pricingPlans"), orderBy("displayOrder", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Convert Timestamps to ISO strings to avoid Next.js warnings
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
      };
    }) as any[];
  } catch (error) {
    console.error("Error fetching pricing plans:", error);
    return [];
  }
}

export default async function PricingPage({ params: { lang } }: { params: { lang: string } }) {
  const plans = await getPricingPlans();

  // Generate Product Schema for each plan
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": plans.length,
    "itemListElement": plans.map((plan, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": plan.name,
        "description": plan.description || plan.categoryDesc || "Premium digital service from AdsVerse",
        "brand": {
          "@type": "Brand",
          "name": "AdsVerse"
        },
        "offers": {
          "@type": "Offer",
          "price": plan.price.replace(/[^0-9]/g, ''),
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `https://adsverse.in/${lang}/pricing`
        }
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PricingClient initialPlans={plans} />
    </>
  );
}
