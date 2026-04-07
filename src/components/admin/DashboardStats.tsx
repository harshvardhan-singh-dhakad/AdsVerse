
"use client";

import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, IndianRupee, FileText, Loader2, ShieldAlert, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StatItem {
  label: string;
  count: number | null;
  icon: any;
  color: string;
}

export function DashboardStats() {
  const db = useFirestore();
  const [stats, setStats] = useState<StatItem[]>([
    { label: "Total Leads", count: null, icon: Users, color: "text-blue-500" },
    { label: "Active Services", count: null, icon: Briefcase, color: "text-purple-500" },
    { label: "Portfolio Projects", count: null, icon: BarChart3, color: "text-teal-500" },
    { label: "Blog Posts", count: null, icon: FileText, color: "text-amber-500" },
    { label: "Pricing Plans", count: null, icon: IndianRupee, color: "text-emerald-500" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const collections = ["leads", "services", "portfolioItems", "public_blogPosts", "pricingPlans"];
        const counts = await Promise.all(
          collections.map(async (colName) => {
            const snapshot = await getCountFromServer(collection(db, colName));
            return snapshot.data().count;
          })
        );

        setStats(prev => prev.map((item, idx) => ({ ...item, count: counts[idx] })));
      } catch (err: any) {
        console.error("Error fetching dashboard stats:", err);
        if (err.code === 'permission-denied') {
            setError("Permission Denied");
        } else {
            setError("Failed to load statistics");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="animate-pulse bg-card/40 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-4 w-4 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-12 bg-muted rounded mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error === "Permission Denied") {
    return (
      <div className="text-center py-20 bg-card/40 backdrop-blur-xl border border-border/40 rounded-xl shadow-xl">
        <div className="flex justify-center mb-4">
          <ShieldAlert className="w-16 h-16 text-destructive opacity-80" />
        </div>
        <h3 className="text-2xl font-bold text-destructive mb-2">Administrative Access Required</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          You do not have the necessary permissions to view system-wide statistics. 
          Please contact the primary administrator if you believe this is an error.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-12">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.label} className="group relative bg-card/40 backdrop-blur-3xl border-border/5 shadow-2xl hover:border-primary/30 transition-all duration-500 overflow-hidden">
            <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 blur-[60px] transition-all duration-700 group-hover:opacity-40 ${stat.color.replace('text-', 'bg-')}`} />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em]">
                {stat.label}
              </span>
              <div className={cn("p-2.5 rounded-xl bg-muted/5 border border-border/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black tracking-tighter text-foreground/90 group-hover:text-primary transition-colors">
                {stat.count !== null ? stat.count.toLocaleString() : "0"}
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Real-time</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <Card className="lg:col-span-8 bg-gradient-to-br from-[#12141c]/60 to-[#0a0c10]/40 backdrop-blur-3xl border-border/5 shadow-inner-white p-10 overflow-hidden relative border border-border/5 group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(142,68,173,0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
            <div className="shrink-0">
                <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-foreground font-black text-4xl shadow-[0_20px_50px_rgba(142,68,173,0.3)]">
                    A
                </div>
            </div>
            <div className="space-y-3">
               <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-foreground">
                AdsVerse <span className="text-primary italic font-serif opacity-90">Elite</span>
               </h1>
               <p className="text-lg text-muted-foreground max-w-xl font-medium leading-relaxed">
                Welcome back to your digital command center. Every decision you make here fuels the next stage of growth.
               </p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
             {[
               { l: 'Performance', v: '98%', c: 'text-emerald-400' },
               { l: 'SEO Score', v: '100', c: 'text-blue-400' },
               { l: 'Leads Rate', v: '+24%', c: 'text-primary' },
               { l: 'Stability', v: '99.9%', c: 'text-accent' },
             ].map(i => (
               <div key={i.l} className="bg-muted/5 border border-border/10 rounded-2xl p-4 hover:bg-muted/10 transition-all cursor-default">
                  <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest mb-1">{i.l}</p>
                  <p className={cn("text-xl font-black", i.c)}>{i.v}</p>
               </div>
             ))}
          </div>
        </Card>

        <div className="lg:col-span-4 space-y-6">
            <div className="relative p-8 rounded-[2rem] bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-125 transition-transform">
                    <Users className="w-16 h-16 text-emerald-500" />
                </div>
                <h4 className="font-black text-emerald-500 uppercase tracking-widest text-[11px] mb-4">Strategic Alert</h4>
                <p className="text-base text-foreground/80 font-bold leading-tight mb-4">
                    Conversion potential is high today. Review new leads for maximum impact.
                </p>
                <div className="w-full h-1 bg-emerald-500/20 rounded-full overflow-hidden">
                    <div className="w-[60%] h-full bg-emerald-500" />
                </div>
            </div>

            <div className="relative p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-125 transition-transform">
                    <FileText className="w-16 h-16 text-primary" />
                </div>
                <h4 className="font-black text-primary uppercase tracking-widest text-[11px] mb-4">Content Pulse</h4>
                <p className="text-base text-foreground/80 font-bold leading-tight mb-4">
                    Your audience is engaging! Broadcast new insights to maintain authority.
                </p>
                <div className="w-full h-1 bg-primary/20 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-primary" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
