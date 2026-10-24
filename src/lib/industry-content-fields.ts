import type { Industry } from "@/lib/industries";

export const INDUSTRY_EDITABLE_FIELDS = [
  "overview",
  "audience",
  "challenges",
  "searchIntent",
  "paidStrategy",
  "contentAngles",
  "aiQuestions",
  "conversionPath",
  "automation",
  "trust",
  "localAngle",
  "metrics",
  "offer",
] as const;

export type IndustryEditableField = (typeof INDUSTRY_EDITABLE_FIELDS)[number];

export const INDUSTRY_FIELD_LABELS: Record<IndustryEditableField, string> = {
  overview: "Industry overview",
  audience: "Target audience and buyer intent",
  challenges: "Industry challenges",
  searchIntent: "SEO and search intent",
  paidStrategy: "Google Ads and Meta Ads strategy",
  contentAngles: "Content strategy",
  aiQuestions: "AI readability, GEO and AEO",
  conversionPath: "Website conversion journey",
  automation: "CRM, WhatsApp and automation",
  trust: "Trust, proof and responsible claims",
  localAngle: "Local and regional targeting",
  metrics: "KPIs and reporting",
  offer: "Suggested first-step offer",
};

export function getEditableIndustryFields(industry: Industry): Record<IndustryEditableField, string> {
  return INDUSTRY_EDITABLE_FIELDS.reduce((fields, key) => {
    fields[key] = industry[key] || "";
    return fields;
  }, {} as Record<IndustryEditableField, string>);
}
