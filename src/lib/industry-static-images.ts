import "server-only";

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { IndustryGalleryImage } from "@/lib/industry-image-types";

type IndustryImageManifestEntry = {
  slug: string;
  src: string;
  altText: string;
  caption: string;
};

type IndustryImageManifest = {
  images?: IndustryImageManifestEntry[];
};

/**
 * Returns the public, code-managed fallback image only when the asset file and
 * its manifest have both been unpacked into public/industries.
 */
export function getIndustryStaticImage(slug: string): IndustryGalleryImage | undefined {
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;

  const directory = join(process.cwd(), "public", "industries");
  const manifestPath = join(directory, "manifest.json");
  const imagePath = join(directory, slug + ".webp");
  if (!existsSync(manifestPath) || !existsSync(imagePath)) return undefined;

  try {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as IndustryImageManifest;
    const item = manifest.images?.find((entry) => entry.slug === slug);
    if (!item || item.src !== "/industries/" + slug + ".webp") return undefined;

    const altText = typeof item.altText === "string" ? item.altText.trim().slice(0, 180) : "";
    const caption = typeof item.caption === "string" ? item.caption.trim().slice(0, 250) : "";
    if (!altText) return undefined;

    return {
      url: item.src,
      storagePath: "static/" + slug + ".webp",
      altText,
      caption,
    };
  } catch (error) {
    console.warn("[industry-static-images] Could not read industry image manifest.", error);
    return undefined;
  }
}
