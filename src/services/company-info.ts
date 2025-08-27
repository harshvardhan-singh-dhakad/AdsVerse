
import { z } from "zod";

const ServiceSchema = z.object({
  category: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
});

const SocialLinkSchema = z.object({
  platform: z.string(),
  url: z.string(),
});

export const CompanyInfo = z.object({
  companyName: z.string(),
  description: z.string(),
  contact: z.object({
    phone: z.string(),
    email: z.string(),
    address: z.string(),
  }),
  socialLinks: z.array(SocialLinkSchema),
  services: z.array(ServiceSchema),
});

export type CompanyInfo = z.infer<typeof CompanyInfo>;

const companyData: CompanyInfo = {
  companyName: "AdsVerse",
  description: "A full-service digital marketing agency specializing in SEO, Paid Ads, Social Media Management, and Web Development.",
  contact: {
    phone: "+91 9977646156",
    email: "contact@adsverse.in",
    address: "Scheme No. 54, Vijay Nagar, Indore (452010), INDIA",
  },
  socialLinks: [
    { platform: "WhatsApp", url: "https://wa.me/919977646156" },
    { platform: "Instagram", url: "https://www.instagram.com/adsverse.ai?igsh=bnl2aTJqZjB4Nm4=" },
    { platform: "Facebook", url: "https://www.facebook.com/share/1E56NG5ZZL/" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/company/dmafia/" },
    { platform: "X", url: "https://x.com/Adsverse1?t=vG0NYqyjhKobVoztl4xIPw&s=09" },
  ],
  services: [
    { category: "SEO", title: "Local SEO", description: "Dominate local search results. We optimize your Google Business Profile and build local citations to attract nearby customers actively searching for your services.", price: "₹8,000/mo" },
    { category: "SEO", title: "E-commerce SEO", description: "Increase product visibility and sales. Our e-commerce SEO service focuses on product page optimization, technical SEO, and category-level keyword targeting.", price: "₹15,000/mo" },
    { category: "SEO", title: "Technical SEO Audit", description: "Uncover hidden issues hurting your ranking. We perform a deep-dive analysis of your site's speed, crawlability, and indexing to build a strong foundation.", price: "₹10,000 one-time" },
    { category: "Paid Ads", title: "Google Ads Management", description: "Get immediate, high-intent traffic. We manage your Google Ads from keyword bidding to ad creation, focusing on maximizing your Return on Ad Spend (ROAS).", price: "₹10,000/mo" },
    { category: "Paid Ads", title: "Meta Ads Management", description: "Reach your ideal customers on Facebook & Instagram. We create and manage targeted ad campaigns based on demographics, interests, and behavior.", price: "₹9,000/mo" },
    { category: "Social Media", title: "Social Media Management", description: "Build a vibrant online community. We handle content creation, scheduling, and engagement across two of your chosen social media platforms.", price: "₹14,999/mo" },
    { category: "Content Marketing", title: "Blog Post Writing (4/month)", description: "Fuel your SEO with high-quality, SEO-optimized blog posts. Our team researches and writes four articles per month to attract and engage your audience.", price: "₹10,000/mo" },
    { category: "Branding & Design", title: "Logo & Brand Identity", description: "The complete visual foundation for your business. Our package includes logo design, color palette, typography, and a full brand style guide.", price: "₹25,000 one-time" },
    { category: "Web & App Dev", title: "Basic Website (5 pages)", description: "Launch your online presence with a professional, responsive website. This package is perfect for showcasing your business and generating leads.", price: "₹30,000 one-time" },
    { category: "Automation", title: "Custom Automation Tools", description: "Bespoke bots and tools to streamline your business processes, from AI telecallers to workflow automation.", price: "Starts at ₹12,000" },
  ],
};

/**
 * Returns comprehensive information about the AdsVerse company.
 * This is a simple function that returns a static object, but in a real-world
 * scenario, this could fetch data from a CMS or a database.
 */
export function getCompanyInfo(): CompanyInfo {
  return companyData;
}
