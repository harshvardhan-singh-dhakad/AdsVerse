
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Phone, Mail, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const socialLinks = [
  { href: "https://www.instagram.com/adsverse.ai?igsh=bnl2aTJqZjB4Nm4=", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
  ), label: "Instagram" },
  { href: "https://www.facebook.com/share/1E56NG5ZZL/", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V21.878A10.003 10.003 0 0 0 22 12z"></path>
    </svg>
  ), label: "Facebook" },
  { href: "https://wa.me/919685123339", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.457l-6.354 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
    ), label: "WhatsApp" },
  { href: "https://www.linkedin.com/company/dmafia/", icon: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
    </svg>
  ), label: "LinkedIn" },
  { href: "https://x.com/Adsverse1?t=vG0NYqyjhKobVoztl4xIPw&s=09", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
  ), label: "X (Twitter)" },
  { href: "tel:+919685123339", icon: <Phone className="h-6 w-6" />, label: "Call Us" },
  { href: "/contact", icon: <Send className="h-6 w-6" />, label: "Contact Us" },
];

export function FloatingActionButton() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isAdminPath = pathname?.includes('/admin');
  if (isAdminPath) return null;


  return (
    <>
      <div className="fixed bottom-6 right-5 z-50">
        <div className="relative flex flex-col items-center gap-2">
          {isOpen && socialLinks.map((link, index) => (
            <div
              key={link.label}
              className={cn(
                "transform transition-all duration-300 ease-in-out",
                isOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0 pointer-events-none"
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Button
                asChild
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground shadow-md"
                aria-label={link.label}
                onClick={() => setIsOpen(false)}
              >
                <Link href={link.href} target={link.href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer nofollow">
                  {link.icon}
                </Link>
              </Button>
            </div>
          ))}

          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="icon"
            className={cn(
              "w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-transform duration-300",
               isOpen && "rotate-90"
            )}
            aria-expanded={isOpen}
          >
            <X className={cn("h-8 w-8 absolute transition-opacity duration-300", !isOpen && "opacity-0")} />
            <MessageSquare className={cn("h-8 w-8 absolute transition-opacity duration-300", isOpen && "opacity-0")} />
          </Button>
        </div>
      </div>
    </>
  );
}
