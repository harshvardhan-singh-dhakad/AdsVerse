"use client";

import { useState, useEffect } from "react";
import { 
  Sparkles, RefreshCw, Target, TrendingUp, BookOpen, Lightbulb, 
  CheckCircle2, ArrowRight, ShieldAlert, Cpu, Globe, Zap, Clock,
  FileEdit, BarChart2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CompetitorKeyword {
  keyword: string;
  searchVolume: string;
  difficulty: string;
  intent: string;
  competitorWinner: string;
  adsverseAdvantage: string;
}

interface KeywordGap {
  topic: string;
  reason: string;
  priority: "High" | "Medium" | "Low";
}

interface BlogTopic {
  id: string;
  title: string;
  targetKeyword: string;
  category: string;
  outline: string[];
  whyItRanks: string;
}

interface RadarData {
  competitorKeywords?: CompetitorKeyword[];
  keywordGaps?: KeywordGap[];
  blogTopicSuggestions?: BlogTopic[];
  actionableTips?: string[];
  updatedAt?: any;
}

function VolumeBadge({ volume }: { volume: string }) {
  const isHigh = volume.toLowerCase().includes("high");
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
      isHigh ? "bg-red-500/15 text-red-400 border-red-500/30" : "bg-blue-500/15 text-blue-400 border-blue-500/30"
    }`}>
      {volume}
    </span>
  );
}

export function CompetitorRadar() {
  const [data, setData] = useState<RadarData | null>(null);
  const [cachedAt, setCachedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRadar = async () => {
    try {
      setError(null);
      const res = await fetch("/api/admin/competitor-radar");
      const json = await res.json();
      if (res.ok && json.radar) {
        setData(json.radar);
        if (json.cachedAt) {
          setCachedAt(new Date(json.cachedAt).toLocaleDateString("en-IN", {
            day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit"
          }));
        }
      } else {
        setError(json.error || "Failed to load radar data");
      }
    } catch (err: any) {
      setError("Network error loading radar");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/competitor-radar", { method: "POST" });
      const json = await res.json();
      if (res.ok && json.radar) {
        setData(json.radar);
        setCachedAt("Just now");
      } else {
        setError(json.error || "Failed to refresh insights");
      }
    } catch (err: any) {
      setError("Failed to generate fresh AI insights");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRadar();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-medium">
          Scanning Competitor Keywords & AI Insights for adsverse.in...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-violet-400" />
            <h2 className="text-2xl font-bold text-foreground">Competitor & AI Keyword Radar</h2>
            <Badge className="bg-violet-500/15 text-violet-400 border-violet-500/30 text-[10px] font-bold">
              Gemini 3.6 Flash
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Real-time competitor ranking intelligence & AI topic suggestions for <span className="text-foreground font-semibold">adsverse.in</span>.
          </p>
          {cachedAt && (
            <p className="text-xs text-muted-foreground/70 flex items-center gap-1 mt-1 font-mono">
              <Clock className="w-3 h-3" /> Last AI Sync: {cachedAt}
            </p>
          )}
        </div>
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold h-11 px-5 rounded-xl flex items-center gap-2 shrink-0 shadow-md transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Analyzing Market..." : "Refresh AI Insights"}
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1 text-muted-foreground text-xs font-semibold">
            <Globe className="w-4 h-4 text-blue-400" /> Target Region
          </div>
          <p className="text-lg font-black text-foreground">Indore & India</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1 text-muted-foreground text-xs font-semibold">
            <Target className="w-4 h-4 text-violet-400" /> Tracked Keywords
          </div>
          <p className="text-lg font-black text-violet-400">{data?.competitorKeywords?.length || 5} Primary</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1 text-muted-foreground text-xs font-semibold">
            <Zap className="w-4 h-4 text-amber-400" /> Unclaimed Gaps
          </div>
          <p className="text-lg font-black text-amber-400">{data?.keywordGaps?.length || 4} Gaps</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1 text-muted-foreground text-xs font-semibold">
            <BookOpen className="w-4 h-4 text-green-400" /> AI Blog Ideas
          </div>
          <p className="text-lg font-black text-green-400">{data?.blogTopicSuggestions?.length || 5} Ready</p>
        </div>
      </div>

      {/* Grid: Competitor Keywords & Keyword Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Competitor Keywords Table (2 cols) */}
        <Card className="lg:col-span-2 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-primary" />
              Target Competitor Keywords (Indore & India)
            </CardTitle>
            <CardDescription>
              High-intent keywords competitors are visible for, and AdsVerse winning strategy.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/30 text-muted-foreground uppercase text-[10px] font-bold tracking-wider">
                    <th className="p-4">Keyword</th>
                    <th className="p-4">Volume</th>
                    <th className="p-4">Competitor Status</th>
                    <th className="p-4">AdsVerse Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data?.competitorKeywords?.map((kw, i) => (
                    <tr key={i} className="hover:bg-muted/10 transition-colors">
                      <td className="p-4 font-semibold text-foreground font-mono">
                        {kw.keyword}
                      </td>
                      <td className="p-4">
                        <VolumeBadge volume={kw.searchVolume} />
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {kw.competitorWinner}
                      </td>
                      <td className="p-4 text-violet-400 font-medium">
                        {kw.adsverseAdvantage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Keyword Gaps & Actionable Tips (1 col) */}
        <div className="space-y-6">
          {/* Keyword Gaps */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Unclaimed Keyword Gaps
              </CardTitle>
              <CardDescription className="text-xs">
                Low competition, high-conversion opportunities in Indore & India.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {data?.keywordGaps?.map((gap, i) => (
                <div key={i} className="p-3.5 bg-muted/20 border border-border rounded-xl">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-bold text-xs text-foreground font-mono">{gap.topic}</p>
                    <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 text-[9px] px-1.5 py-0">
                      {gap.priority} Priority
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">{gap.reason}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actionable Admin Tips */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-green-400" />
                Admin Action Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {data?.actionableTips?.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Suggested Blog Topics */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-400" />
            AI Suggested Blog Topics (To Outrank Competitors)
          </CardTitle>
          <CardDescription>
            High-ranking article topics generated by Gemini 3.6 Flash. Review and publish from the <span className="text-foreground font-semibold">Blogs</span> tab.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.blogTopicSuggestions?.map((topic) => (
              <div
                key={topic.id}
                className="p-5 bg-muted/10 border border-border rounded-2xl flex flex-col justify-between hover:border-violet-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px] uppercase font-bold text-violet-400 border-violet-500/30">
                      {topic.category}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground font-mono">KW: {topic.targetKeyword}</span>
                  </div>
                  <h4 className="font-bold text-sm text-foreground mb-2 leading-snug">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {topic.whyItRanks}
                  </p>
                  <div className="space-y-1.5 mb-4 bg-card/60 p-3 rounded-xl border border-border/50">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Suggested Headings:</p>
                    <ul className="list-disc list-inside text-[11px] text-muted-foreground/90 space-y-1">
                      {topic.outline.map((h, i) => (
                        <li key={i} className="truncate">{h}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
