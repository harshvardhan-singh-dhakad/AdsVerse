import { adminDb } from "@/firebase/admin";
import type { MobilePoster } from "@/lib/mobile-posters-types";

function isSafeDestination(value: string): boolean {
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) return true;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export async function getPublicMobilePosters(): Promise<MobilePoster[]> {
  try {
    const snapshot = await adminDb.collection("mobilePosters").get();

    return snapshot.docs
      .map((document) => {
        const data = document.data() as Record<string, unknown>;
        const title = typeof data.title === "string" ? data.title.trim() : "";
        const imageUrl = typeof data.imageUrl === "string" ? data.imageUrl.trim() : "";
        const imageAlt = typeof data.imageAlt === "string" ? data.imageAlt.trim() : title;
        const buttonText = typeof data.buttonText === "string" ? data.buttonText.trim() : "";
        const targetUrl = typeof data.targetUrl === "string" ? data.targetUrl.trim() : "";
        const displayOrder = Number(data.displayOrder);

        if (
          data.isPublished !== true ||
          !imageUrl.startsWith("https://") ||
          !buttonText ||
          !isSafeDestination(targetUrl)
        ) {
          return null;
        }

        return {
          id: document.id,
          title,
          imageUrl,
          imageStoragePath: typeof data.imageStoragePath === "string" ? data.imageStoragePath : "",
          imageAlt: imageAlt || title || "AdsVerse promotion",
          buttonText,
          targetUrl,
          displayOrder: Number.isFinite(displayOrder) && displayOrder >= 0 ? displayOrder : 0,
          isPublished: true,
        } satisfies MobilePoster;
      })
      .filter((poster): poster is MobilePoster => poster !== null)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  } catch (error) {
    console.warn("[mobile-posters] Could not load published posters.", error);
    return [];
  }
}
