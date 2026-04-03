
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Megaphone, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meta & Google Ads Management Agency India | AdsVerse",
  description: "Maximize ROI with expert Meta (Facebook/Instagram) & Google Ads management from AdsVerse. We run data-driven paid ad campaigns for Indian businesses — driving leads, sales & measurable results.",
  keywords: [
    "Google Ads management India", "Meta ads agency India", "Facebook ads agency Indore",
    "paid advertising services India", "performance marketing agency Indore",
    "Google Ads consultant India", "Instagram ads India", "PPC agency India",
    "ROI focused ads India", "paid ads management Indore"
  ],
  alternates: {
    canonical: 'https://adsverse.in/en/services/paid-ads',
    languages: {
      'en': 'https://adsverse.in/en/services/paid-ads',
      'hi': 'https://adsverse.in/hi/services/paid-ads',
    },
  },
};

const service = {
  id: 'paid-ads',
  icon: <Megaphone className="w-12 h-12 text-accent" />,
  title: 'Meta & Google Ads',
  description: [
    {
      heading: "Harnessing the Power of Paid Advertising",
      text: "In today's crowded digital marketplace, paid advertising on platforms like Meta (Facebook & Instagram) and Google is the fastest way to connect with your target audience. While organic growth is essential, paid ads provide immediate visibility, laser-targeted reach, and measurable results. Google Ads captures customers at their moment of intent—when they are actively searching for your products or services. Meta Ads allows you to build awareness and generate demand by reaching people based on their interests, demographics, and online behavior. A successful digital strategy leverages the unique strengths of both. At AdsVerse, we specialize in creating data-driven ad campaigns that are not just about clicks and impressions; they're about driving meaningful business outcomes. We transform your advertising spend from an expense into a strategic investment that delivers a significant return (ROI)."
    },
    {
      heading: "Our Strategic Approach to Ad Management",
      text: "Our process is built on a foundation of strategy, precision, and continuous optimization. We start by developing a deep understanding of your business objectives and target audience. For Google Ads, this involves extensive keyword research to identify high-intent search terms. For Meta Ads, we create detailed audience personas to build highly targeted custom and lookalike audiences. The next phase is creating compelling ad creative and copy that stops the scroll and inspires action. We A/B test different headlines, images, videos, and calls-to-action to identify what resonates most with your audience. A crucial, often-overlooked element is the landing page. We ensure your landing pages are fully optimized for conversions, providing a seamless experience from ad click to conversion. Campaign launch is just the beginning. We continuously monitor performance, analyzing key metrics like click-through rate (CTR), cost per acquisition (CPA), and return on ad spend (ROAS). This data allows us to make real-time adjustments, reallocating budget to top-performing ads and refining our targeting for maximum efficiency."
    },
    {
      heading: "Maximizing Your Return on Investment",
      text: "Our Meta & Google Ads management service is a comprehensive solution designed to maximize your ROI. We handle every aspect of your campaigns, from initial strategy and setup to ongoing management and detailed reporting. Our package includes audience research, keyword strategy, ad copywriting and design, landing page recommendations, and conversion tracking setup (like the Meta Pixel and Google conversion tags). You receive regular, transparent performance reports that clearly explain what we're doing, why we're doing it, and the results we're achieving. We demystify the complexity of paid advertising, providing you with clear insights and a direct line of sight to your campaign's performance. By partnering with AdsVerse, you're not just buying ads; you're investing in a strategic growth engine. We focus relentlessly on the metrics that matter most to your bottom line, ensuring every rupee of your ad budget works as hard as possible to grow your business."
    },
  ],
  pricing: {
    title: "Ads Management",
    price: "From ₹9,000",
    frequency: "/mo + ad spend",
    features: [
      "Google & Meta Campaign Setup",
      "Audience & Keyword Targeting",
      "Ongoing Optimization & A/B Testing",
      "Monthly Performance Reports",
    ],
  },
  faq: {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much should I spend on ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your ad spend depends on your industry, goals, and the competitiveness of your target keywords or audience. We recommend starting with a budget you're comfortable with for testing. As we gather data and optimize campaigns, we can provide a data-driven recommendation for scaling your ad spend to maximize ROI."
        }
      },
      {
        "@type": "Question",
        "name": "How soon will I see results from paid ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can start seeing traffic and impressions almost immediately after a campaign is launched. However, achieving optimal performance and a positive ROI typically takes 1-3 months. This initial period is crucial for data collection, A/B testing, and campaign refinement."
        }
      },
      {
        "@type": "Question",
        "name": "Do you manage ads on other platforms besides Google and Meta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While our primary expertise is with Google and Meta (Facebook/Instagram), we also have experience running campaigns on other platforms like LinkedIn, Twitter (X), and Pinterest. Please contact us to discuss your specific needs for other platforms."
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
      "serviceType": "Paid Advertising",
      "name": "Meta & Google Ads Management Services | AdsVerse",
      "description": "Drive targeted traffic and maximize ROI with strategic ad campaigns on Meta (Facebook & Instagram) and Google.",
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
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adsverse.in/en" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://adsverse.in/en/our-services" },
        { "@type": "ListItem", "position": 3, "name": "Meta & Google Ads", "item": "https://adsverse.in/en/services/paid-ads" }
      ]
    },
    service.faq
  ]
};


export default function PaidAdsPage() {
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
