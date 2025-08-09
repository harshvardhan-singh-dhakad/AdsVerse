
"use client";

import { useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Drone, Edit, Film, Search, Target, Megaphone, Mail, Users, PencilRuler, Code, LineChart, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const servicesData = [
  // SEO Services
  { category: "SEO", title: "Local SEO", description: "Optimize your online presence to attract more customers from local searches.", price: "₹8,000/mo", icon: <Search className="w-8 h-8 text-accent" /> },
  { category: "SEO", title: "E-commerce SEO", description: "Drive more sales with targeted SEO strategies for your online store.", price: "₹15,000/mo", icon: <Search className="w-8 h-8 text-accent" /> },
  { category: "SEO", title: "Technical SEO Audit", description: "A comprehensive analysis of your website's technical health.", price: "₹10,000 one-time", icon: <Search className="w-8 h-8 text-accent" /> },
  { category: "SEO", title: "Keyword Research & Strategy", description: "Identify the best keywords to target for your business.", price: "₹5,000 one-time", icon: <Search className="w-8 h-8 text-accent" /> },
  { category: "SEO", title: "Link Building Campaign", description: "Build high-quality backlinks to improve your domain authority.", price: "₹12,000/mo", icon: <Search className="w-8 h-8 text-accent" /> },
  // Paid Ads
  { category: "Paid Ads", title: "Google Ads Management", description: "Expert management of your Google Ads campaigns for maximum ROI.", price: "₹10,000/mo", icon: <Target className="w-8 h-8 text-accent" /> },
  { category: "Paid Ads", title: "Meta Ads Management", description: "Targeted advertising on Facebook and Instagram.", price: "₹9,000/mo", icon: <Target className="w-8 h-8 text-accent" /> },
  { category: "Paid Ads", title: "LinkedIn Ads Campaign", description: "Reach a professional audience with targeted LinkedIn ads.", price: "₹12,000/mo", icon: <Target className="w-8 h-8 text-accent" /> },
  { category: "Paid Ads", title: "Google Ads Setup", description: "Professional setup of your Google Ads account and campaigns.", price: "₹3,500 one-time", icon: <Target className="w-8 h-8 text-accent" /> },
  { category: "Paid Ads", title: "Ad Copy & Creative Design", description: "Compelling ad copy and visuals that convert.", price: "₹7,000 per campaign", icon: <Target className="w-8 h-8 text-accent" /> },
  // Social Media
  { category: "Social Media", title: "Social Media Management", description: "Complete management of two social media platforms.", price: "₹14,999/mo", icon: <Users className="w-8 h-8 text-accent" /> },
  { category: "Social Media", title: "Instagram Growth & Handling", description: "Grow your Instagram presence and engage your audience.", price: "₹4,999/mo", icon: <Users className="w-8 h-8 text-accent" /> },
  { category: "Social Media", title: "Facebook Page Management", description: "Professional management of your Facebook business page.", price: "₹4,999/mo", icon: <Users className="w-8 h-8 text-accent" /> },
  { category: "Social Media", title: "LinkedIn Profile Management", description: "Enhance your professional brand on LinkedIn.", price: "₹7,500/mo", icon: <Users className="w-8 h-8 text-accent" /> },
  { category: "Social Media", title: "Twitter (X) Content Strategy", description: "Strategic content planning for your X profile.", price: "₹6,000/mo", icon: <Users className="w-8 h-8 text-accent" /> },
  // Content Marketing
  { category: "Content Marketing", title: "Blog Post Writing (4/month)", description: "High-quality, SEO-friendly blog posts to drive traffic.", price: "₹10,000/mo", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Content Marketing", title: "Content Strategy Development", description: "A roadmap for your content marketing efforts.", price: "₹8,000 one-time", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Content Marketing", title: "Ebook/Whitepaper Creation", description: "In-depth content to establish you as a thought leader.", price: "₹20,000 per project", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Content Marketing", title: "Video Script Writing", description: "Engaging scripts for your marketing videos.", price: "₹5,000 per script", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Content Marketing", title: "Infographic Design", description: "Visually appealing infographics to share your data.", price: "₹7,000 per infographic", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  // Branding & Design
  { category: "Branding & Design", title: "Logo & Brand Identity", description: "A complete branding package for your business.", price: "₹25,000 one-time", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Branding & Design", title: "Social Media Graphics (15/mo)", description: "Custom graphics for your social media channels.", price: "₹9,000/mo", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Branding & Design", title: "UI/UX Design for Apps", description: "Intuitive and beautiful design for your mobile app.", price: "₹50,000 per project", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Branding & Design", title: "Presentation Design", description: "Professional slides for your meetings and presentations.", price: "₹5,000 per deck", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Branding & Design", title: "Brochure/Flyer Design", description: "Print-ready designs for your marketing materials.", price: "₹4,000 per design", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  // Web & App Dev
  { category: "Web & App Dev", title: "Basic Website (5 pages)", description: "A professional, responsive website for your business.", price: "₹30,000 one-time", icon: <Code className="w-8 h-8 text-accent" /> },
  { category: "Web & App Dev", title: "E-commerce Website", description: "A fully functional online store to sell your products.", price: "₹80,000 one-time", icon: <Code className="w-8 h-8 text-accent" /> },
  { category: "Web & App Dev", title: "Mobile App Development", description: "Custom mobile app for iOS and Android platforms.", price: "From ₹1,50,000", icon: <Code className="w-8 h-8 text-accent" /> },
  { category: "Web & App Dev", title: "Website Maintenance", description: "Keep your website secure and up-to-date.", price: "₹5,000/mo", icon: <Code className="w-8 h-8 text-accent" /> },
  { category: "Web & App Dev", title: "Landing Page Development", description: "High-converting landing pages for your campaigns.", price: "₹15,000 one-time", icon: <Code className="w-8 h-8 text-accent" /> },
  // Analytics
  { category: "Analytics", title: "GA4 Setup & Audit", description: "Ensure your Google Analytics 4 is set up for success.", price: "₹7,500 one-time", icon: <LineChart className="w-8 h-8 text-accent" /> },
  { category: "Analytics", title: "Monthly Performance Report", description: "Detailed reports on your marketing performance.", price: "₹5,000/mo", icon: <LineChart className="w-8 h-8 text-accent" /> },
  { category: "Analytics", title: "CRO Audit", description: "Identify opportunities to improve your conversion rates.", price: "₹12,000 one-time", icon: <LineChart className="w-8 h-8 text-accent" /> },
  { category: "Analytics", title: "Custom Dashboard Setup", description: "A custom dashboard to visualize your key metrics.", price: "₹10,000 one-time", icon: <LineChart className="w-8 h-8 text-accent" /> },
  // Political Campaigns
  { category: "Political Campaigns", title: "Campaign Strategy & Management", description: "Comprehensive social media strategy and management for political campaigns.", price: "₹50,000/mo", icon: <Megaphone className="w-8 h-8 text-accent" /> },
  { category: "Political Campaigns", title: "Voter Targeting & Outreach", description: "Advanced audience targeting to reach potential voters on social media.", price: "₹25,000/mo", icon: <Users className="w-8 h-8 text-accent" /> },
  { category: "Political Campaigns", title: "Content & Ad Creation", description: "Creative development of posts, videos, and ads for political messaging.", price: "₹30,000/mo", icon: <PencilRuler className="w-8 h-8 text-accent" /> },
  { category: "Political Campaigns", title: "Online Reputation Management", description: "Monitoring and managing online presence and public sentiment.", price: "₹20,000/mo", icon: <Mail className="w-8 h-8 text-accent" /> },
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
                {service.icon}
                <CardTitle className="mt-4 text-xl">{service.title}</CardTitle>
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
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Our Services &amp; Pricing</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Explore our wide range of digital marketing solutions with transparent pricing.
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
      
      <section className="py-16 px-8 rounded-xl bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Video &amp; Photo Shoots</h2>
          <p className="text-lg text-muted-foreground mt-2">Professional shoots to elevate your brand's visual content.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="bg-card/70 backdrop-blur-md flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">Reel/Shorts Package</CardTitle>
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
                 <Button className="w-full bg-accent hover:bg-accent/90">Book Shoot</Button>
              </CardFooter>
            </Card>
            <Card className="bg-card/70 backdrop-blur-md flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">Basic Package</CardTitle>
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
                 <Button className="w-full bg-accent hover:bg-accent/90">Book Shoot</Button>
              </CardFooter>
            </Card>
            <Card className="bg-card/70 backdrop-blur-md flex flex-col border-2 border-accent shadow-2xl shadow-accent/20">
              <CardHeader>
                 <CardTitle className="text-2xl">Premium Package</CardTitle>
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
                <Button className="w-full bg-accent hover:bg-accent/90">Book Shoot</Button>
              </CardFooter>
            </Card>
            <Card className="bg-card/70 backdrop-blur-md flex flex-col">
              <CardHeader>
                 <CardTitle className="text-2xl">Custom Package</CardTitle>
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
    </div>
  );
}

    