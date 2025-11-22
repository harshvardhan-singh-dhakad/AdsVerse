
import { Check } from "lucide-react";
import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Digital Marketing & Automation Services | AdsVerse",
    description: "Explore the full range of digital marketing and automation services offered by AdsVerse, from SEO and SMM to custom AI Chatbots and Workflow Automation.",
    alternates: {
        canonical: '/our-services',
        languages: {
            'en': '/en/our-services',
            'hi': '/hi/our-services',
        },
    },
};

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

export default function OurServicesPage() {
    return (
        <div className="container mx-auto py-16 px-4">
            <header className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-headline text-primary">Our Services</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                    A complete range of digital solutions to empower your brand and drive growth.
                </p>
            </header>

            <Tabs defaultValue="digital-marketing" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="digital-marketing">Digital Marketing</TabsTrigger>
                    <TabsTrigger value="automation-services">Automation Services</TabsTrigger>
                </TabsList>
                <TabsContent value="digital-marketing" className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {digitalMarketingServices.map((serviceCategory) => (
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
                    </div>
                </TabsContent>
                <TabsContent value="automation-services" className="mt-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold font-headline text-primary">Automation Services (2025 Edition)</h2>
                        <p className="text-lg text-muted-foreground mt-2">Automate Everything. Grow Smarter.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {automationServiceCategories.map((category) => (
                            <Card key={category.name} className="bg-card/50 backdrop-blur-sm flex flex-col">
                                <CardHeader>
                                    <CardTitle className="text-xl font-headline text-accent">⭐ {category.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <h4 className="font-semibold mb-2">Services:</h4>
                                    <ul className="space-y-1 text-sm text-muted-foreground mb-4">
                                        {category.services.map(service => <li key={service}>{service}</li>)}
                                    </ul>
                                    <h4 className="font-semibold mb-2">Pricing:</h4>
                                     <div className="space-y-1 text-sm">
                                        {category.pricing.map(p => (
                                            <div key={p.tier} className="flex justify-between">
                                                <span className="text-muted-foreground">{p.tier}:</span>
                                                <span className="font-semibold text-primary">{p.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-headline text-primary">AdsVerse Automation Packages</h2>
                        <p className="text-lg text-muted-foreground mt-2">Agency-Level Bundles for Maximum Impact</p>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {automationPackages.map((pkg) => (
                        <Card key={pkg.title} className={`bg-card/70 backdrop-blur-md flex flex-col ${pkg.isPopular ? 'border-2 border-accent shadow-2xl shadow-accent/20' : 'border-border/40'}`}>
                          <CardHeader>
                            <CardTitle className="text-2xl font-headline text-primary">{pkg.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow space-y-4">
                            <p className="text-3xl font-bold text-accent">{pkg.price}</p>
                            <ul className="space-y-2 text-muted-foreground">
                              {pkg.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter>
                             <Button asChild className="w-full bg-accent hover:bg-accent/90">
                                <Link href="/contact">Get Started</Link>
                             </Button>
                          </CardFooter>
                        </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

