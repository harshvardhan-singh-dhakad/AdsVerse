"use client";

import { useUser, useAuth } from "@/firebase";
import { signOut as firebaseSignOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  const { user, isUserLoading: loading } = useUser();
  const auth = useAuth();
  const router = useRouter();

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
    <div className="container mx-auto py-12">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold font-headline text-primary">
            Welcome, {user.displayName?.split(' ')[0] || 'Admin'}!
          </h1>
          <p className="text-muted-foreground mt-1">Manage your website's content and leads from this dashboard.</p>
        </div>
        <Button variant="destructive" onClick={handleSignOut}>Logout</Button>
      </header>

      <AdminDashboard />

    </div>
  );
}
