"use client";

import { useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, Search, Target, Megaphone, Mail, Users, PencilRuler, Code, LineChart, Bot } from "lucide-react";
import Link from "next/link";

const servicesData = [
  // SEO Services
  { category: "SEO", title: "Local SEO", description: "Dominate local search results. We optimize your Google Business Profile and build local citations to attract nearby customers actively searching for your services.", price: "₹8,000/mo", icon: <Search className="w-8 h-8 text-accent" /> },
  { category: "SEO", title: "E-commerce SEO", description: "Increase product visibility and sales. Our e-commerce SEO service focuses on product page optimization, technical SEO, and category-level keyword targeting.", price: "₹15,000/mo", icon: <Search className="w-8 h-8 text-accent" /> },
  { category: "SEO", title: "Technical SEO Audit", description: "Uncover hidden issues hurting your ranking. We perform a deep-dive analysis of your site's speed, crawlability, and indexing to build a strong foundation.", price: "₹10,000 one-time", icon: <Search className="w-8 h-8 text-accent" /> },
  { category: "SEO", title: "Keyword Research & Strategy", description: "Find the exact terms your customers are searching for. We deliver a data-backed keyword strategy to guide your content and SEO efforts effectively.", price: "₹5,000 one-time", icon: <Search className="w-8 h-8 text-accent" /> },
  { category: "SEO", title: "Link Building Campaign", description: "Build your website's authority and trust with high-quality backlinks. We execute targeted outreach to earn links that improve your domain authority.", price: "₹12,000/mo", icon: <Search className="w-8 h-8 text-accent" /> },
  // Paid Ads
  { category: "Paid Ads", title: "Google Ads Management", description: "Get immediate, high-intent traffic. We manage your Google Ads from keyword bidding to ad creation, focusing on maximizing your Return on Ad Spend (ROAS).", price: "₹10,000/mo", icon: <Target className="w-8 h-8 text-accent" /> },
  { category: "Paid Ads", title: "Meta Ads Management", description: "Reach your ideal customers on Facebook & Instagram. We create and manage targeted ad campaigns based on demographics, interests, and behavior.", price: "₹9,000/mo", icon: <Target className="w-8 h-8 text-accent" /> },
  { category: "Paid Ads", title: "LinkedIn Ads Campaign", description: "Connect with B2B decision-makers. Our LinkedIn campaigns are perfect for lead generation, targeting specific industries, job titles, and company sizes.", price: "₹12,000/mo", icon: <Target className="w-8 h-8 text-accent" /> },
  { category: "Paid Ads", title: "Google Ads Setup", description: "Start your campaigns on the right foot. We provide professional setup of your Google Ads account, including conversion tracking and initial campaign structure.", price: "₹3,500 one-time", icon: <Target className="w-8 h-8 text-accent" /> },
  { category: "Paid Ads", title: "Ad Copy & Creative Design", description: "Capture attention and drive clicks. Our team designs compelling ad visuals and writes persuasive copy that is optimized for conversions.", price: "₹7,000 per campaign", icon: <Target className="w-8 h-8 text-accent" /> },
  // Social Media
  { category: "Social Media", title: "Social Media Management", description: "Build a vibrant online community. We handle content creation, scheduling, and engagement across two of your chosen social media platforms.", price: "₹14,999/mo", icon: <Users className="w-8 h-8 text-accent" /> },
  { category: "Social Media", title: "Instagram Growth & Handling", description: "Accelerate your Instagram growth. This service focuses on strategic content, follower engagement, and proven methods to increase your audience.", price: "₹4,999/mo", icon: <Users className="w-8 h-8 text-accent" /> },
  { category: "Social Media", title: "Facebook Page Management", description: "Engage your audience on the world's largest social network. We provide professional content creation and community management for your Facebook page.", price: "₹4,999/mo", icon: <Users className="w-8 h-8 text-accent" /> },
  { category: "Social Media", title: "LinkedIn Profile Management", description: "Establish your professional authority. We optimize your LinkedIn profile and manage content to connect with industry leaders and potential clients.", price: "₹7,500/mo", icon: <Users className="w-8 h-8 text-accent" /> },
  { category: "Social Media", title: "Twitter (X) Content Strategy", description: "Craft a powerful voice on X. We develop a content strategy focused on timely, engaging tweets and conversations to build your brand's relevance.", price: "₹6,000/mo", icon: <Users className="w-8 h-8 text-accent" /> },
  // Content Marketing
  { category: "Content Marketing", title: "Blog Post Writing (4/month)", description: "Fuel your SEO with high-quality, SEO-optimized blog posts. Our team researches and writes four articles per month to attract and engage your audience.", price: "₹10,000/mo", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Content Marketing", title: "Content Strategy Development", description: "A strategic roadmap for content that converts. We define your content pillars, target audience, and editorial calendar to ensure consistent messaging.", price: "₹8,000 one-time", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Content Marketing", title: "Ebook/Whitepaper Creation", description: "Establish your brand as a thought leader. We create in-depth, professionally designed ebooks or whitepapers to generate leads and build authority.", price: "₹20,000 per project", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Content Marketing", title: "Video Script Writing", description: "Turn ideas into compelling video content. We write engaging and structured scripts for your marketing videos, from short-form reels to detailed explainers.", price: "₹5,000 per script", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Content Marketing", title: "Infographic Design", description: "Make complex information beautiful and shareable. Our team designs custom, on-brand infographics that are perfect for social media and link building.", price: "₹7,000 per infographic", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  // Branding & Design
  { category: "Branding & Design", title: "Logo & Brand Identity", description: "The complete visual foundation for your business. Our package includes logo design, color palette, typography, and a full brand style guide.", price: "₹25,000 one-time", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Branding & Design", title: "Social Media Graphics (15/mo)", description: "Keep your social media feeds looking fresh and professional. We design 15 custom, on-brand graphics for your social media channels each month.", price: "₹9,000/mo", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Branding & Design", title: "UI/UX Design for Apps", description: "Create an app that your users will love. We focus on intuitive, user-friendly, and beautiful interface design for mobile and web applications.", price: "₹50,000 per project", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Branding & Design", title: "Presentation Design", description: "Win over your audience with stunning presentations. We design professional and compelling slide decks for your meetings, pitches, and webinars.", price: "₹5,000 per deck", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Branding & Design", title: "Brochure/Flyer Design", description: "Professionally designed print materials that make an impact. We create print-ready brochures, flyers, and other marketing collateral for your business.", price: "₹4,000 per design", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  // Web & App Dev
  { category: "Web & App Dev", title: "Basic Website (5 pages)", description: "Launch your online presence with a professional, responsive website. This package is perfect for showcasing your business and generating leads.", price: "₹30,000 one-time", icon: <Code className="w-8 h-8 text-accent" /> },
  { category: "Web & App Dev", title: "E-commerce Website", description: "Sell your products online with a fully functional e-commerce store. We build secure, scalable, and user-friendly online shops.", price: "₹80,000 one-time", icon: <Code className="w-8 h-8 text-accent" /> },
  { category: "Web & App Dev", title: "Mobile App Development", description: "Bring your app idea to life. We offer custom mobile app development for both iOS and Android platforms, from concept to launch.", price: "From ₹1,50,000", icon: <Code className="w-8 h-8 text-accent" /> },
  { category: "Web & App Dev", title: "Website Maintenance", description: "Keep your website running smoothly. Our monthly maintenance package includes updates, security checks, and backups to ensure your site is secure.", price: "₹5,000/mo", icon: <Code className="w-8 h-8 text-accent" /> },
  { category: "Web & App Dev", title: "Landing Page Development", description: "Maximize your campaign conversions. We design and build high-converting landing pages that are optimized for a single, focused call-to-action.", price: "₹15,000 one-time", icon: <Code className="w-8 h-8 text-accent" /> },
  // Analytics
  { category: "Analytics", title: "GA4 Setup & Audit", description: "Ensure your data is accurate and actionable. We'll set up or audit your Google Analytics 4 property to ensure you're tracking what matters.", price: "₹7,500 one-time", icon: <LineChart className="w-8 h-8 text-accent" /> },
  { category: "Analytics", title: "Monthly Performance Report", description: "Understand your marketing ROI with detailed monthly reports. We compile and analyze data from all your channels into one easy-to-understand summary.", price: "₹5,000/mo", icon: <LineChart className="w-8 h-8 text-accent" /> },
  { category: "Analytics", title: "CRO Audit", description: "Turn more visitors into customers. Our Conversion Rate Optimization audit identifies friction points in your user journey and provides actionable recommendations.", price: "₹12,000 one-time", icon: <LineChart className="w-8 h-8 text-accent" /> },
  { category: "Analytics", title: "Custom Dashboard Setup", description: "Visualize your key metrics at a glance. We create a custom data dashboard (e.g., in Google Looker Studio) tailored to your business KPIs.", price: "₹10,000 one-time", icon: <LineChart className="w-8 h-8 text-accent" /> },
  // Political Campaigns
  { category: "Political Campaigns", title: "Campaign Strategy & Management", description: "Winning social media for political campaigns. We provide comprehensive strategy, content planning, and execution for election success.", price: "₹50,000/mo", icon: <Megaphone className="w-8 h-8 text-accent" /> },
  { category: "Political Campaigns", title: "Voter Targeting & Outreach", description: "Reach the right voters with precision. We use advanced audience targeting on social platforms to deliver your message to key demographics.", price: "₹25,000/mo", icon: <Users className="w-8 h-8 text-accent" /> },
  { category: "Political Campaigns", title: "Content & Ad Creation", description: "Crafting impactful political messaging. Our team develops creative posts, videos, and ads designed to persuade and mobilize voters.", price: "₹30,000/mo", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Political Campaigns", title: "Online Reputation Management", description: "Shape public perception and manage online discourse. We monitor online sentiment and manage your campaign's digital reputation.", price: "₹20,000/mo", icon: <Mail className="w-8 h-8 text-accent" /> },
];

const automationPackages = [
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
      isPopular: false,
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

const categories = ["All", "SEO", "Paid Ads", "Social Media", "Content Marketing", "Branding & Design", "Web & App Dev", "Analytics", "Political Campaigns"];

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

export default function PricingPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredServices = activeFilter === "All"
    ? servicesData
    : servicesData.filter(item => item.category === activeFilter);

  return (
    <div className="container mx-auto py-16 px-4">
      <section className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-headline">Our Services &amp; Pricing</h1>
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
          <h2 className="text-4xl font-bold font-headline">Video &amp; Photo Shoots</h2>
          <p className="text-lg text-muted-foreground mt-2">Professional shoots to elevate your brand's visual content.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="bg-card/70 backdrop-blur-md flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Reel/Shorts Package</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-3xl font-bold text-primary">₹999</p>
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
                <p className="text-3xl font-bold text-primary">₹5,000</p>
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
                <p className="text-3xl font-bold text-primary">₹15,000</p>
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
          <h2 className="text-4xl font-bold font-headline">Custom Automation Tools</h2>
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
  );
}
