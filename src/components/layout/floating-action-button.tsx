
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

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
  { href: "https://wa.me/919977646156", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.75 13.96c.25.13.41.2.52.33.15.16.2.35.2.56.01.56-.23 1.08-.68 1.51-.43.41-.96.68-1.57.71-.53.03-1.07-.1-1.57-.31-.5-.22-1.12-.56-1.84-.97-.9-.5-1.7-1.14-2.43-1.88-.73-.74-1.37-1.56-1.87-2.43-.51-.87-.85-1.64-1-2.3.0-1.61.9-2.84 1.1-3.04.14-.14.3-.23.52-.26.22-.03.48.01.7.15.22.14.38.33.5.56.12.23.18.48.2.73.01.25-.03.5-.1.71-.13.21-.29.4-.47.58-.18.18-.35.34-.48.47l-.14.11c-.08.06-.14.12-.17.18-.03.06-.05.12-.04.19.01.07.03.13.06.18.03.05.08.1.13.15.39.46.85.89 1.38 1.28.53.39.99.7 1.48.92.13.06.26.1.39.14.13.04.26.06.39.06s.25-.01.38-.05a.864.864 0 0 0 .34-.23c.09-.09.17-.18.24-.28.07-.1.14-.19.2-.28.07-.09.12-.17.17-.24l.03-.05c.02-.02.04-.04.06-.05.21-.22.44-.41.71-.56.27-.15.56-.23.88-.23.43 0 .82.12 1.13.38.31.25.56.57.71.93.15.37.22.75.22 1.14 0 .47-.1.9-.31 1.28-.21.38-.5.72-.88 1.02zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
    </svg>
    ), label: "WhatsApp" },
  { href: "https://linkedin.com", icon: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
    </svg>
  ), label: "LinkedIn" },
  { href: "https://twitter.com", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
  ), label: "X (Twitter)" },
  { href: "tel:+919977646156", icon: <Phone className="h-6 w-6" />, label: "Call Us" },
  { href: "/contact", icon: <Mail className="h-6 w-6" />, label: "Contact Us" },
];

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-50">
      <div className="relative flex flex-col items-center gap-2">
        {socialLinks.map((link, index) => (
          <div
            key={link.label}
            className={cn(
              "transform transition-all duration-300 ease-in-out",
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0 pointer-events-none"
            )}
            style={{ transitionDelay: isOpen ? `${index * 50}ms` : "0ms" }}
          >
            <Button
              asChild
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground shadow-md"
              aria-label={link.label}
              onClick={() => setIsOpen(false)}
            >
              <Link href={link.href} target={link.href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer">
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
  );
}
