"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  CheckCircle,
  ArrowRight,
  Zap,
  ShieldCheck,
  Clock,
  Target,
  MessageSquare,
  Sparkles,
  Bot,
  Star,
  Play,
  Camera
} from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { type PricingPlan } from "@/lib/definitions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
  "SEO": { id: "seo", label: "SEO", icon: "🔍", color: "#22c55e" },
  "Paid Ads": { id: "ads", label: "Ads", icon: "🚀", color: "#f59e0b" },
  "Social Media": { id: "smm", label: "SMM", icon: "📱", color: "#e91e8c" },
  "Web Dev": { id: "web", label: "Web Dev", icon: "💻", color: "#3b82f6" },
  "Content Marketing": { id: "content", label: "Content", icon: "✍️", color: "#8b5cf6" },
  "Branding": { id: "creative", label: "Creative", icon: "🎨", color: "#ec4899" },
  "Automation & AI": { id: "automation", label: "AI Logic", icon: "🤖", color: "#06b6d4" },
  "Video Shoots": { id: "video", label: "Video", icon: "🎬", color: "#f43f5e" },
};

const ServiceCard = ({ service, color, selectedServices, onSelectPlan }: { service: any, color: string, selectedServices: any[], onSelectPlan: (s: any) => void }) => {
  const isSelected = selectedServices.some(item => item.name === service.name);
  return (
    <Card className={`group relative overflow-hidden bg-card/40 backdrop-blur-xl border-border/40 hover:border-${color}/30 transition-all duration-500`}>
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
        <Button 
          onClick={() => onSelectPlan({ name: service.name, desc: service.description || service.desc, price: service.price, color })}
          variant="outline" 
          className={`w-full group/btn border-primary/20 cursor-pointer ${
            isSelected ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30" : "hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          {isSelected ? "Remove Plan" : (service.callToAction || "Select Plan")} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const AutomationCard = ({ plan, selectedServices, onSelectPlan }: { plan: any, selectedServices: any[], onSelectPlan: (s: any) => void }) => {
  const isSelected = selectedServices.some(item => item.name === plan.name);
  return (
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
        <Button 
          onClick={() => onSelectPlan({ name: plan.name, desc: plan.description || plan.desc, price: plan.price, color: "#06b6d4" })}
          className={`w-full py-6 font-bold cursor-pointer ${
            isSelected 
              ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30" 
              : plan.isPopular ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20' : 'variant-outline border-primary/20'
          }`}
        >
          {isSelected ? "Remove Plan" : (plan.callToAction || "Get Started Now")}
        </Button>
      </CardFooter>
    </Card>
  );
};

const VideoCard = ({ plan, selectedServices, onSelectPlan }: { plan: any, selectedServices: any[], onSelectPlan: (s: any) => void }) => {
  const isSelected = selectedServices.some(item => item.name === plan.name);
  return (
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
        <Button 
          onClick={() => onSelectPlan({ name: plan.name, desc: plan.description || plan.desc, price: plan.price, color: "#f43f5e" })}
          className={`w-full text-accent hover:text-accent-foreground border-none cursor-pointer ${
            isSelected 
              ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30" 
              : "bg-accent/10 hover:bg-accent"
          }`}
        >
          {isSelected ? "Remove Plan" : (plan.callToAction || "Book Production")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function PricingClient({ initialPlans }: { initialPlans: PricingPlan[] }) {
  const [activeCategory, setActiveCategory] = useState("seo");
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadDate, setLeadDate] = useState("");
  const [leadTime, setLeadTime] = useState("");
  const [appointmentMode, setAppointmentMode] = useState<"online" | "office">("online");
  const [homeAddress, setHomeAddress] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [compiledMessage, setCompiledMessage] = useState("");
  const [copiedState, setCopiedState] = useState(false);

  const parsePrice = (priceStr: string): number => {
    const cleaned = priceStr.replace(/[^0-9]/g, '');
    const num = parseInt(cleaned, 10);
    return isNaN(num) ? 12000 : num;
  };

  const selectService = (s: any) => {
    const itemPrice = parsePrice(s.price);
    setSelectedServices(prev => {
      const exists = prev.find(item => item.name === s.name);
      if (exists) return prev;
      return [...prev, { ...s, price: itemPrice }];
    });
  };

  const deselectService = (s: any) => {
    setSelectedServices(prev => prev.filter(item => item.name !== s.name));
  };

  const toggleService = (s: any) => {
    const itemPrice = parsePrice(s.price);
    setSelectedServices(prev => {
      const exists = prev.find(item => item.name === s.name);
      if (exists) {
        return prev.filter(item => item.name !== s.name);
      } else {
        return [...prev, { ...s, price: itemPrice }];
      }
    });
  };

  const { serviceCats, automationPlans, videoPlans } = useMemo(() => {
    const categories: Record<string, any> = {};
    const automations: any[] = [];
    const videos: any[] = [];

    initialPlans.forEach(plan => {
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
        const catInfo = CATEGORY_MAP[plan.category] || { id: "other", label: plan.category, icon: "✨", color: "#64748b" };
        if (!categories[catInfo.id]) {
          categories[catInfo.id] = {
            ...catInfo,
            desc: plan.categoryDesc || "",
            services: []
          };
        }
        categories[catInfo.id].services.push(plan);
        if (!categories[catInfo.id].desc && plan.categoryDesc) {
          categories[catInfo.id].desc = plan.categoryDesc;
        }
      }
    });

    return {
      serviceCats: Object.values(categories),
      automationPlans: automations,
      videoPlans: videos
    };
  }, [initialPlans]);

  const currentCategory = serviceCats.find(c => c.id === activeCategory) || serviceCats[0];

  return (
    <div className="relative min-h-screen">
      {/* Background Glows */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />


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
            <Button size="lg" asChild className="rounded-full px-8 font-bold gap-2">
              <Link href="/contact">Get a Custom Quote <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8 font-bold"
              onClick={async () => {
                const { jsPDF } = await import("jspdf");
                const autoTable = (await import("jspdf-autotable")).default;
                
                const doc = new jsPDF();
                const primaryColor = [249, 115, 22]; // AdsVerse Orange
                const secondaryColor = [15, 23, 42]; // Dark Slate
                
                // --- Page Decoration ---
                doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
                doc.rect(0, 0, 210, 15, 'F'); // Top bar
                
                // --- Header Section ---
                doc.setFont("helvetica", "bold");
                doc.setFontSize(28);
                doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
                doc.text("AdsVerse", 14, 35);
                
                doc.setFont("helvetica", "normal");
                doc.setFontSize(10);
                doc.setTextColor(100, 116, 139);
                doc.text("Digital Marketing | AI Automation | Video Production", 14, 42);
                
                doc.setFontSize(16);
                doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
                doc.text("SERVICE CATALOG & PRICING", 14, 55);
                
                doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
                doc.setLineWidth(0.5);
                doc.line(14, 58, 80, 58);
                
                let yPos = 70;

                // Group by Categories
                const groups = initialPlans.reduce((acc: any, plan: any) => {
                  const cat = plan.category || "Other Services";
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(plan);
                  return acc;
                }, {});

                Object.keys(groups).forEach((catName) => {
                  // Check if we need a new page for the category header
                  if (yPos > 240) {
                    doc.addPage();
                    yPos = 30;
                  }
                  
                  doc.setFont("helvetica", "bold");
                  doc.setFontSize(14);
                  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
                  doc.text(catName.toUpperCase(), 14, yPos);
                  
                  const tableData = groups[catName].map((p: any) => [
                    p.name,
                    // Fix currency symbol issues by using standard Rs.
                    p.price.replace(/[^\x00-\x7F]/g, "").trim() ? p.price.replace(/[^\x00-\x7F]/g, "Rs. ") : "Custom Quote",
                    p.description || "Premium high-impact service"
                  ]);

                  (doc as any).autoTable({
                    startY: yPos + 5,
                    head: [['SERVICE', 'INVESTMENT', 'DESCRIPTION']],
                    body: tableData,
                    theme: 'grid',
                    styles: { fontSize: 9, cellPadding: 4 },
                    headStyles: { 
                      fillColor: primaryColor, 
                      textColor: [255, 255, 255],
                      fontStyle: 'bold'
                    },
                    columnStyles: {
                      1: { fontStyle: 'bold', textColor: primaryColor },
                      2: { fontSize: 8 }
                    },
                    margin: { left: 14, right: 14 },
                  });

                  yPos = (doc as any).lastAutoTable.finalY + 20;
                });

                // Footer with Contact Info
                const pageCount = (doc as any).internal.getNumberOfPages();
                for(let i = 1; i <= pageCount; i++) {
                  doc.setPage(i);
                  doc.setFillColor(248, 250, 252); // Light bg for footer
                  doc.rect(0, 280, 210, 17, 'F');
                  
                  doc.setFontSize(8);
                  doc.setTextColor(100, 116, 139);
                  doc.setFont("helvetica", "bold");
                  doc.text("www.adsverse.in", 14, 290);
                  doc.text("Grow Your Brand with India's Smartest Agency", 105, 290, { align: 'center' });
                  doc.text(`Page ${i} of ${pageCount}`, 196, 290, { align: 'right' });
                }

                doc.save("AdsVerse_Digital_Catalog.pdf");
              }}
            >
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
            { label: "Satisfied Clients", value: "113+", icon: "🤝" },
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
            {currentCategory && (
              <>
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
                  {currentCategory.services.map((service: any, i: number) => (
                    <ServiceCard key={i} service={service} color={currentCategory.id} selectedServices={selectedServices} onSelectPlan={toggleService} />
                  ))}
                </div>
              </>
            )}

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
                <AutomationCard key={i} plan={plan} selectedServices={selectedServices} onSelectPlan={toggleService} />
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
                <VideoCard key={i} plan={plan} selectedServices={selectedServices} onSelectPlan={toggleService} />
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
              Join 113+ brands that have accelerated their growth with AdsVerse.
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

      {/* ── FLOATING CART BAR ── */}
      {selectedServices.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/90 backdrop-blur-2xl border border-orange-500/40 rounded-full py-4 px-8 flex items-center justify-between gap-8 shadow-2xl shadow-orange-500/20 animate-in slide-in-from-bottom-10 duration-300 max-w-lg w-[calc(100%-2rem)]">
          <div className="flex items-center gap-3">
            <div className="relative flex h-4 w-4 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-600"></span>
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-white tracking-tight">
                {selectedServices.length} {selectedServices.length === 1 ? "Plan" : "Plans"} Selected
              </div>
              <div className="text-xs text-orange-500 font-extrabold">
                Total Amount: ₹{selectedServices.reduce((sum, item) => sum + item.price, 0).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setValidationError("");
              setIsSuccess(false);
              setIsBookingOpen(true);
            }}
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            Book Now
          </button>
        </div>
      )}

      {/* ── INTERACTIVE BOOKING DIALOG ── */}
      <Dialog open={isBookingOpen} onOpenChange={(open) => !open && setIsBookingOpen(false)}>
        <DialogContent className="bg-background/95 backdrop-blur-3xl border border-neutral-800 shadow-2xl rounded-[2rem] p-0 overflow-hidden max-w-lg max-h-[90vh] flex flex-col">
          <DialogHeader className="p-6 pb-4 border-b border-neutral-800 bg-neutral-900/50 shrink-0">
            <DialogTitle className="text-2xl font-black font-headline tracking-tight text-white flex items-center gap-2">
              <span>WhatsApp Booking System</span>
              <span className="text-xs bg-orange-500/20 text-orange-500 px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-widest shrink-0">
                Cart Booking
              </span>
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-400">
              Provide your details below to directly initiate a chat booking on WhatsApp.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {!isSuccess ? (
              <>
                {/* Cart Items Summary */}
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Selected Plans
                  </div>
                  <div className="border border-neutral-800 bg-neutral-950/60 rounded-2xl p-4 space-y-3 divide-y divide-neutral-900 max-h-[180px] overflow-y-auto">
                    {selectedServices.map((item, idx) => (
                      <div key={item.name} className={`flex justify-between items-center gap-4 ${idx > 0 ? "pt-3" : ""}`}>
                        <div className="text-left">
                          <div className="text-sm font-bold text-white">{item.name}</div>
                          <div className="text-[11px] text-neutral-500 line-clamp-1">{item.desc}</div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-sm font-black text-orange-500">₹{item.price.toLocaleString('en-IN')}</span>
                          <button
                            onClick={() => toggleService(item)}
                            className="text-xs text-neutral-555 hover:text-red-500 transition-colors p-1 cursor-pointer border-none bg-transparent"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <span className="text-xs font-bold text-neutral-400">Total Amount:</span>
                    <span className="text-lg font-black text-white">
                      ₹{selectedServices.reduce((sum, item) => sum + item.price, 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {validationError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-xs rounded-xl font-bold">
                      ⚠️ {validationError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-300">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none text-white text-sm transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-300">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9685123339"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none text-white text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-300">
                        Appointment Date
                      </label>
                      <input
                        type="date"
                        value={leadDate}
                        onChange={(e) => setLeadDate(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none text-white text-sm transition-all [color-scheme:dark]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-300">
                        Time Slot
                      </label>
                      <select
                        value={leadTime}
                        onChange={(e) => setLeadTime(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none text-white text-sm transition-all"
                      >
                        <option value="">-- Select Slot --</option>
                        <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                        <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                        <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                        <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                        <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-300 block">
                      Consultation Mode
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setAppointmentMode("online")}
                        className={`h-11 rounded-xl font-bold text-xs uppercase tracking-widest border transition-all cursor-pointer ${
                          appointmentMode === "online"
                            ? "bg-orange-500/20 text-orange-500 border-orange-500/40"
                            : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:bg-neutral-800"
                        }`}
                      >
                        💻 Online Call
                      </button>
                      <button
                        type="button"
                        onClick={() => setAppointmentMode("office")}
                        className={`h-11 rounded-xl font-bold text-xs uppercase tracking-widest border transition-all cursor-pointer ${
                          appointmentMode === "office"
                            ? "bg-orange-500/20 text-orange-500 border-orange-500/40"
                            : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:bg-neutral-800"
                        }`}
                      >
                        🏢 Office Visit
                      </button>
                    </div>
                  </div>

                  {/* Conditional: Online Call — preferred platform */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      appointmentMode === "online" ? "max-h-[120px] opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="space-y-2 pt-2">
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500">
                        Preferred Platform
                      </label>
                      <select
                        value={homeAddress}
                        onChange={(e) => setHomeAddress(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none text-white text-sm transition-all"
                      >
                        <option value="">-- Select Platform --</option>
                        <option value="Google Meet">Google Meet</option>
                        <option value="Zoom">Zoom</option>
                        <option value="WhatsApp Video">WhatsApp Video</option>
                        <option value="Microsoft Teams">Microsoft Teams</option>
                      </select>
                    </div>
                  </div>

                  {/* Conditional: Office Visit — show office address */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      appointmentMode === "office" ? "max-h-[160px] opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="space-y-2 pt-2">
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500">
                        📍 Our Office: Vijay Nagar, Indore
                      </label>
                      <div className="w-full p-3 rounded-xl bg-neutral-900 border border-orange-500/20 text-neutral-400 text-xs leading-relaxed">
                        AdsVerse — Vijay Nagar, Indore, Madhya Pradesh 452010<br />
                        <span className="text-orange-500 font-bold">Mon–Sat: 10 AM – 7 PM</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-300">
                      Special Notes / Directions (Optional)
                    </label>
                    <textarea
                      placeholder="Any special requirements..."
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      className="w-full h-16 p-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none text-white text-sm transition-all resize-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    // Strict Validation
                    if (selectedServices.length === 0) {
                      setValidationError("Select at least 1 service to proceed with booking.");
                      return;
                    }
                    if (!leadName.trim()) {
                      setValidationError("Please enter your name.");
                      return;
                    }
                    if (leadPhone.trim().replace(/[^0-9]/g, '').length < 10) {
                      setValidationError("Please enter a valid phone number of at least 10 digits.");
                      return;
                    }

                    setValidationError("");

                    // Calculate Total Amount
                    const total = selectedServices.reduce((sum, item) => sum + item.price, 0);

                    // WhatsApp Text Compilation
                    let msg = `🌟 *NEW APPOINTMENT BOOKING* 🌟\n\n`;
                    msg += `*Customer Name:* _${leadName.trim()}_\n`;
                    msg += `*WhatsApp/Phone:* _${leadPhone.trim()}_\n`;
                    msg += `*Consultation Mode:* _${appointmentMode === 'online' ? `💻 Online / Video Call${homeAddress ? ` (${homeAddress})` : ' (Google Meet / Zoom)'}` : '🏢 Office Visit — Vijay Nagar, Indore'}_\n`;
                    if (leadDate) msg += `*Date:* _${leadDate}_\n`;
                    if (leadTime) msg += `*Time Slot:* _${leadTime}_\n`;
                    if (specialNotes.trim()) msg += `*Notes:* _${specialNotes.trim()}_\n`;
                    msg += `\n*Selected Service Plans:*`;
                    
                    selectedServices.forEach((item, index) => {
                      msg += `\n${index + 1}. *${item.name}* (₹${item.price.toLocaleString('en-IN')})`;
                    });
                    
                    msg += `\n\n*Total Estimated Amount:* *₹${total.toLocaleString('en-IN')}*\n`;
                    msg += `\nThank you! Please confirm this slot.`;

                    setCompiledMessage(msg);

                    // PERSISTENT LOCAL STORAGE BOOKING
                    const bookingId = 'BK-' + Date.now().toString().slice(-6);
                    const bookingObj = {
                      id: bookingId,
                      name: leadName.trim(),
                      phone: leadPhone.trim(),
                      total: total,
                      date: leadDate || new Date().toISOString().split('T')[0],
                      timestamp: new Date().toISOString()
                    };
                    try {
                      const allBookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
                      allBookings.push(bookingObj);
                      localStorage.setItem('allBookings', JSON.stringify(allBookings));
                    } catch (e) {
                      console.error("Local storage error:", e);
                    }

                    // GOOGLE SHEETS WEBHOOK CALL (no-cors)
                    try {
                      fetch("https://script.google.com/macros/s/AKfycbz_placeholder/exec", {
                        method: "POST",
                        mode: "no-cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(bookingObj)
                      }).catch(e => console.log("Silent sheets POST ignored."));
                    } catch(err) {}

                    // Trigger Auto Click sandbox bypass
                    const encodedMsg = encodeURIComponent(msg);
                    const url = `https://wa.me/919685123339?text=${encodedMsg}`;
                    
                    try {
                      const link = document.createElement('a');
                      link.href = url;
                      link.target = '_blank';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    } catch (e) {
                      console.error("Link redirect error:", e);
                    }

                    setIsSuccess(true);
                  }}
                  className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-xl shadow-orange-500/20 transition-all text-center flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Zap size={14} className="fill-current text-white animate-pulse" />
                  Compile & Message on WhatsApp
                </button>
              </>
            ) : (
              /* Success / Compiled Fallback UI State */
              <div className="text-center space-y-6 py-4 animate-in fade-in zoom-in-95 duration-400">
                {/* SVG Checkmark Animation */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500">
                    <svg className="w-8 h-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white">Booking Message Compiled! ✅</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
                    We attempted to launch WhatsApp. If sandbox blocks it, please copy the compiled text or click the open button below.
                  </p>
                </div>

                {/* Read Only Preview Box */}
                <div className="space-y-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-500 text-left pl-2">
                    WhatsApp Message Preview
                  </div>
                  <pre className="w-full h-40 p-4 rounded-2xl bg-neutral-950 border border-neutral-900 text-left text-xs text-neutral-300 font-mono overflow-y-auto whitespace-pre-wrap select-all leading-relaxed">
                    {compiledMessage}
                  </pre>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      try {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(compiledMessage);
                        } else {
                          const textarea = document.createElement("textarea");
                          textarea.value = compiledMessage;
                          document.body.appendChild(textarea);
                          textarea.select();
                          document.execCommand("copy");
                          document.body.removeChild(textarea);
                        }
                        setCopiedState(true);
                        setTimeout(() => setCopiedState(false), 3000);
                      } catch (err) {}
                    }}
                    className={`py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border cursor-pointer ${
                      copiedState 
                        ? "bg-green-500/20 text-green-500 border-green-500/30" 
                        : "bg-neutral-900 border-neutral-850 hover:bg-neutral-800 text-white"
                    }`}
                  >
                    {copiedState ? "Copied! ✅" : "Copy Message"}
                  </button>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="py-3 bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Edit Details
                  </button>
                </div>

                <a
                  href={`https://wa.me/919685123339?text=${encodeURIComponent(compiledMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-xl shadow-green-600/20 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare size={14} className="fill-current text-white" />
                  Open WhatsApp Chat
                </a>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
