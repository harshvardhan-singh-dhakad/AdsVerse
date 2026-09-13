'use client';

import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/init';
import {
  Wallet, Crown, ArrowRight, Loader2, CreditCard, CheckCircle2,
  Clock, ChevronDown, ChevronUp, ExternalLink, Sparkles,
} from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription-plans';

interface WalletPayment {
  id: string;
  credits: number;
  amount: number;
  packType: string;
  status: string;
  createdAt: string | null;
}

interface WalletPanelProps {
  uid: string;
  userToken: () => Promise<string>;
  onBuyCredits: () => void;
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    success: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', label: 'Success' },
    captured: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', label: 'Success' },
    processing: { bg: 'bg-amber-500/15', text: 'text-amber-400', label: 'Processing' },
    pending: { bg: 'bg-amber-500/15', text: 'text-amber-400', label: 'Pending' },
    failed: { bg: 'bg-red-500/15', text: 'text-red-400', label: 'Failed' },
  };
  const c = config[status] || config.processing;
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${c.bg} ${c.text} border-current/20`}>
      {c.label}
    </span>
  );
}

function SubscriptionStatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; border: string; label: string }> = {
    active: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', label: '● Active' },
    past_due: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', label: '● Past Due' },
    cancelled: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', label: '● Cancelled' },
    completed: { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/20', label: '● Ended' },
    inactive: { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/20', label: '● Inactive' },
  };
  const c = config[status] || config.inactive;
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.bg} ${c.text} border ${c.border}`}>
      {c.label}
    </span>
  );
}

function truncatePaymentId(id: string) {
  if (!id || id.length < 16) return id;
  return `${id.slice(0, 8)}...${id.slice(-4)}`;
}

export default function WalletPanel({ uid, userToken, onBuyCredits }: WalletPanelProps) {
  const [walletCredits, setWalletCredits] = useState(0);
  const [payments, setPayments] = useState<WalletPayment[]>([]);
  const [walletLoading, setWalletLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>(null);
  const [subLoading, setSubLoading] = useState(true);
  const [historyExpanded, setHistoryExpanded] = useState(false);

  // Real-time wallet credits via Firestore snapshot
  useEffect(() => {
    if (!uid) return;
    const unsubscribe = onSnapshot(doc(db, 'audit_users', uid), (snap) => {
      if (snap.exists()) {
        setWalletCredits(Number(snap.data().paidCredits || 0));
      }
    });
    return () => unsubscribe();
  }, [uid]);

  // Fetch payment history via API
  useEffect(() => {
    if (!uid) return;
    let cancelled = false;
    setWalletLoading(true);
    userToken()
      .then((token) => fetch('/api/audit/wallet', { headers: { Authorization: `Bearer ${token}` } }))
      .then((res) => res.ok ? res.json() : Promise.reject(new Error('Wallet request failed')))
      .then((data) => {
        if (!cancelled) {
          setPayments(data.payments || []);
          setWalletCredits(Number(data.credits || 0));
        }
      })
      .catch((err) => console.warn('[WalletPanel] Wallet activity unavailable:', err))
      .finally(() => { if (!cancelled) setWalletLoading(false); });
    return () => { cancelled = true; };
  }, [uid]);

  // Real-time subscription via Firestore snapshot
  useEffect(() => {
    if (!uid) return;
    const unsubscribe = onSnapshot(doc(db, 'subscriptions', uid), (snap) => {
      setSubscription(snap.exists() ? snap.data() : null);
      setSubLoading(false);
    });
    return () => unsubscribe();
  }, [uid]);

  const subPlan = subscription?.plan || null;
  const subStatus = subscription?.status || 'inactive';
  const planConfig = subPlan ? SUBSCRIPTION_PLANS[subPlan] : null;
  const renewalDate = subscription?.currentPeriodEnd
    ? (subscription.currentPeriodEnd.toDate ? subscription.currentPeriodEnd.toDate() : new Date(subscription.currentPeriodEnd))
    : null;

  return (
    <div className="wallet-panel w-full max-w-2xl mx-auto mt-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* ========== Card 1: One-time Audit Credits ========== */}
        <div className="glass rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                Audit Credits
              </p>
              <p className="mt-1.5 text-3xl font-black text-white">
                {walletLoading ? <Loader2 className="w-6 h-6 animate-spin text-emerald-400 inline" /> : walletCredits}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                {walletCredits === 1 ? 'credit available' : 'credits available'}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Wallet className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          <button
            type="button"
            onClick={onBuyCredits}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-emerald-600/20 cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5" />
            Buy More Credits
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Payment History Accordion */}
          <div className="border-t border-emerald-500/15 pt-3">
            <button
              type="button"
              onClick={() => setHistoryExpanded((v) => !v)}
              className="w-full flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-300 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                Payment History
                {payments.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-white text-[9px] font-bold">{payments.length}</span>
                )}
              </span>
              {historyExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {historyExpanded && (
              <div className="mt-3 space-y-2 max-h-[200px] overflow-y-auto wallet-history-scroll">
                {walletLoading ? (
                  <div className="flex items-center gap-2 py-3 text-xs text-slate-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading...
                  </div>
                ) : payments.length === 0 ? (
                  <p className="py-3 text-xs text-slate-500 text-center">No purchases yet.</p>
                ) : (
                  payments.map((p) => (
                    <div key={p.id} className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs">
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-semibold text-slate-300 text-[10px]">{truncatePaymentId(p.id)}</span>
                          <StatusBadge status={p.status} />
                        </div>
                        <p className="text-[10px] text-slate-500">
                          {p.createdAt
                            ? new Date(p.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                            : 'Processing'}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-emerald-400">+{p.credits} cr</p>
                        <p className="text-[10px] text-slate-500">₹{p.amount}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* ========== Card 2: Daily Monitoring Subscription ========== */}
        <div className="glass rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-violet-400">
                Daily Monitoring
              </p>
              {subLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-violet-400 mt-2" />
              ) : planConfig ? (
                <>
                  <p className="mt-1.5 text-lg font-black text-white">{planConfig.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <SubscriptionStatusBadge status={subStatus} />
                  </div>
                </>
              ) : (
                <>
                  <p className="mt-1.5 text-lg font-bold text-slate-300">No Active Plan</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">Subscribe for automated daily audits</p>
                </>
              )}
            </div>
            <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20">
              <Crown className="w-5 h-5 text-violet-400" />
            </div>
          </div>

          {/* Plan details */}
          {!subLoading && planConfig && subStatus === 'active' && (
            <div className="space-y-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
              {renewalDate && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Next renewal</span>
                  <span className="font-semibold text-slate-200">
                    {renewalDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Price</span>
                <span className="font-semibold text-slate-200">₹{planConfig.priceInr}/mo</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Site slots</span>
                <span className="font-semibold text-slate-200">{planConfig.sitesLimit} website{planConfig.sitesLimit > 1 ? 's' : ''}</span>
              </div>
              <div className="pt-1 border-t border-white/5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Includes</p>
                {planConfig.features.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400 mb-0.5">
                    <CheckCircle2 className="w-3 h-3 text-violet-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          {!subLoading && (
            planConfig && subStatus === 'active' ? (
              <a
                href="/dashboard"
                className="w-full py-2.5 px-4 rounded-xl border border-violet-500/30 text-violet-300 hover:bg-violet-500/10 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                Manage Plan
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <a
                href="/dashboard"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-violet-600/20 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Get Daily Monitoring
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
