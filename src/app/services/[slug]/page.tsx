import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AISearchInsights } from "@/components/seo/AISearchInsights";
import { getServiceBySlug, getServiceSlug, DM_CATEGORIES, AI_CATEGORIES, getServicePrice } from "@/lib/services-data";
import { ArrowLeft, CheckCircle, Sparkles } from "lucide-react";

// Force static pre-rendering of all service slugs during build
export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  const allCategories = [...DM_CATEGORIES, ...AI_CATEGORIES];
  
  for (const cat of allCategories) {
    for (const service of cat.services) {
      // Only generate dynamic page if it doesn't point to a custom static directory/route
      if (!service.href) {
        params.push({ slug: getServiceSlug(service.name) });
      }
    }
  }
  
  return params;
}

interface PageProps {
  params: { slug: string };
}

// Generate dynamic SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const result = getServiceBySlug(params.slug);
  if (!result) return {};

  const { service, category } = result;
  const capitalizedCategory = category.label;

  return {
    title: `${service.name} | AdsVerse — ${capitalizedCategory} Agency Indore`,
    description: `${service.desc} Professional ${service.name} services by AdsVerse in Vijay Nagar, Indore. Custom packages, certified experts, and dynamic results.`,
    alternates: {
      canonical: `https://adsverse.in/services/${params.slug}`,
    },
  };
}

export default function DynamicServicePage({ params }: PageProps) {
  const result = getServiceBySlug(params.slug);
  
  if (!result) {
    notFound();
  }

  const { service, category } = result;
  const basePrice = getServicePrice(service.name);

  // Dynamic content block calculations
  const displayIcon = category.icon || "✨";
  const catColor = category.color || "#f97316";

  // Generate dynamic 3 packages
  const packages = [
    {
      title: "Starter Setup",
      price: `₹${(Math.round(basePrice * 0.75) || 4999).toLocaleString("en-IN")}`,
      frequency: "one-time",
      features: [
        "Initial configuration & setup",
        `Optimized for ${service.tags[0] || "core business metrics"}`,
        "Basic performance integration",
        "7 days post-deployment support",
        "Standard setup report",
      ],
    },
    {
      title: "Growth Pro",
      price: `₹${basePrice.toLocaleString("en-IN")}`,
      frequency: basePrice < 15000 ? "one-time" : "/mo",
      features: [
        "Full-scale professional implementation",
        `Targeting ${service.tags.slice(0, 2).join(" & ") || "brand visibility"}`,
        "Competitor analysis & benchmarking",
        "Ongoing reporting & dashboard",
        "30 days priority support",
        "Custom strategy roadmap",
      ],
      isPopular: true,
    },
    {
      title: "Enterprise Elite",
      price: "Custom",
      frequency: "project-based",
      features: [
        "Bespoke strategy blueprint",
        "Advanced custom API & n8n workflow integration",
        "Dedicated marketing consultant",
        "24/7 priority support & SLA options",
        "Real-time ROI Looker Studio dashboard",
        "Multi-channel coordination",
      ],
    },
  ];

  // Tailor descriptions
  const overviewText = service.fullDesc;
  const approachText = `At AdsVerse, our approach to ${service.name} is centered on driving measurable business outcomes. We begin by analyzing your existing digital assets, target audience, and competitors. From there, we design a customized implementation strategy. We combine high-quality creative work, data-driven optimization, and robust tracking systems to ensure you capture every potential lead and maximize your conversion rates.`;
  const essentialText = `In 2026, digital platforms are hyper-competitive. Standard templates and generic marketing campaigns no longer make an impact. Investing in specialized ${service.name} allows your business to command authority, outrank competitors, and capture high-intent buyers. AdsVerse builds advanced solutions using AI capabilities and custom integrations that keep your brand ahead of the curve.`;

  // Custom FAQ dataset
  const faqs = [
    {
      question: `What is the delivery timeline for ${service.name}?`,
      answer: `Standard setup and initial deployment for ${service.name} typically take between 2 to 3 weeks. Complex integrations or custom development projects may take 4 to 6 weeks, which includes extensive testing and quality assurance checks.`,
    },
    {
      question: `How does AdsVerse measure and track success for ${service.name}?`,
      answer: `We configure detailed tracking dashboards (e.g., Google Analytics 4, Meta Pixel, Looker Studio) to attribute every click and conversion back to its source. We focus on business metrics—such as lead volume, cost per lead (CPL), and return on ad spend (ROAS)—rather than just vanity metrics.`,
    },
    {
      question: `Can this service connect to our existing CRMs and business databases?`,
      answer: `Yes, absolutely. One of our core strengths is workflow automation. We can connect your ${service.name} funnel directly to CRMs like Zoho, HubSpot, Tally, or Google Sheets using custom API connections and n8n/Zapier integrations.`,
    },
    {
      question: `Why should we choose AdsVerse over other agencies in Indore?`,
      answer: `AdsVerse is an AI-first agency headquartered in Vijay Nagar, Indore. We do not outsource our work to freelancers. Our in-house team of certified specialists manages every aspect of your project with full transparency, performance guarantees, and detailed weekly updates.`,
    },
  ];

  // Dynamic JSON-LD for SEO Schema markup
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "serviceType": service.name,
        "name": `${service.name} Services | AdsVerse`,
        "description": service.desc,
        "provider": {
          "@type": "Organization",
          "name": "AdsVerse",
          "url": "https://adsverse.in",
        },
        "areaServed": {
          "@type": "City",
          "name": "Indore",
        },
        "offers": {
          "@type": "Offer",
          "name": "Growth Pro",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": basePrice,
            "priceCurrency": "INR",
            "valueAddedTaxIncluded": false,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adsverse.in" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://adsverse.in/our-services" },
          { "@type": "ListItem", "position": 3, "name": service.name, "item": `https://adsverse.in/services/${params.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto py-16 px-4 max-w-5xl">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="link" className="p-0 text-muted-foreground hover:text-primary">
            <Link href="/our-services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
          </Button>
        </div>

        {/* Hero Card */}
        <Card className="bg-card/50 backdrop-blur-sm transition-all duration-300 mb-16 border-border/80">
          <CardHeader className="text-center pb-4">
            <div 
              className="flex justify-center items-center w-20 h-20 rounded-2xl mx-auto mb-6 text-4xl shadow-lg"
              style={{
                background: `rgba(${parseInt(catColor.slice(1, 3), 16)}, ${parseInt(catColor.slice(3, 5), 16)}, ${parseInt(catColor.slice(5, 7), 16)}, 0.1)`,
                border: `1.5px solid ${catColor}33`
              }}
            >
              {displayIcon}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">
              {service.name}
            </h1>
            <p className="text-muted-foreground text-sm uppercase font-bold tracking-wider mt-2" style={{ color: catColor }}>
              {category.label}
            </p>
          </CardHeader>
          <CardContent className="px-6 md:px-12 py-8 space-y-8">
            <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90 space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-primary font-headline mb-3">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{overviewText}</p>
              </div>
              
              <div className="border-t border-border/40 pt-8">
                <h2 className="text-2xl font-semibold text-primary font-headline mb-3">Our Approach</h2>
                <p className="text-muted-foreground leading-relaxed">{approachText}</p>
              </div>

              <div className="border-t border-border/40 pt-8">
                <h2 className="text-2xl font-semibold text-primary font-headline mb-3">Why It Matters</h2>
                <p className="text-muted-foreground leading-relaxed">{essentialText}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing/Packages Grid */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">
            Our Custom Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => (
              <Card 
                key={pkg.title} 
                className={`bg-card/50 backdrop-blur-sm flex flex-col transition-all duration-300 ${
                  pkg.isPopular ? "border-accent/60 shadow-lg shadow-accent/5 ring-1 ring-accent/30 -translate-y-1" : "border-border/60"
                }`}
              >
                <CardHeader className="relative">
                  {pkg.isPopular && (
                    <span className="absolute -top-3 right-4 bg-accent text-accent-foreground text-[10px] uppercase tracking-widest font-black py-1 px-3 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <CardTitle className={`text-2xl font-headline ${pkg.isPopular ? "text-accent" : "text-foreground"}`}>
                    {pkg.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-4xl font-extrabold mb-6">
                    {pkg.price}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      {pkg.frequency}
                    </span>
                  </p>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                        <span className="text-muted-foreground text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button 
                    asChild 
                    className={`w-full font-bold ${
                      pkg.isPopular ? "bg-accent hover:bg-accent/90" : "bg-primary hover:bg-primary/90"
                    }`}
                  >
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us Grid */}
        <section className="mb-16 space-y-6">
          <h2 className="text-3xl font-bold text-center font-headline">Why AdsVerse is Different</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Expert In-House Implementation",
                text: "We execute everything in-house with certified specialists. No white-labeling or sub-contracting your project."
              },
              {
                title: "India-Centric CRM Automations",
                text: "We specialize in connecting your lead sources directly to regional business systems (Zoho, Google Sheets, WhatsApp Business API)."
              },
              {
                title: "Detailed Attribution & Reports",
                text: "We build custom Looker Studio dashboards so you can view every conversion, spend, and ROAS channel metrics."
              },
              {
                title: "AI-Native Operations",
                text: "We combine traditional marketing with AI citation and AEO/GEO practices to make your brand visible in generative AI engine searches."
              }
            ].map((item, i) => (
              <Card key={i} className="bg-card/30 border border-border/40 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent shrink-0" />
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQs Accordion */}
        <section className="mb-16 space-y-6">
          <h2 className="text-3xl font-bold text-center font-headline">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem 
                key={i} 
                value={`faq-${i}`} 
                className="border border-border/30 rounded-lg px-4 bg-card/20"
                role="region"
              >
                <AccordionTrigger className="text-base text-left hover:no-underline font-headline font-semibold text-foreground py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* AI & Search Insights */}
        <AISearchInsights 
          title={`GEO & AI Search Strategy for ${service.name}`}
          takeaways={[
            "🚀 High-Intent Lead Targeting",
            "🛡️ 100% In-House Transparency",
            "📈 Conversions Attributed CRM Sync",
            "📍 Indore's Trusted Marketing Partner"
          ]}
          insights={[
            {
              title: "Generative Search Visibility",
              description: `We build clean schema tag markups and crawl-ready content mapping so that AI engines (Gemini, ChatGPT) cite your business for ${service.name} searches.`
            },
            {
              title: "Attribution Setup",
              description: "Never guess where your calls come from. Every inquiry is tracked and logged automatically into your reporting system."
            },
            {
              title: "Indore Local Optimization",
              description: "Tailored to reach local Tier-2 buyers in Indore and Madhya Pradesh through localized search phrases."
            }
          ]}
        />
      </div>
    </>
  );
}
