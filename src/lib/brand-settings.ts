import { cache } from "react";
import { adminDb } from "@/firebase/admin";

export type BrandSettings = {
  siteName: string;
  tagline: string;
  description: string;
  logoUrl: string;
  ogImageUrl: string;
  faviconUrl: string;
  email: string;
  phone: string;
  address: string;
  instagramUrl: string;
  facebookUrl: string;
  xUrl: string;
  linkedinUrl: string;
  googleBusinessUrl: string;
};

export const DEFAULT_BRAND: BrandSettings = {
  siteName: "AdsVerse",
  tagline: "Automate. Elevate. Dominate.",
  description: "AI-first digital marketing and automation agency in Indore.",
  logoUrl: "",
  ogImageUrl: "/images/og-adsverse-2026.png",
  faviconUrl: "/favicon.ico",
  email: "contact@adsverse.in",
  phone: "+91 96851 23339",
  address: "329/11, Meghdoot Nagar, Indore, Madhya Pradesh - 452011, India",
  instagramUrl: "https://www.instagram.com/adsverse.ai",
  facebookUrl: "https://www.facebook.com/adsverse.in",
  xUrl: "https://x.com/Adsverse",
  linkedinUrl: "https://www.linkedin.com/company/adsverse",
  googleBusinessUrl: "https://maps.app.goo.gl/7edcg9nx6Kofxv8M8",
};

const cleanValue = (value: unknown, fallback: string) =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;

export const getBrandSettings = cache(async (): Promise<BrandSettings> => {
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
});
