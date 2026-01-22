
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Palette, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Strategy & Identity Design Services | AdsVerse",
  description: "Craft a unique brand identity that resonates with your audience. Our brand strategy services include discovery workshops, logo design, and comprehensive brand guidelines.",
  alternates: {
    canonical: '/services/brand-strategy',
    languages: {
      'en': '/services/brand-strategy',
    },
  },
};

const service = {
  id: 'brand-strategy',
  icon: <Palette className="w-12 h-12 text-accent" />,
  title: 'Brand Strategy & Identity',
  description: [
    {
      heading: "What is Brand Strategy & Identity?",
      text: "Brand Strategy and Identity is the soul of your business. It's not just a logo or a color palette; it's the entire experience and perception your audience has of your company. A strong brand strategy defines what you stand for, the promise you make to your customers, and the personality you convey. It's the blueprint that guides your marketing, your customer service, and your business decisions. A compelling brand identity visually expresses this strategy through logos, typography, colors, and imagery, creating a consistent and memorable presence across all platforms. At AdsVerse, we believe a great brand is built on a foundation of purpose and authenticity. It's about telling a compelling story that resonates deeply with your target audience, turning them from one-time buyers into loyal advocates. We dive deep to uncover your unique value proposition and translate it into a powerful identity that captures attention and builds lasting trust."
    },
    {
      heading: "Our Process: From Discovery to Delivery",
      text: "Our approach to brand strategy is meticulous and collaborative. We begin with a comprehensive discovery phase, immersing ourselves in your world. We conduct in-depth market research, analyze your competitors, and hold stakeholder interviews to understand your business goals, values, and vision. We identify your target audience, creating detailed personas to ensure every element of your brand speaks directly to them. From this research, we distill your core messaging, defining your mission, vision, and unique brand voice. The next step is bringing this strategy to life through design. Our creative team develops a full brand identity suite, starting with a memorable logo and expanding to a complete visual system. This includes selecting a color palette that evokes the right emotions, choosing typography that reflects your personality, and establishing guidelines for imagery and graphic elements. We present you with a comprehensive brand guidelines document, a vital tool that ensures consistency and cohesion as your business grows and evolves across different channels."
    },
    {
      heading: "What's Included and Why It Matters",
      text: "When you partner with AdsVerse for Brand Strategy & Identity, you receive a complete toolkit for success. This isn't just about deliverables; it's about empowering your business with a clear and powerful identity. Our package includes a deep-dive strategy workshop, competitor analysis, and audience profiling. The creative deliverables include multiple logo concepts with revisions, a full brand identity guide (covering logo usage, color palette, typography, and voice), and templates for key marketing materials like business cards and social media profiles. Investing in a professional brand strategy is one of the most crucial decisions a business can make. It differentiates you from the competition, builds credibility and trust, and creates an emotional connection with your customers. A well-defined brand guides your internal team, ensuring everyone is aligned and working towards the same goals. It makes your marketing more effective and your business more valuable in the long run. Let us help you build a brand that not only looks good but also drives tangible results."
    },
  ],
  pricing: {
    title: "Brand Identity Package",
    price: "₹25,000",
    frequency: "one-time",
    features: [
      "In-depth Discovery Workshop",
      "Full Brand Strategy Document",
      "Logo & Visual Identity Design",
      "Comprehensive Brand Guidelines",
    ],
  },
  faq: {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is brand strategy different from just a logo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A logo is a single visual mark, while brand strategy is the entire plan for how your business is perceived. The strategy informs the logo design, your messaging, customer service, and every other touchpoint. A good logo without a strategy is just a picture; a good logo with a strategy becomes a powerful symbol for your business values."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the branding process take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our comprehensive Brand Strategy & Identity package typically takes 3-4 weeks from the initial discovery workshop to the delivery of the final brand guidelines. This allows for thorough research, creative exploration, and collaborative feedback to ensure we get it right."
        }
      },
      {
        "@type": "Question",
        "name": "Can you redesign my existing brand?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We can work with you to refresh your existing brand or undertake a complete rebrand. We'll analyze what's working with your current brand and what isn't, and develop a strategy to evolve your identity to better connect with your audience and meet your current business goals."
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
      "serviceType": "Brand Strategy & Identity",
      "name": "Brand Strategy & Identity Design Services | AdsVerse",
      "description": "Craft a unique brand identity that resonates with your audience. Our brand strategy services include discovery workshops, logo design, and comprehensive brand guidelines.",
      "provider": {
        "@type": "Organization",
        "name": "AdsVerse"
      },
      "offers": {
        "@type": "Offer",
        "name": service.pricing.title,
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": service.pricing.price.replace(/[^0-9.]/g, ''),
          "priceCurrency": "INR",
          "valueAddedTaxIncluded": false
        }
      }
    },
    {
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
          "item": "https://adsverse.in/our-services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Brand Strategy & Identity",
          "item": "https://adsverse.in/services/brand-strategy"
        }
      ]
    },
    service.faq
  ]
};

export default function BrandStrategyPage() {
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

        <Card className="bg-card/50 backdrop-blur-sm transition-all duration-300">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-6">{service.icon}</div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">{service.title}</h1>
            </CardHeader>
            <CardContent className="px-6 md:px-12 py-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-6">
                        {service.description.slice(0, 2).map((section, index) => (
                            <div key={index}>
                                <h2 className="text-2xl font-semibold text-primary font-headline">{section.heading}</h2>
                                <p className="text-muted-foreground">{section.text}</p>
                            </div>
                        ))}
                    </div>
                    <Card className="bg-background/50 sticky top-24">
                        <CardHeader>
                        <CardTitle className="text-accent text-2xl font-headline">{service.pricing.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p className="text-4xl font-extrabold mb-4">{service.pricing.price} <span className="text-lg font-normal text-muted-foreground">{service.pricing.frequency}</span></p>
                        <ul className="space-y-3">
                            {service.pricing.features.map((feature, i) => (
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
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-6 pt-8 border-t border-border">
                    {service.description.slice(2).map((section, index) => (
                        <div key={index}>
                            <h2 className="text-2xl font-semibold text-primary font-headline">{section.heading}</h2>
                            <p className="text-muted-foreground">{section.text}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
    </>
  );
}
