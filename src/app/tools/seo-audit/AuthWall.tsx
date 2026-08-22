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
import { Mail, Lock, Eye, EyeOff, Loader2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

type Tab = 'signup' | 'signin';


function getFirebaseAuth() {
  try {
    return getAuth(getApp());
  } catch (e) {
    return null as any;
  }
}

interface AuthWallProps {
  onAuthSuccess?: () => void;
}

export default function AuthWall({ onAuthSuccess }: AuthWallProps) {
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

  const getAuthInstance = () => {
    return getFirebaseAuth();
  };

  const withPersistence = async (fn: (auth: any) => Promise<void>) => {
    const auth = getAuthInstance();
    if (!auth) return;
    await setPersistence(auth, browserLocalPersistence);
    await fn(auth);
  };

  const syncUser = async (user: any) => {
    try {
      const idToken = await user.getIdToken();
      await fetch('/api/auth/sync-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, name: user.displayName }),
      });
    } catch {}
  };

  const friendlyError = (code: string, message: string) => {
    const map: any = {
      'auth/invalid-credential': 'Invalid email or password.',
      'auth/email-already-in-use': 'This email is already registered.',
      'auth/weak-password': 'Password is too weak.',
      'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
    };
    return map[code] ?? (message || 'Something went wrong. Please try again.');
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
      await withPersistence(async (authInstance) => {
        let cred;
        if (tab === 'signup') {
          cred = await createUserWithEmailAndPassword(authInstance, email.trim(), password);
        } else {
          cred = await signInWithEmailAndPassword(authInstance, email.trim(), password);
        }
        if (cred?.user) {
          await syncUser(cred.user);
          if (onAuthSuccess) onAuthSuccess();
        }
      });
    } catch (err: any) {
      setError(friendlyError(err.code, err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await withPersistence(async (authInstance) => {
        const cred = await signInWithPopup(authInstance, provider);
        if (cred?.user) {
          await syncUser(cred.user);
          if (onAuthSuccess) onAuthSuccess();
        }
      });
    } catch (err: any) {
      setError(friendlyError(err.code, err.message));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) { setError('Enter your email address above, then click Forgot Password.'); return; }
    setLoading(true);
    try {
      const authInstance = getAuthInstance();
      if (!authInstance) return;
      await sendPasswordResetEmail(authInstance, email.trim());
      setResetSent(true);
      setShowReset(false);
    } catch (err: any) {
      setError(friendlyError(err.code, err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 text-white">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SEO · GEO · AEO Audit</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {tab === 'signup' ? 'Create Your Account' : 'Welcome Back'}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          {tab === 'signup'
            ? 'Sign up in 10 seconds to unlock your detailed report & wallet.'
            : 'Sign in to access your saved audit reports.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl bg-slate-800/80 p-1 mb-6 border border-slate-700">
        <button
          type="button"
          onClick={() => { setTab('signup'); setError(''); }}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            tab === 'signup'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Sign Up (Free)
        </button>
        <button
          type="button"
          onClick={() => { setTab('signin'); setError(''); }}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            tab === 'signin'
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Sign In
        </button>
      </div>

      {/* Social login */}
      <div className="space-y-3">
        {/* Google button */}
        <Button
          type="button"
          onClick={handleGoogle}
          disabled={googleLoading || loading}
          className="w-full h-11 bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 font-semibold flex items-center justify-center gap-3 mb-5 rounded-xl shadow-sm cursor-pointer"
        >
          {googleLoading ? (
            <Loader2 className="w-5 h-5 animate-spin text-slate-700" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
          )}
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">or with email</span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        {/* Email form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="audit-auth-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="pl-10 h-11 bg-slate-800/60 border-slate-700 text-white placeholder-slate-500"
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="audit-auth-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 6 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="pl-10 pr-10 h-11 bg-slate-800/60 border-slate-700 text-white placeholder-slate-500"
                required
                autoComplete={tab === 'signup' ? 'new-password' : 'current-password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm password (signup only) */}
          {tab === 'signup' && (
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="audit-auth-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="pl-10 h-11 bg-slate-800/60 border-slate-700 text-white placeholder-slate-500"
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
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          )}
          {showReset && tab === 'signin' && (
            <div className="bg-slate-800/80 rounded-lg p-3 flex items-center gap-3 border border-slate-700">
              <p className="text-xs text-slate-400 flex-1">
                Enter your email above and click to receive a reset link.
              </p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handlePasswordReset}
                disabled={loading}
                className="text-xs shrink-0 cursor-pointer"
              >
                Send Reset Link
              </Button>
            </div>
          )}
          {resetSent && (
            <p className="text-xs text-emerald-400 text-center">
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
            className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-base flex items-center justify-center gap-2 rounded-xl mt-2 shadow-lg shadow-violet-600/20 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>{tab === 'signup' ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
