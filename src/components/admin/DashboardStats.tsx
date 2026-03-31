
"use client";

import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, IndianRupee, FileText, Loader2, ShieldAlert, BarChart3 } from "lucide-react";

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
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card/40 backdrop-blur-xl border-border/40 shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">
                {stat.count !== null ? stat.count : "--"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total records in database
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card/40 backdrop-blur-xl border-border/40 shadow-lg">
          <CardHeader>
              <CardTitle>Welcome to AdsVerse Admin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                  This dashboard gives you a high-level overview of your digital marketing presence. 
                  Use the sidebar to manage your leads, update your service offerings, showcase your latest work, and keep your audience engaged with blog posts.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <h4 className="font-semibold text-primary mb-1">Quick Tip</h4>
                      <p className="text-sm text-muted-foreground">
                          Regularly updating your portfolio and blog helps improve your SEO rankings and displays your latest achievements to potential clients.
                      </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/10">
                      <h4 className="font-semibold text-secondary-foreground mb-1">Lead Management</h4>
                      <p className="text-sm text-muted-foreground">
                          Don't forget to check the 'Leads' section daily to respond to potential client inquiries promptly.
                      </p>
                  </div>
              </div>
          </CardContent>
      </Card>
    </div>
  );
}
