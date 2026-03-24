
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LayoutDashboard } from "lucide-react";

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
        <h1 className="text-4xl font-bold font-headline text-primary">Admin Dashboard</h1>
        <Button variant="destructive" onClick={signOut}>Logout</Button>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6" />
            Welcome to your Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You are logged in as <span className="font-semibold text-accent">{user.email}</span>.
          </p>
          <p className="mt-4 text-muted-foreground">
            This is the starting point for your website's content management system. In the future, you will be able to edit pages, manage blog posts, and view analytics from here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
