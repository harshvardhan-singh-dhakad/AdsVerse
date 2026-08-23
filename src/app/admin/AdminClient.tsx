"use client";

import { useUser, useAuth } from "@/firebase";
import { signOut as firebaseSignOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar, type AdminTab } from "@/components/admin/AdminSidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  const { user, isUserLoading: loading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

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
          const data = await res.json();
          if (data?.user?.role === "admin") {
            Cookies.set("admin_token", "authenticated", { expires: 7, secure: true, sameSite: "lax" });
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
            window.location.href = "/tools/seo-audit";
          }
        } catch (err) {
          console.warn("Admin verify warning:", err);
          setIsAuthorized(true);
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
        />
        <SidebarInset className="flex flex-col flex-1 bg-background relative overflow-hidden">


          <header className="sticky top-0 z-40 flex h-20 shrink-0 items-center justify-between border-b border-border/5 bg-background/60 backdrop-blur-3xl px-8 shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="p-2 rounded-lg hover:bg-muted/5 transition-colors">
                <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors" />
              </div>
              <div className="h-6 w-px bg-muted/10" />
              <div className="flex flex-col">
                <h2 className="text-2xl font-black font-headline text-foreground tracking-tighter capitalize leading-none mb-1">{activeTab}</h2>
                <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest ml-0.5">Systems Management</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end mr-2">
                <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest mb-1">System Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-black text-emerald-500 uppercase tracking-tighter">Fully Operational</span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-8 lg:p-12 overflow-auto custom-scrollbar relative z-10">
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
              <AdminDashboard activeTab={activeTab} />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
