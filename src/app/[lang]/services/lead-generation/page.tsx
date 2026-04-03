
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Target, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Generation Agency in Indore India — Get More Qualified Leads | AdsVerse",
  description: "Stop chasing cold leads. AdsVerse generates high-quality, ready-to-buy leads for your business using Google Ads, Meta Ads, SEO & WhatsApp automation — proven ROI for Indian businesses.",
  keywords: [
    "lead generation agency Indore", "lead generation services India",
    "B2B lead generation India", "real estate lead generation Indore",
    "digital lead generation agency India", "performance lead generation India",
    "qualified leads for business India", "online lead generation Indore",
    "lead generation for startups India", "inbound lead generation India"
  ],
  alternates: {
    canonical: 'https://adsverse.in/en/services/lead-generation',
    languages: {
      'en': 'https://adsverse.in/en/services/lead-generation',
      'hi': 'https://adsverse.in/hi/services/lead-generation',
    },
  },
};

const service = {
  title: 'Lead Generation Services',
  packages: [
    {
      title: "Starter",
      price: "₹15,000",
      frequency: "/mo",
      features: [
        "1 paid channel (Google or Meta)",
        "Landing page optimization",
        "Lead capture form setup",
        "Weekly performance report",
      ],
    },
    {
      title: "Growth",
      price: "₹30,000",
      frequency: "/mo",
      features: [
        "Google + Meta Ads combined",
        "WhatsApp automation follow-up",
        "A/B tested creatives",
        "CRM lead tracking",
        "Bi-weekly strategy calls",
      ],
    },
    {
      title: "Dominator",
      price: "Custom",
      frequency: "project-based",
      features: [
        "Full-funnel lead generation",
        "SEO + Paid Ads + Automation",
        "AI-powered lead scoring",
        "Dedicated account manager",
        "Custom analytics dashboard",
      ],
    },
  ],
  faq: {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does lead generation cost in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lead generation costs in India vary by industry and channel. AdsVerse's packages start at ₹15,000/month (management fee, excluding ad spend). The average cost per lead for Indian businesses ranges from ₹50 to ₹500 depending on the industry — real estate and education tend to be higher, while service businesses can achieve leads at ₹50-₹150."
        }
      },
      {
        "@type": "Question",
        "name": "How soon will I see results from lead generation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Paid ads (Google/Meta) start generating leads within 3-7 days of campaign launch. SEO-based lead generation takes 3-6 months for significant results. A combined strategy using both provides immediate leads while building long-term organic growth."
        }
      },
      {
        "@type": "Question",
        "name": "What industries do you generate leads for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AdsVerse generates leads across all major industries in India including real estate, education, healthcare, e-commerce, professional services, restaurants, coaching institutes, and B2B services. We customize every campaign strategy based on your specific industry and target audience."
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
      "serviceType": "Lead Generation",
      "name": "Lead Generation Agency Indore India",
      "description": "Stop chasing cold leads. AdsVerse generates high-quality, ready-to-buy leads using Google Ads, Meta Ads, SEO & WhatsApp automation.",
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
        { "@type": "ListItem", "position": 3, "name": "Lead Generation", "item": "https://adsverse.in/en/services/lead-generation" }
      ]
    },
    service.faq
  ]
};

export default function LeadGenerationPage() {
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
            <Target className="w-12 h-12 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">{service.title}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
            Stop guessing. Start growing. We deliver qualified leads that are ready to buy — not just raw traffic.
          </p>
        </CardHeader>
        <CardContent className="px-6 md:px-12 py-8 space-y-8">
          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-primary font-headline">What is Performance Lead Generation?</h2>
              <p className="text-muted-foreground">
                Performance lead generation is the process of attracting and capturing high-intent prospects using a data-driven combination of paid advertising, SEO, landing pages, and automation. Unlike brand awareness campaigns, every rupee of your budget is focused on one goal: generating a measurable lead. At AdsVerse, we specialize in building end-to-end lead generation funnels that capture, qualify, and nurture leads until they're ready to convert — all integrated with your WhatsApp, CRM, or sales team workflow.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-primary font-headline">Our Lead Generation Process</h2>
              <p className="text-muted-foreground">
                We start by understanding your ideal customer profile (ICP) and designing a customized funnel. We create high-converting landing pages, write compelling ad copy, and set up your campaigns on Google and Meta to capture active demand. Every lead is automatically captured into your CRM or WhatsApp, with an automated follow-up sequence to keep prospects engaged. We A/B test everything — from ad headlines to landing page layouts — to continuously reduce your cost per lead and increase quality. You get full transparency with weekly reports showing exactly how many leads were generated, their quality, and cost per acquisition.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-4xl font-bold text-center mb-12 font-headline">Lead Generation Packages</h2>
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
