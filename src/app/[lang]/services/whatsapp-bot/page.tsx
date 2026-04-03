
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { MessageCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WhatsApp Bot for Lead Generation India — 24/7 AI Sales Bot | AdsVerse",
  description: "Automate your WhatsApp with AdsVerse's AI-powered sales bot. Capture leads, qualify prospects & close deals 24/7 — the #1 WhatsApp automation solution for Indian businesses in Indore.",
  keywords: [
    "WhatsApp bot for lead generation India", "WhatsApp automation agency India",
    "WhatsApp business bot Indore", "WhatsApp marketing bot India",
    "AI WhatsApp chatbot for business", "WhatsApp sales bot India",
    "automated WhatsApp replies India", "WhatsApp CRM integration India",
    "WhatsApp bot for small business India", "WhatsApp lead generation Indore"
  ],
  alternates: {
    canonical: 'https://adsverse.in/en/services/whatsapp-bot',
    languages: {
      'en': 'https://adsverse.in/en/services/whatsapp-bot',
      'hi': 'https://adsverse.in/hi/services/whatsapp-bot',
    },
  },
};

const service = {
  title: 'WhatsApp AI Sales Bot',
  packages: [
    {
      title: "Starter Bot",
      price: "₹8,000",
      frequency: "one-time setup",
      features: [
        "Automated greeting & FAQ replies",
        "Lead capture flow",
        "Basic keyword triggers",
        "WhatsApp Business API setup",
      ],
    },
    {
      title: "Pro Sales Bot",
      price: "₹20,000",
      frequency: "one-time setup",
      features: [
        "AI-powered conversation flows",
        "Lead qualification & scoring",
        "CRM / Google Sheets integration",
        "Appointment booking automation",
        "Monthly performance report",
      ],
    },
    {
      title: "Enterprise Suite",
      price: "Custom",
      frequency: "project-based",
      features: [
        "Full AI telecaller bot",
        "Multi-language support (EN + HI)",
        "Deep CRM & payment integration",
        "Custom analytics dashboard",
        "Priority 24/7 support",
      ],
    },
  ],
  faq: {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is WhatsApp automation legal in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, WhatsApp automation using the official WhatsApp Business API is completely legal in India. Businesses must use the official API (not unofficial tools) and follow WhatsApp's messaging policies. AdsVerse builds all bots using the official API to ensure compliance."
        }
      },
      {
        "@type": "Question",
        "name": "How does a WhatsApp bot generate leads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The WhatsApp bot captures leads by engaging visitors through Click-to-WhatsApp ads, website widgets, or QR codes. It then qualifies them with automated questions, collects contact info, and routes hot leads to your sales team — all 24/7 without manual effort."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to build and deploy a WhatsApp bot?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Starter Bot is typically live within 5-7 business days. A Pro Sales Bot with CRM integration takes 2-3 weeks. Enterprise solutions are scoped individually based on complexity."
        }
      }
    ]
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "serviceType": "WhatsApp Bot & Automation",
      "name": "WhatsApp AI Sales Bot — Lead Generation Automation",
      "description": "Automate your WhatsApp with AdsVerse's AI-powered 24/7 sales bot for Indian businesses.",
      "provider": { "@type": "Organization", "name": "AdsVerse" },
      "areaServed": { "@type": "Country", "name": "India" },
      "offers": service.packages.map(pkg => ({
        "@type": "Offer",
        "name": pkg.title,
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": pkg.price === 'Custom' ? "0" : pkg.price.replace(/[^0-9.]/g, ''),
          "priceCurrency": "INR",
        }
      }))
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adsverse.in/en" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://adsverse.in/en/our-services" },
        { "@type": "ListItem", "position": 3, "name": "WhatsApp Bot", "item": "https://adsverse.in/en/services/whatsapp-bot" }
      ]
    },
    service.faq
  ]
};

export default function WhatsAppBotPage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="container mx-auto py-16 px-4">
      <div className="mb-8">
        <Button asChild variant="link" className="p-0 text-muted-foreground hover:text-primary">
          <Link href="/our-services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm transition-all duration-300 mb-16">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <MessageCircle className="w-12 h-12 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">{service.title}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
            Let AI handle your WhatsApp inquiries 24/7 — qualify leads, book appointments, and close deals while you sleep.
          </p>
        </CardHeader>
        <CardContent className="px-6 md:px-12 py-8 space-y-8">
          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-primary font-headline">Why WhatsApp Automation is the #1 Lead Gen Tool in India</h2>
              <p className="text-muted-foreground">
                India has over 500 million WhatsApp users — making it the most powerful sales channel for Indian businesses. Yet most businesses still reply manually, losing leads after hours or during weekends. AdsVerse's AI-powered WhatsApp bot changes that. It automatically responds to inquiries, qualifies leads with smart questions, collects contact details, and even books appointments — all 24/7, in both English and Hindi.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-primary font-headline">Built for Indian Business Workflows</h2>
              <p className="text-muted-foreground">
                Unlike generic chatbot solutions, our WhatsApp bots are built specifically for Indian market dynamics. We support multilingual conversations (English + Hindi), integrate with local CRMs, and work with Click-to-WhatsApp ad campaigns on Meta. Our bots are built on the official WhatsApp Business API, ensuring 100% compliance and reliability. From real estate inquiries to restaurant bookings, education admissions to e-commerce support — we've built bots for every vertical.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-4xl font-bold text-center mb-12 font-headline">WhatsApp Bot Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {service.packages.map((pkg) => (
            <Card key={pkg.title} className="bg-card/50 backdrop-blur-sm flex flex-col">
              <CardHeader>
                <CardTitle className="text-accent text-2xl font-headline">{pkg.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-extrabold mb-4">{pkg.price} <span className="text-lg font-normal text-muted-foreground">{pkg.frequency}</span></p>
                <ul className="space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
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
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8 font-headline">Frequently Asked Questions</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {service.faq.mainEntity.map((item, i) => (
            <Card key={i} className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">{item.name}</h3>
                <p className="text-muted-foreground">{item.acceptedAnswer.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
