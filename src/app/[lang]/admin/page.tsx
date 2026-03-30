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
  const [activeTab, setActiveTab] = useState<AdminTab>("leads");

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
        <SidebarInset className="flex flex-col flex-1">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-border/40 bg-card/30 backdrop-blur-md px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1" />
              <div className="h-4 w-px bg-border/40" />
              <h2 className="text-xl font-bold font-headline text-primary capitalize">{activeTab}</h2>
            </div>
            <div className="flex items-center gap-4">
               {/* Additional header actions can go here */}
            </div>
          </header>
          
          <main className="flex-1 p-6 lg:p-10 overflow-auto">
             <AdminDashboard activeTab={activeTab} />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
