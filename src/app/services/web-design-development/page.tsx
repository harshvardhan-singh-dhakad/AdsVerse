import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Code, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { AISearchInsights } from "@/components/seo/AISearchInsights";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Web Design & Development Company Indore India | AdsVerse",
  description: "Get a high-performing, SEO-optimized website for your business from AdsVerse — Indore's top web design & development company. Custom websites built on Next.js for speed, design & conversions.",
  alternates: {
    canonical: 'https://adsverse.in/services/web-design-development',
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
  }
};

const expandedFaqs = [
  {
    question: "How long does it take to build a website?",
    answer: "A basic 5-page website typically takes 4-6 weeks from the start of the project to launch. The timeline can vary depending on the complexity of the design, the number of features, and the speed of feedback and content delivery from your side."
  },
  {
    question: "Can you build an e-commerce website?",
    answer: "Yes, we specialize in building custom e-commerce websites on platforms like Shopify and WooCommerce. We can create a secure, scalable, and user-friendly online store that is optimized for sales and conversions."
  },
  {
    question: "Will I be able to update the website myself?",
    answer: "Yes. All our websites are built on a Content Management System (CMS) that allows you to easily update content like text, images, and blog posts without any coding knowledge. We provide full training on how to use the CMS after we launch your site."
  },
  {
    question: "Why does AdsVerse use Next.js instead of just WordPress?",
    answer: "While WordPress is suitable for basic blogging, Next.js offers incredible loading speeds (sub-second Core Web Vitals), maximum customizability, superior security (no SQL injection vulnerabilities), and advanced search engine crawlers optimization. Speed is a massive ranking factor in 2026."
  },
  {
    question: "Is my website going to be mobile-friendly and SEO-optimized out of the box?",
    answer: "Yes, 100%! Every website we build is fully responsive (meaning it adapts beautifully to phones, tablets, and laptops) and follows standard technical SEO practices including clean semantic markup, page-speed optimizations, and automated schema graph generation."
  },
  {
    question: "Do you provide ongoing maintenance and domain hosting setup?",
    answer: "Yes, we handle domain configuration, lightning-fast hosting setup (using Vercel or Firebase Hosting), SSL installation, and offer annual maintenance packages covering code updates, regular backups, and minor content adjustments."
  }
];

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
        "name": "AdsVerse",
        "url": "https://adsverse.in"
      },
      "areaServed": {
        "@type": "City",
        "name": "Indore"
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
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adsverse.in" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://adsverse.in/our-services" },
        { "@type": "ListItem", "position": 3, "name": "Web Design & Development", "item": "https://adsverse.in/services/web-design-development" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": expandedFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ]
};

export default function WebDesignDevelopmentPage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="container mx-auto py-16 px-4 max-w-5xl">
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

      {/* ── EXPANDED CONTENT AREA ── */}
      <div className="mt-16 space-y-16">
        
        {/* Block 1: What is Web Design */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-primary font-headline">What is Premium Web Design & Development, and Why It Matters in 2026?</h2>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground space-y-4 max-w-none">
            <p>
              In 2026, a slow website is equivalent to a closed door. User attention span has shrunk to under 2 seconds. Search engines penalize slow websites, and AI search assistants only pull content from technical architectures they can easily and rapidly index. Having a fast, premium, Next.js based website is key to staying ahead.
            </p>
            <p>
              Our premium development service ensures your digital storefront has exceptional styling, lightning fast transitions, and optimized schema markup. By bridging UI/UX principles with search-engine readiness, we build a platform that turns casual visitors into paying customers.
            </p>
          </div>
        </section>

        {/* Block 2: Why AdsVerse Web Development Is Different */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Why AdsVerse Web Development Is Different</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Next.js Tech Stack", text: "We build websites using Next.js and Vercel hosting, guaranteeing sub-second load times and incredible performance scores." },
              { title: "Perfect Core Web Vitals", text: "We optimize Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP) to rank #1." },
              { title: "Conversion-Driven UI", text: "We design websites with clear call-to-actions, sticky headers, optimized checkout paths, and seamless lead captures." },
              { title: "Dynamic JSON-LD Injection", text: "Every page includes custom LocalBusiness, Product, or FAQ structured schemas to get highly visible rich snippets." },
              { title: "Built-In CMS Options", text: "Whether you prefer Sanity, headless WordPress, or local markdown, we give your team complete edit capabilities." },
              { title: "Secure & Vulnerability Free", text: "No old PHP plugins or outdated servers. We build modern headless architectures that are virtually unhackable." }
            ].map((item, i) => (
              <Card key={i} className="bg-card/30 border border-border/40 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Block 3: Our Process */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Our Web Development Process</h2>
          <div className="space-y-4">
            {[
              { step: "Step 1", title: "Discovery & Sitemaps", desc: "We align on target goals, map out page structure, and design detailed user flows to match buyer journeys." },
              { step: "Step 2", title: "Wireframes & Mockups", desc: "We design a high-fidelity visual mockups using premium dark styling, harmonious color variables, and Outfit/Inter fonts." },
              { step: "Step 3", title: "Frontend Engineering", desc: "Our Next.js developers code the screens, ensuring responsive design on mobile and incorporating modern, clean components." },
              { step: "Step 4", title: "Technical SEO Setup", desc: "We structure metadata blocks, clean up canonical elements, write robotic directives, and inject automated JSON-LD schemas." },
              { step: "Step 5", title: "Rigorous Device Testing", desc: "We test across real Android, iOS, Windows, and macOS devices to guarantee layout integrity and fast speed." },
              { step: "Step 6", title: "Handoff & Support", desc: "We configure domain records, deploy live, provide complete backend management training, and cover post-launch updates." }
            ].map((p, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border/30 bg-card/10">
                <div className="h-8 w-16 bg-accent/10 border border-accent/20 rounded flex items-center justify-center text-xs font-bold text-accent shrink-0">
                  {p.step}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-base mb-1">{p.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Block 4: Who Is This For? */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Who Is This For?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { type: "Startups & Modern Companies", desc: "Companies that need a state-of-the-art tech showcase with premium styling to wow investors and clients." },
              { type: "E-Commerce Brands", desc: "Brands shipping globally who require custom, fast-loading, and completely secure checkout solutions." },
              { type: "Local Service Providers", desc: "Clinics, CA firms, institutes, and agencies in Indore looking to stand out from typical basic templates." },
              { type: "SaaS Product Companies", desc: "Tech firms wanting high-converting landing pages, interactive product showcases, and CMS-backed blogs." }
            ].map((w, i) => (
              <div key={i} className="p-5 rounded-xl border border-border/30 bg-card/20">
                <h4 className="font-bold text-accent mb-2">{w.type}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Block 5: FAQ Accordion */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {expandedFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border/30 rounded-lg px-4 bg-card/20" role="region">
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

      </div>

      <AISearchInsights 
        title="Predictive Web Performance & AEO Strategy for 2026"
        takeaways={[
          "🚀 Under 1s Load Times",
          "📱 Mobile-First responsive UX",
          "🛡️ Headless Web Security",
          "📈 Conversion-Centered Funnels"
        ]}
        insights={[
          {
            title: "Dynamic Next.js SSR/SSG",
            description: "Pre-rendered static files with hydration for instant loading and maximum search crawlability."
          },
          {
            title: "JSON-LD Entity Structure",
            description: "Automated structure markup mapping so your business details feed directly into AI search databases."
          },
          {
            title: "Premium Local Styling",
            description: "High-contrast dark-mode styling with Outfit typography crafted specifically to engage modern readers."
          }
        ]}
      />
    </div>
    </>
  );
}
