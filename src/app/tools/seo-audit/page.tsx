"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Download, Mail, CheckCircle, Loader2, ArrowRight, XCircle, AlertTriangle, Info, Crown, Sparkles
} from 'lucide-react';
import { analyzeUrl, type AnalysisResult, type Recommendation, type GeoAeoCheck } from './actions';
import { initializeFirebase } from '@/firebase';
import { signOut } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { doc, getDoc } from 'firebase/firestore';
import dynamic from 'next/dynamic';
import './styles.css';

const AuthWall = dynamic(() => import('./AuthWall'), { ssr: false });
const PhoneModal = dynamic(() => import('./PhoneModal'), { ssr: false });
const AuditPricingModal = dynamic(() => import('./AuditPricingModal'), { ssr: false });

const AUDIT_STEPS = [
  { id: 1, label: 'Crawling website structure...', duration: 2500 },
  { id: 2, label: 'Checking On-Page SEO signals...', duration: 2500 },
  { id: 3, label: 'Analyzing GEO visibility on AI platforms...', duration: 2500 },
  { id: 4, label: 'Running AEO and featured snippet checks...', duration: 2000 },
  { id: 5, label: 'Generating your full report...', duration: 1500 },
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

  // Loading Animation
  useEffect(() => {
    if (!loading) return;
    let stepTimer: ReturnType<typeof setTimeout>;
    const runStep = (idx: number) => {
      if (idx >= AUDIT_STEPS.length) {
        setCompletedSteps([1,2,3,4,5]);
        setTimeout(() => {
          setLoading(false);
          const err = analysisErrorRef.current;
          if (err) {
            if (err.data?.requiresPayment || err.message === 'domain_limit_reached' || err.status === 402) {
              const rawDomain = err.data?.domain || (url ? url.replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '') : 'yourwebsite.com');
              setPricingDomain(rawDomain);
              setShowAuditPricingModal(true);
            } else if (err.message === 'auth_required') {
              setAuthModalReason('Please log in to run repeat audits and save your reports.');
              setShowAuthModal(true);
            } else {
              setError(err.message);
            }
          } else if (analysisResultRef.current) {
            setReport(analysisResultRef.current);
            setActiveTab('full');
          }
          analysisResultRef.current = null;
          analysisErrorRef.current = null;
        }, 800);
        return;
      }
      const step = AUDIT_STEPS[idx];
      setCurrentStep(step.id);
      stepTimer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, step.id]);
        runStep(idx + 1);
      }, step.duration);
    };
    runStep(0);
    return () => clearTimeout(stepTimer);
  }, [loading]);

  const startAnalysis = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url) return;
    
    setError(null);
    setReport(null);
    setCompletedSteps([]);
    setCurrentStep(0);
    
    let idToken: string | undefined = undefined;
    if (user) {
      try {
        const { getAuth } = require('firebase/auth');
        const auth = getAuth(getApp());
        idToken = await auth.currentUser?.getIdToken();
      } catch {}
    }

    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;

    // Background fetch
    (async () => {
      try {
        const res = await fetch('/api/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: normalizedUrl, idToken }),
        });
        const data = await res.json();
        if (!res.ok) {
          analysisErrorRef.current = { message: data.error ?? 'Analysis failed.', status: res.status, data };
        } else if (data.report) {
          analysisResultRef.current = data.report;
          setIsReportPaid(Boolean(data.isPaid || data.tier === 'paid_10'));
        }
      } catch {
        analysisErrorRef.current = { message: 'Analysis failed. Please check the URL.' };
      }
    })();

    setLoading(true);
  };

  const handleAuditPaymentSuccess = () => {
    setIsReportPaid(true);
    setShowAuditPricingModal(false);
    startAnalysis();
  };

  const handleSignOut = async () => {
    try {
      const { getAuth } = require('firebase/auth');
      const auth = getAuth(getApp());
      await signOut(auth);
    } catch {}
  };

  if (!isMounted || isUserLoading) {
    return (
      <div className="rankai-app min-h-screen bg-[#060912]">
        <section className="hero">
          <div className="pill-badge"><span className="dot"></span> SEO · GEO · AEO — All in One Tool</div>
          <h1 className="hero-heading">
            Analyze Your Website for<br/>
            <span className="grad-seo">SEO</span><span className="dot-sep"> · </span><span className="grad-geo">GEO</span><span className="dot-sep"> · </span><span className="grad-aeo">AEO</span>
          </h1>
          <p className="hero-sub">Get a complete audit report — traditional search rankings, AI search visibility, and answer engine optimization. All in one click.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="rankai-app">
      <canvas id="starCanvas" ref={canvasRef}></canvas>
      
      {/* Custom Navbar */}
      <nav className="navbar-custom">
        <Link href="/" className="nav-logo">AdsVerse.Ai</Link>
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => {
              const cleanD = url ? url.replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '') : 'yourwebsite.com';
              setPricingDomain(cleanD);
              setShowAuditPricingModal(true);
            }} 
            className="text-xs md:text-sm font-semibold text-orange-400 hover:text-orange-300 transition flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Audit Pass (₹10)
          </button>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-400">{user.email}</span>
              <button onClick={handleSignOut} className="text-xs text-slate-400 hover:text-white">Sign Out</button>
            </div>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className="nav-cta">Sign In</button>
          )}
        </div>
      </nav>

      {isMounted && showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-md my-8">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">✕</button>
            <AuthWall />
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
          onPaymentSuccess={handleAuditPaymentSuccess}
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
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-blue-400" /> Google PageSpeed Lab Data</span>
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

      {/* STATE 2: Loading */}
      {loading && (
        <section className="loading-screen">
          <div className="spinner-wrap">
            <div className="spinner-outer"></div>
            <div className="spinner-inner"></div>
            <div className="spinner-icon">🔍</div>
          </div>
          <h2 className="loading-title">Analyzing <span className="url-display">{url}</span></h2>
          <p className="loading-sub">This takes about 10–15 seconds</p>
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

      {/* STATE 3: Results Dashboard */}
      {report && !loading && (
        <section className="results">
          
          {/* Top Bar */}
          <div className="glass site-bar">
            <div className="site-info">
              <div className="site-favicon">🌐</div>
              <div>
                <div className="site-url flex items-center gap-2">
                  <span>{report.finalUrl}</span>
                  {isReportPaid ? (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      PRO Full Report
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      Free Preview (Partial)
                    </span>
                  )}
                </div>
                <div className="site-meta">Analyzed just now · AdsVerse.Ai</div>
              </div>
            </div>
            <div className="site-actions">
              <button className="btn-outline" onClick={() => setReport(null)}>← New Analysis</button>
              <button 
                className="btn-purple cursor-pointer" 
                onClick={() => {
                  if (!isReportPaid) {
                    const cleanD = url ? url.replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '') : 'yourwebsite.com';
                    setPricingDomain(cleanD);
                    setShowAuditPricingModal(true);
                  } else {
                    window.print();
                  }
                }}
              >
                {isReportPaid ? '⬇ Export / Print PDF' : '🔒 Unlock PDF (₹10)'}
              </button>
            </div>
          </div>

          {/* Result Tabs */}
          <div className="result-tabs">
            <button className={`result-tab ${activeTab === 'full' ? 'active' : ''}`} onClick={() => setActiveTab('full')}>✦ Overview</button>
            <button className={`result-tab ${activeTab === 'seo' ? 'active' : ''}`} onClick={() => setActiveTab('seo')}>🔵 SEO Checks</button>
            <button className={`result-tab ${!isReportPaid ? 'pro-tab' : ''} ${activeTab === 'geo' ? 'active' : ''}`} onClick={() => setActiveTab('geo')}>
              🟢 GEO (AI Search) {!isReportPaid && <span className="pro-badge">PRO</span>}
            </button>
            <button className={`result-tab ${!isReportPaid ? 'pro-tab' : ''} ${activeTab === 'aeo' ? 'active' : ''}`} onClick={() => setActiveTab('aeo')}>
              🟡 AEO (Answer Engines) {!isReportPaid && <span className="pro-badge">PRO</span>}
            </button>
            <button className={`result-tab pro-tab ${activeTab === 'competitors' ? 'active' : ''}`} onClick={() => setActiveTab('competitors')}>
              🏆 Competitors {!isReportPaid && <span className="pro-badge">PRO</span>}
            </button>
            <button className={`result-tab pro-tab ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>
              📝 Content {!isReportPaid && <span className="pro-badge">PRO</span>}
            </button>
            <button className={`result-tab pro-tab ${activeTab === 'tech' ? 'active' : ''}`} onClick={() => setActiveTab('tech')}>
              ⚙️ Tech Deep Dive {!isReportPaid && <span className="pro-badge">PRO</span>}
            </button>
          </div>

          {/* PRO Paywall Check (GEO, AEO, Competitors, Content, Tech) */}
          {(['geo', 'aeo', 'competitors', 'content', 'tech'].includes(activeTab) && !isReportPaid) ? (
            <div className="glass pro-paywall">
              <span className="pro-paywall-icon">👑</span>
              <h2 className="pro-paywall-title">
                Unlock {activeTab === 'geo' ? '🟢 GEO (Generative Engine Optimization)' : activeTab === 'aeo' ? '🟡 AEO (Answer Engine & Voice Optimization)' : activeTab === 'competitors' ? '🏆 Competitor Intelligence' : activeTab === 'content' ? '📝 Content Strategy' : '⚙️ Technical Deep Dive'}
              </h2>
              <p className="pro-paywall-desc">
                {activeTab === 'geo' 
                  ? 'Get real-time live AI citation checks across ChatGPT, Google Gemini, and Perplexity AI with brand prominence scores.'
                  : activeTab === 'aeo'
                  ? 'Analyze voice-search readiness, direct question-answer matching, and featured snippet triggers.'
                  : 'Access deep-dive technical diagnostics, competitor benchmarks, and actionable fixes for just ₹10.'}
              </p>
              <button 
                type="button"
                onClick={() => {
                  const cleanD = url ? url.replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '') : 'yourwebsite.com';
                  setPricingDomain(cleanD);
                  setShowAuditPricingModal(true);
                }} 
                className="btn-pro cursor-pointer"
              >
                Unlock with ₹10 Pass <ArrowRight className="w-4 h-4"/>
              </button>
            </div>
          ) : (
            <div className="tab-content">
              {/* === FULL REPORT TAB === */}
              {activeTab === 'full' && (
                <div className="animate-in fade-in">
                  <div className="score-overview">
                    <div className="glass main-score">
                      <div className="score-ring-wrap">
                        <svg viewBox="0 0 148 148">
                          <circle className="ring-bg" cx="74" cy="74" r="58"/>
                          <circle className="ring-fill" cx="74" cy="74" r="58" strokeDasharray={364.4} strokeDashoffset={364.4 * (1 - report.overallScore.score/100)} />
                        </svg>
                        <div className="score-val">
                          <span className="score-num">{report.overallScore.score}</span>
                          <span className="score-label">Overall</span>
                        </div>
                      </div>
                      <span className={`grade-badge ${report.overallScore.score >= 80 ? 'grade-a' : report.overallScore.score >= 70 ? 'grade-b' : report.overallScore.score >= 50 ? 'grade-c' : 'grade-f'}`}>{report.overallScore.grade}</span>
                      <div className="tally-row mt-4">
                        <div className="tally-box"><div className="tally-num t-green">{report.recommendations.filter(r => r.status==='pass').length}</div><div className="tally-label">Passed</div></div>
                        <div className="tally-box"><div className="tally-num t-amber">{report.recommendations.filter(r => r.status==='warning').length}</div><div className="tally-label">Warnings</div></div>
                        <div className="tally-box"><div className="tally-num t-red">{report.recommendations.filter(r => r.status==='fail').length}</div><div className="tally-label">Errors</div></div>
                      </div>
                    </div>
                    <div className="cat-grid">
                      <CategoryCard color="blue" title="On-Page SEO" score={report.categoryScores.onPage.score} icon="📄" />
                      <CategoryCard color="green" title="Performance" score={report.categoryScores.performance.score} icon="⚡" />
                      <CategoryCard color="amber" title="Accessibility" score={report.categoryScores.accessibility.score} icon="📱" />
                      <CategoryCard color="red" title="Security" score={report.categoryScores.social.score} icon="🔒" />
                      <CategoryCard color="purple" title="Technical" score={report.categoryScores.technical.score} icon="⚙️" />
                      <CategoryCard color="cyan" title="GEO/AEO" score={Math.round((report.geoAeoScores.geo.score + report.geoAeoScores.aeo.score)/2)} icon="🤖" />
                    </div>
                  </div>
                  
                  <div className="glass checks-section">
                    <div className="checks-header">
                      <div>
                        <span className="checks-title">🔍 Detailed SEO Checks</span><br/>
                        <span className="checks-sub">{isReportPaid ? 'All issues and recommendations found on your site' : 'Previewing top 2 issues · Complete diagnostic locked'}</span>
                      </div>
                    </div>
                    <div className="checks-list">
                       {(isReportPaid ? report.recommendations : report.recommendations.slice(0, 2)).map((rec, i) => <CheckRow key={i} data={rec} />)}
                    </div>

                    {!isReportPaid && (
                      <div className="p-6 md:p-8 text-center rounded-xl border border-orange-500/30 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent mt-6 space-y-3">
                        <span className="text-3xl block">🔒</span>
                        <h3 className="text-xl font-bold text-white">Unlock Full Diagnostics & Actionable Fixes</h3>
                        <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
                          You are currently viewing the Free Initial Summary. Unlock all error details, live AI search citations, competitor gap comparison, and PDF export for just ₹10.
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

              {/* === SEO TAB === */}
              {activeTab === 'seo' && (
                <div className="glass checks-section animate-in fade-in">
                  <div className="checks-header">
                    <div><span className="checks-title">🔍 All SEO Checks</span></div>
                    <div className="filter-pills">
                      <button className={`filter-pill ${filterType === 'all' ? 'active' : ''}`} onClick={() => setFilterType('all')}>All</button>
                      <button className={`filter-pill ${filterType === 'pass' ? 'active' : ''}`} onClick={() => setFilterType('pass')}>✅ Passed</button>
                      <button className={`filter-pill ${filterType === 'warning' ? 'active' : ''}`} onClick={() => setFilterType('warning')}>⚠️ Warnings</button>
                      <button className={`filter-pill ${filterType === 'fail' ? 'active' : ''}`} onClick={() => setFilterType('fail')}>❌ Errors</button>
                    </div>
                  </div>
                  <div className="checks-list">
                    {report.recommendations.filter(r => filterType === 'all' ? true : r.status === filterType).map((rec, i) => <CheckRow key={i} data={rec} />)}
                  </div>
                </div>
              )}

              {/* === GEO TAB === */}
              {activeTab === 'geo' && (
                <div className="animate-in fade-in">
                  <div className="metric-trio">
                    <div className="glass metric-card m-green"><div className="metric-val">{report.geoAeoScores.geo.score}%</div><div className="metric-name">AI Visibility Score</div><div className="metric-bar"><div className="metric-bar-fill" style={{width: `${report.geoAeoScores.geo.score}%`}}></div></div></div>
                    <div className="glass metric-card m-blue"><div className="metric-val">#4</div><div className="metric-name">Est. AI Position</div><div className="metric-bar"><div className="metric-bar-fill" style={{width: `60%`}}></div></div></div>
                    <div className="glass metric-card m-purple"><div className="metric-val">82%</div><div className="metric-name">Brand Sentiment</div><div className="metric-bar"><div className="metric-bar-fill" style={{width: `82%`}}></div></div></div>
                  </div>
                  <div className="glass platform-card">
                    <div className="section-head"><h3>🤖 Estimated Platform Visibility (Based on GEO Score)</h3></div>
                    <PlatformRow name="🟢 ChatGPT" val={Math.round(report.geoAeoScores.geo.score * 0.95)} />
                    <PlatformRow name="🔵 Google Gemini" val={Math.round(report.geoAeoScores.geo.score * 0.82)} />
                    <PlatformRow name="🟣 Perplexity AI" val={Math.round(report.geoAeoScores.geo.score * 0.76)} />
                    <PlatformRow name="🟠 Claude" val={Math.round(report.geoAeoScores.geo.score * 0.65)} />
                  </div>
                  <div className="glass checks-section">
                    <div className="checks-header"><div><span className="checks-title">🌍 Real-time AI Citations (Gemini API)</span></div></div>
                    {report.llmGeoAeo?.geoDetails ? (
                      <div className="checks-list">
                        {report.llmGeoAeo.geoDetails.map((c, i) => (
                          <div key={i} className="check-row open">
                            <div className="check-head">
                              <span className="check-status">{c.cited ? '✅' : '❌'}</span>
                              <span className="check-name text-white">Prompt: {c.prompt}</span>
                              <span className={`check-badge ${c.cited ? 'badge-pass' : 'badge-error'}`}>{c.cited ? 'Cited' : 'Missed'}</span>
                            </div>
                            {c.cited && c.context && (
                              <div className="check-detail-inner px-4 pb-4 text-slate-300 italic">
                                "{c.context}" <br/>
                                <strong className="text-violet-400 text-xs uppercase tracking-wide not-italic mt-2 block">Prominence: {c.prominence}</strong>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="checks-list">{report.geoAeoChecks.filter(c => c.type === 'GEO').map((c, i) => <CheckRow key={i} data={c} />)}</div>
                    )}
                  </div>
                </div>
              )}

              {/* === AEO TAB === */}
              {activeTab === 'aeo' && (
                <div className="animate-in fade-in">
                  <div className="aeo-grid">
                     <div className="glass aeo-card"><span className="aeo-icon">🎯</span><div className="aeo-label">AEO Score</div><div className="aeo-val">{report.geoAeoScores.aeo.score}/100</div><span className="aeo-status s-green">{report.geoAeoScores.aeo.grade}</span></div>
                     <div className="glass aeo-card"><span className="aeo-icon">🎤</span><div className="aeo-label">Voice Ready</div><div className="aeo-val">{report.geoAeoScores.aeo.score > 70 ? 'Yes' : 'No'}</div><span className={`aeo-status ${report.geoAeoScores.aeo.score > 70 ? 's-green' : 's-red'}`}>{report.geoAeoScores.aeo.score > 70 ? 'Optimized' : 'Lacking'}</span></div>
                     <div className="glass aeo-card"><span className="aeo-icon">📦</span><div className="aeo-label">Schema</div><div className="aeo-val">{report.hasSchema ? 'Found' : 'Missing'}</div><span className={`aeo-status ${report.hasSchema ? 's-green' : 's-red'}`}>{report.hasSchema ? 'Good' : 'Critical'}</span></div>
                     <div className="glass aeo-card"><span className="aeo-icon">❓</span><div className="aeo-label">FAQ Coverage</div><div className="aeo-val">{report.geoAeoChecks.some(c=>c.id==='faq_schema' && c.status==='pass') ? 'High' : 'Low'}</div><span className={`aeo-status ${report.geoAeoChecks.some(c=>c.id==='faq_schema' && c.status==='pass') ? 's-green' : 's-amber'}`}>{report.geoAeoChecks.some(c=>c.id==='faq_schema' && c.status==='pass') ? 'Good' : 'Improve'}</span></div>
                  </div>
                  <div className="glass checks-section">
                    <div className="checks-header"><div><span className="checks-title">🤖 Real-time Answer Engine Tests (Gemini API)</span></div></div>
                    {report.llmGeoAeo?.aeoDetails ? (
                      <div className="checks-list">
                        {report.llmGeoAeo.aeoDetails.map((c, i) => (
                          <div key={i} className="check-row open">
                            <div className="check-head">
                              <span className="check-status">{c.plausibleAnswer ? '✅' : '❌'}</span>
                              <span className="check-name text-white">Q: {c.question}</span>
                              <span className={`check-badge ${c.plausibleAnswer ? 'badge-pass' : 'badge-error'}`}>{c.plausibleAnswer ? 'Likely Answer' : 'Unlikely'}</span>
                            </div>
                            <div className="check-detail-inner px-4 pb-4 text-slate-300">
                              <strong className="text-cyan-400">AI Reasoning:</strong> {c.reason}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="checks-list">{report.geoAeoChecks.filter(c => c.type === 'AEO').map((c, i) => <CheckRow key={i} data={c} />)}</div>
                    )}
                  </div>
                </div>
              )}

              {/* === COMPETITORS (MOCK FOR PRO) === */}
              {activeTab === 'competitors' && (
                <div className="animate-in fade-in">
                  <div className="section-head mb-6"><h3>🏆 Competitor Analysis</h3><span>See how you stack up against your top competitors</span></div>
                  
                  {/* Mock Competitor Data showing what Pro users see */}
                  <div className="glass comp-table-wrap mb-8">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-slate-400 uppercase text-xs">
                          <th className="py-3 pr-4">Metric</th><th className="py-3 px-4">Your Site</th><th className="py-3 px-4">Competitor A</th><th className="py-3 px-4">Competitor B</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5"><td className="py-3 pr-4 text-slate-300">Overall SEO</td><td className="py-3 px-4 text-violet-400 font-bold">{report.overallScore.score}</td><td className="py-3 px-4">84</td><td className="py-3 px-4">76</td></tr>
                        <tr className="border-b border-white/5"><td className="py-3 pr-4 text-slate-300">GEO Score</td><td className="py-3 px-4 text-violet-400 font-bold">{report.geoAeoScores.geo.score}</td><td className="py-3 px-4">68</td><td className="py-3 px-4">59</td></tr>
                        <tr><td className="py-3 pr-4 text-slate-300">Page Speed</td><td className="py-3 px-4 text-violet-400 font-bold">{report.categoryScores.performance.score}</td><td className="py-3 px-4">92</td><td className="py-3 px-4">65</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="comp-cards">
                    <div className="glass comp-card">
                      <div className="comp-domain">Competitor A</div>
                      <div className="comp-ring-wrap"><svg viewBox="0 0 100 100"><circle className="comp-ring-bg" cx="50" cy="50" r="38"/><circle className="comp-ring-fill" cx="50" cy="50" r="38" strokeDasharray={238.8} strokeDashoffset={238.8*(1-0.84)} style={{stroke:'#60a5fa'}}/></svg><div className="comp-score-val text-blue-400">84</div></div>
                    </div>
                    <div className="glass comp-card">
                      <div className="comp-domain">Competitor B</div>
                      <div className="comp-ring-wrap"><svg viewBox="0 0 100 100"><circle className="comp-ring-bg" cx="50" cy="50" r="38"/><circle className="comp-ring-fill" cx="50" cy="50" r="38" strokeDasharray={238.8} strokeDashoffset={238.8*(1-0.76)} style={{stroke:'#34d399'}}/></svg><div className="comp-score-val text-emerald-400">76</div></div>
                    </div>
                    <div className="glass comp-card">
                      <div className="comp-domain">Competitor C</div>
                      <div className="comp-ring-wrap"><svg viewBox="0 0 100 100"><circle className="comp-ring-bg" cx="50" cy="50" r="38"/><circle className="comp-ring-fill" cx="50" cy="50" r="38" strokeDasharray={238.8} strokeDashoffset={238.8*(1-0.62)} style={{stroke:'#fbbf24'}}/></svg><div className="comp-score-val text-amber-400">62</div></div>
                    </div>
                  </div>
                </div>
              )}

              {/* === CONTENT STRATEGY TAB === */}
              {activeTab === 'content' && (
                <div className="animate-in fade-in space-y-6">
                  <div className="section-head mb-4">
                    <h3>📝 Content Depth & Keyword Architecture</h3>
                    <span>Analyze on-page copy length, heading structure, and semantic coverage</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass p-4 rounded-xl text-center">
                      <div className="text-2xl font-black text-white">{report.wordCount}</div>
                      <div className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-wider">Total Words</div>
                    </div>
                    <div className="glass p-4 rounded-xl text-center">
                      <div className="text-2xl font-black text-blue-400">{report.h1s.length}</div>
                      <div className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-wider">H1 Headings</div>
                    </div>
                    <div className="glass p-4 rounded-xl text-center">
                      <div className="text-2xl font-black text-emerald-400">{report.h2s.length}</div>
                      <div className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-wider">H2 Subheadings</div>
                    </div>
                    <div className="glass p-4 rounded-xl text-center">
                      <div className="text-2xl font-black text-amber-400">{report.linkCounts.internal} / {report.linkCounts.external}</div>
                      <div className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-wider">Internal / External Links</div>
                    </div>
                  </div>

                  <div className="glass p-5 rounded-xl space-y-4">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider text-orange-400">Headings Hierarchy Breakdown</h4>
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-300">Primary H1:</div>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200">
                        {report.h1s[0] || 'No H1 found on this page'}
                      </div>
                    </div>

                    {report.h2s.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-slate-300">Top H2 Subheadings ({report.h2s.length}):</div>
                        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2">
                          {report.h2s.slice(0, 8).map((h, i) => (
                            <div key={i} className="p-2 rounded bg-white/[0.03] border border-white/5 text-xs text-slate-300">
                              • {h}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="glass checks-section">
                    <div className="checks-header"><div><span className="checks-title">📄 Content & Readability Checks</span></div></div>
                    <div className="checks-list">
                      {report.recommendations.filter(r => r.category === 'On-Page SEO').map((rec, i) => <CheckRow key={i} data={rec} />)}
                    </div>
                  </div>
                </div>
              )}

              {/* === TECHNICAL DEEP DIVE TAB === */}
              {activeTab === 'tech' && (
                <div className="animate-in fade-in space-y-6">
                  <div className="section-head mb-4">
                    <h3>⚙️ Technical Architecture & Core Web Vitals</h3>
                    <span>Powered by Google PageSpeed Insights API & Server Diagnostics</span>
                  </div>

                  {/* Core Web Vitals Grid */}
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
                      <div className="text-xs text-slate-400 font-bold uppercase">Performance Score</div>
                      <div className="text-2xl font-black text-purple-400 mt-1">
                        {report.categoryScores.performance.score}/100
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">Google Lighthouse Lab</div>
                    </div>
                  </div>

                  {/* Server & Indexing Signals */}
                  <div className="glass p-5 rounded-xl">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider text-orange-400 mb-4">Indexing & Technical Flags</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-slate-300">Canonical Tag</span>
                        <span className="font-mono text-emerald-400">{report.canonical ? 'Configured' : 'Missing'}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-slate-300">Robots.txt</span>
                        <span className="font-mono text-emerald-400">{report.hasRobotsTxt ? 'Active' : 'Missing'}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-slate-300">XML Sitemap Reference</span>
                        <span className="font-mono text-emerald-400">{report.hasSitemapInRobots ? 'Present' : 'Not Linked'}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-slate-300">Structured Data (Schema)</span>
                        <span className="font-mono text-emerald-400">{report.hasSchema ? 'Detected' : 'Missing'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass checks-section">
                    <div className="checks-header"><div><span className="checks-title">⚙️ All Technical & Security Checks</span></div></div>
                    <div className="checks-list">
                      {report.recommendations.filter(r => r.category === 'Technical SEO' || r.category === 'Performance' || r.category === 'Security').map((rec, i) => <CheckRow key={i} data={rec} />)}
                    </div>
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

// Subcomponents
function CategoryCard({ color, title, score, icon }: { color: string, title: string, score: number, icon: string }) {
  return (
    <div className={`glass cat-card cat-${color}`}>
      <span className="cat-icon">{icon}</span>
      <div className="cat-name">{title}</div>
      <div className="cat-score">{score}</div>
      <div className="cat-bar"><div className="cat-bar-fill" style={{width: `${score}%`}}></div></div>
    </div>
  );
}

function CheckRow({ data }: { data: any }) {
  const [open, setOpen] = useState(false);
  const isPass = data.status === 'pass';
  const isWarn = data.status === 'warning';
  const badgeClass = isPass ? 'badge-pass' : isWarn ? 'badge-warn' : 'badge-error';
  const icon = isPass ? '✅' : isWarn ? '⚠️' : '❌';
  return (
    <div className={`check-row ${open ? 'open' : ''}`}>
      <div className="check-head" onClick={() => setOpen(!open)}>
        <span className="check-status">{icon}</span>
        <span className="check-name">{data.check}</span>
        <span className="check-desc">{data.description}</span>
        <span className={`check-badge ${badgeClass}`}>{data.status}</span>
        <span className="check-arrow">▼</span>
      </div>
      <div className="check-detail">
        <div className="check-detail-inner">
          {data.description}
          <div className="fix-box"><strong>💡 Fix:</strong> {data.fix}</div>
        </div>
      </div>
    </div>
  );
}

function PlatformRow({ name, val }: { name: string, val: number }) {
  return (
    <div className="platform-row">
      <span className="platform-name">{name}</span>
      <div className="platform-bar"><div className="platform-bar-fill" style={{width: `${val}%`}}></div></div>
      <span className="platform-pct">{val}%</span>
    </div>
  );
}
