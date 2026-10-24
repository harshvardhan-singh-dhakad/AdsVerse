import "server-only";

import { cache } from "react";
import { adminDb } from "@/firebase/admin";
import { getIndustryBySlug, type Industry } from "@/lib/industries";
import { INDUSTRY_EDITABLE_FIELDS } from "@/lib/industry-content-fields";

export const getIndustryPageData = cache(async (slug: string): Promise<Industry | undefined> => {
  const base = getIndustryBySlug(slug);
  if (!base) return undefined;

  try {
    const snapshot = await adminDb.collection("industryPageOverrides").doc(base.slug).get();
    if (!snapshot.exists) return base;

    const stored = snapshot.data() || {};
    const merged: Industry = { ...base };
    for (const field of INDUSTRY_EDITABLE_FIELDS) {
      if (typeof stored[field] === "string") {
        merged[field] = stored[field] as never;
      }
    }

    // Keep the page available if an override is incomplete or malformed.
    return merged;
  } catch (error) {
    console.warn("[industry-page-data] Using code defaults for " + base.slug, error);
    return base;
  }
});
