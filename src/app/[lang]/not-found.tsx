"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

export default function NotFound() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  
  // Minimal translations for the 404 page to avoid async issues in a status component
  const t = lang === "hi" ? {
    title: "404 - पेज नहीं मिला",
    description: "क्षमा करें! आप जिस गैलेक्सी पथ की तलाश कर रहे हैं वह मौजूद नहीं है। शायद आपने गलत मोड़ ले लिया है।",
    back_home: "होम पेज पर वापस जाएं"
  } : {
    title: "404 - Page Not Found",
    description: "Oops! The cosmic path you're looking for doesn't exist. You might have taken a wrong turn in the galaxy.",
    back_home: "Back to Home"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="relative mb-8">
        <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-foreground w-full">
          {t.title}
        </p>
      </div>
      
      <div className="max-w-md mx-auto mb-10">
        <p className="text-lg text-muted-foreground mb-8">
          {t.description}
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href={`/${lang}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.back_home}
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Decorative elements to match galaxy theme */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -z-10 animate-pulse delay-700"></div>
    </div>
  );
}
