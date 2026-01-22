
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Share2, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Management Services | AdsVerse",
  description: "Build and nurture your online community with our expert social media management services. We handle content creation, daily engagement, and performance reporting.",
  alternates: {
    canonical: '/services/social-media-management',
    languages: {
      'en': '/en/services/social-media-management',
      'hi': '/hi/services/social-media-management',
    },
  },
};

const service = {
  id: 'social-media-management',
  icon: <Share2 className="w-12 h-12 text-accent" />,
  title: 'Social Media Management',
  description: [
     {
      heading: "Building and Nurturing Your Online Community",
      text: "Social media is more than just a marketing channel; it's a platform for building a community around your brand. Effective social media management involves creating and sharing engaging content, interacting with your followers, and fostering a loyal community that advocates for your business. It's your direct line to your customers, offering invaluable insights and the opportunity to build authentic relationships. In a world where consumers expect brands to be accessible and responsive, a strong social media presence is non-negotiable. It humanizes your brand, enhances customer loyalty, and drives traffic to your website. At AdsVerse, we manage your social media with a strategic approach, focusing on creating a vibrant and interactive community that supports your business goals. We go beyond just posting content; we create conversations and build connections."
    },
    {
      heading: "Our Approach to Social Media Success",
      text: "Our social media management process is comprehensive and tailored to your brand. We begin by developing a social media strategy that defines your target audience, key platforms (like Instagram, Facebook, LinkedIn, etc.), content pillars, and brand voice. We create a detailed monthly content calendar, planning out posts in advance to ensure a consistent and strategic presence. Our team creates all the content for you, from writing compelling captions to designing eye-catching graphics and videos that align with your brand identity. But our work doesn't stop at posting. We actively manage your community, responding to comments and messages promptly, engaging with your followers' content, and monitoring conversations about your brand. This active engagement is key to building a thriving community. We also run targeted social media advertising campaigns to expand your reach and achieve specific objectives, like generating leads or driving sales."
    },
    {
      heading: "A Complete Social Media Solution",
      text: "Our Social Media Management package is a full-service solution designed to grow your online presence and free up your time. Our standard package includes the complete management of two social media platforms. This covers strategy development, content calendar creation, daily posting, community management, and proactive engagement. We also provide a detailed monthly performance report that tracks key metrics like follower growth, engagement rate, reach, and website clicks. These reports offer clear insights into what's working and how our efforts are contributing to your overall business objectives. We stay on top of the latest trends and algorithm changes to ensure your strategy remains effective and ahead of the curve. With AdsVerse handling your social media, you can be confident that your brand is building a strong, engaged, and loyal community online."
    },
  ],
   pricing: {
    title: "Social Media Management",
    price: "₹14,999",
    frequency: "/mo",
    features: [
      "Management of 2 Platforms",
      "Monthly Content Calendar",
      "Daily Posting & Engagement",
      "Performance Reporting",
    ],
  },
  faq: {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which social media platforms do you manage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We manage all major social media platforms, including Facebook, Instagram, LinkedIn, Twitter (X), Pinterest, and TikTok. Our standard package includes management for two platforms, but we can create a custom package to cover any platforms that are relevant to your business."
        }
      },
      {
        "@type": "Question",
        "name": "Will you create the content for my social media?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our service is all-inclusive. We handle everything from strategy and content creation (graphics, videos, and copy) to scheduling, posting, and community management. We'll work with you to ensure all content aligns with your brand voice and goals."
        }
      },
      {
        "@type": "Question",
        "name": "How do you measure the success of social media campaigns?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We track a variety of key performance indicators (KPIs) depending on your goals. These include engagement rate (likes, comments, shares), follower growth, reach and impressions, website clicks, and conversions. We provide a detailed report each month to show you the direct impact of our efforts."
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
      "serviceType": "Social Media Management",
      "name": "Social Media Management Services | AdsVerse",
      "description": "Build and nurture your online community with our expert social media management services. We handle content creation, daily engagement, and performance reporting.",
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
          "name": "Social Media Management",
          "item": "https://adsverse.in/services/social-media-management"
        }
      ]
    },
    service.faq
  ]
};


export default function SocialMediaManagementPage() {
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
