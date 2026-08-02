'use client';

import { FirebaseClientProvider } from "@/firebase";
import { ReactNode } from "react";

// Client layout — wraps the SEO audit page in FirebaseProvider
// so useUser() / useFirebase() hooks work correctly.
// This is the same pattern used by /admin/layout.tsx
export default function SEOAuditClientLayout({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      {children}
    </FirebaseClientProvider>
  );
}
