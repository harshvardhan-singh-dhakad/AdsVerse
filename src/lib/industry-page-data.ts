import "server-only";

import { cache } from "react";
import { adminDb } from "@/firebase/admin";
import { getIndustryBySlug, type Industry } from "@/lib/industries";
import { INDUSTRY_EDITABLE_FIELDS } from "@/lib/industry-content-fields";
import { MAX_INDUSTRY_GALLERY_IMAGES, type IndustryGalleryImage } from "@/lib/industry-image-types";

export type IndustryPageContent = Industry & {
  images: IndustryGalleryImage[];
};

function readGalleryImages(raw: unknown, slug: string): IndustryGalleryImage[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .slice(0, MAX_INDUSTRY_GALLERY_IMAGES)
    .map((item): IndustryGalleryImage | null => {
      if (!item || typeof item !== "object") return null;
      const data = item as Record<string, unknown>;
      const url = typeof data.url === "string" ? data.url.trim() : "";
      const storagePath = typeof data.storagePath === "string" ? data.storagePath.trim() : "";
      const altText = typeof data.altText === "string" ? data.altText.trim().slice(0, 180) : "";
      const caption = typeof data.caption === "string" ? data.caption.trim().slice(0, 250) : "";

      let secureUrl = false;
      try {
        secureUrl = new URL(url).protocol === "https:";
      } catch {
        secureUrl = false;
      }

      if (
        !secureUrl ||
        !altText ||
        !storagePath.startsWith("industry-pages/" + slug + "/") ||
        storagePath.includes("..")
      ) {
        return null;
      }

      return { url, storagePath, altText, caption };
    })
    .filter((image): image is IndustryGalleryImage => image !== null);
}

export const getIndustryPageData = cache(async (slug: string): Promise<IndustryPageContent | undefined> => {
  const base = getIndustryBySlug(slug);
  if (!base) return undefined;

  try {
    const snapshot = await adminDb.collection("industryPageOverrides").doc(base.slug).get();
    if (!snapshot.exists) return { ...base, images: [] };

    const stored = snapshot.data() || {};
    const merged = { ...base, images: readGalleryImages(stored.images, base.slug) } as IndustryPageContent;
    for (const field of INDUSTRY_EDITABLE_FIELDS) {
      if (typeof stored[field] === "string") {
        merged[field] = stored[field] as never;
      }
    }

    // Keep the page available if an override is incomplete or malformed.
    return merged;
  } catch (error) {
    console.warn("[industry-page-data] Using code defaults for " + base.slug, error);
    return { ...base, images: [] };
  }
});
