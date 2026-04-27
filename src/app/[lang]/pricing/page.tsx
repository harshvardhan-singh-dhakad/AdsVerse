
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  CheckCircle, 
  ArrowRight, 
  Zap, 
  Star, 
  ShieldCheck, 
  Clock, 
  Target, 
  MessageSquare,
  Sparkles,
  Play,
  Camera,
  Bot
} from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

/* ─────────────────────────────────────────────
   COMPLETE PRICING DATA — Nothing Left Out
───────────────────────────────────────────── */
const SERVICE_CATS = [
  {
    id: "seo",
    label: "SEO",
    icon: "🔍",
    color: "#22c55e",
    desc: "Long-term organic growth — rank on Google and stay there.",
    services: [
      { icon: "📍", name: "Local SEO", desc: "Google Business Profile, local citations & 'near me' rankings for Indore businesses.", price: "₹9,600", period: "/mo", popular: false },
      { icon: "🛍️", name: "E-Commerce SEO", desc: "Product page optimization, category SEO & shopping feed setup.", price: "₹18,000", period: "/mo", popular: true },
      { icon: "📝", name: "On-Page & Off-Page SEO", desc: "Complete SEO package — meta, backlinks & content optimization.", price: "₹14,500", period: "/mo", popular: false },
      { icon: "🏢", name: "Enterprise SEO", desc: "For large-scale websites, technical SEO & data-driven growth.", price: "Custom", period: "", popular: false }
    ]
  },
  {
    id: "smm",
    label: "SMM",
    icon: "📱",
    color: "#e91e8c",
    desc: "Social media management and engagement across all platforms.",
    services: [
      { icon: "👥", name: "Personal Brand Management", desc: "Brand voice, daily posting & LinkedIn/IG growth.", price: "₹12,000", period: "/mo", popular: false },
      { icon: "🏢", name: "Business Socials", desc: "Complete management for Facebook, IG & GMB.", price: "₹18,500", period: "/mo", popular: true },
      { icon: "📈", name: "SMM + Engagement", desc: "Posts + story interaction + DM management.", price: "₹24,000", period: "/mo", popular: false },
      { icon: "🧵", name: "Thread/X Management", desc: "Strategic thread writing & community engagement.", price: "₹10,500", period: "/mo", popular: false }
    ]
  },
  {
    id: "ads",
    label: "Ads & PPC",
    icon: "🚀",
    color: "#f59e0b",
    desc: "Immediate ROI with highly targeted paid advertising campaigns.",
    services: [
      { icon: "🔵", name: "Meta Ads Management", desc: "High-converting FB/IG ads for leads & sales.", price: "₹15,000", period: "/mo", popular: true },
      { icon: "🔍", name: "Google Ads (PPC)", desc: "Search, Display & YouTube campaigns setup.", price: "₹18,000", period: "/mo", popular: false },
      { icon: "💼", name: "LinkedIn B2B Ads", desc: "Targeted professional outreach for high-ticket clients.", price: "₹20,000", period: "/mo", popular: false },
      { icon: "📽️", name: "Youtube Ads", desc: "In-stream & discovery ads for brand awareness.", price: "₹12,000", period: "/mo", popular: false }
    ]
  },
  {
    id: "web",
    label: "Web Dev",
    icon: "💻",
    color: "#3b82f6",
    desc: "Custom websites built for conversion, speed, and mobile excellence.",
    services: [
      { icon: "📄", name: "Landing Page (One-Page)", desc: "High-speed, SEO-optimized landing page for lead gen.", price: "₹12,000", period: "Once", popular: false },
      { icon: "🌐", name: "Business Website", desc: "Multi-page dynamic website (Up to 5 pages).", price: "₹28,000", period: "Once", popular: true },
      { icon: "🛒", name: "E-Commerce Store", desc: "Full Shopify/WooCommerce store with payment gateway.", price: "₹45,000", period: "Once", popular: false },
      { icon: "🛠️", name: "Website Maintenance", desc: "Security, speed optimization & regular updates.", price: "₹4,500", period: "/mo", popular: false }
    ]
  },
  {
    id: "content",
    label: "Content",
    icon: "✍️",
    color: "#8b5cf6",
    desc: "Compelling storytelling that resonates with your target audience.",
    services: [
      { icon: "📝", name: "SEO Blog Package", desc: "4 High-quality, SEO-driven blogs (1500 words each).", price: "₹8,500", period: "/mo", popular: false },
      { icon: "📰", name: "Newsletter Setup", desc: "Weekly email marketing & audience nurturing setup.", price: "₹10,000", period: "/mo", popular: false },
      { icon: "📜", name: "Script Writing", desc: "Professional scripts for Reels, YouTube & Podcasts.", price: "₹6,000", period: "/mo", popular: false },
      { icon: "📖", name: "Copywriting", desc: "Ad copy, landing page copy & sales emails.", price: "₹12,000", period: "/mo", popular: true }
    ]
  },
  {
    id: "creative",
    label: "Creative",
    icon: "🎨",
    color: "#ec4899",
    desc: "Stunning visuals and branding that set you apart from the competition.",
    services: [
      { icon: "✨", name: "Brand Identity Pack", desc: "Logo, palette, typography & brand guidelines.", price: "₹22,000", period: "Once", popular: false },
      { icon: "🎨", name: "Social Media Design", desc: "15 Custom graphics/templates per month.", price: "₹14,000", period: "/mo", popular: true },
      { icon: "📑", name: "Pitch Deck Design", desc: "Professional slides for investor/sales meetings.", price: "₹12,500", period: "Once", popular: false },
      { icon: "🎭", name: "Thumbnail Design", desc: "High-CTR YouTube/Reel thumbnails (Pack of 10).", price: "₹5,000", period: "/mo", popular: false }
    ]
  },
  {
    id: "influencer",
    label: "Influencer",
    icon: "🌟",
    color: "#f97316",
    desc: "Leverage the power of influence to amplify your brand message.",
    services: [
      { icon: "🎯", name: "Influencer Outreach", desc: "Niche-specific influencer sourcing & vetting.", price: "₹10,000", period: "/mo", popular: false },
      { icon: "🤝", name: "Campaign Management", desc: "End-to-end management of influencer collaborations.", price: "₹18,000", period: "/mo", popular: true },
      { icon: "📊", name: "ROI Tracking", desc: "Data-backed reports on influencer performance.", price: "₹8,000", period: "/mo", popular: false },
      { icon: "🎁", name: "UGC Package", desc: "User-generated content strategy & coordination.", price: "₹15,000", period: "/mo", popular: false }
    ]
  },
  {
    id: "automation",
    label: "AI Logic",
    icon: "🤖",
    color: "#06b6d4",
    desc: "Future-proof your business with smart AI and workflow automation.",
    services: [
      { icon: "💬", name: "AI Chatbot Setup", desc: "Customer support & lead gen AI chatbot.", price: "₹25,000", period: "Once", popular: true },
      { icon: "⚙️", name: "Workflow Automation", desc: "Custom CRM & Zapier/Make.com integrations.", price: "₹18,000", period: "Once", popular: false },
      { icon: "📧", name: "AI Outreach Bot", desc: "Automated LinkedIn/Email outreach system.", price: "₹22,000", period: "/mo", popular: false },
      { icon: "📉", name: "AI Analytics", desc: "Data processing & automated reporting setup.", price: "₹15,000", period: "Once", popular: false }
    ]
  },
  {
    id: "training",
    label: "Consulting",
    icon: "🎓",
    color: "#64748b",
    desc: "Expert guidance to sharpen your digital edge and strategy.",
    services: [
      { icon: "💡", name: "Strategy Session", desc: "1-hour deep dive into your business growth strategy.", price: "₹4,500", period: "/hr", popular: false },
      { icon: "👨‍🏫", name: "Team Training", desc: "Digital marketing & AI tools training for staff.", price: "₹25,000", period: "Once", popular: true },
      { icon: "📋", name: "Digital Audit", desc: "Full analysis of your current digital presence.", price: "₹12,000", period: "Once", popular: false },
      { icon: "💼", name: "Monthly Advisory", desc: "Ongoing strategic guidance & performance review.", price: "₹20,000", period: "/mo", popular: false }
    ]
  }
];

const AUTOMATION_PLANS = [
  {
    name: "Starter Automation",
    price: "₹35,000",
    desc: "Perfect for small businesses looking to save 10+ hours weekly.",
    features: ["Standard AI Chatbot", "Auto-Responder Email", "CRM Integration", "Basic Zapier Setup", "1-Month Support"],
    popular: false
  },
  {
    name: "Business Engine",
    price: "₹85,000",
    desc: "Complete business automation for scaling agencies & SMEs.",
    features: ["Advanced Logic AI Chatbot", "Sales Workflow Automation", "Custom Database Sync", "AI Content Engine", "Priority Support"],
    popular: true
  },
  {
    name: "Enterprise Nexus",
    price: "Custom",
    desc: "Custom-built AI ecosystem for large organizations.",
    features: ["Dedicated AI Infrastructure", "Custom LLM Fine-Tuning", "End-to-End ERP Automation", "White-Label AI Tools", "24/7 Tech Partner"],
    popular: false
  }
];

const VIDEO_PLANS = [
  {
    name: "Starter Reels",
    price: "₹18,000",
    desc: "Build consistency on Social Media.",
    features: ["8 Edited Reels/mo", "Trending Music Sourcing", "Professional Captions", "Script Guidance"],
    icon: "🎬"
  },
  {
    name: "Growth Package",
    price: "₹32,000",
    desc: "For serious content creators.",
    features: ["15 Edited Reels/mo", "Thumbnail Design", "SEO Tags & Headlines", "Viral Format Strategy"],
    icon: "🔥"
  },
  {
    name: "Brand Master",
    price: "₹55,000",
    desc: "Full-scale production for brands.",
    features: ["25 Edited Reels/mo", "1 High-End Brand Video", "In-Person Shoot (Indore)", "Dedicated Content Manager"],
    icon: "🏆"
  },
  {
    name: "Photo Pro",
    price: "₹12,000",
    desc: "Stunning product/event visuals.",
    features: ["Professional Photoshoot", "Retouched High-Res Images", "Creative Direction", "Rapid Delivery"],
    icon: "📸"
  }
];

const ServiceCard = ({ service, color }: { service: any, color: string }) => (
  <Card className={`group relative overflow-hidden bg-card/40 backdrop-blur-xl border-border/40 hover:border-${color}/30 hover:shadow-2xl hover:shadow-${color}/10 transition-all duration-500`}>
    {service.popular && (
      <div className="absolute top-0 right-0 z-10">
        <div className="bg-primary text-primary-foreground text-[10px] uppercase font-bold tracking-widest py-1 px-4 transform rotate-45 translate-x-[25px] translate-y-[10px] shadow-sm">
          Popular
        </div>
      </div>
    )}
    <CardHeader className="pb-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{service.icon}</span>
        <CardTitle className="text-lg font-headline font-bold text-foreground group-hover:text-primary transition-colors">{service.name}</CardTitle>
      </div>
      <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{service.desc}</p>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight text-foreground">{service.price}</span>
        {service.period && <span className="text-sm font-medium text-muted-foreground">{service.period}</span>}
      </div>
    </CardContent>
    <CardFooter>
      <Button asChild variant="outline" className="w-full group/btn hover:bg-primary hover:text-primary-foreground border-primary/20">
        <Link href="/contact" className="flex items-center justify-center gap-2">
          Select Plan <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

const AutomationCard = ({ plan }: { plan: any }) => (
  <Card className={`relative flex flex-col bg-card/40 backdrop-blur-xl border-border/40 ${plan.popular ? 'border-primary/50 shadow-2xl shadow-primary/10' : ''} transition-all duration-500`}>
    {plan.popular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <Badge className="bg-primary text-primary-foreground px-4 py-1 uppercase tracking-widest text-[10px]">Best Value</Badge>
      </div>
    )}
    <CardHeader className="text-center pb-8 pt-8">
      <CardTitle className="text-2xl font-headline font-bold mb-2">{plan.name}</CardTitle>
      <div className="text-4xl font-bold mb-4">{plan.price}</div>
      <p className="text-muted-foreground text-sm">{plan.desc}</p>
    </CardHeader>
    <CardContent className="flex-grow space-y-4">
      {plan.features.map((feature: string, i: number) => (
        <div key={i} className="flex items-center gap-3">
          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm text-muted-foreground">{feature}</span>
        </div>
      ))}
    </CardContent>
    <CardFooter className="pt-8">
      <Button asChild className={`w-full py-6 font-bold ${plan.popular ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20' : 'variant-outline border-primary/20'}`}>
        <Link href="/contact">Get Started Now</Link>
      </Button>
    </CardFooter>
  </Card>
);

const VideoCard = ({ plan }: { plan: any }) => (
  <Card className="group bg-card/40 backdrop-blur-xl border-border/40 hover:border-accent/30 transition-all duration-500">
    <CardHeader className="flex flex-row items-center justify-between pb-4">
      <div className="text-3xl p-3 bg-accent/10 rounded-2xl">{plan.icon}</div>
      <div className="text-right">
        <div className="text-2xl font-bold">{plan.price}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Package</div>
      </div>
    </CardHeader>
    <CardContent className="space-y-6">
      <div>
        <h3 className="text-xl font-headline font-bold mb-2">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">{plan.desc}</p>
      </div>
      <div className="space-y-3 pt-4 border-t border-border/40">
        {plan.features.map((feature: string, i: number) => (
          <div key={i} className="flex items-center gap-3">
            <Zap className="w-3 h-3 text-accent shrink-0" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button asChild className="w-full bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground border-none">
        <Link href="/contact">Book Production</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function PricingPage() {
  const [activeCategory, setActiveCategory] = useState("seo");

  const currentCategory = SERVICE_CATS.find(c => c.id === activeCategory) || SERVICE_CATS[0];

  return (
    <div className="relative min-h-screen">
      {/* Background Glows */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="glow-effect opacity-20" />

      <div className="container mx-auto py-20 px-6 relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-16 space-y-6">
          <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 rounded-full text-xs font-bold uppercase tracking-widest">
            Investment Guide
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter font-headline text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 leading-tight">
            Scale Your Brand with <br />
            <span className="text-primary italic">Transparent Pricing</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            High-performance digital marketing, AI automation, and premium production. No hidden costs, just results.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" className="rounded-full px-8 font-bold gap-2">
              Get a Custom Quote <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 font-bold">
              Download Full Catalog
            </Button>
          </div>
        </section>

        {/* Trust Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { icon: <ShieldCheck className="w-5 h-5 text-green-500" />, text: "No Long-term Contracts" },
            { icon: <Clock className="w-5 h-5 text-blue-500" />, text: "Real-time Reporting" },
            { icon: <Target className="w-5 h-5 text-red-500" />, text: "ROI-Focused Strategy" },
            { icon: <MessageSquare className="w-5 h-5 text-purple-500" />, text: "24/7 Dedicated Support" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-card/20 border border-border/40">
              {item.icon}
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24 border-y border-border/40 py-12">
          {[
            { label: "Satisfied Clients", value: "250+", icon: "🤝" },
            { label: "Campaigns Run", value: "1.2k+", icon: "📈" },
            { label: "Retention Rate", value: "94%", icon: "🔄" },
            { label: "Marketing ROI", value: "4.5x", icon: "💰" }
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-4xl font-bold font-headline text-primary">{stat.value}</div>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Main Pricing Tabs */}
        <Tabs defaultValue="services" className="w-full">
          <div className="flex justify-center mb-16">
            <TabsList className="bg-card/40 backdrop-blur-xl p-1.5 border border-border/40 h-auto gap-2">
              <TabsTrigger value="services" className="px-8 py-3 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs font-bold uppercase tracking-widest transition-all">
                Digital Services
              </TabsTrigger>
              <TabsTrigger value="automation" className="px-8 py-3 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs font-bold uppercase tracking-widest transition-all">
                AI & Automation
              </TabsTrigger>
              <TabsTrigger value="video" className="px-8 py-3 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs font-bold uppercase tracking-widest transition-all">
                Video & Creative
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Service Pricing Tab */}
          <TabsContent value="services" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 bg-card/20 p-2 rounded-2xl border border-border/40">
              {SERVICE_CATS.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                    activeCategory === cat.id 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
                    : "hover:bg-card/60 text-muted-foreground"
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Category Intro */}
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="flex items-center justify-center gap-4">
                 <div className="h-px w-12 bg-primary/30" />
                 <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
                   <span style={{ color: currentCategory.color }}>{currentCategory.icon}</span>
                   {currentCategory.label} Solutions
                 </h2>
                 <div className="h-px w-12 bg-primary/30" />
              </div>
              <p className="text-muted-foreground leading-relaxed">{currentCategory.desc}</p>
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentCategory.services.map((service, i) => (
                <ServiceCard key={i} service={service} color={currentCategory.id} />
              ))}
            </div>

            {/* Custom Quote Strip */}
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-8 border border-primary/20 text-center">
              <h3 className="text-xl font-headline font-bold mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Need a Custom Strategy?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Every business is unique. We can blend services to create a high-performance package tailored specifically for your goals.
              </p>
              <Button asChild size="lg" className="rounded-full px-12">
                <Link href="/contact">Build My Package</Link>
              </Button>
            </div>
          </TabsContent>

          {/* Automation Plans Tab */}
          <TabsContent value="automation" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {AUTOMATION_PLANS.map((plan, i) => (
                  <AutomationCard key={i} plan={plan} />
                ))}
             </div>
             
             {/* AI Feature List */}
             <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-card/20 rounded-[2.5rem] p-10 md:p-16 border border-border/40">
                <div className="space-y-6">
                  <Badge className="bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 border-cyan-500/30">AI First Approach</Badge>
                  <h2 className="text-4xl font-headline font-bold leading-tight">
                    Why Invest in <br />
                    <span className="text-cyan-500">Intelligent Automation?</span>
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    We don't just set up tools; we build intelligent ecosystems that think, act, and scale with your business.
                  </p>
                  <div className="space-y-4">
                    {[
                      { title: "Reduce Overhead", desc: "Automate 70% of repetitive tasks and customer queries." },
                      { title: "24/7 Availability", desc: "Your business never sleeps with AI-driven responses." },
                      { title: "Data Precision", desc: "Eliminate human error in lead routing and CRM management." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500 font-bold text-xs mt-1 shrink-0">{i+1}</div>
                        <div>
                          <h4 className="font-bold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full" />
                  <div className="relative bg-card/60 backdrop-blur-2xl border border-border/40 rounded-3xl p-8 space-y-6">
                     <div className="flex items-center gap-4 pb-4 border-b border-border/40">
                        <Bot className="w-10 h-10 text-cyan-500" />
                        <div>
                           <div className="font-bold">AdsVerse AI Engine</div>
                           <div className="text-xs text-muted-foreground">System Status: Active</div>
                        </div>
                     </div>
                     <div className="space-y-3">
                        <div className="h-4 w-3/4 bg-muted/40 rounded animate-pulse" />
                        <div className="h-4 w-full bg-muted/40 rounded animate-pulse" />
                        <div className="h-4 w-1/2 bg-muted/40 rounded animate-pulse" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="h-20 bg-cyan-500/5 rounded-2xl border border-cyan-500/10 flex flex-col items-center justify-center">
                           <div className="text-xs text-muted-foreground">Savings</div>
                           <div className="font-bold text-cyan-500">40h / wk</div>
                        </div>
                        <div className="h-20 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col items-center justify-center">
                           <div className="text-xs text-muted-foreground">Efficiency</div>
                           <div className="font-bold text-primary">+85%</div>
                        </div>
                     </div>
                  </div>
                </div>
             </div>
          </TabsContent>

          {/* Video & Creative Tab */}
          <TabsContent value="video" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                <h2 className="text-4xl font-headline font-bold">Premium Content <span className="text-accent italic">Production</span></h2>
                <p className="text-muted-foreground">From viral Reels to cinematic brand stories, we bring your vision to life with expert production.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                {VIDEO_PLANS.map((plan, i) => (
                  <VideoCard key={i} plan={plan} />
                ))}
             </div>

             {/* Production Features */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: <Play className="w-6 h-6" />, title: "Full Directing", desc: "We don't just film; we direct every shot for maximum impact." },
                  { icon: <Sparkles className="w-6 h-6" />, title: "High-End VFX", desc: "Professional motion graphics and visual effects for every video." },
                  { icon: <Camera className="w-6 h-6" />, title: "Pro Equipment", desc: "4K production using industry-standard cameras and lighting." }
                ].map((feature, i) => (
                  <div key={i} className="p-8 rounded-[2rem] bg-card/20 border border-border/40 hover:bg-card/40 transition-colors">
                     <div className="mb-4 text-accent">{feature.icon}</div>
                     <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                     <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                ))}
             </div>
          </TabsContent>
        </Tabs>

        {/* FAQ/CTA Final Section */}
        <section className="mt-32 relative overflow-hidden rounded-[3rem] bg-primary py-20 px-10 text-center text-primary-foreground">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-accent/20 rounded-full blur-[80px]" />
          
          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tight">Ready to Dominate Your Market?</h2>
            <p className="text-xl text-primary-foreground/80">
              Join 250+ brands that have accelerated their growth with AdsVerse. 
              Let's build your custom growth engine today.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-12 py-7 text-lg font-bold shadow-2xl">
                <Link href="/contact">Book a Free Strategy Call</Link>
              </Button>
              <div className="w-full flex items-center justify-center gap-4 text-sm font-medium opacity-80">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-current" /> Google Top Agency</span>
                <span className="h-1 w-1 bg-white/40 rounded-full" />
                <span>Indore-Based Team</span>
                <span className="h-1 w-1 bg-white/40 rounded-full" />
                <span>24hr Response Time</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

