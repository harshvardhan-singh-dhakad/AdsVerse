
import { PortfolioGrid } from "@/components/pages/portfolio-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio & Success Stories",
  description: "Explore the successful digital marketing projects and case studies delivered by AdsVerse for brands across India.",
  alternates: {
    canonical: 'https://adsverse.in/portfolio',
  },
  openGraph: {
    title: "Portfolio & Success Stories | AdsVerse",
    description: "Explore the successful digital marketing projects and case studies delivered by AdsVerse for brands across India.",
    url: "https://adsverse.in/portfolio",
    siteName: "AdsVerse",
    images: [
      {
        url: "https://adsverse.in/images/og-adsverse-2026.png",
        width: 1200,
        height: 630,
        alt: "AdsVerse Portfolio",
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Portfolio & Success Stories | AdsVerse",
    description: "Explore the successful digital marketing projects and case studies delivered by AdsVerse for brands across India.",
    images: ["https://adsverse.in/images/og-adsverse-2026.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Our Work & Client Case Studies | AdsVerse",
  "description": "We take pride in the results we drive. Explore some of our favorite projects and case studies showcasing our digital marketing expertise.",
  "url": "https://adsverse.in/portfolio",
   "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://adsverse.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Our Work",
        "item": "https://adsverse.in/portfolio"
      }
    ]
  }
};


export default function PortfolioPage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="container mx-auto py-16 px-4">
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-headline text-primary">Our Work</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-800 dark:text-muted-foreground">
          We take pride in the results we drive. Explore some of our favorite projects.
        </p>
      </section>
      
      <PortfolioGrid />

      <div className="border-t border-primary/10 my-20" />

      <section className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-foreground">Our Results-Driven <span className="text-primary">Approach</span></h2>
          <p className="max-w-2xl mx-auto text-slate-800 dark:text-muted-foreground">
            We don't believe in vanity metrics like likes or clicks. We focus on building high-performance digital systems that generate real inquiries, lower acquisition costs, and maximize revenue.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-4">
          <div className="bg-card/30 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold font-headline text-foreground">Data-Backed Paid Campaigns</h3>
            <p className="text-sm text-slate-800 dark:text-muted-foreground leading-relaxed">
              We design and manage Google Ads, Meta Ads (Facebook & Instagram), and local PPC campaigns that target actual conversions. By setting up deep conversion tracking and custom audiences, we optimize for qualified business leads and actual sales ROI rather than generic impressions.
            </p>
          </div>

          <div className="bg-card/30 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold font-headline text-foreground">Technical SEO & Content Strategy</h3>
            <p className="text-sm text-slate-800 dark:text-muted-foreground leading-relaxed">
              Search engine optimization is the foundation of sustainable business growth. We focus on clean code structure, mobile optimization, semantic keyword research, and high-quality local SEO schema configurations to ensure your website outranks competitors and commands search authority.
            </p>
          </div>

          <div className="bg-card/30 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold font-headline text-foreground">AI Workflows & CRM Automation</h3>
            <p className="text-sm text-slate-800 dark:text-muted-foreground leading-relaxed">
              Manual lead handling leads to delayed follow-ups and lost revenue. We eliminate operational friction by integrating n8n workflows, CRM databases (Zoho, HubSpot), and custom WhatsApp bots powered by Gemini API, ensuring 24/7 client response and automated lead nurturing.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
