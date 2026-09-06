'use client';

import { FirebaseClientProvider } from "@/firebase/client-provider";
import { ReactNode, Suspense } from "react";

export default function SEOAuditClientLayout({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      <Suspense fallback={<div className="min-h-screen bg-[#060912] flex items-center justify-center text-white text-xs">Loading SEO Audit...</div>}>
        {children}
      </Suspense>
    </FirebaseClientProvider>
  );
}

console.log('DEBUG LAYOUT IMPORTS:', { FirebaseClientProvider: typeof FirebaseClientProvider });
