import { adminDb } from "@/firebase/admin";
import { DEFAULT_BRAND, type BrandSettings } from "@/lib/brand-defaults";

const cleanValue = (value: unknown, fallback: string) =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;

export async function getBrandSettings(): Promise<BrandSettings> {
  try {
    const snapshot = await adminDb.collection("brandSettings").doc("global").get();
    if (!snapshot.exists) return DEFAULT_BRAND;

    const data = snapshot.data() || {};
    return {
      siteName: cleanValue(data.siteName, DEFAULT_BRAND.siteName),
      tagline: cleanValue(data.tagline, DEFAULT_BRAND.tagline),
      description: cleanValue(data.description, DEFAULT_BRAND.description),
      logoUrl: typeof data.logoUrl === "string" ? data.logoUrl.trim() : "",
      ogImageUrl: cleanValue(data.ogImageUrl, DEFAULT_BRAND.ogImageUrl),
      faviconUrl: cleanValue(data.faviconUrl, DEFAULT_BRAND.faviconUrl),
      email: cleanValue(data.email, DEFAULT_BRAND.email),
      phone: cleanValue(data.phone, DEFAULT_BRAND.phone),
      address: cleanValue(data.address, DEFAULT_BRAND.address),
      instagramUrl: cleanValue(data.instagramUrl, DEFAULT_BRAND.instagramUrl),
      facebookUrl: cleanValue(data.facebookUrl, DEFAULT_BRAND.facebookUrl),
      xUrl: cleanValue(data.xUrl, DEFAULT_BRAND.xUrl),
      linkedinUrl: cleanValue(data.linkedinUrl, DEFAULT_BRAND.linkedinUrl),
      googleBusinessUrl: cleanValue(data.googleBusinessUrl, DEFAULT_BRAND.googleBusinessUrl),
    };
  } catch (error) {
    console.warn("[brand-settings] Firestore unavailable; using defaults.", error);
    return DEFAULT_BRAND;
  }
}
