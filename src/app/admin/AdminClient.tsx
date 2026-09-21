"use client";

import { useUser, useAuth, useFirestore } from "@/firebase";
import { signOut as firebaseSignOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar, type AdminTab } from "@/components/admin/AdminSidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { DEFAULT_BRAND, type BrandSettings } from "@/lib/brand-settings";

export default function AdminPage() {
  const { user, isUserLoading: loading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [brand, setBrand] = useState<BrandSettings>(DEFAULT_BRAND);

  useEffect(() => {
    if (isAuthorized !== true) return;
    let cancelled = false;
    getDoc(doc(firestore, "brandSettings", "global"))
      .then((snapshot) => {
        if (!cancelled && snapshot.exists()) {
          setBrand({ ...DEFAULT_BRAND, ...(snapshot.data() as Partial<BrandSettings>) });
        }
      })
      .catch(() => {
        // Keep default branding when the optional brand document is unavailable.
      });
    return () => {
      cancelled = true;
    };
  }, [firestore, isAuthorized]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        window.location.href = "/login?returnUrl=/admin";
        return;
      }

      user.getIdToken().then(async (token) => {
        try {
          const res = await fetch("/api/auth/sync-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: token }),
          });
          if (!res.ok) {
            throw new Error("Could not verify administrator access");
          }
          const data = await res.json();
          if (data?.user?.role === "admin") {
            Cookies.set("admin_token", "authenticated", { expires: 7, secure: true, sameSite: "lax" });
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
            window.location.href = "/tools/seo-audit";
          }
        } catch (err) {
          console.warn("Admin verification failed:", err);
          setIsAuthorized(false);
          window.location.href = "/tools/seo-audit";
        }
      });
    }
  }, [user, loading]);

  const handleSignOut = async () => {
    await firebaseSignOut(auth);
    Cookies.remove('admin_token');
    Cookies.remove('user_token');
    window.location.href = '/login';
  };

  if (loading || !user || isAuthorized === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground font-semibold tracking-wider uppercase">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-background/95">
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleSignOut}
          userName={user.displayName || user.email || "Admin"}
          logoUrl={brand.logoUrl || undefined}
        />
        <SidebarInset className="flex flex-col flex-1 bg-background relative overflow-hidden">


          <header className="sticky top-0 z-40 flex min-h-16 shrink-0 items-center justify-between border-b border-border/60 bg-background/95 px-4 py-3 backdrop-blur-xl lg:px-8">
            <div className="flex items-center gap-6">
              <div className="p-2 rounded-lg hover:bg-muted/5 transition-colors">
                <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors" />
              </div>
              <div className="h-6 w-px bg-border/60" />
              <div className="flex min-w-0 flex-col">
                <h2 className="truncate text-lg font-black font-headline text-foreground capitalize leading-none">{activeTab === "seo-radar" ? "SEO & AI Radar" : activeTab.replace(/-/g, " ")}</h2>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">AdsVerse admin workspace</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 sm:flex">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Operational</span>
              </div>
            </div>
          </header>

          <main className="relative z-10 flex-1 overflow-auto bg-muted/[0.14] p-4 custom-scrollbar sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-[1600px] animate-in fade-in slide-in-from-bottom-4 duration-500">
              <AdminDashboard activeTab={activeTab} />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
