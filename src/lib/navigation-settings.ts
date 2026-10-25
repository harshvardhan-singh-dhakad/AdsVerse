import { DEFAULT_NAVIGATION_LINKS, type NavigationLink } from "@/lib/navigation-defaults";

/**
 * Public header navigation is intentionally static. Admin-managed Firestore
 * overrides are no longer read so the links stay consistent with source control.
 */
export function getNavigationLinks(): NavigationLink[] {
  return DEFAULT_NAVIGATION_LINKS
    .filter((link) => link.enabled)
    .map((link) => ({ ...link }));
}
