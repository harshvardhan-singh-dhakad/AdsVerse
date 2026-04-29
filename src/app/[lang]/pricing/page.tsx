
"use client";

import { useState, useMemo } from "react";
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
  Bot,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { type PricingPlan } from "@/lib/definitions";

/* ─────────────────────────────────────────────
   FALLBACK DATA — Used only if database is empty
   Ensures UI is never empty while migrating
───────────────────────────────────────────── */
const FALLBACK_SERVICE_CATS = [
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
  }
];

const FALLBACK_AUTOMATION_PLANS = [
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

const FALLBACK_VIDEO_PLANS = [
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
  }
];

/* ─────────────────────────────────────────────
   MAPPING UTILITIES
───────────────────────────────────────────── */
const CATEGORY_MAP: Record<string, { id: string, label: string, icon: string, color: string }> = {
  "seo": { id: "seo", label: "SEO", icon: "🔍", color: "#22c55e" },
  "smm": { id: "smm", label: "SMM", icon: "📱", color: "#e91e8c" },
  "ads": { id: "ads", label: "Ads", icon: "🚀", color: "#f59e0b" },
  "ppc": { id: "ads", label: "Ads", icon: "🚀", color: "#f59e0b" },
  "web": { id: "web", label: "Web Dev", icon: "💻", color: "#3b82f6" },
  "content": { id: "content", label: "Content", icon: "✍️", color: "#8b5cf6" },
  "creative": { id: "creative", label: "Creative", icon: "🎨", color: "#ec4899" },
  "design": { id: "creative", label: "Creative", icon: "🎨", color: "#ec4899" },
  "branding": { id: "creative", label: "Creative", icon: "🎨", color: "#ec4899" },
  "influencer": { id: "influencer", label: "Influencer", icon: "🌟", color: "#f97316" },
  "automation": { id: "automation", label: "AI Logic", icon: "🤖", color: "#06b6d4" },
  "consulting": { id: "training", label: "Consulting", icon: "🎓", color: "#64748b" },
  // Firestore string matches
  "SEO": { id: "seo", label: "SEO", icon: "🔍", color: "#22c55e" },
  "Paid Ads": { id: "ads", label: "Ads", icon: "🚀", color: "#f59e0b" },
  "Social Media": { id: "smm", label: "SMM", icon: "📱", color: "#e91e8c" },
  "Web Dev": { id: "web", label: "Web Dev", icon: "💻", color: "#3b82f6" },
  "Content Marketing": { id: "content", label: "Content", icon: "✍️", color: "#8b5cf6" },
  "Branding": { id: "creative", label: "Creative", icon: "🎨", color: "#ec4899" },
  "Automation & AI": { id: "automation", label: "AI Logic", icon: "🤖", color: "#06b6d4" },
  "Video Shoots": { id: "video", label: "Video", icon: "🎬", color: "#f43f5e" },
};

const ServiceCard = ({ service, color }: { service: any, color: string }) => (
  <Card className={`group relative overflow-hidden bg-card/40 backdrop-blur-xl border-border/40 hover:border-${color}/30 hover:shadow-2xl hover:shadow-${color}/10 transition-all duration-500`}>
    {service.isPopular && (
      <div className="absolute top-0 right-0 z-10">
        <div className="bg-primary text-primary-foreground text-[10px] uppercase font-bold tracking-widest py-1 px-4 transform rotate-45 translate-x-[25px] translate-y-[10px] shadow-sm">
          Popular
        </div>
      </div>
    )}
    <CardHeader className="pb-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{service.icon || "📍"}</span>
        <CardTitle className="text-lg font-headline font-bold text-foreground group-hover:text-primary transition-colors">{service.name}</CardTitle>
      </div>
      <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{service.description || service.desc}</p>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight text-foreground">{service.price}</span>
        {service.frequency && <span className="text-sm font-medium text-muted-foreground">{service.frequency}</span>}
      </div>
    </CardContent>
    <CardFooter>
      <Button asChild variant="outline" className="w-full group/btn hover:bg-primary hover:text-primary-foreground border-primary/20">
        <Link href="/contact" className="flex items-center justify-center gap-2">
          {service.callToAction || "Select Plan"} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

const AutomationCard = ({ plan }: { plan: any }) => (
  <Card className={`relative flex flex-col bg-card/40 backdrop-blur-xl border-border/40 ${plan.isPopular ? 'border-primary/50 shadow-2xl shadow-primary/10' : ''} transition-all duration-500`}>
    {plan.isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <Badge className="bg-primary text-primary-foreground px-4 py-1 uppercase tracking-widest text-[10px]">Best Value</Badge>
      </div>
    )}
    <CardHeader className="text-center pb-8 pt-8">
      <CardTitle className="text-2xl font-headline font-bold mb-2">{plan.name}</CardTitle>
      <div className="text-4xl font-bold mb-4">{plan.price}</div>
      <p className="text-muted-foreground text-sm">{plan.description || plan.desc}</p>
    </CardHeader>
    <CardContent className="flex-grow space-y-4">
      {(plan.features || []).map((feature: string, i: number) => (
        <div key={i} className="flex items-center gap-3">
          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm text-muted-foreground">{feature}</span>
        </div>
      ))}
    </CardContent>
    <CardFooter className="pt-8">
      <Button asChild className={`w-full py-6 font-bold ${plan.isPopular ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20' : 'variant-outline border-primary/20'}`}>
        <Link href="/contact">{plan.callToAction || "Get Started Now"}</Link>
      </Button>
    </CardFooter>
  </Card>
);

const VideoCard = ({ plan }: { plan: any }) => (
  <Card className="group bg-card/40 backdrop-blur-xl border-border/40 hover:border-accent/30 transition-all duration-500">
    <CardHeader className="flex flex-row items-center justify-between pb-4">
      <div className="text-3xl p-3 bg-accent/10 rounded-2xl">{plan.icon || "🎬"}</div>
      <div className="text-right">
        <div className="text-2xl font-bold">{plan.price}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Package</div>
      </div>
    </CardHeader>
    <CardContent className="space-y-6">
      <div>
        <h3 className="text-xl font-headline font-bold mb-2">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">{plan.description || plan.desc}</p>
      </div>
      <div className="space-y-3 pt-4 border-t border-border/40">
        {(plan.features || []).map((feature: string, i: number) => (
          <div key={i} className="flex items-center gap-3">
            <Zap className="w-3 h-3 text-accent shrink-0" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button asChild className="w-full bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground border-none">
        <Link href="/contact">{plan.callToAction || "Book Production"}</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function PricingPage() {
  const [activeCategory, setActiveCategory] = useState("seo");
  const firestore = useFirestore();

  const plansQuery = useMemoFirebase(() =>
    query(collection(firestore, "pricingPlans"), orderBy("displayOrder", "asc")),
    [firestore]
  );

  const { data: rawPlans, isLoading } = useCollection<PricingPlan>(plansQuery);

  const { serviceCats, automationPlans, videoPlans } = useMemo(() => {
    if (!rawPlans || rawPlans.length === 0) {
      return {
        serviceCats: FALLBACK_SERVICE_CATS,
        automationPlans: FALLBACK_AUTOMATION_PLANS,
        videoPlans: FALLBACK_VIDEO_PLANS
      };
    }

    const categories: Record<string, any> = {};
    const automations: any[] = [];
    const videos: any[] = [];

    rawPlans.forEach(plan => {
      // Determine Type if missing
      let type = plan.planType;
      if (!type) {
        if (plan.category?.includes("Automation") || plan.category?.includes("AI")) type = "automation";
        else if (plan.category?.includes("Video") || plan.category?.includes("Shoot")) type = "video";
        else type = "service";
      }

      if (type === "automation") {
        automations.push(plan);
      } else if (type === "video") {
        videos.push(plan);
      } else {
        // Services grouping
        const catInfo = CATEGORY_MAP[plan.category] || { id: "other", label: plan.category, icon: "✨", color: "#64748b" };
        if (!categories[catInfo.id]) {
          categories[catInfo.id] = {
            ...catInfo,
            desc: plan.categoryDesc || "",
            services: []
          };
        }
        categories[catInfo.id].services.push(plan);
        // Take the first description if multiple exist for a category
        if (!categories[catInfo.id].desc && plan.categoryDesc) {
          categories[catInfo.id].desc = plan.categoryDesc;
        }
      }
    });

    return {
      serviceCats: Object.values(categories),
      automationPlans: automations.length > 0 ? automations : FALLBACK_AUTOMATION_PLANS,
      videoPlans: videos.length > 0 ? videos : FALLBACK_VIDEO_PLANS
    };
  }, [rawPlans]);

  const currentCategory = serviceCats.find(c => c.id === activeCategory) || serviceCats[0] || FALLBACK_SERVICE_CATS[0];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-muted-foreground font-medium animate-pulse">Syncing with AdsVerse Cloud...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="glow-effect opacity-10 pointer-events-none" />

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
              {serviceCats.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeCategory === cat.id
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
              {automationPlans.map((plan, i) => (
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
                      <div className="h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500 font-bold text-xs mt-1 shrink-0">{i + 1}</div>
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
              {videoPlans.map((plan, i) => (
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
        <section className="mt-32 relative overflow-hidden rounded-[3rem] bg-primary py-20 px-10 text-center text-primary-foreground mx-4 md:mx-0">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[80px] pointer-events-none" />

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

