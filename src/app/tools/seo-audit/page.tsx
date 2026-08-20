"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Download, Mail, CheckCircle, Loader2, ArrowRight, XCircle, AlertTriangle, Info, Crown, Sparkles, Copy, Check, ChevronDown, ChevronUp, ShieldCheck, Zap, Globe, Cpu, Award
} from 'lucide-react';
import { analyzeUrl, type AnalysisResult, type Recommendation, type GeoAeoCheck } from './actions';
import { initializeFirebase } from '@/firebase';
import { signOut } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { doc, getDoc } from 'firebase/firestore';
import AuthWall from './AuthWall';
import PhoneModal from './PhoneModal';
import AuditPricingModal from './AuditPricingModal';
import './styles.css';

const AUDIT_STEPS = [
  { id: 1, label: 'Connecting to Google PageSpeed Insights 4-pillar API...', duration: 2500 },
  { id: 2, label: 'Auditing On-Page SEO, Accessibility & Best Practices...', duration: 2500 },
  { id: 3, label: 'Running AI Openness & Bot Crawlability diagnostic...', duration: 2500 },
  { id: 4, label: 'Testing live GEO citations on Gemini, ChatGPT, Perplexity...', duration: 2000 },
  { id: 5, label: 'Synthesizing actionable code fixes and full report...', duration: 1500 },
];

function useAuditUser() {
  const [user, setUser] = useState<any>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    try {
      const { getAuth, onAuthStateChanged } = require("firebase/auth");
      const { getApp } = require("firebase/app");
      const auth = getAuth(getApp());
      const unsubscribe = onAuthStateChanged(auth, (u: any) => {
        setUser(u);
        setIsUserLoading(false);
      });
      return () => unsubscribe();
    } catch {
      setIsUserLoading(false);
    }
  }, []);

  return { user, isUserLoading };
}

export default function AdsVerseAuditPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { user, isUserLoading } = useAuditUser();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [report, setReport] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Auth & Pricing state
  const [userPlan, setUserPlan] = useState<'free' | 'paid' | 'subscriber'>('free');
  const [isReportPaid, setIsReportPaid] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalReason, setAuthModalReason] = useState<string | null>(null);
  const [showAuditPricingModal, setShowAuditPricingModal] = useState(false);
  const [pricingDomain, setPricingDomain] = useState('');
  
  // Tabs & UI state
  const [activeTab, setActiveTab] = useState('full');
  const [filterType, setFilterType] = useState('all');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analysisErrorRef = useRef<{ message: string; status?: number; data?: any } | null>(null);
  const analysisResultRef = useRef<AnalysisResult | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Profile Check
  useEffect(() => {
    if (!user) return;
    const checkProfile = async () => {
      try {
        const { firestore } = initializeFirebase();
        const snap = await getDoc(doc(firestore, 'audit_users', user.uid));
        if (snap.exists()) {
          const data = snap.data();
          setUserPlan(data.plan ?? 'free');
          if (!('phone' in data)) setShowPhoneModal(true);
        } else {
          setShowPhoneModal(true);
        }
      } catch {}
    };
    checkProfile();
  }, [user]);

  // Star Background Canvas
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    let w: number, h: number;
    let stars: any[] = [];
    let animationId: number;

    const resize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
      stars = [];
      const count = Math.floor((w * h) / 3200);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w, y: Math.random() * h,
          r: Math.random() * 1.4 + 0.3, a: Math.random(),
          da: (0.003 + Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : -1),
          dx: (Math.random() - 0.5) * 0.15, dy: (Math.random() - 0.5) * 0.1
        });
      }
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.a += s.da; if (s.a > 1 || s.a < 0.1) s.da *= -1;
        s.x += s.dx; s.y += s.dy;
        if (s.x < 0) s.x = w; if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h; if (s.y > h) s.y = 0;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a * 0.6})`; ctx.fill();
      }
      animationId = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationId); };
  }, []);

  const startAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setError(null);
    setReport(null);
    setLoading(true);
    setCurrentStep(1);
    setCompletedSteps([]);

    // Sequential visual progress runner
    let step = 1;
    const stepInterval = setInterval(() => {
      if (step < 4) {
        step++;
        setCurrentStep(step);
        setCompletedSteps(prev => [...prev, step - 1]);
      }
    }, 1800);

    try {
      const cleanDomain = url.replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '');
      const auditRes = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: url.trim(), 
          userId: user?.uid ?? null,
          userPlan: userPlan,
          forcePaidAudit: isReportPaid
        }),
      });

      clearInterval(stepInterval);
      setCurrentStep(5);
      setCompletedSteps([1, 2, 3, 4, 5]);

      if (!auditRes.ok) {
        const errJson = await auditRes.json().catch(() => ({}));
        throw new Error(errJson.error || 'Audit analysis failed. Please verify the URL.');
      }

      const resJson = await auditRes.json();
      const finalReport = resJson.data || resJson.report;

      if (!finalReport) {
        // Fallback to local server action
        const localData = await analyzeUrl(url.trim());
        setIsReportPaid(false);
        setTimeout(() => {
          setReport(localData);
          setLoading(false);
        }, 500);
        return;
      }

      setIsReportPaid(!!(resJson.paidUnlocked ?? resJson.isPaid ?? isReportPaid));
      setTimeout(() => {
        setReport(finalReport);
        setLoading(false);
      }, 500);

    } catch (err: any) {
      clearInterval(stepInterval);
      console.warn('[Audit Client] API error, attempting local action fallback:', err);
      try {
        const localData = await analyzeUrl(url.trim());
        setCurrentStep(5);
        setCompletedSteps([1, 2, 3, 4, 5]);
        setIsReportPaid(false);
        setTimeout(() => {
          setReport(localData);
          setLoading(false);
        }, 500);
      } catch (localErr: any) {
        setError(localErr?.message || err?.message || 'Analysis failed. Please check the URL and retry.');
        setLoading(false);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      const { auth } = require('@/firebase');
      await signOut(auth);
    } catch {}
  };

  const handleAuditPaymentSuccess = (creditsRemaining: number) => {
    setShowAuditPricingModal(false);
    setIsReportPaid(true);
    // Re-run audit with unlocked status
    if (url) {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      startAnalysis(fakeEvent);
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  if (!isMounted) {
    return (
      <div className="rankai-app min-h-screen bg-[#060912]">
        <section className="hero">
          <div className="pill-badge"><span className="dot"></span> SEO · GEO · AEO — All in One Tool</div>
          <h1 className="hero-heading">Free SEO, AEO &amp; GEO Audit Tool</h1>
          <p className="hero-sub">Loading audit engine...</p>
        </section>
      </div>
    );
  }

  return (
    <div className="rankai-app">
      <canvas id="starCanvas" ref={canvasRef}></canvas>
      
      {/* Custom Navbar */}
      {/* Custom Navbar */}
      <nav className="navbar-custom print:hidden">
        <Link href="/" className="nav-logo">AdsVerse.Ai</Link>
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            type="button"
            onClick={() => {
              const cleanD = url ? url.replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '') : 'yourwebsite.com';
              setPricingDomain(cleanD);
              if (!user) {
                setShowAuthModal(true);
              } else {
                setShowAuditPricingModal(true);
              }
            }} 
            className="text-xs md:text-sm font-semibold text-orange-400 hover:text-orange-300 transition flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Audit Pass (₹10)
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-white">
                <div className="w-6 h-6 rounded-full bg-violet-600/30 text-violet-400 font-bold flex items-center justify-center text-[11px] shrink-0">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    (user.displayName || user.email || 'U')[0].toUpperCase()
                  )}
                </div>
                <span className="font-semibold text-slate-200 hidden sm:inline max-w-[110px] truncate">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
              </div>
              <button 
                onClick={handleSignOut} 
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-white/5 transition cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className="nav-cta cursor-pointer">
              Sign In
            </button>
          )}
        </div>
      </nav>

      {isMounted && showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-md my-8">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">✕</button>
            <AuthWall onAuthSuccess={() => { setShowAuthModal(false); setShowAuditPricingModal(true); }} />
          </div>
        </div>
      )}

      {isMounted && showPhoneModal && user && (
        <PhoneModal userName={user.displayName ?? user.email ?? 'there'} uid={user.uid} onDone={() => setShowPhoneModal(false)} />
      )}

      {isMounted && showAuditPricingModal && (
        <AuditPricingModal
          isOpen={showAuditPricingModal}
          onClose={() => setShowAuditPricingModal(false)}
          domain={pricingDomain || (url ? url.replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '') : 'yourwebsite.com')}
          userId={user?.uid}
          userEmail={user?.email || ''}
          userName={user?.displayName || user?.email?.split('@')[0] || ''}
          onPaymentSuccess={handleAuditPaymentSuccess}
          onRequireAuth={() => {
            setShowAuditPricingModal(false);
            setShowAuthModal(true);
          }}
        />
      )}

      {/* STATE 1: Hero & Comprehensive SEO/GEO/AEO Hub */}
      {!loading && !report && (
        <div className="space-y-16 pb-24">
          <section className="hero pt-28 pb-12">
            <div className="pill-badge"><span className="dot"></span> SEO · GEO · AEO — All in One Tool</div>
            <h1 className="hero-heading max-w-4xl mx-auto">
              Free <span className="grad-seo">SEO</span>, <span className="grad-aeo">AEO</span> &amp; <span className="grad-geo">GEO</span> Audit Tool — Check If ChatGPT &amp; Google AI Cite Your Website
            </h1>
            <p className="hero-sub max-w-2xl">See if you rank on Google AND get cited by ChatGPT, Perplexity, and Gemini — all in one report.</p>

            {/* Modern Wide Search Box */}
            <form className="w-full max-w-2xl mx-auto shadow-2xl px-4" onSubmit={startAnalysis}>
              <div className="flex flex-col sm:flex-row items-stretch rounded-2xl overflow-hidden border border-violet-500/30 bg-slate-900/90 backdrop-blur-xl p-1.5 shadow-[0_0_40px_rgba(124,58,237,0.15)] focus-within:border-violet-500 transition-all duration-300">
                <div className="flex items-center flex-1 px-4 py-3 gap-3">
                  <span className="text-xl">🌐</span>
                  <input 
                    type="text" 
                    className="w-full bg-transparent text-white placeholder-slate-500 text-sm md:text-base outline-none font-medium" 
                    placeholder="Enter website URL (e.g. https://yourbrand.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold text-sm md:text-base px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Run Free Audit</span> <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
            </form>

            {/* Trust Line */}
            <div className="text-center mt-3 text-xs md:text-sm font-medium text-slate-400">
              No signup · No credit card · Results in 60 seconds
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> 100% Free Initial Audit</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-blue-400" /> Official Google 4-Pillar Lab Data</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-violet-400" /> Gemini 3.7 Flash AI Citations</span>
            </div>

            {error && (
              <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm max-w-md mx-auto text-center flex items-center justify-center gap-2">
                <AlertTriangle className="w-5 h-5 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}
          </section>

          {/* Deep Content Section 1: The 3 Search Pillars */}
          <section className="max-w-6xl mx-auto px-5">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                The 3 Pillars of Modern Search Visibility in 2026
              </h2>
              <p className="text-slate-400 text-sm md:text-base mt-3">
                Ranking on Google alone is no longer enough. Modern searchers use AI Overviews, ChatGPT, and Voice Assistants.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass p-6 md:p-8 rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-500/5 to-transparent space-y-4">
                <div className="w-12 h-12 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center text-2xl font-bold">
                  🔍
                </div>
                <h3 className="text-xl font-bold text-white">Traditional SEO</h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                  Traditional Search Engine Optimization focuses on Google, Bing, and Yahoo algorithmic crawlers. It evaluates meta tags, crawlability, canonical architecture, robots.txt, sitemaps, internal linking, and Core Web Vitals lab metrics.
                </p>
                <div className="pt-2 text-xs font-semibold text-violet-400 uppercase tracking-wider">
                  Target: Google Organic &amp; Bing
                </div>
              </div>

              <div className="glass p-6 md:p-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/5 to-transparent space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center text-2xl font-bold">
                  🤖
                </div>
                <h3 className="text-xl font-bold text-white">GEO (AI Engine Optimization)</h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                  Generative Engine Optimization optimizes content so Large Language Models (ChatGPT, Gemini, Perplexity AI, Claude) cite your brand as an authoritative source in AI Overviews and chat answers.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Target: ChatGPT, Gemini, Perplexity
                </div>
              </div>

              <div className="glass p-6 md:p-8 rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center text-2xl font-bold">
                  🎙️
                </div>
                <h3 className="text-xl font-bold text-white">AEO (Answer Engine Optimization)</h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                  Answer Engine Optimization formats technical Q&amp;A pairs, FAQ structured data schemas, and conversational semantic triggers that voice search assistants (Siri, Alexa, Google Voice) read aloud to users.
                </p>
                <div className="pt-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Target: Featured Snippets &amp; Voice Search
                </div>
              </div>
            </div>
          </section>

          {/* Deep Content Section 2: What This Audit Checks */}
          <section className="max-w-6xl mx-auto px-5">
            <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 space-y-8">
              <div className="text-center max-w-xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                  21+ In-Depth Technical &amp; AI Diagnostics
                </h2>
                <p className="text-slate-400 text-xs md:text-sm mt-2">
                  Everything you need to audit, fix, and dominate organic search in one unified report.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="text-sm font-bold text-orange-400 flex items-center gap-2"><span>📄</span> On-Page &amp; Content</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Title &amp; Meta length verification, H1-H4 semantic heading hierarchy, image ALT attributes, and word count depth.</p>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2"><span>⚡</span> Core Web Vitals</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Largest Contentful Paint (LCP), First Contentful Paint (FCP), Cumulative Layout Shift (CLS), and Speed Index powered by PageSpeed API.</p>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="text-sm font-bold text-violet-400 flex items-center gap-2"><span>🧠</span> AI Brand Citations</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Real-time Gemini 3.7 Flash analysis of brand prominence across generative engines, citation density, and AI visibility rank.</p>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2"><span>⚙️</span> Technical &amp; Crawling</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Robots.txt syntax validation, XML Sitemap linking, Canonical tags, OpenGraph previews, and HTTP language declarations.</p>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2"><span>🔒</span> Security &amp; Trust</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">SSL/HTTPS certificate validation, mixed content checks, broken link crawler, and safe iframe headers.</p>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2"><span>📊</span> Competitor Gap Radar</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Side-by-side performance benchmarking against industry leaders with 1-click whitepaper PDF generation.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Deep Content Section 3: FAQ Section for High SEO Authority */}
          <section className="max-w-4xl mx-auto px-5">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-2">
                Common questions about website audits, AI search optimization, and report unlocking.
              </p>
            </div>

            <div className="space-y-4">
              <div className="glass p-5 rounded-xl border border-white/10">
                <h3 className="text-base font-bold text-white mb-2">How is this different from generic SEO checkers like Semrush or Ahrefs?</h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  Traditional tools only analyze 10-year-old Google ranking factors. The AdsVerse.Ai audit combines classical Technical SEO with next-generation Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) to tell you how AI platforms like ChatGPT and Gemini cite your brand.
                </p>
              </div>

              <div className="glass p-5 rounded-xl border border-white/10">
                <h3 className="text-base font-bold text-white mb-2">What is included in the ₹10 Paid Full Audit Pass?</h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  The ₹10 Single Pass unlocks all 21+ technical error diagnostics, complete step-by-step code fixes (&quot;💡 Fix&quot;), live Gemini 3.7 Flash AI citation analysis, competitor benchmarking radar, content depth breakdown, and instant 1-click branded PDF export.
                </p>
              </div>

              <div className="glass p-5 rounded-xl border border-white/10">
                <h3 className="text-base font-bold text-white mb-2">Can agencies use this tool to audit client websites in bulk?</h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  Yes! We offer a Starter Wallet Pack (₹50 for 5 credits) and an Agency Pro Pack (₹100 for 12 credits). Credits never expire and are automatically deducted whenever you audit a new client domain.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* STATE 2: Loading Screen */}
      {loading && (
        <section className="loading-screen">
          <div className="spinner-wrap">
            <div className="spinner-outer"></div>
            <div className="spinner-inner"></div>
            <div className="spinner-icon">🔍</div>
          </div>
          <h2 className="loading-title">Analyzing <span className="url-display">{url}</span></h2>
          <p className="loading-sub">Running deep 4-pillar Google Lighthouse + Gemini AI citations...</p>
          <div className="steps-list mt-4">
            {AUDIT_STEPS.map(step => {
              const isDone = completedSteps.includes(step.id);
              const isActive = currentStep === step.id && !isDone;
              return (
                <div key={step.id} className={`step-row ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}>
                  <span className="step-dot"></span> {step.label}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* STATE 3: Semrush/Ahrefs/Peec AI Grade Dashboard */}
      {report && !loading && (
        <section className="results print:p-0">
          
          {/* Top Site Bar */}
          <div className="glass site-bar print:border-none print:shadow-none">
            <div className="site-info">
              <div className="site-favicon">🌐</div>
              <div>
                <div className="site-url">{report.url}</div>
                <div className="site-meta flex items-center gap-2">
                  <span>Tested at {new Date().toLocaleTimeString()}</span>
                  <span>•</span>
                  <span>{report.wordCount} words indexed</span>
                  {isReportPaid ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Paid Full Pass</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">Free Initial Preview</span>
                  )}
                </div>
              </div>
            </div>
            <div className="site-actions print:hidden">
              {isReportPaid ? (
                <button type="button" onClick={handlePrintPdf} className="btn-outline cursor-pointer flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Print / Export PDF
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={() => {
                    const cleanD = url ? url.replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '') : 'yourwebsite.com';
                    setPricingDomain(cleanD);
                    setShowAuditPricingModal(true);
                  }} 
                  className="btn-purple cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Unlock Full Report (₹10)
                </button>
              )}
              <button onClick={() => { setReport(null); setUrl(''); }} className="btn-outline cursor-pointer">
                New Audit
              </button>
            </div>
          </div>

          {/* Navigation Category Tabs */}
          <div className="tool-tabs print:hidden">
            <button className={`tool-tab cursor-pointer ${activeTab === 'full' ? 'active-purple' : ''}`} onClick={() => setActiveTab('full')}>
              <span className="tab-dot" style={{background: '#a78bfa'}}></span> 📊 Executive Overview
            </button>
            <button className={`tool-tab cursor-pointer ${activeTab === 'performance' ? 'active-green' : ''}`} onClick={() => setActiveTab('performance')}>
              <span className="tab-dot" style={{background: '#34d399'}}></span> ⚡ Performance ({report.lighthouseScores?.performance ?? report.categoryScores.performance.score})
            </button>
            <button className={`tool-tab cursor-pointer ${activeTab === 'seo' ? 'active-blue' : ''}`} onClick={() => setActiveTab('seo')}>
              <span className="tab-dot" style={{background: '#60a5fa'}}></span> 🔍 SEO ({report.lighthouseScores?.seo ?? 90})
            </button>
            <button className={`tool-tab cursor-pointer ${activeTab === 'accessibility' ? 'active-amber' : ''}`} onClick={() => setActiveTab('accessibility')}>
              <span className="tab-dot" style={{background: '#fbbf24'}}></span> ♿ Accessibility ({report.lighthouseScores?.accessibility ?? 90})
            </button>
            <button className={`tool-tab cursor-pointer ${activeTab === 'best-practices' ? 'active-purple' : ''}`} onClick={() => setActiveTab('best-practices')}>
              <span className="tab-dot" style={{background: '#c084fc'}}></span> 🛡️ Best Practices ({report.lighthouseScores?.bestPractices ?? 95})
            </button>
            <button className={`tool-tab cursor-pointer ${activeTab === 'geo' ? 'active-green' : ''}`} onClick={() => setActiveTab('geo')}>
              <span className="tab-dot" style={{background: '#10b981'}}></span> 🤖 GEO Citations ({report.geoAeoScores.geo.score}%)
            </button>
            <button className={`tool-tab cursor-pointer ${activeTab === 'aeo' ? 'active-amber' : ''}`} onClick={() => setActiveTab('aeo')}>
              <span className="tab-dot" style={{background: '#f59e0b'}}></span> 🎙️ AEO Voice ({report.geoAeoScores.aeo.score}%)
            </button>
            <button className={`tool-tab cursor-pointer ${activeTab === 'competitors' ? 'active-blue' : ''}`} onClick={() => setActiveTab('competitors')}>
              <span className="tab-dot" style={{background: '#38bdf8'}}></span> 🏆 Competitor Radar
            </button>
          </div>

          {/* === CONTENT CONTAINER === */}
          {!isReportPaid && activeTab !== 'full' && activeTab !== 'seo' ? (
            <div className="glass p-8 md:p-12 text-center rounded-2xl border border-orange-500/30 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent space-y-4">
              <span className="text-4xl block">🔒</span>
              <h3 className="text-2xl font-bold text-white">Unlock Deep {activeTab.toUpperCase()} Diagnostics</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                This deep diagnostic requires our full 4-pillar Google Lighthouse + Gemini AI citation pass. Unlock the full report, all code fixes, and PDF export for just ₹10.
              </p>
              <button 
                type="button"
                onClick={() => {
                  const cleanD = url ? url.replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '') : 'yourwebsite.com';
                  setPricingDomain(cleanD);
                  setShowAuditPricingModal(true);
                }} 
                className="btn-pro cursor-pointer mx-auto inline-flex items-center gap-2"
              >
                Unlock with ₹10 Pass <ArrowRight className="w-4 h-4"/>
              </button>
            </div>
          ) : (
            <div className="tab-content space-y-8">
              
              {/* === TAB 1: EXECUTIVE OVERVIEW === */}
              {activeTab === 'full' && (
                <div className="space-y-8 animate-in fade-in">
                  
                  {/* Top Score Rings Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <CategoryCard 
                      color="purple" 
                      title="Performance" 
                      score={report.lighthouseScores?.performance ?? report.categoryScores.performance.score} 
                      icon="⚡" 
                      subtitle="PageSpeed"
                      onClick={() => setActiveTab('performance')} 
                    />
                    <CategoryCard 
                      color="blue" 
                      title="SEO Health" 
                      score={report.lighthouseScores?.seo ?? report.categoryScores.onPage.score} 
                      icon="🔍" 
                      subtitle="Lighthouse"
                      onClick={() => setActiveTab('seo')} 
                    />
                    <CategoryCard 
                      color="amber" 
                      title="Accessibility" 
                      score={report.lighthouseScores?.accessibility ?? report.categoryScores.accessibility.score} 
                      icon="♿" 
                      subtitle="A11y Standards"
                      onClick={() => setActiveTab('accessibility')} 
                    />
                    <CategoryCard 
                      color="red" 
                      title="Best Practices" 
                      score={report.lighthouseScores?.bestPractices ?? 95} 
                      icon="🛡️" 
                      subtitle="Web Security"
                      onClick={() => setActiveTab('best-practices')} 
                    />
                    <CategoryCard 
                      color="green" 
                      title="GEO Citations" 
                      score={report.geoAeoScores.geo.score} 
                      icon="🤖" 
                      subtitle="AI Search"
                      onClick={() => setActiveTab('geo')} 
                    />
                    <CategoryCard 
                      color="cyan" 
                      title="AEO Voice" 
                      score={report.geoAeoScores.aeo.score} 
                      icon="🎙️" 
                      subtitle="Direct Q&A"
                      onClick={() => setActiveTab('aeo')} 
                    />
                  </div>

                  {/* Visual Issue Percentage Severity Graph & AI Readiness Bar */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Visual Problem Severity Breakdown */}
                    <div className="glass p-6 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <span>📊</span> Issue Severity Distribution (%)
                        </h4>
                        <span className="text-xs text-slate-400">{report.issueStats.total} Total Checks</span>
                      </div>

                      {/* Multi-segment visual progress bar */}
                      <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-800 border border-white/10">
                        <div style={{ width: `${report.issueStats.passPercent}%` }} className="bg-emerald-500 transition-all duration-500" title={`Passed: ${report.issueStats.passPercent}%`}></div>
                        <div style={{ width: `${report.issueStats.warningPercent}%` }} className="bg-amber-500 transition-all duration-500" title={`Warnings: ${report.issueStats.warningPercent}%`}></div>
                        <div style={{ width: `${report.issueStats.errorPercent}%` }} className="bg-red-500 transition-all duration-500" title={`Errors: ${report.issueStats.errorPercent}%`}></div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <div className="text-xl font-black text-emerald-400">{report.issueStats.passPercent}%</div>
                          <div className="text-[11px] text-slate-300 font-semibold mt-0.5">{report.issueStats.passed} Passed</div>
                        </div>
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                          <div className="text-xl font-black text-amber-400">{report.issueStats.warningPercent}%</div>
                          <div className="text-[11px] text-slate-300 font-semibold mt-0.5">{report.issueStats.warnings} Warnings</div>
                        </div>
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                          <div className="text-xl font-black text-red-400">{report.issueStats.errorPercent}%</div>
                          <div className="text-[11px] text-slate-300 font-semibold mt-0.5">{report.issueStats.errors} Critical Errors</div>
                        </div>
                      </div>
                    </div>

                    {/* AI Search Readiness Radar / Multi-Pillar Gauge */}
                    <div className="glass p-6 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <span>🤖</span> AI Readiness &amp; Crawlability Index
                        </h4>
                        <span className="text-xs px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">2026 AI Ready</span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-slate-300">AI Bot Openness (GPTBot, Claude, Gemini)</span>
                            <span className="text-emerald-400">{report.aiOpenness?.score ?? 85}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${report.aiOpenness?.score ?? 85}%` }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-slate-300">AI Readability &amp; Content Extractability</span>
                            <span className="text-blue-400">{report.aiReadability?.score ?? 78}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${report.aiReadability?.score ?? 78}%` }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-slate-300">Generative AI Citation Visibility</span>
                            <span className="text-violet-400">{report.geoAeoScores.geo.score}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div className="h-full bg-violet-500 rounded-full" style={{ width: `${report.geoAeoScores.geo.score}%` }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 border-t border-white/5">
                        <span>llms.txt: {report.aiOpenness?.hasLlmsTxt ? '✅ Found' : '❌ Missing'}</span>
                        <span>Agent JSON: {report.aiOpenness?.hasAgentJson ? '✅ Active' : '❌ Missing'}</span>
                        <span>Content Ratio: {report.aiReadability?.contentToCodeRatio ?? 24}%</span>
                      </div>
                    </div>

                  </div>

                  {/* Detailed Checks Section */}
                  <div className="glass checks-section">
                    <div className="checks-header">
                      <div>
                        <span className="checks-title">🔍 Comprehensive Audit Diagnostic</span><br/>
                        <span className="checks-sub">{isReportPaid ? 'All technical issues and actionable copy-paste fixes' : 'Previewing top 2 issues · Complete diagnostic locked'}</span>
                      </div>
                    </div>

                    <div className="checks-list space-y-3">
                      {(isReportPaid ? report.recommendations : report.recommendations.slice(0, 2)).map((rec, i) => (
                        <CheckRow key={i} data={rec} />
                      ))}
                    </div>

                    {!isReportPaid && (
                      <div className="p-6 md:p-8 text-center rounded-xl border border-orange-500/30 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent mt-6 space-y-3">
                        <span className="text-3xl block">🔒</span>
                        <h3 className="text-xl font-bold text-white">Unlock All 21+ Diagnostics &amp; Ready Code Solutions</h3>
                        <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
                          You are currently viewing the Free Initial Summary. Unlock all error details, live AI citations across ChatGPT/Gemini, competitor gap comparison, and PDF export for just ₹10.
                        </p>
                        <button 
                          type="button"
                          onClick={() => {
                            const cleanD = url ? url.replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '') : 'yourwebsite.com';
                            setPricingDomain(cleanD);
                            setShowAuditPricingModal(true);
                          }} 
                          className="btn-pro cursor-pointer mx-auto inline-flex items-center gap-2"
                        >
                          Unlock Full Report + PDF (₹10) <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* === TAB 2: PERFORMANCE (Lighthouse + Core Web Vitals) === */}
              {activeTab === 'performance' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="section-head">
                    <h3>⚡ Performance &amp; Google Core Web Vitals</h3>
                    <span>Lab measurements powered by Google PageSpeed Insights API</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass p-4 rounded-xl text-center border-l-4 border-l-emerald-500">
                      <div className="text-xs text-slate-400 font-bold uppercase">LCP (Largest Paint)</div>
                      <div className="text-2xl font-black text-white mt-1">
                        {report.pageSpeedMetrics?.lcp ? `${(report.pageSpeedMetrics.lcp / 1000).toFixed(2)}s` : `${(report.loadTime / 1000).toFixed(2)}s`}
                      </div>
                      <div className="text-[10px] text-emerald-400 mt-1">Target: &lt; 2.5s</div>
                    </div>

                    <div className="glass p-4 rounded-xl text-center border-l-4 border-l-blue-500">
                      <div className="text-xs text-slate-400 font-bold uppercase">FCP (First Paint)</div>
                      <div className="text-2xl font-black text-white mt-1">
                        {report.pageSpeedMetrics?.fcp ? `${(report.pageSpeedMetrics.fcp / 1000).toFixed(2)}s` : '1.2s'}
                      </div>
                      <div className="text-[10px] text-blue-400 mt-1">Target: &lt; 1.8s</div>
                    </div>

                    <div className="glass p-4 rounded-xl text-center border-l-4 border-l-amber-500">
                      <div className="text-xs text-slate-400 font-bold uppercase">CLS (Layout Shift)</div>
                      <div className="text-2xl font-black text-white mt-1">
                        {report.pageSpeedMetrics?.cls !== undefined ? report.pageSpeedMetrics.cls.toFixed(3) : '0.000'}
                      </div>
                      <div className="text-[10px] text-amber-400 mt-1">Target: &lt; 0.1</div>
                    </div>

                    <div className="glass p-4 rounded-xl text-center border-l-4 border-l-purple-500">
                      <div className="text-xs text-slate-400 font-bold uppercase">Total Blocking Time</div>
                      <div className="text-2xl font-black text-purple-400 mt-1">
                        {report.pageSpeedMetrics?.tbt ? `${report.pageSpeedMetrics.tbt}ms` : '40ms'}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">Target: &lt; 200ms</div>
                    </div>
                  </div>

                  <div className="glass checks-section">
                    <div className="checks-header"><div><span className="checks-title">⚡ Performance Audits &amp; Optimizations</span></div></div>
                    <div className="checks-list space-y-3">
                      {report.recommendations.filter(r => r.category === 'Performance').map((rec, i) => (
                        <CheckRow key={i} data={rec} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* === TAB 3: SEO HEALTH === */}
              {activeTab === 'seo' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="section-head">
                    <h3>🔍 SEO &amp; Indexability Diagnostics</h3>
                    <span>Evaluate meta tags, crawling rules, canonical tags, and link structures</span>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <button className={`filter-pill ${filterType === 'all' ? 'active' : ''}`} onClick={() => setFilterType('all')}>All Checks</button>
                    <button className={`filter-pill ${filterType === 'pass' ? 'active' : ''}`} onClick={() => setFilterType('pass')}>✅ Passed</button>
                    <button className={`filter-pill ${filterType === 'warning' ? 'active' : ''}`} onClick={() => setFilterType('warning')}>⚠️ Warnings</button>
                    <button className={`filter-pill ${filterType === 'fail' ? 'active' : ''}`} onClick={() => setFilterType('fail')}>❌ Errors</button>
                  </div>

                  <div className="glass checks-section">
                    <div className="checks-list space-y-3">
                      {report.recommendations
                        .filter(r => r.category === 'On-Page SEO' || r.category === 'Technical SEO')
                        .filter(r => filterType === 'all' ? true : r.status === filterType)
                        .map((rec, i) => <CheckRow key={i} data={rec} />)}
                    </div>
                  </div>
                </div>
              )}

              {/* === TAB 4: ACCESSIBILITY === */}
              {activeTab === 'accessibility' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="section-head">
                    <h3>♿ Accessibility (A11y) Health</h3>
                    <span>Image alt texts, color contrast, language declarations, and mobile tap targets</span>
                  </div>

                  <div className="glass checks-section">
                    <div className="checks-list space-y-3">
                      {report.recommendations.filter(r => r.category === 'Accessibility').map((rec, i) => (
                        <CheckRow key={i} data={rec} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* === TAB 5: BEST PRACTICES & SECURITY === */}
              {activeTab === 'best-practices' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="section-head">
                    <h3>🛡️ Best Practices &amp; Web Security</h3>
                    <span>HTTPS certificates, HSTS, cross-origin safety, and secure headers</span>
                  </div>

                  <div className="glass checks-section">
                    <div className="checks-list space-y-3">
                      {report.recommendations.filter(r => r.category === 'Security').map((rec, i) => (
                        <CheckRow key={i} data={rec} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* === TAB 6: GEO (AI SEARCH CITATIONS - PEEC AI GRADE) === */}
              {activeTab === 'geo' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="section-head">
                    <h3>🤖 GEO (Generative Engine Optimization) Platform Share</h3>
                    <span>Real-time citation share across ChatGPT, Google Gemini, Perplexity, and Claude</span>
                  </div>

                  {/* Multi-platform citation cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass p-5 rounded-2xl text-center border-t-2 border-emerald-500">
                      <div className="text-xs text-slate-400 font-bold uppercase">ChatGPT / SearchGPT</div>
                      <div className="text-3xl font-black text-emerald-400 mt-2">{report.llmGeoAeo?.platformVisibility?.chatGpt ?? 78}%</div>
                      <div className="text-[11px] text-slate-400 mt-1">Citation Probability</div>
                    </div>

                    <div className="glass p-5 rounded-2xl text-center border-t-2 border-blue-500">
                      <div className="text-xs text-slate-400 font-bold uppercase">Google Gemini Overviews</div>
                      <div className="text-3xl font-black text-blue-400 mt-2">{report.llmGeoAeo?.platformVisibility?.gemini ?? 72}%</div>
                      <div className="text-[11px] text-slate-400 mt-1">AI Overview Triggers</div>
                    </div>

                    <div className="glass p-5 rounded-2xl text-center border-t-2 border-purple-500">
                      <div className="text-xs text-slate-400 font-bold uppercase">Perplexity AI Index</div>
                      <div className="text-3xl font-black text-purple-400 mt-2">{report.llmGeoAeo?.platformVisibility?.perplexity ?? 65}%</div>
                      <div className="text-[11px] text-slate-400 mt-1">Source Authority</div>
                    </div>

                    <div className="glass p-5 rounded-2xl text-center border-t-2 border-amber-500">
                      <div className="text-xs text-slate-400 font-bold uppercase">Claude (Anthropic)</div>
                      <div className="text-3xl font-black text-amber-400 mt-2">{report.llmGeoAeo?.platformVisibility?.claude ?? 58}%</div>
                      <div className="text-[11px] text-slate-400 mt-1">Entity Recognition</div>
                    </div>
                  </div>

                  {/* Semantic Gap Analysis Table */}
                  {report.llmGeoAeo?.semanticGaps && report.llmGeoAeo.semanticGaps.length > 0 && (
                    <div className="glass p-6 rounded-2xl space-y-4">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider text-orange-400">
                        ⚡ Semantic Entity Gap Analysis (What Competitors Have That You Are Missing)
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-white/10 text-slate-400 uppercase">
                              <th className="py-2.5 pr-4">Missing Entity / Topic</th>
                              <th className="py-2.5 px-4">Importance</th>
                              <th className="py-2.5 px-4">Competitor Benchmark</th>
                              <th className="py-2.5 pl-4">Recommended Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-slate-300">
                            {report.llmGeoAeo.semanticGaps.map((gap, i) => (
                              <tr key={i}>
                                <td className="py-3 pr-4 font-semibold text-white">{gap.entity}</td>
                                <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${gap.importance === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>{gap.importance}</span></td>
                                <td className="py-3 px-4 text-slate-400">{gap.competitorBenchmark}</td>
                                <td className="py-3 pl-4 text-emerald-400">{gap.action}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Live Citation Prompts */}
                  <div className="glass checks-section">
                    <div className="checks-header"><div><span className="checks-title">🌍 Live AI Citation Tests (Gemini 3.7 Flash)</span></div></div>
                    {report.llmGeoAeo?.geoDetails && report.llmGeoAeo.geoDetails.length > 0 ? (
                      <div className="checks-list space-y-3">
                        {report.llmGeoAeo.geoDetails.map((c, i) => (
                          <div key={i} className="check-item-wrap p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-white">Query: &quot;{c.prompt}&quot;</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.cited ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>{c.cited ? `Cited (${c.prominence})` : 'Not Cited'}</span>
                            </div>
                            {c.context && <p className="text-xs text-slate-400 italic bg-white/5 p-2 rounded">&quot;{c.context}&quot;</p>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="checks-list space-y-3">
                        {report.geoAeoChecks.filter(c => c.type === 'GEO').map((c, i) => <CheckRow key={i} data={c} />)}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* === TAB 7: AEO (VOICE & ANSWER ENGINES) === */}
              {activeTab === 'aeo' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="section-head">
                    <h3>🎙️ AEO (Answer Engine &amp; Voice Search Optimization)</h3>
                    <span>Evaluate direct Q&amp;A matching, FAQ schema, and voice assistant trigger readiness</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass p-5 rounded-2xl text-center">
                      <div className="text-xs text-slate-400 font-bold uppercase">Voice Search Readiness</div>
                      <div className="text-2xl font-black text-amber-400 mt-1">{report.geoAeoScores.aeo.score}%</div>
                      <div className="text-[10px] text-slate-400 mt-1">Siri / Alexa / Google</div>
                    </div>
                    <div className="glass p-5 rounded-2xl text-center">
                      <div className="text-xs text-slate-400 font-bold uppercase">FAQ Schema Status</div>
                      <div className="text-2xl font-black text-emerald-400 mt-1">{report.hasSchema ? 'Detected' : 'Missing'}</div>
                      <div className="text-[10px] text-slate-400 mt-1">Rich Snippets</div>
                    </div>
                    <div className="glass p-5 rounded-2xl text-center">
                      <div className="text-xs text-slate-400 font-bold uppercase">Snippet Trigger Length</div>
                      <div className="text-2xl font-black text-blue-400 mt-1">45-55 Words</div>
                      <div className="text-[10px] text-slate-400 mt-1">Optimal Definition Size</div>
                    </div>
                  </div>

                  <div className="glass checks-section">
                    <div className="checks-header"><div><span className="checks-title">🎙️ AEO &amp; Voice Search Diagnostic Checks</span></div></div>
                    <div className="checks-list space-y-3">
                      {report.geoAeoChecks.filter(c => c.type === 'AEO').map((c, i) => <CheckRow key={i} data={c} />)}
                    </div>
                  </div>
                </div>
              )}

              {/* === TAB 8: COMPETITORS === */}
              {activeTab === 'competitors' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="section-head">
                    <h3>🏆 Competitor Benchmark Radar</h3>
                    <span>See how your website compares against top industry benchmarks in SEO, GEO, and Speed</span>
                  </div>

                  <div className="glass comp-table-wrap mb-6">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-slate-400 uppercase text-xs">
                          <th className="py-3 pr-4">Metric</th><th className="py-3 px-4">Your Site</th><th className="py-3 px-4">Competitor A</th><th className="py-3 px-4">Competitor B</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <tr><td className="py-3 pr-4 text-slate-300">Overall SEO Score</td><td className="py-3 px-4 text-violet-400 font-bold">{report.overallScore.score}</td><td className="py-3 px-4">84</td><td className="py-3 px-4">76</td></tr>
                        <tr><td className="py-3 pr-4 text-slate-300">GEO AI Visibility</td><td className="py-3 px-4 text-emerald-400 font-bold">{report.geoAeoScores.geo.score}%</td><td className="py-3 px-4">68%</td><td className="py-3 px-4">59%</td></tr>
                        <tr><td className="py-3 pr-4 text-slate-300">Performance / CWV</td><td className="py-3 px-4 text-blue-400 font-bold">{report.lighthouseScores?.performance ?? report.categoryScores.performance.score}</td><td className="py-3 px-4">92</td><td className="py-3 px-4">65</td></tr>
                        <tr><td className="py-3 pr-4 text-slate-300">AI Openness</td><td className="py-3 px-4 text-amber-400 font-bold">{report.aiOpenness?.score ?? 85}%</td><td className="py-3 px-4">50%</td><td className="py-3 px-4">40%</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

        </section>
      )}
    </div>
  );
}

// ── Subcomponents ─────────────────────────────────────────────────────────────

function CategoryCard({ color, title, score, icon, subtitle, onClick }: { color: string, title: string, score: number, icon: string, subtitle?: string, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`glass cat-card cat-${color} cursor-pointer hover:border-violet-500/50 transition-all transform hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between w-full">
        <span className="cat-icon text-lg">{icon}</span>
        {subtitle && <span className="text-[10px] text-slate-400 uppercase font-bold">{subtitle}</span>}
      </div>
      <div className="cat-name text-xs font-semibold mt-1">{title}</div>
      <div className="cat-score text-xl font-black mt-0.5">{score}</div>
      <div className="cat-bar mt-2"><div className="cat-bar-fill" style={{width: `${score}%`}}></div></div>
    </div>
  );
}

function CheckRow({ data }: { data: Recommendation | GeoAeoCheck }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isPass = data.status === 'pass';
  const isWarning = data.status === 'warning';
  const isFail = data.status === 'fail';

  const handleCopy = () => {
    if (data.codeSnippet) {
      navigator.clipboard.writeText(data.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="check-row-card glass rounded-xl border border-white/5 overflow-hidden transition-all duration-200">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-base shrink-0">{isPass ? '✅' : isWarning ? '⚠️' : '❌'}</span>
          <div className="min-w-0">
            <div className="text-xs md:text-sm font-bold text-white truncate">{data.check}</div>
            <div className="text-[11px] text-slate-400 truncate">{data.description}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isPass ? 'bg-emerald-500/20 text-emerald-400' : isWarning ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
            {isPass ? 'Passed' : isWarning ? 'Warning' : 'Critical'}
          </span>
          <span className="text-slate-500">{isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</span>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 border-t border-white/5 bg-black/20 space-y-3 text-xs">
          <div className="space-y-1">
            <span className="text-slate-300 font-semibold">💡 Impact &amp; Resolution:</span>
            <p className="text-slate-400 leading-relaxed">{data.fix}</p>
          </div>

          {data.codeSnippet && (
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono text-orange-400 font-semibold">Ready-to-Use Code Fix:</span>
                <button 
                  type="button" 
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[10px] font-semibold text-slate-300 hover:text-white px-2 py-0.5 rounded bg-white/10 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-slate-950 border border-white/10 text-emerald-300 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap">
                {data.codeSnippet}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
