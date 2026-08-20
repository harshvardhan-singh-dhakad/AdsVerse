"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Zap, ShieldCheck, ArrowRight, Loader2, Sparkles, X, Globe, Lock, CreditCard, Smartphone, Building, Wallet, LogIn } from 'lucide-react';

interface AuditPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
  onPaymentSuccess: () => void;
  onRequireAuth?: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PACK_OPTIONS = [
  {
    id: 'single',
    title: '1 Audit Pass',
    badge: 'Single Site',
    priceInr: 10,
    usdPrice: '$0.12',
    credits: 1,
    desc: 'Instant full unlocked report & PDF for this domain.',
    highlight: false,
  },
  {
    id: 'wallet_5',
    title: '5 Audits Pack',
    badge: 'Starter Wallet',
    priceInr: 50,
    usdPrice: '$0.60',
    credits: 5,
    desc: 'Recharge 5 credits. Auto-deduct for any website.',
    highlight: false,
  },
  {
    id: 'wallet_12',
    title: '12 Audits Pack',
    badge: 'Best Value',
    priceInr: 100,
    usdPrice: '$1.20',
    credits: 12,
    desc: 'Agency pack. Analyze 12 websites with AI citation audits.',
    highlight: true,
  },
];

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if (window.Razorpay) return resolve(true);

    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function AuditPricingModal({
  isOpen,
  onClose,
  domain,
  userId,
  userEmail,
  userName,
  onPaymentSuccess,
  onRequireAuth,
}: AuditPricingModalProps) {
  const [selectedPack, setSelectedPack] = useState<'single' | 'wallet_5' | 'wallet_12'>('single');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadRazorpayScript();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPack = PACK_OPTIONS.find((p) => p.id === selectedPack) || PACK_OPTIONS[0];
  const isLoggedIn = !!userId && userId !== 'guest';

  const handlePaymentClick = async () => {
    // If not logged in, require authentication first so credits are linked to user account
    if (!isLoggedIn) {
      if (onRequireAuth) {
        onRequireAuth();
      } else {
        setErrorMessage('Please sign in or create an account to link your audit pass.');
      }
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      // Ensure Razorpay SDK is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded || typeof window.Razorpay === 'undefined') {
        throw new Error('Payment gateway is loading. Please retry in a few seconds.');
      }

      // 1. Create order on server
      const res = await fetch('/api/razorpay/create-audit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: domain || 'wallet',
          packType: selectedPack,
          userId: userId,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.error || 'Failed to initialize payment gateway.');
      }

      // 2. Open Official Razorpay Checkout Modal
      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'AdsVerse.Ai',
        description: `${currentPack.title} (${currentPack.credits} Audit Credits)`,
        order_id: orderData.order_id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/razorpay/verify-audit-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                domain: domain || 'wallet',
                packType: selectedPack,
                userId: userId,
              }),
            });

            if (verifyRes.ok) {
              onPaymentSuccess();
            } else {
              setErrorMessage('Payment verification failed. Please contact support.');
            }
          } catch {
            setErrorMessage('Network error while verifying payment.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: userName || 'AdsVerse User',
          email: userEmail || 'contact@adsverse.in',
        },
        theme: {
          color: '#f97316',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        setErrorMessage(resp.error?.description || 'Payment was unsuccessful. Please try another method.');
        setLoading(false);
      });
      rzp.open();
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment initiation failed.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0b0f19] border border-orange-500/30 p-6 md:p-8 shadow-2xl shadow-orange-500/10 text-white my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SEO · GEO · AEO Audit Pass</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
          Unlock Full Audit &amp; PDF Export
        </h3>

        <p className="text-slate-400 text-xs md:text-sm mb-5 leading-relaxed">
          Target Domain: <span className="text-orange-400 font-mono font-bold">{domain || 'Your Site'}</span>. Select an option to unlock detailed diagnostics:
        </p>

        {/* Pricing Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          {PACK_OPTIONS.map((pack) => {
            const isSelected = selectedPack === pack.id;
            return (
              <div
                key={pack.id}
                onClick={() => setSelectedPack(pack.id as any)}
                className={`relative rounded-xl p-3.5 border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-orange-500/15 border-orange-500 shadow-lg shadow-orange-500/20 scale-[1.02]'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                {pack.highlight && (
                  <span className="absolute -top-2.5 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-[10px] font-extrabold text-white shadow">
                    BEST VALUE
                  </span>
                )}
                <div className="text-xs font-bold text-slate-300">{pack.title}</div>
                <div className="text-2xl font-black text-white mt-1 flex items-baseline gap-1">
                  ₹{pack.priceInr}
                  <span className="text-[10px] font-normal text-slate-400">({pack.usdPrice})</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1.5 leading-snug">{pack.desc}</div>
              </div>
            );
          })}
        </div>

        {/* What's Included */}
        <div className="space-y-2 mb-5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
          <div className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> What You Unlock:
          </div>
          {[
            "Full 20+ Technical & On-Page SEO Diagnostics with Step-by-Step Fix Guides",
            "Real-time GEO AI Citations across ChatGPT, Google Gemini & Perplexity",
            "AEO Voice Search & Featured Snippet Trigger Analysis",
            "Competitor Gap Comparison & 1-Click PDF Report Export / Print",
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {errorMessage && (
          <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
            {errorMessage}
          </div>
        )}

        {/* Payment Button & Trust Badges */}
        <div className="space-y-3">
          <button
            onClick={handlePaymentClick}
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer text-sm md:text-base"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Connecting to Razorpay...</span>
              </>
            ) : !isLoggedIn ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to Pay ₹{currentPack.priceInr} &amp; Unlock</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-white" />
                <span>Pay ₹{currentPack.priceInr} ({currentPack.usdPrice}) &amp; Unlock</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Official Razorpay Available Payment Methods Banner */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Secure Razorpay Checkout
              </span>
              <span className="text-slate-500">Auto-Instant Activation</span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-1 text-center">
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center">
                <Smartphone className="w-4 h-4 text-emerald-400 mb-0.5" />
                <span className="text-[10px] text-slate-300 font-semibold">UPI Apps</span>
                <span className="text-[8px] text-slate-500">GPay/PhonePe/Paytm</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center">
                <CreditCard className="w-4 h-4 text-blue-400 mb-0.5" />
                <span className="text-[10px] text-slate-300 font-semibold">All Cards</span>
                <span className="text-[8px] text-slate-500">Debit / Credit</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center">
                <Building className="w-4 h-4 text-violet-400 mb-0.5" />
                <span className="text-[10px] text-slate-300 font-semibold">NetBanking</span>
                <span className="text-[8px] text-slate-500">50+ Banks</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center">
                <Wallet className="w-4 h-4 text-amber-400 mb-0.5" />
                <span className="text-[10px] text-slate-300 font-semibold">Wallets</span>
                <span className="text-[8px] text-slate-500">Paytm/MobiKwik</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
