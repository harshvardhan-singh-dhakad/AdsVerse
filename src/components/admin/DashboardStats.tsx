
"use client";

import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/firebase";
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
        const collections = ["leads", "services", "portfolioItems", "blogPosts", "pricing"];
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
    <div className="space-y-10 pb-10">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="group bg-card/30 backdrop-blur-xl border-border/40 shadow-xl hover:shadow-primary/10 hover:border-primary/20 transition-all duration-500 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 -mt-10 -mr-10 rounded-full opacity-5 blur-3xl transition-opacity group-hover:opacity-20 ${stat.color.replace('text-', 'bg-')}`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold text-muted-foreground/60 uppercase tracking-widest">
                {stat.label}
              </CardTitle>
              <div className={cn("p-2 rounded-lg bg-background/50 border border-border/40", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
                {stat.count !== null ? stat.count : "0"}
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
                <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                  Live Sync
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-gradient-to-br from-card/50 to-card/20 backdrop-blur-3xl border-primary/10 shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
          <CardHeader className="relative z-10 p-8 pb-4">
            <div className="flex items-center gap-4 mb-2">
                <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-2xl shadow-2xl shadow-primary/40">
                    S
                </div>
                <div>
                   <CardTitle className="text-3xl font-black font-headline tracking-tight">SynergyFlow Admin</CardTitle>
                   <p className="text-muted-foreground font-medium">Elevating your digital presence with precision.</p>
                </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 p-8 pt-0 space-y-6">
            <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-2xl">
              Welcome back to your high-performance command center. From here, you control the narrative of your brand. 
              Analyze your leads, optimize your service delivery, and broadcast your expertise through the blog.
            </p>
            <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="px-4 py-2 bg-primary/5 border-primary/20 text-primary font-bold text-xs uppercase tracking-widest">
                    Performance Optimized
                </Badge>
                <Badge variant="outline" className="px-4 py-2 bg-secondary/5 border-secondary/20 text-muted-foreground font-bold text-xs uppercase tracking-widest">
                    SEO Friendly
                </Badge>
                <Badge variant="outline" className="px-4 py-2 bg-accent/5 border-accent/20 text-accent font-bold text-xs uppercase tracking-widest">
                    Real-time Data
                </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-xl group hover:bg-emerald-500/10 transition-all">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-500">
                        <Users className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-emerald-500 uppercase tracking-widest text-xs">Growth Opportunity</h4>
                </div>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    You have new leads waiting for review. Timely responses increase conversion rates by up to 40%.
                </p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 backdrop-blur-xl group hover:bg-blue-500/10 transition-all">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-500">
                        <FileText className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-blue-500 uppercase tracking-widest text-xs">Content Strategy</h4>
                </div>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Consistent blogging improves domain authority. Aim for at least one insight-driven post per week.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
