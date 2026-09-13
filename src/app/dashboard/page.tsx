'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc, onSnapshot, collection, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Crown, Link as LinkIcon, Trash2, ArrowRight, CheckCircle, AlertTriangle, Loader2, TrendingUp, TrendingDown, History, Wallet, Globe2, Sparkles, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { trackPaymentCompleted } from '@/lib/analytics';
import { SUBSCRIPTION_PLANS, PLAN_LIMITS, PLAN_PRICES } from '@/lib/subscription-plans';

interface WalletPayment {
  id: string;
  credits: number;
  amount: number;
  packType: string;
  status: string;
  createdAt: string | null;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const [subscription, setSubscription] = useState<any>(null);
  const [auditProfile, setAuditProfile] = useState<any>(null);
  const [walletPayments, setWalletPayments] = useState<WalletPayment[]>([]);
  const [walletLoading, setWalletLoading] = useState(false);
  const [subLoading, setSubLoading] = useState(true);
  const [newUrl, setNewUrl] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [upgradeLoading, setUpgradeLoading] = useState('');
  const [auditHistory, setAuditHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    if (isUserLoading) return;
    if (!user) {
      router.push('/login?redirect=/dashboard');
      return;
    }
    if (!firestore) return;

    console.log('CALLING doc() with:', firestore);
    let docRef;
    try {
      docRef = doc(firestore, 'subscriptions', user.uid);
      console.log('doc() SUCCEEDED!', docRef);
    } catch(e) {
      console.error('doc() FAILED!', e);
      return;
    }

    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        setSubscription(snap.data());
      } else {
        setSubscription(null);
      }
      setSubLoading(false);
    });
    const unsubscribeWallet = onSnapshot(doc(firestore, 'audit_users', user.uid), (snap) => {
      setAuditProfile(snap.exists() ? snap.data() : null);
    });

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      unsubscribe();
      unsubscribeWallet();
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (!user || !firestore) return;
    setHistoryLoading(true);
    console.log('FIRESTORE IN DASHBOARD:', firestore, typeof firestore);
    const q = query(
      collection(firestore, 'audit_reports'),
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
  }, [user, subscription, firestore]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    setWalletLoading(true);
    user.getIdToken()
      .then((token) => fetch('/api/audit/wallet', { headers: { Authorization: `Bearer ${token}` } }))
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Wallet request failed')))
      .then((data) => { if (!cancelled) setWalletPayments(data.payments || []); })
      .catch((error) => console.warn('[dashboard] Wallet activity unavailable:', error))
      .finally(() => { if (!cancelled) setWalletLoading(false); });
    return () => { cancelled = true; };
  }, [user, auditProfile?.paidCredits]);

  const currentPlan = subscription?.plan || null;
  const currentStatus = subscription?.status || 'inactive';
  const trackedSites = subscription?.siteSlots || [];
  const walletCredits = Number(auditProfile?.paidCredits || 0);
  const allowedLimit = currentPlan && currentStatus === 'active' ? PLAN_LIMITS[currentPlan] || 0 : 0;
  const isLimitReached = trackedSites.length >= allowedLimit;

  const handleAddSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !firestore) return;
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

    try {
      setIsAdding(true);
      const token = await user.getIdToken();
      const response = await fetch('/api/subscription/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ action: 'add', siteUrl: newUrl }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to add website.');
      setNewUrl('');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to add website. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveSite = async (siteUrl: string) => {
    if (!user) return;
    try {
      setError('');
      const token = await user.getIdToken();
      const response = await fetch('/api/subscription/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ action: 'remove', siteUrl }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to remove website.');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to remove website. Please try again.');
    }
  };

  const handleUpgrade = async (planTier: string) => {
    if (!user) return;
    setUpgradeLoading(planTier);
    setError('');
    setSuccessMessage('');

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

      const planConfig = SUBSCRIPTION_PLANS[planTier];

      const options = {
        key: data.key_id,
        subscription_id: data.subscription_id,
        name: "AdsVerse",
        description: `Upgrade to ${planConfig?.name || planTier}`,
        handler: async function (response: any) {
          // 1. Client-side tracking
          trackPaymentCompleted({
            plan: planTier,
            value: PLAN_PRICES[planTier],
            currency: 'INR',
            razorpaySubscriptionId: response.razorpay_subscription_id,
          });

          // 2. Immediately verify with backend to activate subscription in Firestore instantly
          try {
            const token = await user.getIdToken();
            const verifyRes = await fetch('/api/razorpay/verify-subscription', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_subscription_id: response.razorpay_subscription_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planTier
              })
            });

            if (verifyRes.ok) {
              setSuccessMessage(`Subscription activated! You are now subscribed to ${planConfig?.name || planTier}.`);
            } else {
              setSuccessMessage('Payment completed! Your subscription is being processed.');
            }
          } catch (verifyErr) {
            console.warn('Direct verify failed, relying on webhook:', verifyErr);
            setSuccessMessage('Payment received! Your dashboard will update shortly.');
          } finally {
            setUpgradeLoading('');
          }
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
        setError(`Payment Failed: ${response.error?.description || 'Transaction unsuccessful'}`);
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
        <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-slate-950 via-slate-900 to-primary/20 px-6 py-8 md:px-9 md:py-10 text-white shadow-2xl shadow-primary/10">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/85">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" /> AdsVerse workspace
              </div>
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">Your SEO command center</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">Run audits, manage your wallet, and keep every tracked website moving forward from one place.</p>
            </div>
            <Button asChild className="bg-white text-slate-950 hover:bg-slate-100">
              <Link href="/tools/seo-audit">Run an audit <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>

        <section className="-mt-1 grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-emerald-500/20 bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between"><span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Audit wallet</span><Wallet className="h-5 w-5 text-emerald-500" /></div>
            <p className="mt-3 text-3xl font-black text-foreground">{walletCredits}</p>
            <p className="mt-1 text-xs text-muted-foreground">{walletCredits === 1 ? 'audit credit available' : 'audit credits available'}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between"><span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subscription</span><Crown className="h-5 w-5 text-amber-500" /></div>
            <p className="mt-3 text-lg font-black text-foreground">{currentStatus === 'active' && currentPlan ? currentPlan.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) : 'No active plan'}</p>
            <p className="mt-1 text-xs text-muted-foreground">{currentStatus === 'active' ? 'Daily automated audits enabled' : 'Subscribe to track sites daily'}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between"><span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tracked sites</span><Globe2 className="h-5 w-5 text-primary" /></div>
            <p className="mt-3 text-3xl font-black text-foreground">{trackedSites.length}<span className="text-base text-muted-foreground">/{allowedLimit || 0}</span></p>
            <p className="mt-1 text-xs text-muted-foreground">Website slots in your plan</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between"><span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recent audits</span><BarChart3 className="h-5 w-5 text-violet-500" /></div>
            <p className="mt-3 text-3xl font-black text-foreground">{auditHistory.length}</p>
            <p className="mt-1 text-xs text-muted-foreground">Latest reports in your history</p>
          </div>
        </section>

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

                {successMessage && <div className="p-3 mb-6 bg-green-500/10 border border-green-500/20 text-green-500 text-sm rounded-lg flex items-center gap-2"><CheckCircle className="w-4 h-4"/>{successMessage}</div>}
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
            <section className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-card to-card p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">One-time audit wallet</p>
                  <p className="mt-2 text-3xl font-black text-foreground">{walletCredits} credits</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">Use credits for full on-demand SEO, GEO and AEO reports.</p>
                </div>
                <Wallet className="h-7 w-7 text-emerald-500" />
              </div>
              <Button asChild variant="outline" className="mt-5 w-full border-emerald-500/30 text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-300">
                <Link href="/tools/seo-audit">Buy credits or run audit <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <div className="mt-5 border-t border-emerald-500/15 pt-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recent wallet activity</p>
                {walletLoading ? (
                  <div className="flex items-center gap-2 py-2 text-xs text-muted-foreground"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading activity</div>
                ) : walletPayments.length === 0 ? (
                  <p className="py-2 text-xs text-muted-foreground">No credit purchases yet.</p>
                ) : (
                  <div className="space-y-2">
                    {walletPayments.slice(0, 3).map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between gap-3 text-xs">
                        <div className="min-w-0"><p className="font-semibold text-foreground">+{payment.credits} audit credits</p><p className="text-muted-foreground">{payment.createdAt ? new Date(payment.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : 'Processing'}</p></div>
                        <span className="shrink-0 font-bold text-emerald-600 dark:text-emerald-400">₹{payment.amount}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
            
            <div className="bg-card border border-border rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-500/10 rounded-lg"><Crown className="w-6 h-6 text-amber-500" /></div>
                <div><h3 className="text-xl font-bold">Daily monitoring</h3><p className="mt-1 text-xs text-muted-foreground">For automated audits and tracked-site monitoring.</p></div>
              </div>
              
              <div className="space-y-4">
                {Object.values(SUBSCRIPTION_PLANS).map(plan => {
                  const planTier = plan.id;
                  const limit = plan.sitesLimit;
                  const price = plan.priceInr;
                  const isActive = currentPlan === planTier && currentStatus === 'active';
                  
                  return (
                    <div key={planTier} className={`p-4 rounded-lg border transition-all ${isActive ? 'bg-primary/5 border-primary shadow-sm relative overflow-hidden' : 'bg-background border-border hover:border-primary/50'}`}>
                      {isActive && <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wide">Current Plan</div>}
                      
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold">{limit} {limit === 1 ? 'Website' : 'Websites'}</h4>
                        <span className="font-mono font-bold text-lg">₹{price}<span className="text-xs text-muted-foreground font-sans font-normal">/mo</span></span>
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                        {plan.features.map((feat, fIdx) => (
                          <li key={fIdx}>• {feat}</li>
                        ))}
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
