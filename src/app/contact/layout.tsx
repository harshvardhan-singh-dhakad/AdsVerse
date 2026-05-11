'use client';

import { FirebaseClientProvider } from "@/firebase";
import { ReactNode } from "react";

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      {children}
    </FirebaseClientProvider>
  );
}
