"use client";

import { useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, Search, Target, Megaphone, Mail, Users, PencilRuler, Code, LineChart, Bot, Palette, Film, TrendingUp, ShoppingCart, MessageSquare, Briefcase } from "lucide-react";
import Link from "next/link";
import Head from "next/head";

const servicesData = [
  // SEO Services
  { category: "SEO", title: "Local SEO", description: "Dominate local search to attract nearby customers.", price: "₹9,600/mo", icon: <Search className="w-8 h-8 text-accent" /> },
  { category: "SEO", title: "E-commerce SEO", description: "Increase product visibility and sales on your online store.", price: "₹18,000/mo", icon: <ShoppingCart className="w-8 h-8 text-accent" /> },
  { category: "SEO", title: "On-Page & Off-Page SEO", description: "A complete package for ranking higher on search engines.", price: "₹14,400/mo", icon: <TrendingUp className="w-8 h-8 text-accent" /> },
  { category: "SEO", title: "Technical SEO Audit", description: "Uncover hidden issues hurting your site's performance.", price: "₹12,000 one-time", icon: <Search className="w-8 h-8 text-accent" /> },
  { category: "SEO", title: "Keyword Research & Strategy", description: "A data-backed keyword strategy to guide your content.", price: "₹6,000 one-time", icon: <Search className="w-8 h-8 text-accent" /> },
  
  // Paid Ads
  { category: "Paid Ads", title: "Google Ads Management", description: "Get immediate, high-intent traffic and maximize your ROAS.", price: "₹12,000/mo", icon: <Target className="w-8 h-8 text-accent" /> },
  { category: "Paid Ads", title: "Meta Ads (Facebook & Instagram)", description: "Reach ideal customers on Facebook & Instagram.", price: "₹10,800/mo", icon: <Target className="w-8 h-8 text-accent" /> },
  { category: "Paid Ads", title: "LinkedIn Ads Campaign", description: "Connect with B2B decision-makers and generate leads.", price: "₹14,400/mo", icon: <Briefcase className="w-8 h-8 text-accent" /> },
  { category: "Paid Ads", title: "Ad Copy & Creative Design", description: "Compelling visuals and copy optimized for conversions.", price: "₹8,400 per campaign", icon: <PencilRuler className="w-8 h-8 text-accent" /> },

  // Social Media
  { category: "Social Media", title: "Social Media Management", description: "Content, scheduling, and engagement across 2 platforms.", price: "₹18,000/mo", icon: <Users className="w-8 h-8 text-accent" /> },
  { category: "Social Media", title: "Instagram Growth & Handling", description: "Strategic content and follower engagement to grow your audience.", price: "₹6,000/mo", icon: <Users className="w-8 h-8 text-accent" /> },
  { category: "Social Media", title: "Influencer Marketing", description: "Collaborate with influencers to expand your reach.", price: "From ₹15,000", icon: <Users className="w-8 h-8 text-accent" /> },

  // Content Creation & Marketing
  { category: "Content Marketing", title: "Blog Post Writing (4/month)", description: "Four high-quality, SEO-optimized blog posts per month.", price: "₹12,000/mo", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Content Marketing", title: "Reels / Shorts Creation", description: "Engaging short-form video content for social media.", price: "₹12,000/mo for 8 videos", icon: <Film className="w-8 h-8 text-accent" /> },
  { category: "Content Marketing", title: "Ebook/Whitepaper Creation", description: "In-depth content to generate leads and build authority.", price: "₹24,000 per project", icon: <PencilRuler className="w-8 h-8 text-accent" /> },

  // Branding & Design
  { category: "Branding & Design", title: "Logo & Brand Identity", description: "Complete visual foundation including logo, color palette, and style guide.", price: "₹30,000 one-time", icon: <Palette className="w-8 h-8 text-accent" /> },
  { category: "Branding & Design", title: "Social Media Graphics (15/mo)", description: "15 custom, on-brand graphics for your social channels.", price: "₹10,800/mo", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  
  // Website Development
  { category: "Web & App Dev", title: "Business Website (5 pages)", description: "A professional, responsive website to showcase your business.", price: "₹36,000 one-time", icon: <Code className="w-8 h-8 text-accent" /> },
  { category: "Web & App Dev", title: "E-commerce Website", description: "A fully functional online store to sell your products.", price: "₹96,000 one-time", icon: <ShoppingCart className="w-8 h-8 text-accent" /> },
  { category: "Web & App Dev", title: "Website Maintenance", description: "Monthly updates, security checks, and backups.", price: "₹6,000/mo", icon: <Code className="w-8 h-8 text-accent" /> },
  
  // Automation & AI
  { category: "Automation & AI", title: "WhatsApp & Chat Automation", description: "AI-powered chatbots for Instagram, WhatsApp, and Facebook.", price: "From ₹14,400", icon: <MessageSquare className="w-8 h-8 text-accent" /> },
  { category: "Automation & AI", title: "CRM & Lead Automation", description: "Streamline your sales funnel and lead management.", price: "From ₹24,000", icon: <Bot className="w-8 h-8 text-accent" /> },

  // Analytics & ORM
  { category: "Analytics & ORM", title: "GA4 Setup & Audit", description: "Ensure your data is accurate and actionable with Google Analytics 4.", price: "₹9,000 one-time", icon: <LineChart className="w-8 h-8 text-accent" /> },
  { category: "Analytics & ORM", title: "Online Reputation Management", description: "Manage reviews and shape your public perception.", price: "₹24,000/mo", icon: <Mail className="w-8 h-8 text-accent" /> },

  // Political Campaigns
  { category: "Political Campaigns", title: "Campaign Strategy & Management", description: "Comprehensive social media strategy for election success.", price: "₹60,000/mo", icon: <Megaphone className="w-8 h-8 text-accent" /> },
];

const automationPackages = [
    {
      title: "Starter Bot",
      price: "₹14,400",
      frequency: "one-time",
      features: [
        "Automate one core task",
        "Basic workflow design",
        "Integration with 1 app (e.g., Sheets)",
        "Standard deployment & support",
      ],
      isPopular: false,
    },
    {
      title: "Business Pro",
      price: "₹42,000",
      frequency: "one-time",
      features: [
        "Automate complex workflows",
        "AI Telecaller for Lead Gen",
        "Integrate up to 3 apps (e.g., CRM, Email)",
        "Priority support",
      ],
      isPopular: true,
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
      isPopular: false,
    }
  ];

const categories = ["All", "SEO", "Paid Ads", "Social Media", "Content Marketing", "Branding & Design", "Web & App Dev", "Analytics & ORM", "Automation & AI", "Political Campaigns"];

const ServiceCard = ({ service }: { service: typeof servicesData[0] }) => {
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        const rotateX = (y / height - 0.5) * -20;
        const rotateY = (x / width - 0.5) * 20;
        currentTarget.style.setProperty('--rotateX', `${rotateX}deg`);
        currentTarget.style.setProperty('--rotateY', `${rotateY}deg`);
    };

    const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.setProperty('--rotateX', '0deg');
        e.currentTarget.style.setProperty('--rotateY', '0deg');
    };

    return (
        <Card 
          className="bg-card/50 backdrop-blur-sm flex flex-col card-3d-effect border-primary/20 hover:border-primary/50"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
            <CardHeader className="items-center text-center">
                <div className="mb-4 text-accent">{service.icon}</div>
                <CardTitle className="mt-4 text-xl font-headline">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-center">
                <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
            <CardFooter className="flex-col gap-4">
                <p className="text-2xl font-bold text-accent">{service.price}</p>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/contact">Get Quote</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Digital Marketing Services & Pricing | AdsVerse",
  "description": "Transparent pricing for our comprehensive suite of digital marketing solutions, including SEO, Paid Ads, Web Development, and Automation.",
  "url": "https://adsverse.in/pricing",
  "mainEntity": {
     "@type": "ItemList",
     "itemListElement": servicesData.map((service, index) => ({
       "@type": "Offer",
       "itemOffered": {
         "@type": "Service",
         "name": service.title,
         "description": service.description,
         "provider": {
           "@type": "Organization",
           "name": "AdsVerse"
         }
       },
       "priceSpecification": {
         "@type": "PriceSpecification",
         "price": service.price.replace(/[^0-9.]/g, ''),
         "priceCurrency": "INR"
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
        "name": "Pricing",
        "item": "https://adsverse.in/pricing"
      }
    ]
  }
};


export default function PricingPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredServices = activeFilter === "All"
    ? servicesData
    : servicesData.filter(item => item.category === activeFilter);

  return (
    <>
    <Head>
      <title>Digital Marketing Services & Pricing | AdsVerse</title>
      <meta name="description" content="Transparent pricing for our comprehensive suite of digital marketing solutions, including SEO, Paid Ads, Web Development, and Automation." />
      <link rel="canonical" href="/pricing" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
    <div className="container mx-auto py-16 px-4">
      <section className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-headline text-primary">Our Services &amp; Pricing</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Transparent pricing for our comprehensive suite of digital marketing solutions. Find the perfect package to elevate your brand and achieve your goals.
        </p>
      </section>

      <section className="mb-12">
        <div className="flex justify-center flex-wrap gap-2">
          {categories.map(filter => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className="capitalize"
            >
              {filter}
            </Button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {filteredServices.map(service => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </section>
      
      <section className="py-16 px-8 rounded-xl bg-gradient-to-br from-primary/10 via-background to-accent/10 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-headline text-primary">Video &amp; Photo Shoots</h2>
          <p className="text-lg text-muted-foreground mt-2">Professional shoots to elevate your brand's visual content.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="bg-card/70 backdrop-blur-md flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Reel/Shorts Package</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-3xl font-bold text-primary">₹1,200</p>
                <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-accent"/>15-60 Second Video</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-accent"/>Pro Editing & Sound</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-accent"/>For Instagram & YouTube</li>
                </ul>
              </CardContent>
              <CardFooter>
                 <Button asChild className="w-full bg-accent hover:bg-accent/90">
                    <Link href="/contact">Book Shoot</Link>
                 </Button>
              </CardFooter>
            </Card>
            <Card className="bg-card/70 backdrop-blur-md flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Basic Package</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-3xl font-bold text-primary">₹6,000</p>
                <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-accent"/>1-Hour Photo Shoot</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-accent"/>Basic Editing</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-accent"/>20 High-Res Photos</li>
                </ul>
              </CardContent>
              <CardFooter>
                 <Button asChild className="w-full bg-accent hover:bg-accent/90">
                   <Link href="/contact">Book Shoot</Link>
                 </Button>
              </CardFooter>
            </Card>
            <Card className="bg-card/70 backdrop-blur-md flex flex-col border-2 border-accent shadow-2xl shadow-accent/20">
              <CardHeader>
                 <CardTitle className="text-2xl font-headline">Premium Package</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-3xl font-bold text-primary">₹18,000</p>
                <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-accent"/>4-Hour Video/Photo Shoot</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-accent"/>Professional Editing &amp; Color Grading</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-accent"/>Drone Footage Included</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-accent"/>1-Min Promo Video</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-accent hover:bg-accent/90">
                   <Link href="/contact">Book Shoot</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="bg-card/70 backdrop-blur-md flex flex-col">
              <CardHeader>
                 <CardTitle className="text-2xl font-headline">Custom Package</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-3xl font-bold text-primary">Let's Talk</p>
                <p className="text-muted-foreground">Tailored solutions for your unique project needs. From YouTube series to ad films.</p>
              </CardContent>
               <CardFooter>
                <Button asChild className="w-full bg-accent hover:bg-accent/90">
                  <Link href="/contact">Request Quote</Link>
                </Button>
              </CardFooter>
            </Card>
        </div>
      </section>

      <section className="py-16 px-8 rounded-xl bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-headline text-primary">Custom Automation Tools</h2>
          <p className="text-lg text-muted-foreground mt-2">Bespoke bots and tools to streamline your business processes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {automationPackages.map((pkg) => (
            <Card key={pkg.title} className={`bg-card/70 backdrop-blur-md flex flex-col ${pkg.isPopular ? 'border-2 border-accent shadow-2xl shadow-accent/20' : ''}`}>
              <CardHeader>
                <CardTitle className="text-2xl font-headline text-primary">{pkg.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-3xl font-bold text-accent">{pkg.price} <span className="text-lg font-normal text-muted-foreground">{pkg.frequency}</span></p>
                <ul className="space-y-2 text-muted-foreground">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
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

    