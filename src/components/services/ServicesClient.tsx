"use client";

import { DM_CATEGORIES, AI_CATEGORIES, getServicePrice, getServiceSlug } from "@/lib/services-data";
import { useState, useMemo, useRef } from "react";
import { ArrowRight, Zap, TrendingUp, Star, Users, Loader2, ChevronLeft, ChevronRight, CheckCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

/* ─── Helpers ─────────────────────────────────────────────────────────── */
function hexToRgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

const CSS = `
:root{
  --bg:#ffffff;--bg2:#f4f7ff;--bg3:#edf1ff;--bg4:#e2e8ff;
  --tx1:#0f172a;--tx2:#1e293b;--tx3:#334155;--tx4:#64748b;
  --bd:#c8d3f0;--bd2:#b0bedd;
  --or:#f97316;--or-dim:rgba(249,115,22,.09);--or-glow:rgba(249,115,22,.18);
  --r:14px;--rsm:9px;--rxl:20px;
  --sh:0 4px 20px rgba(0,0,0,.07);
}
.dark{
  --bg:#070b14;--bg2:#0c1120;--bg3:#111827;--bg4:#162032;
  --tx1:#f1f5f9;--tx2:#e2e8f0;--tx3:#b8c5d6;--tx4:#8fa0b5;
  --bd:#1e2d45;--bd2:#253556;
  --or:#f97316;--or-dim:rgba(249,115,22,.12);--or-glow:rgba(249,115,22,.25);
  --sh:0 4px 28px rgba(0,0,0,.6);
}
.services-page{background:transparent;color:var(--tx1);font-family:var(--font-plus-jakarta),sans-serif;font-size:16px;line-height:1.7;min-height:100vh;width:100%;max-width:100vw;overflow-x:hidden;display:block}
.title-font{font-family:var(--font-instrument),sans-serif}
.wrap{max-width:1180px;margin:0 auto;padding:0 20px}
.section{padding:64px 0}

/* ── HERO ── */
.hero{position:relative;overflow:hidden;padding:96px 20px 72px;text-align:center;border-bottom:1px solid var(--bd)}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 55% at 50% -5%,rgba(249,115,22,.18) 0%,transparent 60%),radial-gradient(ellipse 50% 40% at 80% 80%,rgba(139,92,246,.1) 0%,transparent 55%);pointer-events:none}
.hero-pill{display:inline-flex;align-items:center;gap:8px;padding:6px 18px;border-radius:var(--rxl);background:rgba(249,115,22,.1);border:1px solid rgba(249,115,22,.3);font-size:12px;font-weight:700;color:var(--or);letter-spacing:.7px;text-transform:uppercase;margin-bottom:24px;backdrop-filter:blur(8px)}
.hero h1{font-size:clamp(2.4rem,5.5vw,4rem);font-weight:900;line-height:1.08;margin-bottom:20px;letter-spacing:-1px;font-family:var(--font-instrument),sans-serif}
.hero h1 em{font-style:normal;background:linear-gradient(135deg,#f97316 0%,#fb923c 50%,#fbbf24 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:18px;color:var(--tx2);max-width:620px;margin:0 auto 28px;line-height:1.7;font-weight:500}
.hero-intro-box{max-width:760px;margin:0 auto 40px;font-size:14.5px;color:var(--tx3);line-height:1.75;text-align:center;background:rgba(255,255,255,.06);border:1px solid var(--bd);padding:22px 28px;border-radius:var(--r);backdrop-filter:blur(12px)}
.dark .hero-intro-box{background:rgba(255,255,255,.03)}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}

/* ── STATS ── */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-bottom:1px solid var(--bd)}
.stat{background:var(--bg);padding:26px 20px;text-align:center;border-right:1px solid var(--bd);transition:background .2s}
.stat:hover{background:var(--bg2)}
.stat-n{font-family:var(--font-instrument),sans-serif;font-size:30px;font-weight:900;background:linear-gradient(135deg,#f97316,#fb923c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1}
.stat-l{font-size:12.5px;color:var(--tx2);margin-top:5px;font-weight:700}
.stat-s{font-size:10.5px;color:var(--tx4);margin-top:3px;text-transform:uppercase;font-weight:500;letter-spacing:0.5px}

/* ── TABS ── */
.main-tabs{display:flex;background:var(--bg2);border-bottom:2px solid var(--bd);position:sticky;top:56px;z-index:40;width:100%;max-width:100vw}
.main-tab{flex:1;padding:18px 24px;font-family:var(--font-instrument),sans-serif;font-size:15px;font-weight:700;border:none;background:transparent;color:var(--tx3);cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-2px;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px}
.main-tab.on{color:var(--or);border-bottom-color:var(--or);background:rgba(249,115,22,.05)}
.tab-count{background:var(--bg3);border:1px solid var(--bd);color:var(--tx4);font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px}

/* ── CATEGORY STRIP ── */
.cat-strip-wrap{background:var(--bg2);border-bottom:1px solid var(--bd);position:sticky;top:112px;z-index:39;width:100%;max-width:100vw}
.cat-strip{display:flex;gap:8px;padding:12px 40px;overflow-x:auto;scrollbar-width:none}
.cat-strip::-webkit-scrollbar{display:none}
.scroll-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:10;width:32px;height:32px;border-radius:50%;background:var(--bg2);border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;color:var(--tx1);cursor:pointer;transition:all .2s;box-shadow:0 4px 12px rgba(0,0,0,0.12)}
.scroll-arrow:hover{border-color:var(--or);color:var(--or)}
.scroll-arrow.left{left:8px}.scroll-arrow.right{right:8px}
.cat-btn{flex-shrink:0;padding:7px 16px;border-radius:var(--rsm);border:1.5px solid var(--bd);background:var(--bg3);color:var(--tx2);font-size:12.5px;font-weight:600;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:6px;white-space:nowrap}
.cat-btn:hover{border-color:var(--or);color:var(--or);background:var(--or-dim)}
.cat-btn.on{background:var(--or);border-color:var(--or);color:#fff;box-shadow:0 4px 12px rgba(249,115,22,0.3)}

/* ── CATEGORY SECTION ── */
.cat-section{margin-bottom:60px;scroll-margin-top:170px}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.cat-section-animate {
  animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.cat-header{display:flex;align-items:center;gap:16px;padding:22px 0;margin-bottom:28px;border-bottom:2px solid var(--bd);position:relative}
.cat-icon-big{width:48px;height:48px;border-radius:12px;background:var(--cat-dim);border:1.5px solid var(--cat-bd);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;box-shadow:0 4px 12px var(--cat-dim)}
.cat-title{font-family:var(--font-instrument),sans-serif;font-size:24px;font-weight:900;color:var(--tx1);line-height:1.2}
.cat-desc{font-size:14px;color:var(--tx2);margin-top:4px;max-width:600px;line-height:1.6;font-weight:500}
.cat-service-count{margin-left:auto;font-size:11px;font-weight:700;color:var(--cat-color);background:var(--cat-dim);border:1px solid var(--cat-bd);padding:4px 14px;border-radius:20px;text-transform:uppercase;white-space:nowrap}

/* ── SERVICE GRID & CARDS ── */
.svc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(296px,1fr));gap:18px}
.svc{
  background:var(--bg2);
  border:1px solid var(--bd);
  border-left:4px solid var(--cat-color);
  border-radius:var(--r);
  padding:22px 22px 20px;
  position:relative;
  overflow:hidden;
  transition:transform .25s,box-shadow .25s,border-color .25s;
  display:flex;
  flex-direction:column;
}
.svc::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--cat-dim) 0%,transparent 60%);opacity:0;transition:opacity .3s;pointer-events:none}
.svc:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.18),0 0 0 1px var(--cat-bd);border-color:var(--cat-bd2)}
.svc:hover::before{opacity:1}
.svc-name{font-family:var(--font-instrument),sans-serif;font-size:17px;font-weight:800;color:var(--tx1);margin-bottom:7px;line-height:1.3;letter-spacing:-.2px}
.svc-desc{font-size:13px;color:var(--tx3);line-height:1.6;margin-bottom:0}
.svc-full-desc{font-size:13px;color:var(--tx2);line-height:1.7;margin-bottom:14px;border-top:1px dashed var(--bd);padding-top:12px;margin-top:12px}
.svc-tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:16px}
.svc-tag{padding:3px 10px;background:var(--cat-dim);border:1px solid var(--cat-bd);border-radius:20px;font-size:10.5px;color:var(--cat-color);font-weight:700;letter-spacing:.2px}
.dark .svc-tag{background:rgba(255,255,255,.06)}
.svc-actions{display:flex;gap:8px;width:100%;margin-top:auto}
.svc-btn-quote{
  flex:1;text-align:center;padding:9px 12px;font-size:11px;font-weight:700;
  text-transform:uppercase;letter-spacing:.4px;border-radius:var(--rsm);
  border:1.5px solid var(--cat-bd2);background:transparent;color:var(--tx2);
  transition:all .2s;cursor:pointer;display:flex;align-items:center;
  justify-content:center;text-decoration:none;
}
.svc-btn-quote:hover{background:var(--cat-dim);color:var(--tx1);border-color:var(--cat-color)}
.svc-btn-plan{
  flex:1;text-align:center;padding:9px 12px;font-size:11px;font-weight:700;
  text-transform:uppercase;letter-spacing:.4px;border-radius:var(--rsm);
  border:none;background:var(--or);color:#fff;
  transition:all .2s;cursor:pointer;display:flex;align-items:center;
  justify-content:center;box-shadow:0 3px 10px rgba(249,115,22,.25);text-decoration:none;
}
.svc-btn-plan:hover{background:#ea580c;transform:translateY(-1px);box-shadow:0 6px 16px rgba(249,115,22,.35);color:#fff}
.svc-price-badge{font-size:11px;font-weight:800;color:var(--or);background:var(--or-dim);border:1px solid rgba(249,115,22,.25);padding:2px 9px;border-radius:20px;white-space:nowrap}

/* ── PROCESS SECTION ── */
.process-section{background:var(--bg2);border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);padding:80px 0}
.process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:44px}
.process-card{
  background:var(--bg);
  border:1px solid var(--bd);
  border-top:3px solid transparent;
  border-radius:var(--r);
  padding:28px 24px;
  position:relative;
  transition:all .25s;
}
.process-card:hover{border-top-color:var(--or);transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,.15)}
.process-num{font-family:var(--font-instrument),sans-serif;font-size:48px;font-weight:900;background:linear-gradient(135deg,#f97316,#fb923c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;margin-bottom:14px}
.process-title{font-size:16px;font-weight:800;color:var(--tx1);margin-bottom:8px}
.process-desc{font-size:13px;color:var(--tx3);line-height:1.65}

/* ── INDUSTRY VERTICALS ── */
.verticals-section{padding:80px 0}
.verticals-grid{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:36px;max-width:900px;margin-left:auto;margin-right:auto}
.vertical-pill{
  padding:8px 20px;
  background:var(--bg2);
  border:1.5px solid var(--bd);
  border-radius:999px;
  font-size:13px;
  font-weight:600;
  color:var(--tx2);
  cursor:default;
  transition:all .2s;
}
.vertical-pill:hover{background:var(--or);border-color:var(--or);color:#fff;transform:translateY(-2px);box-shadow:0 6px 18px rgba(249,115,22,.25)}

/* ── FAQ ── */
.faq-section{background:var(--bg2);border-top:1px solid var(--bd);padding:80px 0}
.faq-wrap{max-width:760px;margin:40px auto 0;display:flex;flex-direction:column;gap:12px}
.faq-details{background:var(--bg);border:1.5px solid var(--bd);border-radius:var(--r);overflow:hidden;transition:all .2s}
.faq-details[open]{border-color:rgba(249,115,22,.5);box-shadow:0 4px 20px rgba(249,115,22,.08)}
.faq-summary{
  padding:18px 24px;
  font-weight:700;
  font-size:15px;
  color:var(--tx1);
  cursor:pointer;
  list-style:none;
  position:relative;
  display:flex;
  justify-content:space-between;
  align-items:center;
  outline:none;
  gap:12px;
}
.faq-summary::-webkit-details-marker{display:none}
.faq-summary::after{content:'+';font-family:var(--font-instrument),sans-serif;font-size:22px;font-weight:700;color:var(--tx3);transition:all .2s;flex-shrink:0}
.faq-details[open] .faq-summary::after{content:'−';color:var(--or)}
.faq-content{padding:0 24px 22px;font-size:13.5px;color:var(--tx2);line-height:1.75}

@media(max-width:1024px){
  .process-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:768px){
  .stats{grid-template-columns:repeat(2,1fr)}
  .stat{border-bottom:1px solid var(--bd)}
  .stat:nth-child(2n){border-right:none}
  .process-grid{grid-template-columns:1fr}
  .svc-grid{grid-template-columns:1fr}
}
`;

function CatSection({ cat, selectedServices, onToggleService }: { cat: any, selectedServices: any[], onToggleService: (s: any) => void }) {
  const styleVars = {
    "--cat-color": cat.color,
    "--cat-dim": hexToRgba(cat.color, 0.1),
    "--cat-bd": hexToRgba(cat.color, 0.22),
    "--cat-bd2": hexToRgba(cat.color, 0.42),
  } as React.CSSProperties;

  return (
    <div className="cat-section" id={cat.id} style={styleVars}>
      <div className="cat-header">
        <div className="cat-icon-big">{cat.icon}</div>
        <div className="cat-info" style={{ flex: 1, minWidth: 0 }}>
          <div className="cat-title">{cat.label}</div>
          <div className="cat-desc">{cat.desc}</div>
        </div>
        <span className="cat-service-count">{cat.services.length} services</span>
      </div>
      <div className="svc-grid">
        {cat.services.map((s: any) => {
          const isSelected = selectedServices.some(item => item.name === s.name);
          const price = getServicePrice(s.name);
          return (
            <div className="svc" key={s.name}>
              {/* Top: name + price */}
              <div style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 7 }}>
                  <span className="svc-name" style={{ margin: 0 }}>{s.name}</span>
                  <span className="svc-price-badge">₹{price.toLocaleString('en-IN')}</span>
                </div>
                <p className="svc-desc">{s.desc}</p>
                <p className="svc-full-desc">{s.fullDesc || s.desc}</p>
              </div>
              {/* Tags */}
              <div className="svc-tags" style={{ marginTop: 'auto' }}>
                {s.tags?.map((t: string) => <span className="svc-tag" key={t}>{t}</span>)}
              </div>
              {/* Actions */}
              <div className="svc-actions">
                <Link href={s.href || `/services/${getServiceSlug(s.name)}`} className="svc-btn-quote">
                  View More
                </Link>
                <button
                  onClick={() => onToggleService({ name: s.name, desc: s.desc, price })}
                  className="svc-btn-plan"
                  style={isSelected ? { background: 'rgba(239,68,68,0.15)', color: '#ef4444', boxShadow: '0 3px 10px rgba(239,68,68,.2)', border: '1.5px solid rgba(239,68,68,.35)' } : {}}
                >
                  {isSelected ? "✓ Remove" : "Select Plan"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ServicesClient({ isHi, initialServices }: { isHi: boolean, initialServices: any[] }) {
  const [mainTab, setMainTab] = useState("dm");
  const [dmCat, setDmCat] = useState("all");
  const [aiCat, setAiCat] = useState("all");
  
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadDate, setLeadDate] = useState("");
  const [leadTime, setLeadTime] = useState("");
  const [appointmentMode, setAppointmentMode] = useState<"online" | "office">("online");
  const [homeAddress, setHomeAddress] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [validationError, setValidationError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [compiledMessage, setCompiledMessage] = useState("");
  const [copiedState, setCopiedState] = useState(false);

  const selectService = (s: any) => {
    setSelectedServices(prev => {
      const exists = prev.find(item => item.name === s.name);
      if (exists) return prev;
      return [...prev, s];
    });
  };

  const deselectService = (s: any) => {
    setSelectedServices(prev => prev.filter(item => item.name !== s.name));
  };

  const toggleService = (s: any) => {
    setSelectedServices(prev => {
      const exists = prev.find(item => item.name === s.name);
      if (exists) {
        return prev.filter(item => item.name !== s.name);
      } else {
        return [...prev, s];
      }
    });
  };
  
  const dmStripRef = useRef<HTMLDivElement>(null);
  const aiStripRef = useRef<HTMLDivElement>(null);

  const scrollStrip = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 400;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const dmCategories = useMemo(() => {
    const groups = [...DM_CATEGORIES.map(c => ({ ...c, services: c.services.map(s => ({ ...s })) }))];
    initialServices?.forEach((s: any) => {
      const isDM = s.planType === 'dm' || (!s.planType && ["smm", "seo", "content", "ppc", "ecommerce", "email", "design", "web", "orm", "analytics", "video", "branding"].includes(s.category || ''));
      if (isDM && s.category) {
        let group = groups.find(g => g.id === s.category);
        if (!group) {
          group = {
            id: s.category,
            label: s.categoryLabel || s.category.toUpperCase(),
            icon: s.categoryIcon || "✨",
            color: s.categoryColor || "#f97316",
            desc: s.categoryDesc || "",
            services: []
          };
          groups.push(group);
        }
        // Duplicate check
        if (!group.services.some(srv => srv.name === s.name)) {
          group.services.push({ name: s.name, desc: s.description || "", fullDesc: s.description || "", tags: s.features || [] });
        }
      }
    });
    return groups;
  }, [initialServices]);

  const aiCategories = useMemo(() => {
    const groups = [...AI_CATEGORIES.map(c => ({ ...c, services: c.services.map(s => ({ ...s })) }))];
    initialServices?.forEach((s: any) => {
      const isAI = s.planType === 'ai' || (!s.planType && ["whatsapp", "n8n", "aiagents", "crm", "chatautomation", "analytics-ai", "custom-dev"].includes(s.category || ''));
      if (isAI && s.category) {
        let group = groups.find(g => g.id === s.category);
        if (!group) {
          group = {
            id: s.category,
            label: s.categoryLabel || s.category.toUpperCase(),
            icon: s.categoryIcon || "🤖",
            color: s.categoryColor || "#f97316",
            desc: s.categoryDesc || "",
            services: []
          };
          groups.push(group);
        }
        if (!group.services.some(srv => srv.name === s.name)) {
          group.services.push({ name: s.name, desc: s.description || "", fullDesc: s.description || "", tags: s.features || [] });
        }
      }
    });
    return groups;
  }, [initialServices]);

  const dmTotal = dmCategories.reduce((s, c) => s + c.services.length, 0);
  const aiTotal = aiCategories.reduce((s, c) => s + c.services.length, 0);


  return (
    <div className="services-page">
      <style>{CSS}</style>

      {/* ── HERO ── */}
      <div className="hero">
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-pill">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--or)', display: 'inline-block', boxShadow: '0 0 8px var(--or)' }} />
            AI-First Agency · Vijay Nagar, Indore
          </div>
          <h1>One Agency.<br /><em>Every Service</em> You Need.</h1>
          <p className="hero-sub">
            {isHi
              ? "डिजिटल मार्केटिंग से लेके व्हाट्सएप एआई बॉट्स तक — इंदौर के SMBs के लिए कंप्लीट डिजिटल इकोसिस्टम एक ही जगह।"
              : "From digital marketing to WhatsApp AI bots — a complete digital ecosystem for Indore's SMBs in one place."}
          </p>
          <div className="hero-intro-box">
            AdsVerse is an AI-first digital marketing agency headquartered in Vijay Nagar, Indore.
            We offer 75+ in-house digital marketing and automation services — from{" "}
            <Link href="/services/seo-optimization" className="text-orange-500 hover:underline font-semibold">SEO</Link>,{" "}
            <Link href="/services/geo-optimization" className="text-orange-500 hover:underline font-semibold">GEO Optimization</Link>,{" "}
            <Link href="/locations/indore" className="text-orange-500 hover:underline font-semibold">local SEO</Link>, and
            Google Ads to{" "}
            <Link href="/services/whatsapp-bot" className="text-orange-500 hover:underline font-semibold">WhatsApp AI bots</Link>,{" "}
            <Link href="/services/automation-tools" className="text-orange-500 hover:underline font-semibold">n8n CRM workflows</Link>, and custom{" "}
            <Link href="/portfolio" className="text-orange-500 hover:underline font-semibold">Next.js websites</Link>.
            No outsourcing. No white-labelling. Every service is delivered by our core team with
            full transparency, live dashboards, and a performance guarantee.
          </div>
          <div className="hero-btns">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5"
            >
              Get Free Strategy Call →
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-3.5 border-2 border-white/20 dark:border-white/10 text-slate-700 dark:text-slate-200 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-xl font-bold hover:border-orange-500 hover:text-orange-500 transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="stats">
        {[
          { n: "113+", l: "Brands Served", s: "Pan-India since 2023", icon: "🏆" },
          { n: "75+",  l: "Services In-House", s: "Zero outsourcing", icon: "⚡" },
          { n: "3.8x", l: "Avg. ROAS", s: "Across active ad accounts", icon: "📈" },
          { n: "4.9★", l: "Google Rating", s: "Verified client reviews", icon: "⭐" },
        ].map(({ n, l, s, icon }) => (
          <div className="stat" key={l}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
            <div className="stat-n">{n}</div>
            <div className="stat-l">{l}</div>
            <div className="stat-s">{s}</div>
          </div>
        ))}
      </div>

      {/* ── MAIN TABS ── */}
      <div className="main-tabs">
        <button className={`main-tab ${mainTab === "dm" ? "on" : ""}`} onClick={() => setMainTab("dm")}>
          <span>📈</span>
          <span className="label">{isHi ? "डिजिटल मार्केटिंग" : "Digital Marketing"}</span>
          <span className="tab-count">{dmTotal}</span>
        </button>
        <button className={`main-tab ${mainTab === "ai" ? "on" : ""}`} onClick={() => setMainTab("ai")}>
          <span>🤖</span>
          <span className="label">{isHi ? "AI और ऑटोमेशन" : "AI & Automation"}</span>
          <span className="tab-count">{aiTotal}</span>
        </button>
      </div>

      {/* ── CONTENT ── */}
      {/* Dynamic Tabs Server Rendered / Indexable by Crawlers */}
      <div className={mainTab === "dm" ? "" : "hidden"}>
        <div className="cat-strip-wrap">
          <button className="scroll-arrow left" onClick={() => scrollStrip(dmStripRef, 'left')}>
            <ChevronLeft size={18} />
          </button>
          <div className="cat-strip" ref={dmStripRef}>
            <button className={`cat-btn ${dmCat === "all" ? "on" : ""}`} onClick={() => setDmCat("all")}>
              🗂️ {isHi ? "सभी कैटेगरीज" : "All Categories"}
            </button>
            {dmCategories.map((c) => (
              <button
                key={c.id}
                className={`cat-btn ${dmCat === c.id ? "on" : ""}`}
                onClick={() => {
                  setDmCat(c.id);
                }}
                style={dmCat === c.id ? { background: c.color, borderColor: c.color } : {}}
              >
                <span className="cat-icon">{c.icon}</span> {c.label}
              </button>
            ))}
          </div>
          <button className="scroll-arrow right" onClick={() => scrollStrip(dmStripRef, 'right')}>
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="wrap section">
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-2">
              {dmCat === "all" ? (isHi ? "डिजिटल मार्केटिंग सेवाएं" : "Complete Digital Marketing Services") : dmCategories.find(c => c.id === dmCat)?.label}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
              {dmCat === "all" 
                ? (isHi ? "सब कुछ इन-हाउस — कोई आउटसोर्सिंग नहीं। " : "Everything in-house — no outsourcing, no excuses. ") + dmTotal + " services."
                : dmCategories.find(c => c.id === dmCat)?.desc}
            </p>
          </div>

          {dmCategories.map((cat) => {
            const isVisible = dmCat === "all" || dmCat === cat.id;
            return (
              <div
                key={cat.id}
                className={isVisible ? "cat-section-animate" : ""}
                style={{ display: isVisible ? "block" : "none" }}
              >
                <CatSection cat={cat} selectedServices={selectedServices} onToggleService={toggleService} />
              </div>
            );
          })}
        </div>
      </div>

      <div className={mainTab === "ai" ? "" : "hidden"}>
        <div className="cat-strip-wrap">
          <button className="scroll-arrow left" onClick={() => scrollStrip(aiStripRef, 'left')}>
            <ChevronLeft size={18} />
          </button>
          <div className="cat-strip" ref={aiStripRef}>
            <button className={`cat-btn ${aiCat === "all" ? "on" : ""}`} onClick={() => setAiCat("all")}>
              🗂️ {isHi ? "सभी कैटेगरीज" : "All Categories"}
            </button>
            {aiCategories.map((c) => (
              <button
                key={c.id}
                className={`cat-btn ${aiCat === c.id ? "on" : ""}`}
                onClick={() => {
                  setAiCat(c.id);
                }}
                style={aiCat === c.id ? { background: c.color, borderColor: c.color } : {}}
              >
                <span className="cat-icon">{c.icon}</span> {c.label}
              </button>
            ))}
          </div>
          <button className="scroll-arrow right" onClick={() => scrollStrip(aiStripRef, 'right')}>
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="wrap section">
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-2">
              {aiCat === "all" ? (isHi ? "एआई और ऑटोमेशन" : "AI & Automation Solutions") : aiCategories.find(c => c.id === aiCat)?.label}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
              {aiCat === "all" 
                ? (isHi ? "स्मार्ट वर्कफ्لو और एआई एजेंट्स। " : "Intelligent workflows and AI agents. ") + aiTotal + " solutions."
                : aiCategories.find(c => c.id === aiCat)?.desc}
            </p>
          </div>

          {aiCategories.map((cat) => {
            const isVisible = aiCat === "all" || aiCat === cat.id;
            return (
              <div
                key={cat.id}
                className={isVisible ? "cat-section-animate" : ""}
                style={{ display: isVisible ? "block" : "none" }}
              >
                <CatSection cat={cat} selectedServices={selectedServices} onToggleService={toggleService} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── PROCESS SECTION ── */}
      <div className="process-section">
        <div className="wrap">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-3xl font-black">How We Work — From Onboarding to Results</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm">Every client engagement follows a proven 4-step process — no surprises, no scope creep.</p>
          </div>
          <div className="process-grid">
            {[
              {
                step: "01",
                title: "Discovery & Audit",
                desc: "We audit your current digital presence — SEO health, ad account history, website performance, and competitor landscape. This takes 2-3 days and is completely free. We even map key metrics using our custom audit tools."
              },
              {
                step: "02",
                title: "Strategy & Roadmap",
                desc: "Based on the audit, we build a 90-day strategy document — channels, budgets, timelines, and KPIs. You see exactly what will be done and when before a single rupee is spent."
              },
              {
                step: "03",
                title: "Execution & Automation",
                desc: "Our team executes the strategy — campaigns go live, automations are deployed, content is published. You get a live dashboard from day one. Average onboarding: 48-72 hours."
              },
              {
                step: "04",
                title: "Optimize & Scale",
                desc: "Weekly performance reviews. Monthly strategy calls. We optimize based on data — cutting what doesn't work, doubling down on what does. Most clients scale budgets by month 3."
              }
            ].map((p) => (
              <div className="process-card" key={p.step}>
                <div className="process-num">{p.step}</div>
                <div className="process-title">{p.title}</div>
                <p className="process-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── INDUSTRY VERTICALS ── */}
      <div className="verticals-section">
        <div className="wrap">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black">Industries We Serve</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm">
              AdsVerse works with Indian businesses across 12+ industry verticals — with strategies tuned to each market's buyer behavior, seasonality, and competition.
            </p>
          </div>
          <div className="verticals-grid">
            {[
              "Real Estate & Construction",
              "Healthcare & Clinics",
              "Education & Coaching Institutes",
              "E-Commerce & D2C Brands",
              "Retail & Local Businesses",
              "Hospitality & Tourism",
              "Legal & Professional Services",
              "Manufacturing & Industrial B2B",
              "Finance & Insurance",
              "SaaS & Tech Startups",
              "Food & Restaurants",
              "NGOs & Social Enterprises"
            ].map((v) => (
              <div className="vertical-pill" key={v}>
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ACCORDION ── */}
      <div className="faq-section">
        <div className="wrap">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-black">Frequently Asked Questions</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm">Get clear, upfront answers about our delivery timeline, processes, and service guarantees.</p>
          </div>
          <div className="faq-wrap">
            {[
              {
                q: "How is AdsVerse different from other digital marketing agencies?",
                a: "We are an AI-first agency — meaning AI automation is built into every service we offer, not offered as an add-on. We use n8n workflows, Gemini API integrations, and WhatsApp AI bots to automate lead handling, reporting, and client communication. Every service is delivered in-house — no outsourcing. We serve 113+ brands with full transparency, live dashboards, and performance guarantees."
              },
              {
                q: "How much does digital marketing cost with AdsVerse?",
                a: "Our packages start from ₹8,000/month for local SEO and go up based on scope, channels, and ad spend. We offer transparent, tiered pricing — visit our Pricing page for full details. No hidden fees, no mandatory long-term contracts for most services."
              },
              {
                q: "How long does it take to see results from SEO?",
                a: "Local SEO results are typically visible within 60-90 days. Competitive national keywords take 4-6 months. Paid ads (Google/Meta) can deliver leads within 48 hours of going live. We set clear timelines in your strategy document before starting."
              },
              {
                q: "Can AdsVerse handle both digital marketing and automation together?",
                a: "Yes — this is our core strength. We connect your ad campaigns, website forms, WhatsApp, and CRM into a single automated pipeline. Leads from Meta Ads can trigger WhatsApp bot conversations, qualify automatically, and enter your CRM — without any manual work."
              },
              {
                q: "Do you work with businesses outside of Indore?",
                a: "Yes. While we are headquartered in Vijay Nagar, Indore, we serve clients across 18+ cities including Bhopal, Jaipur, Lucknow, Raipur, Noida, Patna, Guwahati, and more. All work is delivered remotely with weekly video calls, live dashboards, and full transparency."
              },
              {
                q: "What makes your WhatsApp AI bots different from regular chatbots?",
                a: "Our bots are built on the official Meta WhatsApp Business API — not third-party tools. They are trained on your business context, handle multi-turn conversations, qualify leads, book appointments, and push data to your CRM or Google Sheets — all without human intervention. Built and deployed in 5-7 working days."
              },
              {
                q: "Do I need to sign a long-term contract?",
                a: "Most services are month-to-month after an initial 3-month commitment (needed to show SEO results). Paid ad management, WhatsApp bots, and web development have no long-term contracts. We prefer to retain clients through results, not paperwork."
              }
            ].map((faq, index) => (
              <details className="faq-details" key={index}>
                <summary className="faq-summary">{faq.q}</summary>
                <div className="faq-content">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* ── FLOATING CART BAR ── */}
      {selectedServices.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/90 backdrop-blur-2xl border border-orange-500/40 rounded-full py-4 px-8 flex items-center justify-between gap-8 shadow-2xl shadow-orange-500/20 animate-in slide-in-from-bottom-10 duration-300 max-w-lg w-[calc(100%-2rem)]">
          <div className="flex items-center gap-3">
            <div className="relative flex h-4 w-4 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-600"></span>
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-white tracking-tight">
                {selectedServices.length} {selectedServices.length === 1 ? "Service" : "Services"} Selected
              </div>
              <div className="text-xs text-orange-500 font-extrabold">
                Total Estimated: ₹{selectedServices.reduce((sum, item) => sum + item.price, 0).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setValidationError("");
              setIsSuccess(false);
              setIsBookingOpen(true);
            }}
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            {isHi ? "अभी बुक करें" : "Book Now"}
          </button>
        </div>
      )}

      {/* ── INTERACTIVE BOOKING DIALOG ── */}
      <Dialog open={isBookingOpen} onOpenChange={(open) => !open && setIsBookingOpen(false)}>
        <DialogContent className="bg-background/95 backdrop-blur-3xl border border-neutral-800 shadow-2xl rounded-[2rem] p-0 overflow-hidden max-w-lg max-h-[90vh] flex flex-col">
          <DialogHeader className="p-6 pb-4 border-b border-neutral-800 bg-neutral-900/50 shrink-0">
            <DialogTitle className="text-2xl font-black font-headline tracking-tight text-white flex items-center gap-2">
              <span>{isHi ? "व्हाट्सएप बुकिंग सिस्टम" : "WhatsApp Booking System"}</span>
              <span className="text-xs bg-orange-500/20 text-orange-500 px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-widest shrink-0">
                Cart Booking
              </span>
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-400">
              {isHi ? "नीचे अपनी अपॉइंटमेंट डिटेल्स भरें और डायरेक्ट व्हाट्सएप पर कन्फर्म करें।" : "Provide your appointment details below to directly initiate a chat booking on WhatsApp."}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {!isSuccess ? (
              <>
                {/* Cart Items Summary */}
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    {isHi ? "चुनी गई सेवाएं" : "Selected Services"}
                  </div>
                  <div className="border border-neutral-800 bg-neutral-950/60 rounded-2xl p-4 space-y-3 divide-y divide-neutral-900 max-h-[180px] overflow-y-auto">
                    {selectedServices.map((item, idx) => (
                      <div key={item.name} className={`flex justify-between items-center gap-4 ${idx > 0 ? "pt-3" : ""}`}>
                        <div className="text-left">
                          <div className="text-sm font-bold text-white">{item.name}</div>
                          <div className="text-[11px] text-neutral-500 line-clamp-1">{item.desc}</div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-sm font-black text-orange-500">₹{item.price.toLocaleString('en-IN')}</span>
                          <button
                            onClick={() => toggleService(item)}
                            className="text-xs text-neutral-555 hover:text-red-500 transition-colors p-1 cursor-pointer border-none bg-transparent"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <span className="text-xs font-bold text-neutral-400">{isHi ? "कुल राशि (अनुमानित):" : "Total Amount:"}</span>
                    <span className="text-lg font-black text-white">
                      ₹{selectedServices.reduce((sum, item) => sum + item.price, 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {validationError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-xs rounded-xl font-bold">
                      ⚠️ {validationError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-300">
                        {isHi ? "आपका पूरा नाम *" : "Your Full Name *"}
                      </label>
                      <input
                        type="text"
                        placeholder={isHi ? "उदा. राहुल शर्मा" : "e.g. Rahul Sharma"}
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none text-white text-sm transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-300">
                        {isHi ? "व्हाट्सएप नंबर *" : "WhatsApp Number *"}
                      </label>
                      <input
                        type="tel"
                        placeholder={isHi ? "उदा. 9685123339" : "e.g. 9685123339"}
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none text-white text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-300">
                        {isHi ? "अपॉइंटमेंट तारीख" : "Appointment Date"}
                      </label>
                      <input
                        type="date"
                        value={leadDate}
                        onChange={(e) => setLeadDate(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none text-white text-sm transition-all [color-scheme:dark]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-300">
                        {isHi ? "टाइम स्लॉट" : "Time Slot"}
                      </label>
                      <select
                        value={leadTime}
                        onChange={(e) => setLeadTime(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none text-white text-sm transition-all"
                      >
                        <option value="">{isHi ? "-- स्लॉट चुनें --" : "-- Select Slot --"}</option>
                        <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                        <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                        <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                        <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                        <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-300 block">
                      {isHi ? "कंसल्टेशन मोड" : "Consultation Mode"}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setAppointmentMode("online")}
                        className={`h-11 rounded-xl font-bold text-xs uppercase tracking-widest border transition-all cursor-pointer ${
                          appointmentMode === "online"
                            ? "bg-orange-500/20 text-orange-500 border-orange-500/40"
                            : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:bg-neutral-800"
                        }`}
                      >
                        {isHi ? "💻 ऑनलाइन कॉल" : "💻 Online Call"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setAppointmentMode("office")}
                        className={`h-11 rounded-xl font-bold text-xs uppercase tracking-widest border transition-all cursor-pointer ${
                          appointmentMode === "office"
                            ? "bg-orange-500/20 text-orange-500 border-orange-500/40"
                            : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:bg-neutral-800"
                        }`}
                      >
                        {isHi ? "🏢 ऑफिस विज़िट" : "🏢 Office Visit"}
                      </button>
                    </div>
                  </div>

                  {/* Conditional: Online Call — ask preferred platform */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      appointmentMode === "online" ? "max-h-[120px] opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="space-y-2 pt-2">
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500">
                        {isHi ? "💻 पसंदीदा प्लेटफ़ॉर्म" : "Preferred Platform"}
                      </label>
                      <select
                        value={homeAddress}
                        onChange={(e) => setHomeAddress(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none text-white text-sm transition-all"
                      >
                        <option value="">{isHi ? "-- प्लेटफ़ॉर्म चुनें --" : "-- Select Platform --"}</option>
                        <option value="Google Meet">Google Meet</option>
                        <option value="Zoom">Zoom</option>
                        <option value="WhatsApp Video">WhatsApp Video</option>
                        <option value="Microsoft Teams">Microsoft Teams</option>
                      </select>
                    </div>
                  </div>

                  {/* Conditional: Office Visit — show address info */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      appointmentMode === "office" ? "max-h-[160px] opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="space-y-2 pt-2">
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500">
                        {isHi ? "📍 हमारा ऑफिस: विजय नगर, इंदौर" : "📍 Our Office: Vijay Nagar, Indore"}
                      </label>
                      <div className="w-full p-3 rounded-xl bg-neutral-900 border border-orange-500/20 text-neutral-400 text-xs leading-relaxed">
                        AdsVerse — Vijay Nagar, Indore, Madhya Pradesh 452010<br />
                        <span className="text-orange-500 font-bold">Mon–Sat: 10 AM – 7 PM</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-300">
                      {isHi ? "विशेष नोट्स / निर्देश (वैकल्पिक)" : "Special Notes / Directions (Optional)"}
                    </label>
                    <textarea
                      placeholder={isHi ? "कोई खास निर्देश..." : "Any special requirements..."}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      className="w-full h-16 p-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-orange-500 outline-none text-white text-sm transition-all resize-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    // Strict Validation
                    if (selectedServices.length === 0) {
                      setValidationError(isHi ? "बुकिंग के लिए कम से कम 1 सेवा चुनna अनिवार्य है।" : "Select at least 1 service to proceed with booking.");
                      return;
                    }
                    if (!leadName.trim()) {
                      setValidationError(isHi ? "कृपया अपना नाम भरें।" : "Please enter your name.");
                      return;
                    }
                    if (leadPhone.trim().replace(/[^0-9]/g, '').length < 10) {
                      setValidationError(isHi ? "कृपया कम से कम 10 अंकों का वैध फोन नंबर भरें।" : "Please enter a valid phone number of at least 10 digits.");
                      return;
                    }


                    setValidationError("");

                    // Calculate Total Amount
                    const total = selectedServices.reduce((sum, item) => sum + item.price, 0);

                    // WhatsApp Text Compilation
                    let msg = `🌟 *NEW APPOINTMENT BOOKING* 🌟\n\n`;
                    msg += `*Customer Name:* _${leadName.trim()}_\n`;
                    msg += `*WhatsApp/Phone:* _${leadPhone.trim()}_\n`;
                    msg += `*Consultation Mode:* _${appointmentMode === 'online' ? `💻 Online / Video Call${homeAddress ? ` (${homeAddress})` : ' (Google Meet / Zoom)'}` : '🏢 Office Visit — Vijay Nagar, Indore'}_\n`;
                    if (leadDate) msg += `*Date:* _${leadDate}_\n`;
                    if (leadTime) msg += `*Time Slot:* _${leadTime}_\n`;
                    if (specialNotes.trim()) msg += `*Notes:* _${specialNotes.trim()}_\n`;
                    msg += `\n*Selected Services:*`;
                    
                    selectedServices.forEach((item, index) => {
                      msg += `\n${index + 1}. *${item.name}* (₹${item.price.toLocaleString('en-IN')})`;
                    });
                    
                    msg += `\n\n*Total Estimated Amount:* *₹${total.toLocaleString('en-IN')}*\n`;
                    msg += `\nThank you! Please confirm this slot.`;

                    setCompiledMessage(msg);

                    // PERSISTENT LOCAL STORAGE BOOKING
                    const bookingId = 'BK-' + Date.now().toString().slice(-6);
                    const bookingObj = {
                      id: bookingId,
                      name: leadName.trim(),
                      phone: leadPhone.trim(),
                      total: total,
                      date: leadDate || new Date().toISOString().split('T')[0],
                      timestamp: new Date().toISOString()
                    };
                    try {
                      const allBookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
                      allBookings.push(bookingObj);
                      localStorage.setItem('allBookings', JSON.stringify(allBookings));
                    } catch (e) {
                      console.error("Local storage error:", e);
                    }

                    // GOOGLE SHEETS WEBHOOK CALL (no-cors)
                    try {
                      fetch("https://script.google.com/macros/s/AKfycbz_placeholder/exec", {
                        method: "POST",
                        mode: "no-cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(bookingObj)
                      }).catch(e => console.log("Silent sheets POST ignored."));
                    } catch(err) {}

                    // Trigger Auto Click sandbox bypass
                    const encodedMsg = encodeURIComponent(msg);
                    const url = `https://wa.me/919685123339?text=${encodedMsg}`;
                    
                    try {
                      const link = document.createElement('a');
                      link.href = url;
                      link.target = '_blank';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    } catch (e) {
                      console.error("Link redirect error:", e);
                    }

                    setIsSuccess(true);
                  }}
                  className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-xl shadow-orange-500/20 transition-all text-center flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Zap size={14} className="fill-current text-white animate-pulse" />
                  {isHi ? "बुकिंग कम्पाइल करें & व्हाट्सएप भेजें" : "Compile & Message on WhatsApp"}
                </button>
              </>
            ) : (
              /* Success / Compiled Fallback UI State */
              <div className="text-center space-y-6 py-4 animate-in fade-in zoom-in-95 duration-400">
                {/* SVG Checkmark Animation */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500">
                    <svg className="w-8 h-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white">{isHi ? "बुकिंग कम्पाइल हो चुकी है! ✅" : "Booking Message Compiled! ✅"}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
                    {isHi 
                      ? "व्हाट्सएप चैट को नए टैब में खोलने की कोशिश की गई है। अगर ब्लॉक हुआ है, तो नीचे दिए गए बटन का उपयोग करें।" 
                      : "We attempted to launch WhatsApp. If sandbox blocks it, please copy the compiled text or click the open button below."}
                  </p>
                </div>

                {/* Read Only Preview Box */}
                <div className="space-y-2">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-500 text-left pl-2">
                    {isHi ? "व्हाट्सएप संदेश पूर्वावलोकन" : "WhatsApp Message Preview"}
                  </div>
                  <pre className="w-full h-40 p-4 rounded-2xl bg-neutral-950 border border-neutral-900 text-left text-xs text-neutral-300 font-mono overflow-y-auto whitespace-pre-wrap select-all leading-relaxed">
                    {compiledMessage}
                  </pre>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      try {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(compiledMessage);
                        } else {
                          const textarea = document.createElement("textarea");
                          textarea.value = compiledMessage;
                          document.body.appendChild(textarea);
                          textarea.select();
                          document.execCommand("copy");
                          document.body.removeChild(textarea);
                        }
                        setCopiedState(true);
                        setTimeout(() => setCopiedState(false), 3000);
                      } catch (err) {}
                    }}
                    className={`py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border cursor-pointer ${
                      copiedState 
                        ? "bg-green-500/20 text-green-500 border-green-500/30" 
                        : "bg-neutral-900 border-neutral-850 hover:bg-neutral-800 text-white"
                    }`}
                  >
                    {copiedState ? "Copied! ✅" : "Copy Message"}
                  </button>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="py-3 bg-neutral-900 border border-neutral-850 hover:bg-neutral-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    {isHi ? "विवरण संपादित करें" : "Edit Details"}
                  </button>
                </div>

                <a
                  href={`https://wa.me/919685123339?text=${encodeURIComponent(compiledMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-xl shadow-green-600/20 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare size={14} className="fill-current text-white" />
                  {isHi ? "व्हाट्सएप चैट खोलें" : "Open WhatsApp Chat"}
                </a>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
