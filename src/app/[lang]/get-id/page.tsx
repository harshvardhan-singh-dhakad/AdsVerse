"use client";

import { useUser } from "@/firebase";
import { Loader2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function GetIdPage() {
  const { user, isUserLoading } = useUser();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (user?.uid) {
      navigator.clipboard.writeText(user.uid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-destructive">Not Logged In</h1>
          <p className="text-muted-foreground">
            Please log in to your account first to retrieve your User ID.
          </p>
          <Button asChild>
            <a href="/login">Go to Login</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="max-w-md w-full p-8 rounded-2xl border border-primary/20 bg-card/40 backdrop-blur-xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold font-headline text-primary">Your User ID</h1>
          <p className="text-muted-foreground">
            Please copy this ID and send it back to me.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-secondary/50 border border-border/40 flex items-center justify-between gap-4 font-mono text-sm break-all">
          <span>{user.uid}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={copyToClipboard}
            className="shrink-0"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 text-xs text-muted-foreground">
          <strong>Note:</strong> This ID is unique to your account and is used to grant you administrative permissions in the database.
        </div>
      </div>
    </div>
  );
}
