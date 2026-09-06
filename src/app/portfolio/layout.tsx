'use client';

import { FirebaseClientProvider } from "@/firebase/client-provider";
import { ReactNode } from "react";

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      {children}
    </FirebaseClientProvider>
  );
}
