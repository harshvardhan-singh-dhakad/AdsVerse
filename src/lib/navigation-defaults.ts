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
