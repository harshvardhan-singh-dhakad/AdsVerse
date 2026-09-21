import { adminDb } from "@/firebase/admin";
import { DEFAULT_NAVIGATION_LINKS, type NavigationLink } from "@/lib/navigation-defaults";

export async function getNavigationLinks(): Promise<NavigationLink[]> {
  try {
    const snapshot = await adminDb.collection("navigationSettings").doc("global").get();
    if (!snapshot.exists) return DEFAULT_NAVIGATION_LINKS;

    const data = snapshot.data() || {};
    const links = Array.isArray(data.links) ? data.links : [];

    const normalized = links
      .map((item: any) => ({
        href: String(item?.href || "").trim(),
        label: String(item?.label || "").trim(),
        enabled: item?.enabled !== false,
      }))
      .filter((item: NavigationLink) => item.href && item.label && item.href.startsWith("/"));

    const visibleLinks = normalized.filter((item) => item.enabled);
    return visibleLinks.length > 0 ? visibleLinks : DEFAULT_NAVIGATION_LINKS;
  } catch (error) {
    console.warn("[navigation-settings] Firestore unavailable; using defaults.", error);
    return DEFAULT_NAVIGATION_LINKS;
  }
}
