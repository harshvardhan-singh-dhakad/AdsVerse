'use client';

import { FirebaseClientProvider } from "@/firebase/client-provider";
import { ReactNode, Suspense } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      <Suspense fallback={<div className="min-h-screen bg-[#060912] flex items-center justify-center text-white text-xs">Loading...</div>}>
        {children}
      </Suspense>
    </FirebaseClientProvider>
  );
}

