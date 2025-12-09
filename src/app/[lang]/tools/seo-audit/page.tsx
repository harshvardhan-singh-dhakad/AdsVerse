
"use client";

import React, { useState, useEffect } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { 
  Search, BarChart2, Smartphone, Zap, Share2, 
  CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp,
  Download, Link as LinkIcon
} from 'lucide-react';

/* ===========================================
  FIREBASE CONFIGURATION
  ===========================================
*/
let db, auth, app;
const appId = 'seo-audit-app';

try {
    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAKBFrXeU5o0o5tMaqeN-wAlF-KwVKtFJQ",
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "synergyflow-digital-p7c0g.firebaseapp.com",
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "synergyflow-digital-p7c0g",
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "synergyflow-digital-p7c0g.appspot.com",
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "867205490601",
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:867205490601:web:a4b9a8f0cd5c93f79346b8"
    };
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
} catch (e) {
  console.error("Firebase Init Error:", e);
}

/* ===========================================
  CUSTOM SVG CHARTS & VISUALS
  ===========================================
*/

// 1. MAIN GRADE CIRCLE (The Big C+ Circle)
const GradeCircle = ({ grade, score, size = "large" }: { grade: string, score: number, size?: "large" | "small" }) => {
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
          stroke="#e5e7eb" strokeWidth={stroke} fill="transparent"
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
        <span className={`font-bold text-gray-800 dark:text-gray-200 ${size === "large" ? "text-4xl" : "text-xl"}`}>{grade}</span>
      </div>
    </div>
  );
};

// 2. RADAR CHART (Spider Chart)
const RadarChart = ({ data }: { data: any }) => {
  const size = 200;
  const center = size / 2;
  const radius = 80;
  const categories = Object.keys(data);
  const count = categories.length;
  
  const getCoordinates = (value: number, index: number): [number, number] => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    const r = (value / 100) * radius;
    return [center + Math.cos(angle) * r, center + Math.sin(angle) * r];
  };

  const points = categories.map((key, i) => getCoordinates(data[key].score, i)).join(" ");

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
        {categories.map((key, i) => {
          const [x, y] = getCoordinates(115, i);
          return (
            <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-[10px] fill-muted-foreground font-medium uppercase">
              {data[key].title}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// 3. HALF CIRCLE GAUGE (For Speed)
const SpeedGauge = ({ score, label, value }: { score: number, label: string, value: string }) => {
  const radius = 35;
  const stroke = 6;
  const circumference = radius * Math.PI; // Half circle
  const offset = circumference - (Math.min(score, 100) / 100) * circumference;
  
  let color = "text-red-500";
  if (score > 50) color = "text-yellow-500";
  if (score > 80) color = "text-green-500";

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-12 overflow-hidden">
        <svg className="w-20 h-20 transform rotate-180 origin-center" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth={stroke} strokeDasharray={circumference} />
          <circle cx="40" cy="40" r={radius} fill="none" stroke="currentColor" strokeWidth={stroke} 
            strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
            className={`${color} transition-all duration-1000`}
          />
        </svg>
      </div>
      <span className="font-bold text-foreground -mt-2">{value}</span>
      <span className="text-xs text-muted-foreground text-center mt-1">{label}</span>
    </div>
  );
};

// 4. KEYWORD BAR
const KeywordBar = ({ word, count, score }: { word: string, count: number, score: { title: boolean, desc: boolean, h: boolean } }) => (
  <div className="flex items-center gap-4 py-2 border-b border-border last:border-0 text-sm">
    <div className="w-24 font-medium text-foreground truncate">{word}</div>
    <div className="flex-1 flex gap-2">
      <span className={score.title ? "text-green-500" : "text-red-300"}><CheckCircle size={14}/></span>
      <span className={score.desc ? "text-green-500" : "text-red-300"}><CheckCircle size={14}/></span>
      <span className={score.h ? "text-green-500" : "text-red-300"}><CheckCircle size={14}/></span>
    </div>
    <div className="w-8 text-right font-mono text-muted-foreground">{count}</div>
    <div className="w-24 bg-muted rounded-full h-2 overflow-hidden">
       <div className="bg-blue-500 h-full" style={{ width: `${Math.min(100, count * 10)}%` }}></div>
    </div>
  </div>
);

/* ===========================================
  MOCK AUDIT ENGINE
  ===========================================
*/
const performAudit = async (url: string): Promise<any> => {
  return new Promise((resolve) => {
    const isFoursGuru = url.toLowerCase().includes('foursguru');
    
    setTimeout(() => {
      const data = {
        url: url,
        timestamp: new Date().toISOString(),
        grade: isFoursGuru ? 'C+' : 'B',
        overallScore: isFoursGuru ? 58 : 75,
        recommendations: [
          { text: "Increase length of Title Tag", priority: "Medium", category: "On-Page SEO" },
          { text: "Reduce length of Meta Description", priority: "Medium", category: "On-Page SEO" },
          { text: "Remove duplicate Canonical Tags", priority: "Medium", category: "On-Page SEO" },
          { text: "Add H1 Header Tag", priority: "Medium", category: "On-Page SEO" },
          { text: "Improve site load speed", priority: "Medium", category: "Performance" },
          { text: "Add a Favicon", priority: "Low", category: "Usability" },
          { text: "Remove Clear Text Email Addresses", priority: "Low", category: "Usability" },
        ],
        categories: {
          seo: {
            title: "On-Page SEO",
            score: isFoursGuru ? 55 : 82,
            grade: isFoursGuru ? 'C+' : 'A-',
            checks: [
              { name: "Title Tag", status: "fail", detail: "Title tag should be between 10 and 60 characters.", value: "49 chars" },
              { name: "Meta Description", status: "fail", detail: "Meta description is too long (340 chars). Ideal is 160.", value: "340 chars" },
              { name: "H1 Header Tag", status: "fail", detail: "No H1 tag found on the page.", value: "Missing" },
              { name: "Keyword Consistency", status: "pass", detail: "Keywords are distributed well.", value: "Good" },
              { name: "Robots.txt", status: "pass", detail: "Robots.txt file found.", value: "Present" },
              { name: "XML Sitemaps", status: "pass", detail: "XML Sitemap found.", value: "Present" },
            ],
            keywords: [
              { word: "digital", count: 7, score: { title: false, desc: true, h: true } },
              { word: "website", count: 5, score: { title: true, desc: true, h: true } },
              { word: "marketing", count: 5, score: { title: false, desc: true, h: true } },
              { word: "business", count: 5, score: { title: false, desc: true, h: true } },
            ]
          },
          links: {
            title: "Links",
            score: isFoursGuru ? 92 : 60,
            grade: isFoursGuru ? 'A-' : 'C',
            checks: [
              { name: "Backlink Summary", status: "pass", detail: "Strong level of backlink activity.", value: "Active" },
              { name: "Total Backlinks", status: "info", detail: "Total external links pointing to your site.", value: "381" },
              { name: "Referring Domains", status: "info", detail: "Unique domains linking to you.", value: "69" },
              { name: "Broken Links", status: "pass", detail: "No broken links found.", value: "0 Found" },
            ]
          },
          usability: {
            title: "Usability",
            score: isFoursGuru ? 65 : 85,
            grade: isFoursGuru ? 'B-' : 'A',
            checks: [
              { name: "Device Rendering", status: "pass", detail: "Page renders correctly on mobile.", value: "Responsive" },
              { name: "Favicon", status: "fail", detail: "No favicon identified.", value: "Missing" },
              { name: "Email Privacy", status: "fail", detail: "Email addresses found in plain text.", value: "Exposed" },
              { name: "Flash Used?", status: "pass", detail: "No Flash content found.", value: "Clean" },
            ]
          },
          performance: {
            title: "Performance",
            score: isFoursGuru ? 58 : 70,
            grade: isFoursGuru ? 'C+' : 'B',
            checks: [
              { name: "Page Load Speed", status: "fail", detail: "Page loads slowly.", value: "4.2s" },
              { name: "Page Size", status: "pass", detail: "Page size is reasonable.", value: "2.32MB" },
              { name: "GZIP Compression", status: "pass", detail: "Compression is active.", value: "Active" },
              { name: "Inline Styles", status: "fail", detail: "Page uses inline styles.", value: "Found" },
            ],
            metrics: {
              server: { score: 40, val: "2.6s" },
              content: { score: 60, val: "31.5s" },
              scripts: { score: 75, val: "35.4s" }
            }
          },
          social: {
            title: "Social",
            score: isFoursGuru ? 78 : 50,
            grade: isFoursGuru ? 'B+' : 'C',
            checks: [
              { name: "Facebook Connected", status: "pass", detail: "Facebook page linked.", value: "Linked" },
              { name: "Instagram Linked", status: "pass", detail: "Instagram profile found.", value: "Linked" },
              { name: "Twitter/X Linked", status: "pass", detail: "X profile found.", value: "Linked" },
              { name: "YouTube Linked", status: "fail", detail: "No YouTube channel linked.", value: "Missing" },
            ]
          }
        }
      };
      resolve(data);
    }, 2500);
  });
};

/* ===========================================
  UI COMPONENTS
  ===========================================
*/

const CheckItem = ({ check }: { check: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const getIcon = () => {
    switch(check.status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warn': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info': return <div className="w-5 h-5 text-blue-500 font-bold text-center">i</div>;
      default: return <div className="w-5 h-5" />;
    }
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
            <h4 className="text-sm font-semibold text-foreground">{check.name}</h4>
          </div>
        </div>
        <div className="flex items-center gap-4">
           {check.status === 'fail' && <span className="hidden md:inline text-xs bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-bold">HIGH PRIORITY</span>}
           {check.status === 'warn' && <span className="hidden md:inline text-xs bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded font-bold">MEDIUM</span>}
           <span className="hidden sm:block text-muted-foreground font-mono text-xs">{check.value}</span>
           {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </div>
      </div>
      {isOpen && (
        <div className="mt-2 ml-10 p-3 bg-muted/50 rounded text-xs text-muted-foreground border-l-2 border-primary">
          <p>{check.detail}</p>
        </div>
      )}
    </div>
  );
};

const ReportSection = ({ id, icon: Icon, data, children }: { id: string, icon: React.ElementType, data: any, children?: React.ReactNode }) => (
  <div id={id} className="bg-card rounded-lg shadow-sm border border-border mb-6 scroll-mt-24">
    <div className="p-4 border-b border-border flex items-center justify-between bg-card-foreground/5 rounded-t-lg">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${data.score > 80 ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400' : data.score > 50 ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">{data.title} Results</h3>
          <p className="text-xs text-muted-foreground">Your {data.title} could be better</p>
        </div>
      </div>
      <GradeCircle grade={data.grade} score={data.score} size="small" />
    </div>
    
    <div className="p-6">
      {children && <div className="mb-6 pb-6 border-b border-border">{children}</div>}
      <div>
        {data.checks.map((check: any, idx: number) => <CheckItem key={idx} check={check} />)}
      </div>
    </div>
  </div>
);

const Recommendation = ({ item }: { item: any }) => (
  <div className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-muted/50 px-2">
    <div className="flex items-center gap-2">
       <div className={`w-2 h-2 rounded-full ${item.priority === 'High' ? 'bg-red-500' : item.priority === 'Medium' ? 'bg-yellow-500' : 'bg-blue-400'}`}></div>
       <span className="text-sm font-medium text-foreground">{item.text}</span>
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


const SEOAuditPage = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
        } else {
            signInAnonymously(auth).catch(console.error);
        }
    });
    return () => unsubscribe();
  }, []);

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
    setProgress(0);

    const res = await performAudit(url);
    setProgress(100);
    setReport(res);
    setLoading(false);

    if (db && user) {
      try {
        await addDoc(collection(db, `audits/${user.uid}/reports`), {
          ...res, createdAt: serverTimestamp()
        });
      } catch(e) {
        console.error("Error writing to Firestore:", e);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      
      {!report && (
        <div className="pt-20 pb-32 text-center px-4 bg-gradient-to-b from-background to-background/80">
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            SEO Audit & Reporting Tool
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Enter a URL to generate a comprehensive SEO audit report.
          </p>
          
          <form onSubmit={handleAudit} className="max-w-2xl mx-auto flex shadow-lg rounded-lg overflow-hidden bg-card border border-border p-1">
             <input 
               type="text" 
               className="flex-1 px-6 py-4 outline-none text-foreground bg-transparent"
               placeholder="Enter website URL (e.g. foursguru.com)"
               value={url}
               onChange={e => setUrl(e.target.value)}
             />
             <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 font-bold flex items-center gap-2 rounded-md">
               AUDIT <Search size={18} />
             </button>
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
        </div>
      )}

      {report && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          <div className="bg-card rounded-xl shadow-sm border border-border p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              
              <div className="flex flex-col items-center text-center lg:w-1/3">
                 <h2 className="text-xl font-bold text-foreground mb-6">Audit Results for {url}</h2>
                 <GradeCircle grade={report.grade} score={report.overallScore} />
                 <p className="mt-4 font-bold text-red-500 bg-red-50 dark:bg-red-500/10 px-3 py-1 rounded text-sm">
                   Your page could be better
                 </p>
                 <p className="text-xs text-muted-foreground mt-2">Simulated Report</p>
              </div>

              <div className="flex-1 flex flex-col md:flex-row items-center justify-around w-full gap-8">
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
                  <RadarChart data={report.categories} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12 pt-8 border-t border-border">
               {Object.values(report.categories).map((cat: any, i) => (
                 <div key={i} className="flex flex-col items-center">
                   <GradeCircle grade={cat.grade} score={cat.score} size="small" />
                   <span className="text-xs font-bold text-muted-foreground mt-2 uppercase">{cat.title}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-card rounded-lg shadow-sm border border-border sticky top-24">
                <div className="p-4 border-b bg-secondary/50 font-bold text-foreground">Sections</div>
                <nav className="p-2 text-sm">
                  {Object.values(report.categories).map((cat: any, i) => (
                    <a key={i} href={`#${cat.title}`} className="block px-3 py-2 text-muted-foreground hover:bg-accent/10 hover:text-primary rounded mb-1">
                      {cat.title}
                    </a>
                  ))}
                </nav>
                <div className="p-4 border-t mt-2">
                  <button className="w-full bg-primary text-primary-foreground py-2 rounded font-bold text-sm mb-2 flex items-center justify-center gap-2">
                    <Download size={14} /> PDF
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-9 space-y-6">
              
              <div className="bg-card rounded-lg shadow-sm border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Top Recommendations</h3>
                <div className="space-y-1">
                  {report.recommendations.map((rec: any, i: number) => <Recommendation key={i} item={rec} />)}
                </div>
              </div>

              <ReportSection id="On-Page SEO" icon={Search} data={report.categories.seo}>
                <div>
                   <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Keyword Consistency</h4>
                   {report.categories.seo.keywords.map((k: any, i: number) => (
                     <KeywordBar key={i} word={k.word} count={k.count} score={k.score} />
                   ))}
                   <div className="flex justify-between text-[10px] text-muted-foreground mt-2 px-2">
                     <span>Keyword</span>
                     <span className="flex gap-2 mr-24">
                       <span>Title</span>
                       <span>Desc</span>
                       <span>Headings</span>
                     </span>
                   </div>
                </div>
              </ReportSection>

              <ReportSection id="Links" icon={LinkIcon} data={report.categories.links}>
                <div className="flex gap-8 justify-center mb-4">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-4 border-green-400 flex items-center justify-center text-xl font-bold text-foreground">50</div>
                    <span className="text-xs text-muted-foreground mt-1 block">Domain Strength</span>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-4 border-yellow-400 flex items-center justify-center text-xl font-bold text-foreground">39</div>
                    <span className="text-xs text-muted-foreground mt-1 block">Page Strength</span>
                  </div>
                </div>
              </ReportSection>

              <ReportSection id="Usability" icon={Smartphone} data={report.categories.usability} />

              <ReportSection id="Performance" icon={Zap} data={report.categories.performance}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                   <SpeedGauge score={report.categories.performance.metrics.server.score} label="Server Response" value={report.categories.performance.metrics.server.val} />
                   <SpeedGauge score={report.categories.performance.metrics.content.score} label="All Content Loaded" value={report.categories.performance.metrics.content.val} />
                   <SpeedGauge score={report.categories.performance.metrics.scripts.score} label="Scripts Complete" value={report.categories.performance.metrics.scripts.val} />
                </div>
              </ReportSection>

              <ReportSection id="Social" icon={Share2} data={report.categories.social} />

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOAuditPage;

    