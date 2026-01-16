
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, Smartphone, Zap, Share2, Wrench, CheckCircle, XCircle, AlertTriangle, 
  ChevronDown, ChevronUp, Download, Info
} from 'lucide-react';
import { analyzeUrl, type AnalysisResult, type Recommendation as RecommendationType } from '../../[lang]/tools/seo-audit/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Link from 'next/link';

interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
}

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
        <circle cx="50%" cy="50%" r={radius} stroke="hsl(var(--border))" strokeWidth={stroke} fill="transparent" />
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

const RadarChart = ({ data }: { data: AnalysisResult['categoryScores'] }) => {
  const categories = [
    { key: 'onPage', title: 'On-Page' },
    { key: 'technical', title: 'Technical' },
    { key: 'performance', title: 'Performance' },
    { key: 'accessibility', title: 'Accessibility' },
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
        {[20, 40, 60, 80, 100].map((level, i) => (
          <polygon key={i} points={categories.map((_, j) => getCoordinates(level, j).join(",")).join(" ")} fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
        ))}
        <polygon points={points} fill="hsla(var(--primary) / 0.2)" stroke="hsl(var(--primary))" strokeWidth="2" />
        {categories.map((cat, i) => {
          const [x, y] = getCoordinates(120, i);
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

const CheckItem = ({ check }: { check: RecommendationType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const getIcon = () => {
    if (check.passed) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (check.priority === 'High') return <XCircle className="w-5 h-5 text-red-500" />;
    if (check.priority === 'Medium') return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <Info className="w-5 h-5 text-blue-400" />;
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
           }`}>{check.priority}</span>}
           <span className="hidden sm:block text-muted-foreground font-mono text-xs max-w-xs truncate" title={check.description}>{check.description}</span>
           {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </div>
      </div>
      {isOpen && (
        <div className="mt-2 ml-4 md:ml-10 p-4 bg-muted/50 rounded text-sm text-muted-foreground border-l-4 border-primary space-y-2">
          <p><strong>Description:</strong> {check.description}</p>
          <p className="text-foreground"><strong>How to fix:</strong> {check.fix}</p>
        </div>
      )}
    </div>
  );
};

const ReportSection = ({ id, icon: Icon, title, data, children }: { id: string, icon: React.ElementType, title: string, data: { score: number, grade: string, recommendations: RecommendationType[] }, children?: React.ReactNode }) => (
  <div id={id} className="bg-card rounded-lg shadow-sm border border-border mb-6 scroll-mt-24">
    <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between bg-card-foreground/5 rounded-t-lg">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${data.score > 80 ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400' : data.score > 50 ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <CardTitle className="text-lg font-bold text-foreground">{title}</CardTitle>
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

const SEOAuditPage = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
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

  const generatePdf = () => {
    if (!report) return;
    const doc = new jsPDF() as jsPDFWithAutoTable;

    const addHeader = () => {
        doc.setFontSize(22);
        doc.text("SEO Audit Report", 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.text(report.url, 105, 28, { align: 'center' });
        doc.line(15, 35, 195, 35);
    };

    const addFooter = () => {
        const pageCount = (doc.internal as any).pages.length;
        doc.setFontSize(8);
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.text(`Page ${i} of ${pageCount} | Generated by AdsVerse`, 105, 285, { align: 'center' });
        }
    };

    addHeader();
    let yPos = 45;

    // Overall Score
    doc.setFontSize(16);
    doc.text("Overall Score", 20, yPos);
    doc.setFontSize(40);
    let scoreColor = '#dc2626'; // red-600
    if(report.overallScore.score >= 70) scoreColor = '#f59e0b'; // yellow-500
    if(report.overallScore.score >= 90) scoreColor = '#16a34a'; // green-600
    doc.setTextColor(scoreColor);
    doc.text(report.overallScore.grade, 20, yPos + 20);
    doc.setTextColor(0);
    doc.setFontSize(10);
    doc.text(`${report.overallScore.score}/100`, 20, yPos + 28);
    
    // Category Scores
    doc.autoTable({
        startY: yPos,
        margin: { left: 80 },
        head: [['Category', 'Score', 'Grade']],
        body: Object.entries(report.categoryScores).map(([key, value]) => [key.charAt(0).toUpperCase() + key.slice(1), `${value.score}/100`, value.grade]),
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185] },
    });
    yPos = (doc as any).lastAutoTable.finalY + 15;
    
    // Page Details
    doc.setFontSize(16);
    doc.text("Page Details", 20, yPos);
    yPos += 8;
    doc.autoTable({
        startY: yPos,
        body: [
            ['Title', doc.splitTextToSize(report.title, 160)],
            ['Meta Description', doc.splitTextToSize(report.metaDescription, 160)],
            ['Word Count', report.wordCount],
            ['Load Time', `${report.loadTime.toFixed(2)}s`],
            ['H1 Headings', report.h1s.join(', ')],
            ['Internal Links', report.linkCounts.internal],
            ['External Links', report.linkCounts.external],
        ],
        theme: 'grid',
    });
    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Full Recommendations
    doc.setFontSize(16);
    doc.text("Full Audit Checklist", 20, yPos);
    yPos += 8;
    doc.autoTable({
        startY: yPos,
        head: [['Status', 'Check', 'Priority', 'Category']],
        body: report.recommendations.map(rec => [rec.passed ? 'PASS' : 'FAIL', rec.check, rec.priority, rec.category]),
        theme: 'striped',
        didParseCell: function(data) {
          if (data.column.index === 0 && data.cell.section === 'body') {
            if (data.cell.raw === 'PASS') {
              data.cell.styles.textColor = '#16a34a'; // green
              data.cell.styles.fontStyle = 'bold';
            } else {
              data.cell.styles.textColor = '#dc2626'; // red
              data.cell.styles.fontStyle = 'bold';
            }
          }
        },
    });
    yPos = (doc as any).lastAutoTable.finalY + 15;
    
    // Fixes for failed checks
    const failedChecks = report.recommendations.filter(r => !r.passed);
    if (failedChecks.length > 0) {
        doc.addPage();
        addHeader();
        yPos = 45;
        doc.setFontSize(16);
        doc.text("Actionable Fixes", 20, yPos);
        yPos += 8;
        doc.autoTable({
            startY: yPos,
            head: [['Priority', 'Issue', 'How to Fix']],
            body: failedChecks.map(rec => [rec.priority, rec.check, doc.splitTextToSize(rec.fix, 120)]),
            theme: 'grid',
            headStyles: { fillColor: [220, 38, 38] },
        });
    }

    addFooter();
    doc.save(`SEO_Audit_${new URL(report.url).hostname}.pdf`);
  };

  const categoryIcons = {
      onPage: Search,
      technical: Wrench,
      performance: Zap,
      accessibility: Smartphone,
      social: Share2,
  }

  return (
    <div className="min-h-screen font-sans text-foreground">
      
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/tools/seo-audit" className="flex items-center gap-2 text-primary">
            <Zap className="w-7 h-7" />
            <span className="text-xl font-extrabold tracking-tight">SEO Audit Tool</span>
          </Link>
          <div className="flex gap-4">
             {report && (
               <Button onClick={() => setReport(null)} variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary">New Audit</Button>
             )}
          </div>
        </div>
      </nav>

      {!report && (
        <div className="pt-20 pb-32 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Free & Instant SEO Audit
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Enter a website URL to generate a comprehensive SEO report and uncover opportunities for improvement.
          </p>
          
          <form onSubmit={handleAudit} className="max-w-2xl mx-auto flex shadow-lg rounded-lg overflow-hidden bg-card border border-border p-1">
             <Input 
               type="url"
               className="flex-1 px-6 py-4 outline-none text-foreground bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
               placeholder="Enter website URL (e.g. adsverse.in)"
               value={url}
               onChange={e => setUrl(e.target.value)}
               required
             />
             <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-bold flex items-center gap-2 rounded-md h-12">
               {loading ? 'Analyzing...' : 'Audit'} <Search size={18} />
             </Button>
          </form>

          {loading && (
            <div className="mt-8 max-w-lg mx-auto">
              <div className="flex justify-between text-xs font-bold text-muted-foreground mb-2">
                <span>Analyzing Website...</span>
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

      {report && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          <div className="bg-card rounded-xl shadow-sm border border-border p-6 md:p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex flex-col items-center text-center lg:w-1/3">
                 <h2 className="text-xl font-bold text-foreground mb-6 break-all">Report for: {report.url}</h2>
                 <GradeCircle grade={report.overallScore.grade} score={report.overallScore.score} />
                 <p className={`mt-4 font-bold px-3 py-1 rounded text-sm ${report.overallScore.score < 70 ? 'text-red-500 bg-red-50 dark:bg-red-500/10' : 'text-green-500 bg-green-50 dark:bg-green-500/10'}`}>
                   {report.overallScore.score < 70 ? 'Needs Improvement' : 'Good Results!'}
                 </p>
              </div>

              <div className="flex-1 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-center items-center">
                    <RadarChart data={report.categoryScores} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-center md:text-left">Category Breakdown</h3>
                     {Object.entries(report.categoryScores).map(([key, cat]) => (
                       <div key={key} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                         <span className="text-sm font-medium text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                         <GradeCircle grade={cat.grade} score={cat.score} size="small" />
                       </div>
                     ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border text-center">
              <Button onClick={generatePdf} className="bg-accent text-accent-foreground py-2 rounded font-bold text-sm flex items-center justify-center gap-2">
                <Download size={14} /> Download Full PDF Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-3">
              <div className="bg-card rounded-lg shadow-sm border border-border sticky top-24">
                <div className="p-4 border-b bg-card-foreground/5 font-bold text-foreground">Audit Sections</div>
                <nav className="p-2 text-sm">
                  {Object.keys(report.categoryScores).map((key) => (
                    <a key={key} href={`#${key}`} className="block px-3 py-2 text-muted-foreground hover:bg-accent/10 hover:text-primary rounded mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <main className="lg:col-span-9 space-y-6">
              
              <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Top Action Items</h3>
                <div className="space-y-1">
                  {report.recommendations.filter(r => !r.passed).sort((a,b) => (a.priority === 'High' ? -1 : 1)).slice(0, 5).map((rec, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                         <div className={`w-2.5 h-2.5 rounded-full ${rec.priority === 'High' ? 'bg-red-500' : rec.priority === 'Medium' ? 'bg-yellow-500' : 'bg-blue-400'}`}></div>
                         <a href={`#${rec.category.toLowerCase().replace(/ /g,'-')}`} className="text-sm font-medium text-foreground hover:underline">{rec.check}</a>
                      </div>
                      <span className="hidden md:inline text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded uppercase tracking-wide">{rec.category}</span>
                    </div>
                  ))}
                   {report.recommendations.filter(r => !r.passed).length === 0 && <p className='text-sm text-muted-foreground'>No high-priority issues found. Great job!</p>}
                </div>
              </div>

              <ReportSection id="on-page-seo" icon={categoryIcons.onPage} title="On-Page SEO" data={{...report.categoryScores.onPage, recommendations: getRecsByCategory('On-Page SEO')}}>
                  <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong>Title:</strong> <span className='text-foreground'>{report.title || 'Not Found'}</span></p>
                      <p><strong>Meta Description:</strong> <span className='text-foreground'>{report.metaDescription || 'Not Found'}</span></p>
                      <div className='grid grid-cols-2 gap-x-4'>
                        <p><strong>H1s:</strong> <span className='text-foreground'>{report.h1s.length}</span></p>
                        <p><strong>H2s:</strong> <span className='text-foreground'>{report.h2s.length}</span></p>
                        <p><strong>H3s:</strong> <span className='text-foreground'>{report.h3s.length}</span></p>
                        <p><strong>H4s:</strong> <span className='text-foreground'>{report.h4s.length}</span></p>
                        <p><strong>Word Count:</strong> <span className='text-foreground'>{report.wordCount}</span></p>
                        <p><strong>Language:</strong> <span className='text-foreground'>{report.lang?.toUpperCase() || 'Not Declared'}</span></p>
                        <p><strong>Internal Links:</strong> <span className='text-foreground'>{report.linkCounts.internal}</span></p>
                        <p><strong>External Links:</strong> <span className='text-foreground'>{report.linkCounts.external}</span></p>
                      </div>
                  </div>
              </ReportSection>

              <ReportSection id="technical-seo" icon={categoryIcons.technical} title="Technical SEO" data={{...report.categoryScores.technical, recommendations: getRecsByCategory('Technical SEO')}} />

              <ReportSection id="performance" icon={categoryIcons.performance} title="Performance" data={{...report.categoryScores.performance, recommendations: getRecsByCategory('Performance')}} />

              <ReportSection id="accessibility" icon={categoryIcons.accessibility} title="Accessibility" data={{...report.categoryScores.accessibility, recommendations: getRecsByCategory('Accessibility')}} />

              <ReportSection id="social" icon={categoryIcons.social} title="Social" data={{...report.categoryScores.social, recommendations: getRecsByCategory('Social')}} />
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOAuditPage;

