import { adminDb } from "@/firebase/admin";

export type NavigationLink = {
  href: string;
  label: string;
  enabled: boolean;
};

export const DEFAULT_NAVIGATION_LINKS: NavigationLink[] = [
  { href: "/", label: "Home", enabled: true },
  { href: "/services", label: "Services", enabled: true },
  { href: "/blog", label: "Blog", enabled: true },
  { href: "/locations", label: "Locations", enabled: true },
  { href: "/about", label: "About", enabled: true },
  { href: "/contact", label: "Contact", enabled: true },
];

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
