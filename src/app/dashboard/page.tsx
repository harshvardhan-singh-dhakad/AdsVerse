'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, db } from '@/firebase';
import { doc, getDoc, updateDoc, onSnapshot, collection, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Crown, Link as LinkIcon, Trash2, ArrowRight, CheckCircle, AlertTriangle, Loader2, TrendingUp, TrendingDown, Minus, History } from 'lucide-react';
import Link from 'next/link';
import { trackPaymentCompleted } from '@/lib/analytics';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PLAN_LIMITS: Record<string, number> = {
  '1_site': 1,
  '3_site': 3,
  '5_site': 5,
  '10_site': 10,
};

const PLAN_PRICES: Record<string, number> = {
  '1_site': 299,
  '3_site': 449,
  '5_site': 599,
  '10_site': 999,
};

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [subscription, setSubscription] = useState<any>(null);
  const [subLoading, setSubLoading] = useState(true);
  const [newUrl, setNewUrl] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');
  const [upgradeLoading, setUpgradeLoading] = useState('');
  const [auditHistory, setAuditHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    if (isUserLoading) return;
    if (!user) {
      router.push('/login?redirect=/dashboard');
      return;
    }

    const docRef = doc(db, 'subscriptions', user.uid);
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        setSubscription(snap.data());
      } else {
        setSubscription(null);
      }
      setSubLoading(false);
    });

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      unsubscribe();
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (!user || !subscription) return;
    setHistoryLoading(true);
    const q = query(
      collection(db, 'audit_reports'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    getDocs(q).then(snap => {
      const items = snap.docs.map(d => ({
        id: d.id,
        url: d.data().url,
        createdAt: d.data().createdAt instanceof Timestamp ? d.data().createdAt.toDate() : new Date(),
        scores: d.data().scores || {},
        trendDelta: d.data().trendDelta || null,
        isScheduled: d.data().isScheduled || false,
      }));
      setAuditHistory(items);
    }).catch(console.error).finally(() => setHistoryLoading(false));
  }, [user, subscription]);

  const currentPlan = subscription?.plan || null;
  const currentStatus = subscription?.status || 'inactive';
  const trackedSites = subscription?.siteSlots || [];
  const allowedLimit = currentPlan && currentStatus === 'active' ? PLAN_LIMITS[currentPlan] || 0 : 0;
  const isLimitReached = trackedSites.length >= allowedLimit;

  const handleAddSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError('');

    try {
      new URL(newUrl); // simple validation
    } catch {
      setError('Please enter a valid URL (e.g. https://adsverse.in)');
      return;
    }

    if (isLimitReached) {
      setError(`You have reached the limit for your current plan (${allowedLimit} sites). Please upgrade to add more.`);
      return;
    }

    if (trackedSites.includes(newUrl)) {
      setError('This website is already being tracked.');
      return;
    }

    setIsAdding(true);
    try {
      const docRef = doc(db, 'subscriptions', user.uid);
      const newSites = [...trackedSites, newUrl];
      await updateDoc(docRef, { siteSlots: newSites });
      setNewUrl('');
    } catch (err) {
      console.error(err);
      setError('Failed to add website. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveSite = async (siteUrl: string) => {
    if (!user) return;
    try {
      const docRef = doc(db, 'subscriptions', user.uid);
      const newSites = trackedSites.filter((s: string) => s !== siteUrl);
      await updateDoc(docRef, { siteSlots: newSites });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpgrade = async (planTier: string) => {
    if (!user) return;
    setUpgradeLoading(planTier);
    setError('');

    try {
      const idToken = await user.getIdToken();
      const res = await fetch('/api/razorpay/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ plan: planTier })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create subscription');

      const options = {
        key: data.key_id,
        subscription_id: data.subscription_id,
        name: "AdsVerse",
        description: `Upgrade to ${PLAN_LIMITS[planTier]} Sites Plan`,
        handler: function (response: any) {
          // Razorpay returns razorpay_payment_id, razorpay_subscription_id, razorpay_signature
          // We rely on Webhooks to update Firestore, but fire client-side event for GTM attribution
          trackPaymentCompleted({
            plan: planTier,
            value: PLAN_PRICES[planTier],
            currency: 'INR',
            razorpaySubscriptionId: response.razorpay_subscription_id,
          });
          alert('Subscription successful! Your dashboard will update shortly.');
          setUpgradeLoading('');
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: "#8b5cf6" // violet-500
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response: any){
        setError(`Payment Failed: ${response.error.description}`);
        setUpgradeLoading('');
      });
      rzp1.open();

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to initiate checkout.');
      setUpgradeLoading('');
    }
  };

  if (isUserLoading || subLoading) {
    return <div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen font-sans bg-background pt-8 pb-24">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your subscriptions and tracked websites for daily automated audits.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-8 space-y-8">
            
            <section className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2"><LinkIcon className="w-5 h-5" /> My Websites</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      You are tracking {trackedSites.length} out of {allowedLimit} available slots.
                    </p>
                  </div>
                  {currentStatus === 'active' && (
                    <div className="text-xs font-bold bg-green-500/10 text-green-500 px-3 py-1 rounded-full border border-green-500/20">
                      {currentPlan.replace('_', ' ').toUpperCase()} ACTIVE
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleAddSite} className="flex gap-3 mb-6">
                  <Input 
                    type="url" 
                    placeholder="https://yourwebsite.com" 
                    value={newUrl} 
                    onChange={e => setNewUrl(e.target.value)} 
                    disabled={isLimitReached || isAdding || allowedLimit === 0}
                    className="flex-1"
                    required
                  />
                  <Button type="submit" disabled={isLimitReached || isAdding || allowedLimit === 0}>
                    {isAdding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Add Website
                  </Button>
                </form>

                {error && <div className="p-3 mb-6 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg flex items-center gap-2"><AlertTriangle className="w-4 h-4"/>{error}</div>}
                
                {allowedLimit === 0 && !error && (
                  <div className="p-4 mb-6 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm rounded-lg flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold mb-1">No Active Subscription</p>
                      <p>You need an active subscription to track websites and receive unlimited daily audits.</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {trackedSites.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-border rounded-lg text-muted-foreground">
                      <LinkIcon className="w-8 h-8 mx-auto mb-3 opacity-20" />
                      <p>No websites tracked yet.</p>
                    </div>
                  ) : (
                    trackedSites.map((site: string, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-muted/30 border border-border rounded-lg group hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{site}</p>
                            <Link href={`/tools/seo-audit?url=${encodeURIComponent(site)}`} className="text-xs text-primary hover:underline">Run audit now →</Link>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveSite(site)} className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>

            <section className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/20">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  <h2 className="text-xl font-bold">Recent Audit History</h2>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Latest audits across all your tracked websites.</p>
              </div>
              <div className="p-6">
                {historyLoading && <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>}
                {!historyLoading && auditHistory.length === 0 && (
                  <div className="text-center py-10 text-muted-foreground text-sm">
                    <History className="w-8 h-8 mx-auto mb-3 opacity-20" />
                    No audit history yet. Add websites and run your first audit.
                  </div>
                )}
                {!historyLoading && auditHistory.length > 0 && (
                  <div className="space-y-3">
                    {auditHistory.map((audit) => {
                      const hostname = (() => { try { return new URL(audit.url).hostname; } catch { return audit.url; }})();
                      const delta = audit.trendDelta;
                      return (
                        <div key={audit.id} className="p-4 bg-muted/30 border border-border rounded-lg">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-sm truncate">{hostname}</p>
                                {audit.isScheduled && <span className="text-[10px] bg-violet-500/10 text-violet-400 border border-violet-500/20 px-1.5 py-0.5 rounded font-bold">AUTO</span>}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">{audit.createdAt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                            </div>
                            <Link href={`/tools/seo-audit?url=${encodeURIComponent(audit.url)}`} className="text-xs text-primary hover:underline shrink-0">Re-audit →</Link>
                          </div>
                          <div className="flex flex-wrap gap-3 mt-3">
                            {(['seo', 'geo', 'aeo'] as const).map(key => (
                              <div key={key} className="flex items-center gap-1.5">
                                <span className="text-xs text-muted-foreground uppercase font-semibold">{key}</span>
                                <span className="text-xs font-bold">{audit.scores[key] ?? 0}/100</span>
                                {delta && delta[key] !== undefined && delta[key] !== 0 && (
                                  <span className={`text-[10px] font-bold flex items-center gap-0.5 ${delta[key] > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {delta[key] > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    {delta[key] > 0 ? '+' : ''}{delta[key]}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

          </main>

          {/* Sidebar / Upgrade */}
          <aside className="lg:col-span-4 space-y-6">
            
            <div className="bg-card border border-border rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-500/10 rounded-lg"><Crown className="w-6 h-6 text-amber-500" /></div>
                <h3 className="text-xl font-bold">Subscription Plans</h3>
              </div>
              
              <div className="space-y-4">
                {Object.keys(PLAN_LIMITS).map(planTier => {
                  const limit = PLAN_LIMITS[planTier];
                  const price = PLAN_PRICES[planTier];
                  const isActive = currentPlan === planTier && currentStatus === 'active';
                  
                  return (
                    <div key={planTier} className={`p-4 rounded-lg border transition-all ${isActive ? 'bg-primary/5 border-primary shadow-sm relative overflow-hidden' : 'bg-background border-border hover:border-primary/50'}`}>
                      {isActive && <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wide">Current Plan</div>}
                      
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold">{limit} {limit === 1 ? 'Website' : 'Websites'}</h4>
                        <span className="font-mono font-bold text-lg">₹{price}<span className="text-xs text-muted-foreground font-sans font-normal">/mo</span></span>
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                        <li>• Track up to {limit} {limit === 1 ? 'domain' : 'domains'}</li>
                        <li>• Unlimited daily audits</li>
                        <li>• PDF & Email Reports</li>
                        <li>• Full GEO/AEO Citations</li>
                      </ul>
                      
                      {isActive ? (
                        <Button disabled variant="outline" className="w-full text-xs font-bold border-primary text-primary">Active</Button>
                      ) : (
                        <Button 
                          onClick={() => handleUpgrade(planTier)} 
                          disabled={!!upgradeLoading}
                          className="w-full text-xs font-bold bg-foreground text-background hover:bg-foreground/90"
                        >
                          {upgradeLoading === planTier ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                          {currentPlan ? 'Switch Plan' : 'Subscribe'} <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <p className="text-xs text-center text-muted-foreground mt-6 px-4">
                Payments are securely processed by Razorpay. Subscriptions are billed monthly.
              </p>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
