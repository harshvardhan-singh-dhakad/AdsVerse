import { DEFAULT_BRAND } from "@/lib/brand-defaults";
import type { BrandSettings } from "@/lib/brand-defaults";

export type { BrandSettings } from "@/lib/brand-defaults";

/**
 * Brand identity is intentionally code-defined, not database-driven.
 * Site name, metadata, logo fallback, contact details and social links stay stable
 * until they are deliberately changed in source control.
 */
export function getBrandSettings(): BrandSettings {
  return DEFAULT_BRAND;
}
