"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs, onSnapshot, Timestamp, where } from "firebase/firestore";
import { initializeFirebase } from "@/firebase";
import {
  Crown, Users, TrendingUp, Activity, CheckCircle, XCircle, 
  Clock, Globe, Mail, Phone, Calendar, RefreshCw, Search,
  ChevronDown, ChevronUp, IndianRupee, BarChart3, AlertTriangle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Subscription {
  uid: string;
  plan: string;
  siteSlots: string[];
  status: "active" | "past_due" | "cancelled";
  razorpaySubscriptionId: string;
  currentPeriodEnd: Date | null;
  updatedAt: Date;
  phone?: string;
}

interface AuditReport {
  id: string;
  userId: string;
  url: string;
  createdAt: Date;
  tier: string;
  status: string;
  isScheduled?: boolean;
  scores?: { seo: number; geo: number; aeo: number; overall: number };
  trendDelta?: { seo: number; geo: number; aeo: number };
}

const PLAN_LABELS: Record<string, string> = {
  "1_site": "1 Website — ₹299/mo",
  "3_site": "3 Websites — ₹449/mo",
  "5_site": "5 Websites — ₹599/mo",
  "10_site": "10 Websites — ₹999/mo",
};

const PLAN_MRR: Record<string, number> = {
  "1_site": 299,
  "3_site": 449,
  "5_site": 599,
  "10_site": 999,
};

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    active: { label: "Active", className: "bg-green-500/15 text-green-400 border-green-500/30" },
    past_due: { label: "Past Due", className: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
    cancelled: { label: "Cancelled", className: "bg-red-500/15 text-red-400 border-red-500/30" },
  };
  const cfg = map[status] ?? { label: status, className: "bg-muted text-muted-foreground" };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

function ScorePill({ score, delta }: { score: number; delta?: number }) {
  const color = score >= 80 ? "text-green-400" : score >= 60 ? "text-amber-400" : "text-red-400";
  return (
    <span className={`font-bold text-xs ${color}`}>
      {score}
      {delta !== undefined && delta !== 0 && (
        <span className={`ml-1 text-[10px] ${delta > 0 ? "text-green-400" : "text-red-400"}`}>
          {delta > 0 ? `▲+${delta}` : `▼${delta}`}
        </span>
      )}
    </span>
  );
}

export function SubscriptionsPanel() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [reports, setReports] = useState<AuditReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedUid, setExpandedUid] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalActive: 0,
    totalPastDue: 0,
    totalCancelled: 0,
    mrr: 0,
    totalSites: 0,
    totalReports: 0,
  });

  useEffect(() => {
    const { firestore } = initializeFirebase();

    const subsUnsub = onSnapshot(
      query(collection(firestore, "subscriptions"), orderBy("updatedAt", "desc")),
      (snap) => {
        const data: Subscription[] = snap.docs.map((d) => {
          const raw = d.data();
          return {
            uid: raw.uid,
            plan: raw.plan,
            siteSlots: raw.siteSlots || [],
            status: raw.status,
            razorpaySubscriptionId: raw.razorpaySubscriptionId || "",
            currentPeriodEnd: raw.currentPeriodEnd instanceof Timestamp
              ? raw.currentPeriodEnd.toDate()
              : null,
            updatedAt: raw.updatedAt instanceof Timestamp ? raw.updatedAt.toDate() : new Date(),
            phone: raw.phone,
          };
        });
        setSubs(data);

        // Compute stats
        const active = data.filter((s) => s.status === "active");
        const mrr = active.reduce((acc, s) => acc + (PLAN_MRR[s.plan] || 0), 0);
        const totalSites = active.reduce((acc, s) => acc + s.siteSlots.length, 0);
        setStats({
          totalActive: active.length,
          totalPastDue: data.filter((s) => s.status === "past_due").length,
          totalCancelled: data.filter((s) => s.status === "cancelled").length,
          mrr,
          totalSites,
          totalReports: 0,
        });
        setLoading(false);
      }
    );

    // Fetch recent audit reports
    getDocs(query(collection(firestore, "audit_reports"), orderBy("createdAt", "desc"), limit(50))).then(
      (snap) => {
        const data: AuditReport[] = snap.docs.map((d) => {
          const raw = d.data();
          return {
            id: d.id,
            userId: raw.userId,
            url: raw.url,
            createdAt: raw.createdAt instanceof Timestamp ? raw.createdAt.toDate() : new Date(),
            tier: raw.tier,
            status: raw.status,
            isScheduled: raw.isScheduled,
            scores: raw.scores,
            trendDelta: raw.trendDelta,
          };
        });
        setReports(data);
        setStats((prev) => ({ ...prev, totalReports: snap.size }));
      }
    );

    return () => subsUnsub();
  }, []);

  const filtered = subs.filter(
    (s) =>
      !search ||
      s.uid.toLowerCase().includes(search.toLowerCase()) ||
      s.siteSlots.some((url) => url.toLowerCase().includes(search.toLowerCase())) ||
      s.razorpaySubscriptionId.toLowerCase().includes(search.toLowerCase())
  );

  const reportsForUser = (uid: string) => reports.filter((r) => r.userId === uid);

  const fmtDate = (d: Date | null) =>
    d
      ? d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
      : "—";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <RefreshCw className="w-6 h-6 animate-spin text-primary mr-2" />
        <span className="text-muted-foreground">Loading subscriptions...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* MRR Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Active Subs", value: stats.totalActive, icon: Crown, color: "text-violet-400" },
          { label: "MRR", value: `₹${stats.mrr.toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-green-400" },
          { label: "Tracked Sites", value: stats.totalSites, icon: Globe, color: "text-blue-400" },
          { label: "Past Due", value: stats.totalPastDue, icon: AlertTriangle, color: "text-amber-400" },
          { label: "Cancelled", value: stats.totalCancelled, icon: XCircle, color: "text-red-400" },
          { label: "Total Reports", value: stats.totalReports, icon: BarChart3, color: "text-cyan-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
            </div>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Plan Breakdown */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Plan Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(PLAN_LABELS).map(([key, label]) => {
            const count = subs.filter((s) => s.plan === key && s.status === "active").length;
            const revenue = count * (PLAN_MRR[key] || 0);
            return (
              <div key={key} className={`p-4 rounded-lg border ${count > 0 ? "border-primary/30 bg-primary/5" : "border-border bg-muted/10"}`}>
                <p className="text-xs font-bold text-muted-foreground mb-1">{label}</p>
                <p className="text-xl font-black text-foreground">{count}</p>
                <p className="text-xs text-green-400 mt-1 font-semibold">₹{revenue.toLocaleString("en-IN")}/mo</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search + Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">All Subscriptions</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {filtered.length} subscribers — Click a row to see their audit history
            </p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search UID, URL, sub ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-sm h-9"
            />
          </div>
        </div>

        <div className="divide-y divide-border">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Crown className="w-8 h-8 mx-auto mb-3 opacity-20" />
              <p className="text-sm">No subscriptions found.</p>
            </div>
          )}

          {filtered.map((sub) => {
            const userReports = reportsForUser(sub.uid);
            const isExpanded = expandedUid === sub.uid;
            const lastReport = userReports[0];

            return (
              <div key={sub.uid}>
                {/* Subscription Row */}
                <button
                  onClick={() => setExpandedUid(isExpanded ? null : sub.uid)}
                  className="w-full text-left p-5 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0">
                        <Crown className="w-4 h-4 text-violet-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-foreground font-mono truncate max-w-[180px]">
                            {sub.uid}
                          </p>
                          <StatusBadge status={sub.status} />
                          <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded font-semibold border border-border">
                            {PLAN_LABELS[sub.plan] || sub.plan}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {sub.siteSlots.length} site{sub.siteSlots.length !== 1 ? "s" : ""} tracked
                          </span>
                          {sub.currentPeriodEnd && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Renews: {fmtDate(sub.currentPeriodEnd)}
                            </span>
                          )}
                          {sub.razorpaySubscriptionId && (
                            <span className="text-xs text-muted-foreground font-mono">
                              {sub.razorpaySubscriptionId}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      {lastReport && (
                        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
                          <Activity className="w-3 h-3" />
                          Last audit: {fmtDate(lastReport.createdAt)}
                        </div>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded: tracked sites + audit history */}
                {isExpanded && (
                  <div className="border-t border-border bg-muted/10 p-5 space-y-4">
                    {/* Tracked Sites */}
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        Tracked Websites
                      </p>
                      {sub.siteSlots.length === 0 ? (
                        <p className="text-xs text-muted-foreground italic">No sites added yet.</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {sub.siteSlots.map((site, i) => (
                            <a
                              key={i}
                              href={site}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono bg-card border border-border px-3 py-1.5 rounded-lg text-primary hover:border-primary/50 transition-colors"
                            >
                              {site}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Audit History */}
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        Audit History ({userReports.length})
                      </p>
                      {userReports.length === 0 ? (
                        <p className="text-xs text-muted-foreground italic">No audits yet.</p>
                      ) : (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {userReports.slice(0, 15).map((rep) => {
                            const hostname = (() => {
                              try { return new URL(rep.url).hostname; } catch { return rep.url; }
                            })();
                            return (
                              <div
                                key={rep.id}
                                className="flex items-center justify-between p-3 bg-card border border-border rounded-lg text-xs gap-2"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  {rep.isScheduled && (
                                    <span className="text-[9px] bg-violet-500/10 text-violet-400 border border-violet-500/20 px-1.5 py-0.5 rounded font-bold shrink-0">
                                      AUTO
                                    </span>
                                  )}
                                  <span className="truncate text-muted-foreground font-mono">{hostname}</span>
                                  <span className="text-muted-foreground/50 shrink-0">{fmtDate(rep.createdAt)}</span>
                                </div>
                                {rep.scores && (
                                  <div className="flex items-center gap-3 shrink-0">
                                    <span className="text-muted-foreground">SEO: <ScorePill score={rep.scores.seo} delta={rep.trendDelta?.seo} /></span>
                                    <span className="text-muted-foreground">GEO: <ScorePill score={rep.scores.geo} delta={rep.trendDelta?.geo} /></span>
                                    <span className="text-muted-foreground">AEO: <ScorePill score={rep.scores.aeo} delta={rep.trendDelta?.aeo} /></span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
