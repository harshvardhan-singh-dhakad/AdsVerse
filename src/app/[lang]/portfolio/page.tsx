
import { PortfolioGrid } from "@/components/pages/portfolio-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Digital Marketing Portfolio & Success Stories | AdsVerse",
  description: "We take pride in the results we drive. Explore some of our favorite projects and case studies showcasing our digital marketing expertise in SEO, web design, and branding.",
  alternates: {
    canonical: '/en/portfolio',
    languages: {
      'en': '/en/portfolio',
      'hi': '/hi/portfolio',
    },
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
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          We take pride in the results we drive. Explore some of our favorite projects.
        </p>
      </section>
      
      <PortfolioGrid />
    </div>
    </>
  );
}
