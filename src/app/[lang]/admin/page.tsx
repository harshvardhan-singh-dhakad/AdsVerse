"use client";

import { useUser, useAuth } from "@/firebase";
import { signOut as firebaseSignOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await firebaseSignOut(auth);
    router.push('/login');
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
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
        <SidebarInset className="flex flex-col flex-1 bg-gradient-to-br from-[#0a0c10] via-[#0d1017] to-[#0a0c10] relative overflow-hidden">
          {/* Animated Background Layers - Isolated to Admin Panel */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <div className="glow-effect" />
            <div className="stars stars-sm opacity-20" />
            <div className="stars stars-md opacity-10" />
          </div>

          <header className="sticky top-0 z-40 flex h-20 shrink-0 items-center justify-between border-b border-white/5 bg-[#0a0c10]/60 backdrop-blur-3xl px-8 shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors" />
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div className="flex flex-col">
                <h2 className="text-2xl font-black font-headline text-white tracking-tighter capitalize leading-none mb-1">{activeTab}</h2>
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
            <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
              <AdminDashboard activeTab={activeTab} />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
