'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, X, ArrowRight, Loader2 } from 'lucide-react';
import { getApp } from 'firebase/app';

interface PhoneModalProps {
  userName: string;
  uid: string;
  onDone: () => void;
}

export default function PhoneModal({ userName, uid, onDone }: PhoneModalProps) {
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const savePhone = async (phoneValue: string | null) => {
    setSaving(true);
    try {
      const { getAuth } = require('firebase/auth');
      const auth = getAuth(getApp());
      const idToken = await auth.currentUser?.getIdToken() ?? '';
      await fetch('/api/audit/save-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, phone: phoneValue }),
      });
    } catch {
      // Non-blocking
    } finally {
      setSaving(false);
      onDone();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = phone.trim();
    if (trimmed && (trimmed.length < 7 || trimmed.length > 15)) {
      setError('Please enter a valid mobile number.');
      return;
    }
    await savePhone(trimmed || null);
  };

  const handleSkip = () => savePhone(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="relative w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-300">
        {/* Close */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          aria-label="Skip"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500/10 border border-green-500/30 rounded-2xl mb-4">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-xl font-extrabold text-foreground mb-1">
            Welcome, {userName.split(' ')[0]}!
          </h2>
          <p className="text-sm text-muted-foreground">
            Add your mobile number to get a <strong className="text-green-400">free 15-min SEO consultation call</strong> from our experts.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              Mobile Number
              <span className="ml-2 text-[10px] normal-case font-normal text-muted-foreground/60">(optional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="phone-modal-input"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={e => { setPhone(e.target.value); setError(''); }}
                className="pl-10 h-11"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            <p className="text-xs text-muted-foreground mt-1">
              No OTP will be sent. Only used for consultation calls.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleSkip}
              disabled={saving}
              className="flex-1 h-11"
            >
              Skip
            </Button>
            <Button
              id="phone-modal-save"
              type="submit"
              disabled={saving}
              className="flex-1 h-11 bg-gradient-to-r from-violet-600 to-purple-600 hover:opacity-90 text-white font-bold flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Save <ArrowRight className="w-4 h-4" /></>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
