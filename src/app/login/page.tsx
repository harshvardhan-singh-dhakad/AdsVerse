"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { useAuth } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Forgot Password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const router = useRouter();
  const auth = useAuth();

  const syncUserWithBackend = async (firebaseUser: any, customName?: string) => {
    try {
      const idToken = await firebaseUser.getIdToken(true);
      const res = await fetch("/api/auth/sync-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken,
          name: customName || firebaseUser.displayName,
        }),
      });
      const data = await res.json();
      if (data?.user?.role === "admin") {
        Cookies.set("admin_token", "authenticated", { expires: 7, secure: true, sameSite: "strict" });
        window.location.href = "/admin";
      } else {
        Cookies.set("user_token", firebaseUser.uid, { expires: 30, secure: true, sameSite: "strict" });
        // Check if there was a return url
        const params = new URLSearchParams(window.location.search);
        const returnUrl = params.get("returnUrl") || "/tools/seo-audit";
        window.location.href = returnUrl;
      }
    } catch (err) {
      console.warn("User sync warning:", err);
      window.location.href = "/tools/seo-audit";
    }
  };

  const getFriendlyError = (errCode: string, defaultMsg: string) => {
    if (errCode.includes("invalid-credential") || errCode.includes("wrong-password")) {
      return "Invalid email or password. Please verify and try again.";
    }
    if (errCode.includes("user-not-found")) {
      return "No account found with this email. Please switch to Sign Up.";
    }
    if (errCode.includes("email-already-in-use")) {
      return "An account with this email already exists. Please Sign In.";
    }
    if (errCode.includes("weak-password")) {
      return "Password must be at least 6 characters long.";
    }
    if (errCode.includes("popup-closed-by-user")) {
      return "Google sign-in was closed before completion.";
    }
    return defaultMsg || "Authentication failed. Please try again.";
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      await syncUserWithBackend(cred.user);
    } catch (err: any) {
      setErrorMessage(getFriendlyError(err?.code || "", err?.message || ""));
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (name.trim()) {
        try {
          await updateProfile(cred.user, { displayName: name.trim() });
        } catch {}
      }
      await syncUserWithBackend(cred.user, name.trim());
    } catch (err: any) {
      setErrorMessage(getFriendlyError(err?.code || "", err?.message || ""));
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setGoogleLoading(true);

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const cred = await signInWithPopup(auth, provider);
      await syncUserWithBackend(cred.user);
    } catch (err: any) {
      setErrorMessage(getFriendlyError(err?.code || "", err?.message || ""));
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;

    setForgotLoading(true);
    try {
      await sendPasswordResetEmail(auth, forgotEmail.trim());
      setForgotSent(true);
    } catch (err: any) {
      setErrorMessage(getFriendlyError(err?.code || "", err?.message || ""));
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060912] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 py-10">
        
        {/* Brand Logo & Back */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-black text-white tracking-tight hover:opacity-90 transition">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-600 flex items-center justify-center text-white text-lg shadow-lg shadow-violet-600/30">
              ⚡
            </span>
            AdsVerse.in
          </Link>
          <p className="text-xs text-slate-400 mt-2 font-medium">
            AI Growth Engine &amp; Website Intelligence Suite
          </p>
        </div>

        {/* Auth Box */}
        <Card className="border border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="text-center pb-2 pt-6">
            <CardTitle className="text-xl md:text-2xl font-extrabold text-white">
              {mode === "login" ? "Welcome Back" : "Create Free Account"}
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs mt-1">
              {mode === "login" 
                ? "Sign in to manage your SEO audits, wallet credits & campaigns." 
                : "Get instant access to AI SEO audits, reports & wallet tools."}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 pt-3 space-y-5">
            
            {/* Tabs */}
            <Tabs value={mode} onValueChange={(val) => { setMode(val as any); setErrorMessage(null); }} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/80 p-1 rounded-xl border border-white/5">
                <TabsTrigger value="login" className="text-xs font-bold py-2 rounded-lg data-[state=active]:bg-violet-600 data-[state=active]:text-white transition-all">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-xs font-bold py-2 rounded-lg data-[state=active]:bg-violet-600 data-[state=active]:text-white transition-all">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Error & Success Alerts */}
              {errorMessage && (
                <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}
              {successMessage && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Google 1-Click Button */}
              <div className="mt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleGoogleSignIn}
                  disabled={googleLoading || loading}
                  className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs md:text-sm py-5 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {googleLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
                  ) : (
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v8.51h12.8c-.57 2.74-2.13 5.06-4.54 6.64l7.98 6.19c4.64-4.29 7.4-10.45 7.4-17.79z" />
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z" />
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.98-6.19c-2.13 1.45-4.84 2.3-7.91 2.3-6.27 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                    </svg>
                  )}
                  Continue with Google / Gmail
                </Button>
              </div>

              {/* Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
                  <span className="bg-slate-900 px-3 text-slate-500">Or with email</span>
                </div>
              </div>

              {/* Form 1: Sign In */}
              <TabsContent value="login" className="space-y-4 m-0">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-slate-300">Email Address</Label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <Input 
                        type="email" 
                        placeholder="you@company.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 bg-slate-950 border-white/10 text-white placeholder-slate-600 rounded-xl focus:border-violet-500 text-xs py-5"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-semibold text-slate-300">Password</Label>
                      <button 
                        type="button" 
                        onClick={() => { setForgotEmail(email); setShowForgotModal(true); setForgotSent(false); }}
                        className="text-[11px] font-semibold text-violet-400 hover:text-violet-300 transition"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 pr-10 bg-slate-950 border-white/10 text-white placeholder-slate-600 rounded-xl focus:border-violet-500 text-xs py-5"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading || googleLoading}
                    className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold text-xs md:text-sm py-5 rounded-xl transition-all shadow-lg shadow-violet-600/30 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                    Sign In to Account
                  </Button>
                </form>
              </TabsContent>

              {/* Form 2: Sign Up */}
              <TabsContent value="signup" className="space-y-4 m-0">
                <form onSubmit={handleEmailSignUp} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-slate-300">Your Full Name</Label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <Input 
                        type="text" 
                        placeholder="John Doe" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="pl-10 bg-slate-950 border-white/10 text-white placeholder-slate-600 rounded-xl focus:border-violet-500 text-xs py-5"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-slate-300">Email Address</Label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <Input 
                        type="email" 
                        placeholder="you@company.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 bg-slate-950 border-white/10 text-white placeholder-slate-600 rounded-xl focus:border-violet-500 text-xs py-5"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-slate-300">Password (min 6 chars)</Label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 pr-10 bg-slate-950 border-white/10 text-white placeholder-slate-600 rounded-xl focus:border-violet-500 text-xs py-5"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-slate-300">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="pl-10 bg-slate-950 border-white/10 text-white placeholder-slate-600 rounded-xl focus:border-violet-500 text-xs py-5"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading || googleLoading}
                    className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold text-xs md:text-sm py-5 rounded-xl transition-all shadow-lg shadow-violet-600/30 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                    Create Free Account
                  </Button>
                </form>
              </TabsContent>

            </Tabs>

          </CardContent>
        </Card>

        {/* Footer Info */}
        <p className="text-center text-[11px] text-slate-500 mt-6">
          By continuing, you agree to AdsVerse&apos;s{" "}
          <Link href="/terms-of-service" className="text-slate-400 hover:underline">Terms</Link> &amp;{" "}
          <Link href="/privacy-policy" className="text-slate-400 hover:underline">Privacy Policy</Link>.
        </p>

      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
            <button 
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-white">Reset Password</h3>
            <p className="text-xs text-slate-400">
              Enter your email address and we will send you a secure link to reset your password.
            </p>

            {forgotSent ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center space-y-2">
                <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-400" />
                <p className="font-semibold">Reset Email Sent!</p>
                <p className="text-slate-400">Check your inbox (and spam folder) for instructions.</p>
                <Button 
                  type="button" 
                  onClick={() => setShowForgotModal(false)}
                  className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs"
                >
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-xs text-slate-300">Email Address</Label>
                  <Input 
                    type="email" 
                    placeholder="you@company.com" 
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    className="bg-slate-950 border-white/10 text-white text-xs py-5"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={forgotLoading}
                  className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs py-5"
                >
                  {forgotLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Reset Link"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
