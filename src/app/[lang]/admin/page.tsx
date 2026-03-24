
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, LayoutDashboard } from "lucide-react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8" />
          Admin Dashboard
        </h1>
        <Button variant="destructive" onClick={signOut}>Logout</Button>
      </header>

      <AdminDashboard />

    </div>
  );
}
