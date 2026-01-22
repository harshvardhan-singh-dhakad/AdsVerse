
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Bot, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Business Automation Tools & Bots | AdsVerse",
  description: "Unlock peak efficiency with custom automation tools and bots from AdsVerse. Streamline your business processes, eliminate repetitive tasks, and boost productivity.",
  alternates: {
    canonical: '/services/automation-tools',
    languages: {
      'en': '/en/services/automation-tools',
      'hi': '/hi/services/automation-tools',
    },
  },
};

const service = {
  id: 'automation-tools',
  icon: <Bot className="w-12 h-12 text-accent" />,
  title: 'Custom Automation Tools',
  description: [
     {
      heading: "Unlock Peak Efficiency with Automation",
      text: "In today's fast-paced business environment, manual, repetitive tasks can consume valuable time and resources that could be better spent on growth and innovation. Our Custom Automation Tools service is designed to solve this problem by creating bespoke software bots and workflows that streamline your operations. From automating data entry and report generation to managing customer inquiries and social media interactions, our tools work tirelessly for you 24/7. This not only eliminates human error but also frees up your team to focus on high-value, strategic work. At AdsVerse, we believe automation is the key to scaling your business effectively and gaining a competitive edge."
    },
    {
      heading: "Our Process: From Concept to Deployment",
      text: "We build automation solutions that are perfectly tailored to your unique business needs. Our process begins with a deep-dive consultation to understand your current workflows, identify bottlenecks, and pinpoint the best opportunities for automation. We map out the entire process, designing a logical and efficient workflow for the tool. Our development team then gets to work, building a robust and reliable automation tool using modern technologies. We rigorously test the tool to ensure it functions flawlessly before deploying it into your live environment. We provide full training and documentation to ensure your team can use the new tool effectively and offer ongoing support to make adjustments as your business evolves."
    },
  ],
  packages: [
    {
      title: "Starter Bot",
      price: "₹12,000",
      frequency: "one-time",
      features: [
        "Automate one core task",
        "Basic workflow design",
        "Integration with 1 app (e.g., Sheets)",
        "Standard deployment & support",
      ],
    },
    {
      title: "Business Pro",
      price: "₹35,000",
      frequency: "one-time",
      features: [
        "Automate complex workflows",
        "AI Telecaller for Lead Gen",
        "Integrate up to 3 apps (e.g., CRM, Email)",
        "Priority support",
      ],
    },
    {
      title: "Enterprise Suite",
      price: "Custom",
      frequency: "project-based",
      features: [
        "End-to-end process automation",
        "Advanced AI Telecaller with Deal Closing",
        "Custom UI/dashboard",
        "Dedicated account manager",
      ],
    }
  ],
  faq: {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What kind of tasks can be automated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Almost any repetitive, rule-based digital task can be automated. This includes data entry, report generation, email marketing, social media posting, customer support responses, lead qualification, and much more. We'll work with you to identify the best opportunities for automation in your business."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to build a custom automation tool?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The timeline depends on the complexity of the workflow. A 'Starter Bot' for a single task can often be developed within 1-2 weeks. More complex 'Business Pro' or 'Enterprise' solutions may take 3-6 weeks or longer, depending on the number of integrations and the sophistication of the AI involved."
        }
      },
      {
        "@type": "Question",
        "name": "Will I need technical skills to use the automation tool?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. We design our automation tools to be user-friendly and integrate seamlessly into your existing workflow. For more complex solutions, we can build a custom, intuitive dashboard for you to manage the tool. We also provide full training and documentation to ensure your team is comfortable using it from day one."
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
      "serviceType": "Custom Automation Tools",
      "name": "Custom Business Automation Tools & Bots | AdsVerse",
      "description": "Unlock peak efficiency with custom automation tools and bots from AdsVerse. Streamline your business processes, eliminate repetitive tasks, and boost productivity.",
      "provider": {
        "@type": "Organization",
        "name": "AdsVerse"
      },
      "offers": service.packages.map(pkg => ({
        "@type": "Offer",
        "name": pkg.title,
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": pkg.price === 'Custom' ? "0" : pkg.price.replace(/[^0-9.]/g, ''),
          "priceCurrency": "INR",
          "valueAddedTaxIncluded": false
        }
      }))
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
          "name": "Custom Automation Tools",
          "item": "https://adsverse.in/services/automation-tools"
        }
      ]
    },
    service.faq
  ]
};


export default function AutomationToolsPage() {
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
          <div className="flex justify-center mb-6">{service.icon}</div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">{service.title}</h1>
        </CardHeader>
        <CardContent className="px-6 md:px-12 py-8 space-y-8">
          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90 space-y-6">
            {service.description.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-semibold text-primary font-headline">{section.heading}</h2>
                <p className="text-muted-foreground">{section.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <section>
        <h2 className="text-4xl font-bold text-center mb-12 font-headline">Our Automation Packages</h2>
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
    </div>
    </>
  );
}
