"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle2, Zap, ShieldCheck, ArrowRight, Loader2, Sparkles, X, QrCode } from 'lucide-react';

interface AuditPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: string;
  onPaymentSuccess: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function AuditPricingModal({
  isOpen,
  onClose,
  domain,
  onPaymentSuccess,
}: AuditPricingModalProps) {
  const [loading, setLoading] = useState(false);
  const [showUpiDetails, setShowUpiDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  if (!isOpen) return null;

  const handleRazorpayPayment = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      // 1. Create order
      const res = await fetch('/api/razorpay/create-audit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domain || 'mywebsite.com' }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.error || 'Failed to initialize payment');
      }

      // If simulated order (no live razorpay credentials configured)
      if (orderData.isSimulated || !window.Razorpay) {
        const verifyRes = await fetch('/api/razorpay/verify-audit-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: orderData.order_id,
            razorpay_payment_id: `pay_sim_${Date.now()}`,
            razorpay_signature: 'simulated_sig',
            domain: domain || 'mywebsite.com',
          }),
        });

        if (verifyRes.ok) {
          setLoading(false);
          onPaymentSuccess();
          return;
        }
      }

      // Load Razorpay Options
      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'AdsVerse',
        description: `Detailed SEO + GEO Audit for ${domain}`,
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
                domain: domain || 'mywebsite.com',
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
          name: 'AdsVerse User',
          email: 'contact@adsverse.in',
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
      rzp.open();
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment initiation failed.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0b0f19] border border-orange-500/30 p-6 md:p-8 shadow-2xl shadow-orange-500/10 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Detailed Audit Pass</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
          Unlock Full Audit for <span className="text-orange-400 font-mono text-xl">{domain || 'Your Site'}</span>
        </h3>

        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          Each website gets 1 free audit report. Unlock repeat deep-dive audits, AI search citations, and technical gap analysis for just ₹10.
        </p>

        {/* Pricing Box */}
        <div className="rounded-xl bg-gradient-to-br from-orange-500/10 via-purple-500/5 to-blue-500/10 border border-orange-500/30 p-5 mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase font-bold text-orange-400 tracking-wider">Micro Pass</div>
            <div className="text-3xl font-extrabold text-white flex items-baseline gap-1 mt-1">
              ₹10 <span className="text-xs font-normal text-slate-400">/ per website audit</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-green-500/20 text-green-400 border border-green-500/30">
              Instant Access
            </span>
          </div>
        </div>

        {/* What's Included */}
        <div className="space-y-3 mb-6">
          {[
            "Full On-Page & Technical SEO Checks (Core Web Vitals, Schema, Tags)",
            "Real-time GEO Visibility & AI Citations (ChatGPT, Gemini, Perplexity)",
            "AEO (Answer Engine Optimization) & Featured Snippet Triggers",
            "Competitor Benchmark & Actionable Priority Fix Roadmap",
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {errorMessage && (
          <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
            {errorMessage}
          </div>
        )}

        {/* Action Button */}
        <div className="space-y-3">
          <button
            onClick={handleRazorpayPayment}
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-white" />
                <span>Pay ₹10 & Run Audit Now</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" /> 100% Secure Razorpay & UPI
            </span>
            <button
              type="button"
              onClick={() => setShowUpiDetails(!showUpiDetails)}
              className="text-orange-400 hover:underline flex items-center gap-1"
            >
              <QrCode className="w-3.5 h-3.5" /> UPI / QR Option
            </button>
          </div>

          {showUpiDetails && (
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1 mt-2">
              <p><strong>Direct UPI ID:</strong> <span className="font-mono text-orange-400">9685123339@upi</span></p>
              <p className="text-slate-400 text-[11px]">Pay ₹10 via GPay/PhonePe/Paytm and click the button above to auto-verify.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
