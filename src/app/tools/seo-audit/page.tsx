"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Download, Mail, CheckCircle, Loader2, ArrowRight, XCircle, AlertTriangle, Info, Crown
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
        }
      } catch {
        analysisErrorRef.current = { message: 'Analysis failed. Please check the URL.' };
      }
    })();

    setLoading(true);
  };

  const handleAuditPaymentSuccess = () => {
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
          onPaymentSuccess={handleAuditPaymentSuccess}
        />
      )}

      {/* STATE 1: Hero */}
      {!loading && !report && (
        <section className="hero">
          <div className="pill-badge"><span className="dot"></span> SEO · GEO · AEO — All in One Tool</div>
          <h1 className="hero-heading">
            Analyze Your Website for<br/>
            <span className="grad-seo">SEO</span><span className="dot-sep"> · </span><span className="grad-geo">GEO</span><span className="dot-sep"> · </span><span className="grad-aeo">AEO</span>
          </h1>
          <p className="hero-sub">Get a complete audit report — traditional search rankings, AI search visibility, and answer engine optimization. All in one click.</p>

          <form onSubmit={startAnalysis} className="url-row focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20">
            <div className="url-input-wrap">
              <span className="text-xl mr-2 opacity-50">🌐</span>
              <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://yourwebsite.com" required />
            </div>
            <button type="submit" className="analyze-btn">Analyze Now →</button>
          </form>
          {error && <p className="text-red-400 text-sm mb-4 font-bold">{error}</p>}
          <p className="url-hint">Free · No signup required for 1st audit · Results in ~10 seconds</p>
        </section>
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
                <div className="site-url">{report.finalUrl}</div>
                <div className="site-meta">Analyzed just now · AdsVerse.Ai</div>
              </div>
            </div>
            <div className="site-actions">
              <button className="btn-outline" onClick={() => setReport(null)}>← New Analysis</button>
              <button className="btn-purple" onClick={() => alert('PDF feature coming soon')}>⬇ Export PDF</button>
            </div>
          </div>

          {/* Result Tabs */}
          <div className="result-tabs">
            <button className={`result-tab ${activeTab === 'full' ? 'active' : ''}`} onClick={() => setActiveTab('full')}>✦ Full Report</button>
            <button className={`result-tab ${activeTab === 'seo' ? 'active' : ''}`} onClick={() => setActiveTab('seo')}>🔵 SEO</button>
            <button className={`result-tab ${activeTab === 'geo' ? 'active' : ''}`} onClick={() => setActiveTab('geo')}>🟢 GEO</button>
            <button className={`result-tab ${activeTab === 'aeo' ? 'active' : ''}`} onClick={() => setActiveTab('aeo')}>🟡 AEO</button>
            <button className={`result-tab pro-tab ${activeTab === 'competitors' ? 'active' : ''}`} onClick={() => setActiveTab('competitors')}>🏆 Competitors <span className="pro-badge">PRO</span></button>
            <button className={`result-tab pro-tab ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>📝 Content <span className="pro-badge">PRO</span></button>
            <button className={`result-tab pro-tab ${activeTab === 'tech' ? 'active' : ''}`} onClick={() => setActiveTab('tech')}>⚙️ Tech Deep Dive <span className="pro-badge">PRO</span></button>
          </div>

          {/* PRO Paywall Check */}
          {(['competitors', 'content', 'tech'].includes(activeTab) && userPlan !== 'paid' && userPlan !== 'subscriber') ? (
            <div className="glass pro-paywall">
              <span className="pro-paywall-icon">👑</span>
              <h2 className="pro-paywall-title">Unlock Advanced {activeTab === 'competitors' ? 'Competitor Analysis' : activeTab === 'content' ? 'Content Strategy' : 'Technical Deep Dive'}</h2>
              <p className="pro-paywall-desc">Get instant access to advanced competitor intelligence, deep content gaps, and technical architecture diagnostics with the ₹10 Audit Pass.</p>
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
                      <div><span className="checks-title">🔍 Detailed SEO Checks</span><br/><span className="checks-sub">Top issues found on your site</span></div>
                    </div>
                    <div className="checks-list">
                       {report.recommendations.slice(0, 5).map((rec, i) => <CheckRow key={i} data={rec} />)}
                    </div>
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
