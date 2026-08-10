'use client';

import { FirebaseClientProvider } from "@/firebase";
import { ReactNode, useState, useEffect } from "react";

export default function SEOAuditClientLayout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <FirebaseClientProvider>
      {children}
    </FirebaseClientProvider>
  );
}
