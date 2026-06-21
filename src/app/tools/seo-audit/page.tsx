
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Smartphone, Zap, Share2, Wrench, CheckCircle, XCircle, AlertTriangle, 
  ChevronDown, ChevronUp, Download, Info, ShieldCheck, Bot, Mic, Brain, Sparkles,
  User, Mail, Phone, Globe, Lock, ArrowRight, Loader2
} from 'lucide-react';
import { analyzeUrl, type AnalysisResult, type Recommendation as RecommendationType, type GeoAeoCheck } from './actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

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

const ScoreBar = ({ label, score, color }: { label: string; score: number; color: string }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs font-medium">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-bold">{score}/100</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
        style={{ width: `${score}%` }}
      />
    </div>
  </div>
);

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

const GeoAeoCheckItem = ({ check }: { check: GeoAeoCheck }) => {
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
        <div className="flex items-center gap-3">
          {!check.passed && (
            <span className={`hidden md:inline text-xs px-2 py-0.5 rounded font-bold ${
              check.priority === 'High' ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' :
              check.priority === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
              'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400'
            }`}>{check.priority}</span>
          )}
          <Badge variant="outline" className={`text-[10px] ${check.type === 'GEO' ? 'border-violet-500 text-violet-500' : 'border-cyan-500 text-cyan-500'}`}>{check.type}</Badge>
          {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </div>
      </div>
      {isOpen && (
        <div className="mt-2 ml-4 md:ml-10 p-4 bg-muted/50 rounded text-sm text-muted-foreground border-l-4 border-violet-500 space-y-2">
          <p><strong>Description:</strong> {check.description}</p>
          <p className="text-foreground"><strong>How to fix:</strong> {check.fix}</p>
        </div>
      )}
    </div>
  );
};

const ReportSection = ({ id, icon: Icon, title, data, children }: { id: string, icon: React.ElementType, title: string, data: { score: number, grade: string, recommendations: RecommendationType[] }, children?: React.ReactNode }) => (
  <section id={id} aria-labelledby={`${id}-title`} className="bg-card rounded-lg shadow-sm border border-border mb-6 scroll-mt-24">
    <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between bg-card-foreground/5 rounded-t-lg">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${data.score > 80 ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400' : data.score > 50 ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <CardTitle id={`${id}-title`} className="text-lg font-bold text-foreground">{title}</CardTitle>
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
  </section>
);

const GeoAeoSection = ({ id, icon: Icon, title, score, grade, accentColor, checks, explanation, whatIs }: {
  id: string;
  icon: React.ElementType;
  title: string;
  score: number;
  grade: string;
  accentColor: string;
  checks: GeoAeoCheck[];
  explanation: string;
  whatIs: string;
}) => {
  const passed = checks.filter(c => c.passed).length;
  const total = checks.length;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`bg-card rounded-lg shadow-sm border mb-6 scroll-mt-24 ${accentColor.replace('text-', 'border-').replace('-500', '-500/30')}`}>
      <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between bg-card-foreground/5 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full bg-muted ${accentColor}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <CardTitle id={`${id}-title`} className="text-lg font-bold text-foreground">{title}</CardTitle>
            <p className="text-xs text-muted-foreground">{passed}/{total} checks passed</p>
          </div>
        </div>
        <GradeCircle grade={grade} score={score} size="small" />
      </CardHeader>
      <CardContent className="p-6">
        <div className={`mb-6 p-4 rounded-lg border bg-muted/30 border-border`}>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">What is {id.toUpperCase()}?</p>
          <p className="text-sm text-foreground font-medium">{whatIs}</p>
          <p className="text-xs text-muted-foreground mt-2">{explanation}</p>
        </div>
        <div>
          {checks.map((check, idx) => <GeoAeoCheckItem key={idx} check={check} />)}
        </div>
      </CardContent>
    </section>
  );
};

const AUDIT_STEPS = [
  { id: 1, label: 'Searching your website...', sub: 'Crawling pages, sitemap & robots.txt', icon: '🔍', duration: 18000 },
  { id: 2, label: 'Collecting on-page data...', sub: 'Reading titles, headings, meta tags & content', icon: '📡', duration: 22000 },
  { id: 3, label: 'Running GEO & AEO AI analysis...', sub: 'Checking AI readiness, schema & answer engine signals', icon: '🤖', duration: 24000 },
  { id: 4, label: 'Generating your report...', sub: 'Calculating scores & preparing recommendations', icon: '📊', duration: 8000 },
];

const SEOAuditPage = () => {
  const [url, setUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });
  const [contactErrors, setContactErrors] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [stepProgress, setStepProgress] = useState(0);
  const [report, setReport] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const analysisResultRef = useRef<AnalysisResult | null>(null);
  const analysisErrorRef = useRef<string | null>(null);

  const getRecsByCategory = (category: RecommendationType['category']) => {
    if (!report) return [];
    return report.recommendations.filter(r => r.category === category);
  }

  const getGeoChecks = () => report?.geoAeoChecks.filter(c => c.type === 'GEO') || [];
  const getAeoChecks = () => report?.geoAeoChecks.filter(c => c.type === 'AEO') || [];

  // Run 4-step animation while loading + background analysis
  useEffect(() => {
    if (!loading) return;

    // Start background analysis
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
    (async () => {
      try {
        const res = await analyzeUrl(normalizedUrl);
        analysisResultRef.current = res;
      } catch {
        analysisErrorRef.current = 'Analysis failed. The website may be blocking automated tools (e.g., Cloudflare) or is a JavaScript-heavy SPA. Please try again.';
      }
    })();

    let stepTimer: ReturnType<typeof setTimeout>;
    let progressTimer: ReturnType<typeof setInterval>;

    const runStep = (idx: number) => {
      if (idx >= AUDIT_STEPS.length) {
        setCurrentStep(4);
        setCompletedSteps([1, 2, 3, 4]);
        setTimeout(() => {
          setLoading(false);
          if (analysisErrorRef.current) {
            setError(analysisErrorRef.current);
          } else {
            setReport(analysisResultRef.current);
          }
          analysisResultRef.current = null;
          analysisErrorRef.current = null;
        }, 500);
        return;
      }
      const step = AUDIT_STEPS[idx];
      setCurrentStep(step.id);
      setStepProgress(0);
      const startTime = Date.now();
      progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min((elapsed / step.duration) * 100, 99);
        setStepProgress(pct);
      }, 80);
      stepTimer = setTimeout(() => {
        clearInterval(progressTimer);
        setStepProgress(100);
        setCompletedSteps(prev => [...prev, step.id]);
        setTimeout(() => runStep(idx + 1), 350);
      }, step.duration);
    };

    runStep(0);
    return () => { clearTimeout(stepTimer); clearInterval(progressTimer); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const validateContact = () => {
    const errs = { name: '', email: '' };
    let valid = true;
    if (!contactInfo.name.trim()) { errs.name = 'Name is required'; valid = false; }
    if (!contactInfo.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(contactInfo.email)) {
      errs.email = 'Valid email is required'; valid = false;
    }
    setContactErrors(errs);
    return valid;
  };

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setError(null);
    setShowModal(true);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;
    setShowModal(false);
    setReport(null);
    setError(null);
    setCurrentStep(0);
    setCompletedSteps([]);
    setStepProgress(0);
    analysisResultRef.current = null;
    analysisErrorRef.current = null;
    // Save lead to Firestore (non-blocking)
    try {
      const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
      const { firestore } = initializeFirebase();
      await addDoc(collection(firestore, 'audit_leads'), {
        name: contactInfo.name.trim(),
        email: contactInfo.email.trim(),
        phone: contactInfo.phone.trim() || null,
        website: normalizedUrl,
        submittedAt: serverTimestamp(),
        source: 'seo-audit-tool',
      });
    } catch (_) { /* non-blocking */ }
    setLoading(true);
  };

  const generatePdf = () => {
    if (!report) return;
    const doc = new jsPDF() as jsPDFWithAutoTable;

    const addHeader = () => {
        doc.setFontSize(22);
        doc.text("SEO + GEO + AEO Audit Report", 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.text(report.finalUrl, 105, 28, { align: 'center' });
        doc.line(15, 35, 195, 35);
    };

    const addFooter = () => {
        const pageCount = (doc.internal as any).pages.length;
        doc.setFontSize(8);
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.text(`Page ${i} of ${pageCount} | Generated by AdsVerse — adsverse.in`, 105, 285, { align: 'center' });
        }
    };

    addHeader();
    let yPos = 45;

    // Overall Score
    doc.setFontSize(16);
    doc.text("Overall SEO Score", 20, yPos);
    doc.setFontSize(40);
    let scoreColor = '#dc2626';
    if(report.overallScore.score >= 70) scoreColor = '#f59e0b';
    if(report.overallScore.score >= 90) scoreColor = '#16a34a';
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
        body: [
          ...Object.entries(report.categoryScores).map(([key, value]) => [key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'), `${value.score}/100`, value.grade]),
          ['GEO (AI Readiness)', `${report.geoAeoScores.geo.score}/100`, report.geoAeoScores.geo.grade],
          ['AEO (Answer Engine)', `${report.geoAeoScores.aeo.score}/100`, report.geoAeoScores.aeo.grade],
        ],
        theme: 'striped',
        headStyles: { fillColor: [142, 68, 173] },
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
    doc.text("SEO Audit Checklist", 20, yPos);
    yPos += 8;
    doc.autoTable({
        startY: yPos,
        head: [['Status', 'Check', 'Priority', 'Category']],
        body: report.recommendations.map(rec => [rec.passed ? 'PASS' : 'FAIL', rec.check, rec.priority, rec.category]),
        theme: 'striped',
        didParseCell: function(data: any) {
          if (data.column.index === 0 && data.cell.section === 'body') {
            if (data.cell.raw === 'PASS') {
              data.cell.styles.textColor = '#16a34a';
              data.cell.styles.fontStyle = 'bold';
            } else {
              data.cell.styles.textColor = '#dc2626';
              data.cell.styles.fontStyle = 'bold';
            }
          }
        },
    });

    // GEO + AEO section
    doc.addPage();
    addHeader();
    yPos = 45;
    doc.setFontSize(16);
    doc.text("GEO + AEO Checklist", 20, yPos);
    yPos += 8;
    doc.autoTable({
        startY: yPos,
        head: [['Status', 'Type', 'Check', 'Priority']],
        body: report.geoAeoChecks.map(c => [c.passed ? 'PASS' : 'FAIL', c.type, c.check, c.priority]),
        theme: 'striped',
        headStyles: { fillColor: [109, 40, 217] },
        didParseCell: function(data: any) {
          if (data.column.index === 0 && data.cell.section === 'body') {
            data.cell.styles.textColor = data.cell.raw === 'PASS' ? '#16a34a' : '#dc2626';
            data.cell.styles.fontStyle = 'bold';
          }
        },
    });

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
    doc.save(`SEO_GEO_AEO_Audit_${new URL(report.finalUrl).hostname}.pdf`);
  };

  const categoryIcons = {
      onPage: Search,
      technical: Wrench,
      performance: Zap,
      accessibility: Smartphone,
      social: Share2,
      security: ShieldCheck,
  }

  return (
    <div className="min-h-screen font-sans text-foreground">

      {/* ===== CONTACT MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)'}}>
          <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-violet-500/10 border border-violet-500/30 rounded-2xl mb-4">
                <Globe className="w-7 h-7 text-violet-400" />
              </div>
              <h2 className="text-2xl font-extrabold text-foreground mb-1">Get Your Free Report</h2>
              <p className="text-sm text-muted-foreground">We are analyzing:</p>
              <p className="text-sm font-bold text-violet-400 truncate mt-0.5">{url.replace(/^https?:\/\//, '')}</p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Your full name"
                    className={`pl-10 h-11 ${contactErrors.name ? 'border-red-500' : ''}`}
                    value={contactInfo.name}
                    onChange={e => { setContactInfo(p => ({...p, name: e.target.value})); setContactErrors(p => ({...p, name: ''})); }}
                  />
                </div>
                {contactErrors.name && <p className="text-red-500 text-xs mt-1">{contactErrors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className={`pl-10 h-11 ${contactErrors.email ? 'border-red-500' : ''}`}
                    value={contactInfo.email}
                    onChange={e => { setContactInfo(p => ({...p, email: e.target.value})); setContactErrors(p => ({...p, email: ''})); }}
                  />
                </div>
                {contactErrors.email && <p className="text-red-500 text-xs mt-1">{contactErrors.email}</p>}
              </div>

              {/* Phone - optional */}
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-2">
                  Phone Number
                  <span className="text-[10px] font-normal text-muted-foreground/60 normal-case">(optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="pl-10 h-11"
                    value={contactInfo.phone}
                    onChange={e => setContactInfo(p => ({...p, phone: e.target.value}))}
                  />
                </div>
                <p className="text-xs text-emerald-500 mt-1">📞 Add your number to get a free 15-min SEO consultation call</p>
              </div>

              {/* CTA */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-violet-600 to-primary hover:opacity-90 text-white font-bold text-base flex items-center justify-center gap-2 rounded-xl mt-2"
              >
                Get My Free Report <ArrowRight className="w-5 h-5" />
              </Button>

              {/* Trust badge */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-1">
                <Lock className="w-3.5 h-3.5" />
                Your data is 100% private and secure
              </div>
            </form>

            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl leading-none"
              aria-label="Close modal"
            >×</button>
          </div>
        </div>
      )}

      {!report && (
        <div className="pt-20 pb-32 text-center px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-bold px-3 py-1.5 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            SEO + GEO + AEO — The Complete Audit
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Free Website Audit Tool
          </h1>
          <p className="text-muted-foreground mb-3 max-w-2xl mx-auto">
            The only free audit tool that checks traditional <strong>SEO</strong>, <strong>GEO</strong> (AI search readiness), and <strong>AEO</strong> (Answer Engine Optimization) — all in one report.
          </p>

          {/* Pill tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 text-xs">
            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full">🔍 SEO Score</span>
            <span className="bg-violet-500/10 text-violet-400 border border-violet-500/30 px-3 py-1 rounded-full">🤖 GEO Score</span>
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full">🎙️ AEO Score</span>
            <span className="bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1 rounded-full">📊 PDF Report</span>
          </div>
          
          <form onSubmit={handleAudit} className="max-w-2xl mx-auto flex shadow-lg rounded-lg overflow-hidden bg-card border border-border p-1">
             <Input 
               type="url"
               className="flex-1 px-6 py-4 outline-none text-foreground bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
               placeholder="Enter website URL (e.g. adsverse.in)"
               aria-label="Website URL to audit"
               value={url}
               onChange={e => setUrl(e.target.value)}
               required
             />
             <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-bold flex items-center gap-2 rounded-md h-12">
               {loading ? 'Analyzing...' : 'Audit'} <Search size={18} />
             </Button>
          </form>

          {/* 4-Step Loading Animation */}
          {loading && (
            <div className="mt-12 max-w-md mx-auto">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Analyzing your website...</p>
              <div className="space-y-5">
                {AUDIT_STEPS.map((step) => {
                  const isDone = completedSteps.includes(step.id);
                  const isActive = currentStep === step.id && !isDone;
                  return (
                    <div key={step.id} className={`flex items-start gap-4 transition-opacity duration-300 ${!isDone && !isActive ? 'opacity-30' : 'opacity-100'}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg transition-all duration-300 ${
                        isDone ? 'bg-green-500/15 border border-green-500/40' :
                        isActive ? 'bg-violet-500/15 border border-violet-500/40 animate-pulse' :
                        'bg-muted border border-border'
                      }`}>
                        {isDone ? <CheckCircle className="w-5 h-5 text-green-500" /> : isActive ? <Loader2 className="w-5 h-5 text-violet-400 animate-spin" /> : <span>{step.icon}</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`text-sm font-bold ${isDone ? 'text-green-500' : isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</p>
                          {isActive && <span className="text-xs text-muted-foreground">{Math.round(stepProgress)}%</span>}
                          {isDone && <span className="text-xs text-green-500 font-bold">Done ✓</span>}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{step.sub}</p>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-200 ${
                              isDone ? 'bg-green-500 w-full' :
                              isActive ? 'bg-gradient-to-r from-violet-500 to-primary' : 'w-0'
                            }`}
                            style={isActive ? {width: `${stepProgress}%`} : undefined}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-8 animate-pulse">This usually takes 1–2 minutes. Please wait...</p>
            </div>
          )}

          {error && (
            <div className="mt-8 max-w-2xl mx-auto bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm" role="alert">
                <strong className="font-bold">Analysis Failed.</strong>
                <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          {/* Informational Guide */}
          <div className="mt-24 max-w-4xl mx-auto border-t border-border pt-16 text-left space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold font-headline text-foreground">SEO, GEO & AEO — What's the Difference?</h2>
              <p className="max-w-2xl mx-auto text-sm text-muted-foreground">
                The search landscape has evolved. In 2025, optimizing only for Google is no longer enough. AI-powered search engines, voice assistants, and answer engines are changing how people discover content. Our tool audits all three dimensions.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="space-y-3 bg-card border border-border rounded-xl p-5">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400"><Search className="w-5 h-5" /></div>
                <h3 className="text-lg font-semibold font-headline text-foreground">SEO — Search Engine Optimization</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Traditional SEO focuses on ranking in Google and Bing through on-page signals, technical health, backlinks, and page speed. It's the foundation that every website needs.
                </p>
              </div>
              <div className="space-y-3 bg-card border border-violet-500/30 rounded-xl p-5">
                <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center text-violet-400"><Bot className="w-5 h-5" /></div>
                <h3 className="text-lg font-semibold font-headline text-foreground">GEO — Generative Engine Optimization</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  GEO is about making your content citable by AI engines like ChatGPT, Google Gemini, and Perplexity. Author credibility, content depth, schema markup, and E-E-A-T signals are the key factors.
                </p>
              </div>
              <div className="space-y-3 bg-card border border-cyan-500/30 rounded-xl p-5">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400"><Mic className="w-5 h-5" /></div>
                <h3 className="text-lg font-semibold font-headline text-foreground">AEO — Answer Engine Optimization</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  AEO focuses on winning featured snippets, voice search results, and AI-generated answers. Question-style headings, FAQ schema, and concise direct-answer paragraphs are essential.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold font-headline text-foreground">1. On-Page SEO Checklist</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our instant auditing tool scans the HTML structure of your page. It analyzes critical metadata like the title tag, meta description, and header tags hierarchy (H1, H2, H3). These elements act as flags for Google's search crawlers, telling them what your content is about and how relevant it is to a searcher's query.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold font-headline text-foreground">2. Technical Crawlability</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Even with great content, technical issues can prevent search engines from indexing your pages. The tool checks for canonical links, robots.txt configuration, structured schema markup, and general accessibility rules that keep search bots happy.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold font-headline text-foreground">3. Core Web Vitals & Speed</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Website load speed and performance are official Google ranking factors. A slow site frustrates users and leads to high bounce rates. We analyze page speed metrics, image sizes, render-blocking scripts, and server response times.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold font-headline text-foreground">4. AI Search Readiness</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  As AI Overviews, ChatGPT search, and Perplexity become primary discovery channels, GEO and AEO readiness are becoming as important as traditional SEO. Our tool is among the first to audit all three in a single free report.
                </p>
              </div>
            </div>

            <div className="bg-card/40 border border-border rounded-xl p-6 text-center space-y-3">
              <h3 className="text-lg font-bold font-headline text-foreground">How to Use Your Audit Report</h3>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Once the audit is complete, you will receive an overall grade (A+ to F) and a detailed checklist of high, medium, and low-priority fixes across SEO, GEO, and AEO. You can download the complete report as a PDF and hand it to your development team, or contact our specialists at AdsVerse to execute the recommended optimization strategy.
              </p>
            </div>
          </div>
        </div>
      )}

      {report && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* Summary Card */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6 md:p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-8 items-center relative">
              <div className="absolute top-0 right-0 mt-2 mr-2">
                 <Button onClick={() => { setReport(null); setUrl(''); }} variant="outline" size="sm">New Audit</Button>
              </div>
              <div className="flex flex-col items-center text-center lg:w-1/3">
                 <h2 className="text-xl font-bold text-foreground mb-2 break-all">Report for: {report.finalUrl}</h2>
                 {report.redirected && <Badge variant="secondary" className='mb-4'>Redirected from {report.url}</Badge>}
                 <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide font-bold">Overall SEO Score</p>
                 <GradeCircle grade={report.overallScore.grade} score={report.overallScore.score} />
                 <p className={`mt-4 font-bold px-3 py-1 rounded text-sm ${report.overallScore.score < 70 ? 'text-red-500 bg-red-50 dark:bg-red-500/10' : 'text-green-500 bg-green-50 dark:bg-green-500/10'}`}>
                   {report.overallScore.score < 70 ? 'Needs Improvement' : 'Good Results!'}
                 </p>
              </div>

              <div className="flex-1 w-full space-y-6">
                {/* GEO + AEO score highlights */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-4 flex flex-col items-center text-center">
                    <Bot className="w-6 h-6 text-violet-400 mb-2" />
                    <p className="text-xs font-bold uppercase tracking-wide text-violet-400 mb-1">GEO Score</p>
                    <p className="text-3xl font-extrabold text-foreground">{report.geoAeoScores.geo.score}</p>
                    <p className="text-xs text-muted-foreground">AI Search Readiness</p>
                    <Badge className="mt-2 bg-violet-500/20 text-violet-300 border-0">{report.geoAeoScores.geo.grade}</Badge>
                  </div>
                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4 flex flex-col items-center text-center">
                    <Mic className="w-6 h-6 text-cyan-400 mb-2" />
                    <p className="text-xs font-bold uppercase tracking-wide text-cyan-400 mb-1">AEO Score</p>
                    <p className="text-3xl font-extrabold text-foreground">{report.geoAeoScores.aeo.score}</p>
                    <p className="text-xs text-muted-foreground">Answer Engine Ready</p>
                    <Badge className="mt-2 bg-cyan-500/20 text-cyan-300 border-0">{report.geoAeoScores.aeo.grade}</Badge>
                  </div>
                </div>

                {/* Score bars */}
                <div className="space-y-3">
                  <h3 className="font-bold text-sm text-foreground">SEO Category Breakdown</h3>
                  {Object.entries(report.categoryScores).map(([key, cat]) => (
                    <ScoreBar
                      key={key}
                      label={key.replace(/([A-Z])/g, ' $1').trim().charAt(0).toUpperCase() + key.replace(/([A-Z])/g, ' $1').trim().slice(1)}
                      score={cat.score}
                      color={cat.score >= 80 ? 'bg-green-500' : cat.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border text-center">
              <Button onClick={generatePdf} className="bg-accent text-accent-foreground py-2 rounded font-bold text-sm flex items-center justify-center gap-2">
                <Download size={14} /> Download Full PDF Report (SEO + GEO + AEO)
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-3">
              <div className="bg-card rounded-lg shadow-sm border border-border sticky top-24">
                <div className="p-4 border-b bg-card-foreground/5 font-bold text-foreground">Audit Sections</div>
                <nav className="p-2 text-sm">
                  <p className="px-3 py-1 text-[10px] uppercase tracking-wider text-muted-foreground font-bold">SEO Checks</p>
                  <a href="#on-page-seo" className="block px-3 py-2 text-muted-foreground hover:bg-accent/10 hover:text-primary rounded mb-1">On-Page SEO</a>
                  <a href="#technical-seo" className="block px-3 py-2 text-muted-foreground hover:bg-accent/10 hover:text-primary rounded mb-1">Technical SEO</a>
                  <a href="#performance" className="block px-3 py-2 text-muted-foreground hover:bg-accent/10 hover:text-primary rounded mb-1">Performance</a>
                  <a href="#accessibility" className="block px-3 py-2 text-muted-foreground hover:bg-accent/10 hover:text-primary rounded mb-1">Accessibility</a>
                  <a href="#security" className="block px-3 py-2 text-muted-foreground hover:bg-accent/10 hover:text-primary rounded mb-1">Security</a>
                  <a href="#social" className="block px-3 py-2 text-muted-foreground hover:bg-accent/10 hover:text-primary rounded mb-1">Structured Data & Social</a>
                  <p className="px-3 py-1 mt-2 text-[10px] uppercase tracking-wider text-violet-400 font-bold">AI Optimization</p>
                  <a href="#geo-report" className="block px-3 py-2 text-violet-400 hover:bg-violet-500/10 rounded mb-1">🤖 GEO Report</a>
                  <a href="#aeo-report" className="block px-3 py-2 text-cyan-400 hover:bg-cyan-500/10 rounded mb-1">🎙️ AEO Report</a>
                </nav>
              </div>
            </aside>

            <main className="lg:col-span-9 space-y-6">
              
              {/* Top Action Items */}
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

              <ReportSection id="security" icon={categoryIcons.security} title="Security" data={{...report.categoryScores.social, recommendations: getRecsByCategory('Security')}} />

              <ReportSection id="social" icon={categoryIcons.social} title="Structured Data & Social" data={{...report.categoryScores.social, recommendations: getRecsByCategory('Social')}} />

              {/* GEO Report */}
              <GeoAeoSection
                id="geo-report"
                icon={Bot}
                title="GEO — Generative Engine Optimization"
                score={report.geoAeoScores.geo.score}
                grade={report.geoAeoScores.geo.grade}
                accentColor="text-violet-500"
                checks={getGeoChecks()}
                whatIs="GEO is the practice of optimizing your content to be cited and referenced by AI-powered search engines like ChatGPT Search, Google Gemini, and Perplexity AI."
                explanation="Unlike traditional SEO which focuses on keyword rankings, GEO focuses on authority signals, content depth, structured data, and E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) — the factors AI models use to decide which sources to cite."
              />

              {/* AEO Report */}
              <GeoAeoSection
                id="aeo-report"
                icon={Mic}
                title="AEO — Answer Engine Optimization"
                score={report.geoAeoScores.aeo.score}
                grade={report.geoAeoScores.aeo.grade}
                accentColor="text-cyan-500"
                checks={getAeoChecks()}
                whatIs="AEO is the process of optimizing your content to appear as featured snippets, voice search results, and direct answers in Google, Alexa, and other AI assistants."
                explanation="Answer engines extract concise, accurate responses to specific queries. Pages with question-style headings, structured FAQ schema, organization markup, and short direct-answer paragraphs are most likely to be selected as the 'answer' shown to users."
              />

              <div id="off-page-seo" className="bg-card rounded-lg shadow-sm border border-border p-6 scroll-mt-24">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg font-bold text-foreground">Off-Page SEO</CardTitle>
                </CardHeader>
                <CardContent className='p-0'>
                  <p className='text-sm text-muted-foreground'>
                    Off-page SEO analysis, which includes checking backlinks and referring domains, requires access to massive, constantly updated databases of web data. These checks are beyond the scope of a real-time analysis tool and are best performed using specialized subscription services like Ahrefs or SEMrush.
                  </p>
                </CardContent>
              </div>

            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOAuditPage;
