'use client';

import { FirebaseClientProvider } from "@/firebase";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      {children}
    </FirebaseClientProvider>
  );
}
