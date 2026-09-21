import { adminDb } from "@/firebase/admin";
import { getServiceSlug } from "@/lib/services-data";

const parsePrice = (value: unknown): number | null => {
  const parsed = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

export async function getPublicServicePriceOverrides(): Promise<Record<string, number>> {
  const overrides: Record<string, number> = {};

  try {
    const snapshot = await adminDb.collection("pricingPlans").get();
    const candidates = new Map<string, Array<{
      value: number;
      isPopular: boolean;
      displayOrder: number;
    }>>();

    for (const [index, doc] of snapshot.docs.entries()) {
      const data = doc.data() as Record<string, any>;
      if (data.isPublished === false) continue;

      const value = parsePrice(data.price);
      if (value === null) continue;

      const serviceSlug = String(data.serviceSlug || getServiceSlug(String(data.name || ""))).trim();
      if (!serviceSlug) continue;

      const current = candidates.get(serviceSlug) || [];
      current.push({
        value,
        isPopular: data.isPopular === true,
        displayOrder: Number(data.displayOrder ?? index) || index,
      });
      candidates.set(serviceSlug, current);
    }

    for (const [slug, plans] of candidates) {
      plans.sort(
        (a, b) =>
          Number(b.isPopular) - Number(a.isPopular) ||
          a.value - b.value ||
          a.displayOrder - b.displayOrder
      );
      overrides[slug] = plans[0].value;
    }
  } catch (error) {
    console.warn("[pricing-catalog] Firestore unavailable; using service-level prices.", error);
  }

  return overrides;
}
