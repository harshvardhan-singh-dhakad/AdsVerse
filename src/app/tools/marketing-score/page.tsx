import { redirect } from "next/navigation";

// /tools/marketing-score redirects to our full SEO Audit tool
export default function MarketingScorePage() {
  redirect("/tools/seo-audit");
}
