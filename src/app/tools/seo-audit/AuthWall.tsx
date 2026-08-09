'use client';

import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Chrome, Mail, Lock, Eye, EyeOff, Loader2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

type Tab = 'signup' | 'signin';

function getFirebaseAuth() {
  const { getAuth: ga } = require('firebase/auth');
  return ga(getApp());
}

export default function AuthWall() {
  const [tab, setTab] = useState<Tab>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const auth = getFirebaseAuth();

  const withPersistence = async (fn: () => Promise<void>) => {
    await setPersistence(auth, browserLocalPersistence);
    await fn();
  };

  const friendlyError = (code: string) => {
    const map: Record<string, string> = {
      'auth/email-already-in-use': 'This email is already registered. Please sign in.',
      'auth/user-not-found': 'No account found with this email. Please sign up first.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/weak-password': 'Password must be at least 6 characters.',
      'auth/invalid-credential': 'Invalid email or password.',
      'auth/too-many-requests': 'Too many attempts. Please try again later.',
      'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
    };
    return map[code] ?? 'Something went wrong. Please try again.';
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill all fields.'); return; }
    if (tab === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }

    setLoading(true);
    try {
      await withPersistence(async () => {
        if (tab === 'signup') {
          await createUserWithEmailAndPassword(auth, email.trim(), password);
        } else {
          await signInWithEmailAndPassword(auth, email.trim(), password);
        }
      });
    } catch (err: any) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await withPersistence(async () => {
        await signInWithPopup(auth, provider);
      });
    } catch (err: any) {
      setError(friendlyError(err.code));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) { setError('Enter your email address above, then click Forgot Password.'); return; }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setResetSent(true);
      setShowReset(false);
    } catch (err: any) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-500/10 border border-violet-500/30 rounded-2xl mb-5">
            <Sparkles className="w-8 h-8 text-violet-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground mb-2">
            {tab === 'signup' ? 'Create Your Free Account' : 'Welcome Back'}
          </h1>
          <p className="text-muted-foreground text-sm">
            {tab === 'signup'
              ? 'Sign up once to run free SEO audits & save your reports'
              : 'Sign in to access your audit reports & history'}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          {/* Tab switcher */}
          <div className="flex rounded-lg border border-border bg-muted/30 p-1 mb-6">
            {(['signup', 'signin'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); setResetSent(false); }}
                className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                  tab === t
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t === 'signup' ? 'Sign Up' : 'Sign In'}
              </button>
            ))}
          </div>

          {/* Google button */}
          <Button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading || loading}
            className="w-full h-11 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-semibold flex items-center justify-center gap-3 mb-5 rounded-xl"
          >
            {googleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Chrome className="w-5 h-5" />
            )}
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">or with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="audit-auth-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="audit-auth-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11"
                  required
                  autoComplete={tab === 'signup' ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm password (signup only) */}
            {tab === 'signup' && (
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="audit-auth-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="pl-10 h-11"
                    required
                    autoComplete="new-password"
                  />
                </div>
              </div>
            )}

            {/* Forgot password */}
            {tab === 'signin' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowReset(v => !v)}
                  className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}
            {showReset && tab === 'signin' && (
              <div className="bg-muted/50 rounded-lg p-3 flex items-center gap-3">
                <p className="text-xs text-muted-foreground flex-1">
                  Enter your email above and click to receive a reset link.
                </p>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handlePasswordReset}
                  disabled={loading}
                  className="text-xs shrink-0"
                >
                  Send Reset Link
                </Button>
              </div>
            )}
            {resetSent && (
              <p className="text-xs text-green-500 text-center">
                ✓ Password reset email sent! Check your inbox.
              </p>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button
              id="audit-auth-submit"
              type="submit"
              disabled={loading || googleLoading}
              className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:opacity-90 text-white font-bold text-base flex items-center justify-center gap-2 rounded-xl mt-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {tab === 'signup' ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Switch tab hint */}
          <p className="text-center text-xs text-muted-foreground mt-5">
            {tab === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => { setTab(tab === 'signup' ? 'signin' : 'signup'); setError(''); }}
              className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
            >
              {tab === 'signup' ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Trust badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-5">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          Your data is 100% private and secure. We never sell your information.
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs">
          <span className="bg-violet-500/10 text-violet-400 border border-violet-500/30 px-3 py-1 rounded-full">🔍 Free SEO Audit</span>
          <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full">🤖 GEO + AEO Score</span>
          <span className="bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1 rounded-full">📄 PDF Report</span>
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full">📧 Email to Inbox</span>
        </div>
      </div>
    </div>
  );
}
