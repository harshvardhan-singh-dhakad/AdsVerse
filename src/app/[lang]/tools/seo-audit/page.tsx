
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, BarChart2, Smartphone, Zap, Share2, 
  CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp,
  Download
} from 'lucide-react';
import { analyzeUrl, type AnalysisResult, type Recommendation as RecommendationType } from './actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/* ===========================================
  CUSTOM SVG CHARTS & VISUALS
  ===========================================
*/

// 1. MAIN GRADE CIRCLE (The Big C+ Circle)
const GradeCircle = ({ grade, score, size = "large" }: { grade: string; score: number; size?: "large" | "small" }) => {
  const radius = size === "large" ? 50 : 25;
  const stroke = size === "large" ? 8 : 4;
  const normalizedScore = Math.max(0, Math.min(100, score));
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (normalizedScore / 100) * circumference;
  
  let colorClass = "text-red-500";
  if (score >= 90) colorClass = "text-green-500";
  else if (score >= 80) colorClass = "text-green-400";
  else if (score >= 70) colorClass = "text-yellow-500";
  else if (score >= 50) colorClass = "text-orange-500";

  return (
    <div className="relative flex items-center justify-center">
      <svg width={radius * 2 + 20} height={radius * 2 + 20} className="transform -rotate-90">
        <circle
          cx="50%" cy="50%" r={radius}
          stroke="hsl(var(--border))" strokeWidth={stroke} fill="transparent"
        />
        <circle
          cx="50%" cy="50%" r={radius}
          stroke="currentColor" strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${colorClass} transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-bold text-foreground ${size === "large" ? "text-4xl" : "text-xl"}`}>{grade}</span>
      </div>
    </div>
  );
};

// 2. RADAR CHART (Spider Chart)
const RadarChart = ({ data }: { data: AnalysisResult['categoryScores'] }) => {
  const categories = [
    { key: 'onPage', title: 'On-Page' },
    { key: 'performance', title: 'Performance' },
    { key: 'usability', title: 'Usability' },
    { key: 'social', title: 'Social' },
  ];
  const count = categories.length;
  const size = 200;
  const center = size / 2;
  const radius = 80;
  
  const getCoordinates = (value: number, index: number): [number, number] => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    const r = (value / 100) * radius;
    return [center + Math.cos(angle) * r, center + Math.sin(angle) * r];
  };

  const points = categories.map((cat, i) => getCoordinates(data[cat.key as keyof typeof data].score, i)).join(" ");

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grid */}
        {[20, 40, 60, 80, 100].map((level, i) => (
          <polygon key={i} points={categories.map((_, j) => {
              const [x, y] = getCoordinates(level, j);
              return `${x},${y}`;
            }).join(" ")}
            fill="none" stroke="hsl(var(--border))" strokeWidth="1"
          />
        ))}
        {/* Data Polygon */}
        <polygon points={points} fill="hsla(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Labels */}
        {categories.map((cat, i) => {
          const [x, y] = getCoordinates(115, i);
          return (
            <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-[10px] fill-muted-foreground font-medium uppercase">
              {cat.title}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// Check Item with Expand
const CheckItem = ({ check }: { check: RecommendationType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const getIcon = () => {
    if (check.passed) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (check.priority === 'High') return <XCircle className="w-5 h-5 text-red-500" />;
    if (check.priority === 'Medium') return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <AlertTriangle className="w-5 h-5 text-blue-400" />;
  };

  return (
    <div className="border-b border-border last:border-0 py-3">
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {getIcon()}
          <div>
            <h4 className="text-sm font-semibold text-foreground">{check.check}</h4>
          </div>
        </div>
        <div className="flex items-center gap-4">
           {!check.passed && <span className={`hidden md:inline text-xs px-2 py-0.5 rounded font-bold ${
             check.priority === 'High' ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' :
             check.priority === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
             'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400'
           }`}>{check.priority.toUpperCase()} PRIORITY</span>}
           <span className="hidden sm:block text-muted-foreground font-mono text-xs">{check.description}</span>
           {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </div>
      </div>
      {isOpen && (
        <div className="mt-2 ml-10 p-3 bg-muted/50 rounded text-xs text-muted-foreground border-l-2 border-primary">
          <p>{check.fix}</p>
        </div>
      )}
    </div>
  );
};


// Section Card
const ReportSection = ({ id, icon: Icon, title, data, children }: { id: string, icon: React.ElementType, title: string, data: { score: number, grade: string, recommendations: RecommendationType[] }, children?: React.ReactNode }) => (
  <div id={id} className="bg-card rounded-lg shadow-sm border border-border mb-6 scroll-mt-24">
    <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between bg-card-foreground/5 rounded-t-lg">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${data.score > 80 ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400' : data.score > 50 ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <CardTitle className="text-lg font-bold text-foreground">{title} Results</CardTitle>
                <p className="text-xs text-muted-foreground">Your {title} performance</p>
            </div>
        </div>
        <GradeCircle grade={data.grade} score={data.score} size="small" />
    </CardHeader>
    <CardContent className="p-6">
      {children && <div className="mb-6 pb-6 border-b border-border">{children}</div>}
      <div>
        {data.recommendations.map((rec, idx) => <CheckItem key={idx} check={rec} />)}
      </div>
    </CardContent>
  </div>
);

// Recommendation Row
const Recommendation = ({ item }: { item: RecommendationType }) => (
  <div className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-muted/50 px-2">
    <div className="flex items-center gap-2">
       <div className={`w-2 h-2 rounded-full ${item.priority === 'High' ? 'bg-red-500' : item.priority === 'Medium' ? 'bg-yellow-500' : 'bg-blue-400'}`}></div>
       <span className="text-sm font-medium text-foreground">{item.fix}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="hidden md:inline text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded uppercase tracking-wide">{item.category}</span>
      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide
        ${item.priority === 'High' ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400' : item.priority === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' : 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'}`}>
        {item.priority} Priority
      </span>
    </div>
  </div>
);

/* ===========================================
  MAIN APP
  ===========================================
*/
const SEOAuditPage = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Loading Animation
  useEffect(() => {
    if (loading) {
      let current = 0;
      const interval = setInterval(() => {
        if (current < 100) {
          setProgress(prev => Math.min(prev + 2, 98));
          current += 2;
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setReport(null);
    setError(null);
    setProgress(0);

    try {
      const res = await analyzeUrl(url);
      setProgress(100);
      setReport(res);
      
    } catch(e: any) {
        setError("Analysis failed. The target website might be blocking automated tools (e.g., using Cloudflare), or it might be a JavaScript-heavy Single-Page Application (SPA) that our tool cannot fully parse at the moment. Please try again with a different website.");
    } finally {
        setLoading(false);
    }
  };

  const getRecsByCategory = (category: RecommendationType['category']) => {
      if (!report) return [];
      return report.recommendations.filter(r => r.category === category);
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      
      {/* NAVBAR */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <BarChart2 className="w-7 h-7" />
            <span className="text-xl font-extrabold tracking-tight">SEO Audit Tool</span>
          </div>
          <div className="flex gap-4">
             {report && (
               <Button onClick={() => setReport(null)} variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary">New Audit</Button>
             )}
          </div>
        </div>
      </nav>

      {/* SEARCH / LOADING */}
      {!report && (
        <div className="pt-20 pb-32 text-center px-4 bg-gradient-to-b from-background to-background/80">
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            SEO Audit & Reporting Tool
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Enter a URL to generate a comprehensive SEO audit report.
          </p>
          
          <form onSubmit={handleAudit} className="max-w-2xl mx-auto flex shadow-lg rounded-lg overflow-hidden bg-card border border-border p-1">
             <Input 
               type="text" 
               className="flex-1 px-6 py-4 outline-none text-foreground bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
               placeholder="Enter website URL (e.g. adsverse.in)"
               value={url}
               onChange={e => setUrl(e.target.value)}
             />
             <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-bold flex items-center gap-2 rounded-md">
               {loading ? 'ANALYSING...' : 'AUDIT'} <Search size={18} />
             </Button>
          </form>

          {loading && (
            <div className="mt-8 max-w-lg mx-auto">
              <div className="flex justify-between text-xs font-bold text-muted-foreground mb-2">
                <span>ANALYZING WEBSITE</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-100" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-8 max-w-2xl mx-auto bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm" role="alert">
                <strong className="font-bold">Analysis Failed.</strong>
                <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}
        </div>
      )}

      {/* REPORT CONTENT */}
      {report && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* HEADER SUMMARY CARD */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              
              {/* Left: Grade */}
              <div className="flex flex-col items-center text-center lg:w-1/3">
                 <h2 className="text-xl font-bold text-foreground mb-6">Audit Results for {report.url}</h2>
                 <GradeCircle grade={report.overallScore.grade} score={report.overallScore.score} />
                 <p className={`mt-4 font-bold px-3 py-1 rounded text-sm ${report.overallScore.score < 70 ? 'text-red-500 bg-red-50 dark:bg-red-500/10' : 'text-green-500 bg-green-50 dark:bg-green-500/10'}`}>
                   {report.overallScore.score < 70 ? 'Your page could be better' : 'Good results!'}
                 </p>
              </div>

              {/* Right: Mockups & Radar */}
              <div className="flex-1 flex flex-col md:flex-row items-center justify-around w-full gap-8">
                
                {/* Mockup */}
                <div className="relative w-64 h-48 bg-muted rounded-lg border border-border shadow-inner flex items-center justify-center overflow-hidden">
                   <div className="absolute top-2 w-3/4 h-3/4 bg-background shadow-lg rounded border border-border">
                      <div className="h-2 bg-muted border-b"></div>
                      <div className="p-2 space-y-2">
                        <div className="h-2 w-1/2 bg-muted rounded"></div>
                        <div className="h-16 w-full bg-primary/10 rounded opacity-50"></div>
                      </div>
                   </div>
                   <div className="absolute bottom-2 right-4 w-12 h-24 bg-gray-800 rounded-lg shadow-xl border-2 border-gray-700 flex flex-col items-center pt-1">
                      <div className="w-4 h-0.5 bg-gray-600 rounded"></div>
                      <div className="w-10 h-20 bg-white mt-1 rounded-sm"></div>
                   </div>
                </div>

                <div className="hidden md:block">
                  <RadarChart data={report.categoryScores} />
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-border">
               {Object.entries(report.categoryScores).map(([key, cat]) => (
                 <div key={key} className="flex flex-col items-center">
                   <GradeCircle grade={cat.grade} score={cat.score} size="small" />
                   <span className="text-xs font-bold text-muted-foreground mt-2 uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* SIDEBAR */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-lg shadow-sm border border-border sticky top-24">
                <div className="p-4 border-b bg-card-foreground/5 font-bold text-foreground">Sections</div>
                <nav className="p-2 text-sm">
                  {Object.keys(report.categoryScores).map((key) => (
                    <a key={key} href={`#${key}`} className="block px-3 py-2 text-muted-foreground hover:bg-accent/10 hover:text-primary rounded mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </a>
                  ))}
                </nav>
                <div className="p-4 border-t mt-2">
                  <Button className="w-full bg-primary text-primary-foreground py-2 rounded font-bold text-sm mb-2 flex items-center justify-center gap-2">
                    <Download size={14} /> PDF
                  </Button>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* RECOMMENDATIONS */}
              <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Top Recommendations</h3>
                <div className="space-y-1">
                  {report.recommendations.filter(r => !r.passed).slice(0, 7).map((rec, i) => <Recommendation key={i} item={rec} />)}
                </div>
              </div>

              {/* SECTIONS */}
              <ReportSection id="onPage" icon={Search} title="On-Page SEO" data={{...report.categoryScores.onPage, recommendations: getRecsByCategory('On-Page SEO')}}>
                  <div className="space-y-2 text-sm">
                      <p><strong>Title:</strong> {report.title}</p>
                      <p><strong>Meta Description:</strong> {report.metaDescription}</p>
                      <p><strong>Headings:</strong> {report.h1s.length} H1s, {report.h2s.length} H2s, {report.h3s.length} H3s</p>
                      <p><strong>Word Count:</strong> {report.wordCount} words</p>
                  </div>
              </ReportSection>

              <ReportSection id="performance" icon={Zap} title="Performance" data={{...report.categoryScores.performance, recommendations: getRecsByCategory('Performance')}} />

              <ReportSection id="usability" icon={Smartphone} title="Usability" data={{...report.categoryScores.usability, recommendations: getRecsByCategory('Usability')}} />

              <ReportSection id="social" icon={Share2} title="Social" data={{...report.categoryScores.social, recommendations: getRecsByCategory('Social')}} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOAuditPage;
