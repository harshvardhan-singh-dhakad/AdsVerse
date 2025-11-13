
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Palette, Megaphone, TrendingUp, FileText, Share2, Code, Bot } from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing Services for Business Growth | AdsVerse",
  description: "Explore our comprehensive suite of digital marketing services including Brand Strategy, SEO, Paid Ads, Content Marketing, and Web Development, all designed to elevate your brand.",
  alternates: {
    canonical: '/services',
    languages: {
      'en': '/services',
    },
  },
};

const services = [
  {
    id: 'automation-tools',
    icon: <Bot className="w-12 h-12 text-accent" />,
    title: 'Automation Tools',
    description: 'Streamlining your business processes with custom bots and automation solutions.',
  },
  {
    id: 'brand-strategy',
    icon: <Palette className="w-12 h-12 text-accent" />,
    title: 'Brand Strategy & Identity',
    description: "Crafting unique brand identities that resonate and stand out.",
  },
  {
    id: 'paid-ads',
    icon: <Megaphone className="w-12 h-12 text-accent" />,
    title: 'Meta & Google Ads',
    description: "Driving targeted traffic and maximizing ROI with strategic ad campaigns.",
  },
  {
    id: 'seo-optimization',
    icon: <TrendingUp className="w-12 h-12 text-accent" />,
    title: 'SEO Optimization',
    description: "Improving search rankings to increase organic visibility and attract leads.",
  },
  {
    id: 'content-marketing',
    icon: <FileText className="w-12 h-12 text-accent" />,
    title: 'Content Marketing',
    description: "Engaging your audience with valuable content that builds authority.",
  },
  {
    id: 'social-media-management',
    icon: <Share2 className="w-12 h-12 text-accent" />,
    title: 'Social Media Management',
    description: "Building and nurturing your online community to foster brand loyalty.",
  },
  {
    id: 'web-design-development',
    icon: <Code className="w-12 h-12 text-accent" />,
    title: 'Web Design & Development',
    description: "Creating beautiful, functional websites that convert visitors into customers.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Digital Marketing Services for Business Growth | AdsVerse",
  "description": "Explore our comprehensive suite of digital marketing services including Brand Strategy, SEO, Paid Ads, Content Marketing, and more, all designed to elevate your brand.",
  "url": "https://adsverse.in/services",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "url": `https://adsverse.in/services/${service.id}`
      }
    }))
  },
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
        "name": "Services",
        "item": "https://adsverse.in/services"
      }
    ]
  }
};


export default function ServicesPage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="container mx-auto py-16 px-4">
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-headline text-yellow-400">Our Services</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          A comprehensive suite of digital marketing solutions designed to elevate your brand and achieve your business goals.
        </p>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {services.map((service) => (
                <Card key={service.id} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col max-w-sm">
                    <CardHeader className="items-center text-center">
                        <div className="mb-4 text-accent">{service.icon}</div>
                        <CardTitle className="mt-4 text-center font-headline">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-center text-foreground/80">{service.description}</p>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Button asChild variant="link" className="p-0 text-accent">
                            <Link href={`/services/${service.id}`}>
                                Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </main>

      <section className="text-center mt-24">
        <h2 className="text-3xl font-bold mb-4 font-headline">Ready to See Everything We Offer?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our pricing page has a detailed list of all our services, from individual tasks to comprehensive packages. Find the perfect fit for your needs.
        </p>
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/30 transform hover:scale-105 transition-transform">
          <Link href="/pricing">Explore All Services</Link>
        </Button>
      </section>
    </div>
    </>
  );
}
