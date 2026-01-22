
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Code, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Design & Development Services | AdsVerse",
  description: "Get a beautiful, functional, and high-performing website from AdsVerse. We create digital experiences that captivate users and convert visitors into customers.",
  alternates: {
    canonical: '/services/web-design-development',
    languages: {
      'en': '/en/services/web-design-development',
      'hi': '/hi/services/web-design-development',
    },
  },
};

const service = {
  id: 'web-design-development',
  icon: <Code className="w-12 h-12 text-accent" />,
  title: 'Web Design & Development',
  description: [
     {
      heading: "Your Digital Storefront, Perfected",
      text: "Your website is the center of your digital universe. It's often the first impression a potential customer has of your brand, and it serves as your 24/7 salesperson. A great website is more than just a pretty design; it's a powerful business tool that combines stunning aesthetics with seamless functionality and an exceptional user experience (UX). It must be intuitive to navigate, fast to load, and fully responsive, looking and working perfectly on any device, from a desktop computer to a smartphone. At AdsVerse, we design and develop websites that are not only beautiful but are also built for performance. We create digital experiences that captivate users, communicate your brand's value, and are optimized to convert visitors into customers. Your website is your most important digital asset, and we build it to be a strong foundation for all your marketing efforts."
    },
    {
      heading: "Our Design and Development Process",
      text: "We follow a structured and collaborative process to ensure your website project is a success. It begins with a discovery and planning phase, where we define the project scope, sitemap, user flows, and technical requirements. We work to understand your brand, audience, and business goals to ensure the final product is perfectly aligned with your vision. Next, our UI/UX designers create wireframes and mockups, focusing on creating an intuitive and user-friendly layout. Once the design is approved, we move into the development phase. Our developers use modern, clean code and the latest technologies (including platforms like Next.js for high performance) to bring the designs to life. We build websites that are secure, scalable, and optimized for search engines from the ground up. Throughout the process, we conduct rigorous testing across different browsers and devices to ensure a flawless experience for every user. Before launch, we provide training so you can easily manage and update your new website."
    },
    {
      heading: "What You Get With an AdsVerse Website",
      text: "Our Web Design & Development service delivers a professional, high-performing website that you can be proud of. Our basic 5-page website package is perfect for most small and medium-sized businesses. It includes a custom design, a fully responsive build, and on-page SEO optimization for all pages. We ensure the website is integrated with Google Analytics so you can track its performance from day one. The package also includes a content management system (CMS) that allows you to easily update text and images without any technical knowledge. For businesses looking to sell online, we also offer robust e-commerce solutions. An investment in a professional website from AdsVerse is an investment in a powerful engine for growth, designed to attract, engage, and convert your target audience effectively."
    },
  ],
  pricing: {
    title: "Basic Website",
    price: "₹30,000",
    frequency: "one-time",
    features: [
      "Up to 5 Custom-Designed Pages",
      "Responsive, Mobile-First Build",
      "Basic On-Page SEO Setup",
      "Content Management System (CMS)",
    ],
  },
  faq: {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does it take to build a website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A basic 5-page website typically takes 4-6 weeks from the start of the project to launch. The timeline can vary depending on the complexity of the design, the number of features, and the speed of feedback and content delivery from your side."
        }
      },
      {
        "@type": "Question",
        "name": "Can you build an e-commerce website?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we specialize in building custom e-commerce websites on platforms like Shopify and WooCommerce. We can create a secure, scalable, and user-friendly online store that is optimized for sales and conversions."
        }
      },
      {
        "@type": "Question",
        "name": "Will I be able to update the website myself?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. All our websites are built on a Content Management System (CMS) that allows you to easily update content like text, images, and blog posts without any coding knowledge. We provide full training on how to use the CMS after we launch your site."
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
      "serviceType": "Web Design & Development",
      "name": "Web Design & Development Services | AdsVerse",
      "description": "Get a beautiful, functional, and high-performing website from AdsVerse. We create digital experiences that captivate users and convert visitors into customers.",
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
          "name": "Web Design & Development",
          "item": "https://adsverse.in/services/web-design-development"
        }
      ]
    },
    service.faq
  ]
};


export default function WebDesignDevelopmentPage() {
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
