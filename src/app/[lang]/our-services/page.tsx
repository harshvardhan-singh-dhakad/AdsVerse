
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { AISearchInsights } from "@/components/seo/AISearchInsights";

const digitalMarketingServices = [
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

const automationServiceCategories = [
    { name: "Workflow & Business Automation", services: ["Zapier / Make / n8n automation setup", "Form → CRM automatic lead flow", "Email + WhatsApp notifications", "Multistep workflow design", "Sheets, CRM, website & apps integration"], pricing: [{tier: "Basic", price: "₹4,999"}, {tier: "Standard", price: "₹9,999"}, {tier: "Premium", price: "₹19,999+"}] },
    { name: "CRM Setup & Automation", services: ["Platforms: HubSpot, Zoho, Salesforce, Pipedrive", "Lead routing", "Auto follow-up sequences", "Lead scoring", "Auto reminders", "WhatsApp + Email connection"], pricing: [{tier: "Setup + 3 Automations", price: "₹7,999"}, {tier: "Complete CRM Automation", price: "₹19,999 – ₹39,999"}] },
    { name: "Social Media Automation", services: ["Instagram Auto DM", "WhatsApp Catalog bot", "Auto Comment Reply", "Post scheduling system", "AI DM responder"], pricing: [{tier: "Starter", price: "₹3,999"}, {tier: "AI Automation", price: "₹7,999"}, {tier: "Pro Bundle", price: "₹12,999"}] },
    { name: "WhatsApp Automation", services: ["WhatsApp chatbot", "Auto lead qualification", "Auto brochure sending", "Payment + order updates", "WhatsApp CRM connection"], pricing: [{tier: "Basic Bot", price: "₹4,999"}, {tier: "Business Bot", price: "₹9,999"}, {tier: "AI-Powered Bot", price: "₹14,999 – ₹29,999"}] },
    { name: "E-commerce Automation", services: ["Abandoned cart automation", "Order → WhatsApp automation", "Auto invoice generation", "Stock sync automation", "Auto product upload (Scraper → Firebase/Shopify)"], pricing: [{tier: "Basic", price: "₹6,999"}, {tier: "Advanced", price: "₹14,999"}, {tier: "Complete Automation", price: "₹29,999 – ₹49,999"}] },
    { name: "AI Automation", services: ["AI chatbot (website + WhatsApp)", "Auto content generator", "AI email writer", "AI lead qualification agent", "AI voice agent setup"], pricing: [{tier: "AI Bot", price: "₹9,999"}, {tier: "AI Funnel", price: "₹14,999"}, {tier: "AI Voice Agent", price: "₹29,999 – ₹59,999"}] },
    { name: "Website & Landing Page Automation", services: ["Auto lead capture", "Auto booking system", "Auto email + WhatsApp", "Online forms → CRM automation"], pricing: [{tier: "Basic", price: "₹3,999"}, {tier: "Pro", price: "₹7,999"}, {tier: "Business", price: "₹14,999"}] },
    { name: "Appointment / Booking Automation", services: ["Industries: Salon, Doctor, Gym, Coaching, Real Estate", "Auto booking", "Auto reminders", "WhatsApp confirmation", "Payment-linked booking"], pricing: [{tier: "Starter", price: "₹4,999"}, {tier: "Smart Booking System", price: "₹9,999"}, {tier: "Full Automation", price: "₹19,999"}] },
    { name: "Real Estate Automation", services: ["Auto lead qualification", "WhatsApp brochure bot", "Auto follow-ups", "CRM + pipeline setup"], pricing: [{tier: "Basic", price: "₹7,999"}, {tier: "Pro", price: "₹14,999"}, {tier: "Premium", price: "₹24,999"}] },
    { name: "Data Scraping + Automation", services: ["Product scraping", "Auto sheet update", "Real estate scraping", "Auto posting to website"], pricing: [{tier: "Simple Scraper", price: "₹5,999"}, {tier: "Full Automation", price: "₹12,999 – ₹24,999"}] },
    { name: "Custom API Integrations", services: ["Payment API", "WhatsApp API", "CRM API", "Firebase API", "Webhooks setup"], pricing: [{tier: "Pricing", price: "₹4,999 – ₹24,999 depending on API"}] },
];

const automationPackages = [
    { title: "Starter Automation Package", price: "₹9,999", features: ["3 automations", "Form → CRM", "WhatsApp alert", "Basic chatbot"], isPopular: false },
    { title: "Growth Automation Package", price: "₹24,999", features: ["8–10 automations", "CRM setup", "WhatsApp bot", "Social DM automation", "Auto follow-ups"], isPopular: true },
    { title: "Business Automation Suite", price: "₹49,999", features: ["Full CRM automation", "WhatsApp + Instagram AI bot", "E-commerce automation", "Auto reminders + billing", "API + Scraper integration"], isPopular: false },
    { title: "Enterprise Automation Suite", price: "₹79,999 – ₹1,49,999", features: ["Custom AI agent", "Voice bot", "Complex workflows", "Multi-channel automation", "End-to-end automation dashboard"], isPopular: false },
];

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isHi = lang === 'hi';
  return {
    title: isHi ? "इंदौर में डिजिटल मार्केटिंग और ऑटोमेशन सेवाएं" : "Digital Marketing & Automation in Indore",
    description: isHi
      ? "इंदौर की सर्वश्रेष्ठ डिजिटल मार्केटिंग और ऑटोमेशन सेवाएं। SEO, मेटा विज्ञापन, AI चैटबॉट्स और CRM ऑटोमेशन के साथ अपने व्यवसाय को बढ़ाएं।"
      : "Indore's best digital marketing and automation services. Grow your business with SEO, Meta Ads, AI chatbots, and CRM automation.",
    alternates: {
      canonical: `https://adsverse.in/${lang}/our-services`,
      languages: {
        'en': 'https://adsverse.in/en/our-services',
        'hi': 'https://adsverse.in/hi/our-services',
      },
    },
  };
}

export default function OurServicesPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Digital Marketing & Business Automation",
        "provider": {
            "@type": "LocalBusiness",
            "name": "AdsVerse",
            "image": "https://adsverse.in/images/logo-white.webp",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Vijay Nagar",
                "addressLocality": "Indore",
                "addressRegion": "MP",
                "postalCode": "452010",
                "addressCountry": "IN"
            }
        },
        "areaServed": {
            "@type": "City",
            "name": "Indore"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Digital Services",
            "itemListElement": digitalMarketingServices.map((s, i) => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": s.category
                }
            }))
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto py-16 px-4">
                <header className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-headline text-primary mb-6">Our Services</h1>
                    <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed">
                        Indore's Premier Hub for Digital Excellence & AI-Driven Business Automation.
                    </p>
                </header>

                <Tabs defaultValue="digital-marketing" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-12">
                        <TabsTrigger value="digital-marketing" className="text-lg py-3">Digital Marketing</TabsTrigger>
                        <TabsTrigger value="automation-services" className="text-lg py-3">Automation Services</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="digital-marketing" className="mt-8 animate-in fade-in duration-500">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold font-headline text-primary">State-of-the-Art Marketing Hub</h2>
                            <p className="text-lg text-muted-foreground mt-2">Engineered for visibility, built for conversions.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {digitalMarketingServices.map((serviceCategory) => (
                                <div key={serviceCategory.category} className="bg-card/40 backdrop-blur-md rounded-2xl p-8 border border-primary/10 hover:border-accent/40 transition-all duration-300 hover:shadow-xl group">
                                    <h3 className="text-2xl font-bold font-headline text-accent mb-6 flex items-center gap-3 group-hover:translate-x-1 transition-transform">
                                        <span className="p-2 bg-accent/10 rounded-lg">{serviceCategory.emoji}</span>
                                        {serviceCategory.category}
                                    </h3>
                                    <ul className="space-y-3">
                                        {serviceCategory.items.map((item) => (
                                            <li key={item} className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                                                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                <span className="text-sm">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="automation-services" className="mt-8 animate-in fade-in duration-500">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold font-headline text-primary">Automation & AI Hub (2026 Edition)</h2>
                            <p className="text-lg text-muted-foreground mt-2">Zero Overhead. Maximum Scalability.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                            {automationServiceCategories.map((category) => (
                                <Card key={category.name} className="bg-card/40 backdrop-blur-md border-primary/10 hover:border-accent/40 transition-all duration-300 rounded-2xl overflow-hidden">
                                    <CardHeader className="bg-primary/5 border-b border-primary/5">
                                        <CardTitle className="text-xl font-headline text-accent flex items-center gap-2">
                                            <span className="text-primary">⭐</span> {category.name}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-6">
                                        <div>
                                            <h4 className="font-bold mb-3 text-foreground/90 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Core Offerings:
                                            </h4>
                                            <ol className="space-y-2 text-sm text-muted-foreground">
                                                {category.services.map((service, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="text-primary/60 font-mono">{index + 1}.</span>
                                                        {service}
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                        <div className="pt-6 border-t border-primary/5">
                                            <h4 className="font-bold mb-3 text-foreground/90">Market Pricing:</h4>
                                            <div className="space-y-2">
                                                {category.pricing.map(p => (
                                                    <div key={p.tier} className="flex justify-between items-center bg-background/40 p-2 rounded-lg">
                                                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{p.tier}</span>
                                                        <span className="font-bold text-primary">{p.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-extrabold font-headline text-primary">Strategic Automation Bundles</h2>
                            <p className="text-lg text-muted-foreground mt-2">Engineered for Rapid ROI & Market Dominance</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {automationPackages.map((pkg) => (
                                <Card key={pkg.title} className={`bg-card/60 backdrop-blur-xl flex flex-col rounded-2xl transition-all duration-500 overflow-hidden ${pkg.isPopular ? 'border-2 border-accent shadow-2xl shadow-accent/20 scale-105 z-10' : 'border-primary/10 hover:border-primary/30'}`}>
                                    {pkg.isPopular && (
                                        <div className="bg-accent text-white text-[10px] font-bold uppercase tracking-widest text-center py-1.5">
                                            Most Recommended for Indore Businesses
                                        </div>
                                    )}
                                    <CardHeader className="p-8">
                                        <CardTitle className="text-2xl font-headline text-primary leading-tight">{pkg.title}</CardTitle>
                                        <div className="mt-4">
                                            <p className="text-4xl font-black text-accent">{pkg.price}</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-8 pt-0 flex-grow">
                                        <ul className="space-y-4">
                                            {pkg.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className="mt-1 bg-green-500/20 p-0.5 rounded-full">
                                                        <Check className="w-3.5 h-3.5 text-green-500" />
                                                    </div>
                                                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter className="p-8 bg-primary/5">
                                        <Button asChild className={`w-full py-6 rounded-xl font-bold transition-all duration-300 ${pkg.isPopular ? 'bg-accent hover:bg-accent/90 shadow-lg' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}`}>
                                            <Link href="/contact" className="flex items-center justify-center gap-2">
                                                Activate Growth <Check className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                <section className="mt-32 max-w-4xl mx-auto">
                    <AISearchInsights 
                        title="Digital Marketing & Automation ROI"
                        insights={[
                            { title: "Cost Efficiency", description: "AI-driven lead qualification reduces cost-per-lead by up to 40% in the current 2026 market landscape." },
                            { title: "Local Impact", description: "Hyper-local SEO in Indore is the primary driver for high-intent queries in real estate and specialized retail." },
                            { title: "Scalability", description: "Multi-channel automation (WhatsApp + Meta) ensures 24/7 engagement without scaling operational headcount." }
                        ]}
                        takeaways={[
                            "40% Lower CPL",
                            "Indore SEO Focus",
                            "24/7 AI Engagement"
                        ]}
                    />
                </section>
            </div>
        </>
    );
}
