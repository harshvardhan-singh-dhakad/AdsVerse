import { Check } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Digital Marketing Services | AdsVerse",
    description: "Explore the full range of digital marketing services offered by AdsVerse, from SEO and SMM to AI Automation and Web Development.",
    alternates: {
        canonical: '/our-services',
    },
};

const services = [
  {
    category: "Social Media Marketing (SMM)",
    emoji: "🎯",
    items: [
      "Facebook Marketing", "Instagram Marketing", "LinkedIn Marketing", "Twitter (X) Marketing",
      "YouTube Marketing", "Social Media Account Management", "Social Media Content Creation",
      "Social Media Ads Campaigns", "Influencer Marketing"
    ]
  },
  {
    category: "Search Engine Optimization (SEO)",
    emoji: "🔥",
    items: [
      "On-Page SEO", "Off-Page SEO", "Technical SEO", "Local SEO", "Mobile SEO",
      "E-Commerce SEO", "YouTube SEO", "Website Speed Optimization", "Keyword Research", "SEO Audit"
    ]
  },
  {
    category: "Content Creation & Marketing",
    emoji: "🎬",
    items: [
      "Blog Writing", "Website Content Writing", "Copywriting (Ads, Landing Pages)", "Social Media Content",
      "SEO-Optimized Content", "Video Content Creation", "Reels / Shorts Creation", "Podcast Editing & Publishing", "Infographics Design"
    ]
  },
  {
    category: "Pay-Per-Click (PPC) & Media Buying",
    emoji: "📈",
    items: [
      "Google Search Ads", "Google Display Ads", "Google Shopping Ads", "YouTube Ads",
      "Facebook & Instagram Ads", "LinkedIn Ads", "Remarketing Campaigns", "Conversion Ads", "Lead Generation Campaigns"
    ]
  },
  {
    category: "E-Commerce Marketing",
    emoji: "🛒",
    items: [
      "Amazon/Flipkart Product SEO", "Marketplace Ads", "Product Listing Optimization",
      "Ecommerce Store Setup", "Shopify / WooCommerce Setup", "Catalog Management"
    ]
  },
  {
    category: "Email Marketing",
    emoji: "📩",
    items: [
      "Email Automation", "Newsletter Creation", "Drip Campaigns", "Email List Building", "MailChimp / SendGrid Setup"
    ]
  },
  {
    category: "WhatsApp & Chat Automation",
    emoji: "📱",
    items: [
      "WhatsApp Marketing", "WhatsApp Broadcast Setup", "Chatbot Integration", "AI Auto-Reply Setup (Instagram/WhatsApp/Facebook)"
    ]
  },
  {
    category: "Graphic Design",
    emoji: "🎨",
    items: [
      "Logo Design", "Branding Kit", "Social Media Posters", "Banner & Flyer Design", "Thumbnail Design"
    ]
  },
  {
    category: "Website Development",
    emoji: "🌐",
    items: [
      "Business Website", "Portfolio Website", "E-Commerce Website", "Landing Pages",
      "UI/UX Designing", "Website Maintenance", "Website Redesigning"
    ]
  },
  {
    category: "Marketing Automation & AI",
    emoji: "🧠",
    items: [
      "CRM Automation", "AI Chat Agents", "Lead Automation", "Funnel Automation", "Zapier / n8n Setup"
    ]
  },
  {
    category: "Online Reputation Management (ORM)",
    emoji: "🧭",
    items: [
      "Google Reviews Management", "Negative Review Handling", "Brand Reputation Building"
    ]
  },
  {
    category: "Analytics & Tracking",
    emoji: "📊",
    items: [
      "Google Analytics Setup", "Facebook Pixel Setup", "Conversion Tracking", "Performance Reporting"
    ]
  },
  {
    category: "Video Production",
    emoji: "🎥",
    items: [
      "Corporate Videos", "Product Promo Videos", "Reels & Shorts", "Business ads"
    ]
  },
  {
    category: "Branding & Strategy",
    emoji: "📝",
    items: [
      "Brand Identity Creation", "Brand Strategy", "Market Research", "Marketing Strategy"
    ]
  },
];


export default function OurServicesPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <header className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-headline text-primary">Our Services</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                    A complete range of digital solutions to empower your brand and drive growth.
                </p>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((serviceCategory) => (
                    <div key={serviceCategory.category} className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/40">
                        <h2 className="text-2xl font-bold font-headline text-accent mb-4">
                            <span className="mr-2">{serviceCategory.emoji}</span>
                            {serviceCategory.category}
                        </h2>
                        <ul className="space-y-2">
                            {serviceCategory.items.map((item) => (
                                <li key={item} className="flex items-center gap-3 text-muted-foreground">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </main>
        </div>
    );
}