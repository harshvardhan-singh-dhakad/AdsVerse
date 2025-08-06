
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const socialLinks = [
  { href: "https://instagram.com", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
  ), label: "Instagram" },
  { href: "https://facebook.com", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V21.878A10.003 10.003 0 0 0 22 12z"></path>
    </svg>
  ), label: "Facebook" },
  { href: "https://wa.me/1234567890", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.447-4.435-9.884-9.888-9.884-5.448 0-9.886 4.434-9.889 9.884-.001 2.225.651 4.315 1.847 6.061l-1.219 4.436 4.542-1.195z" />
    </svg>
    ), label: "WhatsApp" },
  { href: "https://linkedin.com", icon: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
    </svg>
  ), label: "LinkedIn" },
  { href: "https://twitter.com", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.296 1.634 4.208 3.791 4.649-.69.188-1.423.235-2.15.084.636 1.954 2.425 3.299 4.6 3.337-1.798 1.407-4.069 2.26-6.543 2.26-.425 0-.845-.024-1.258-.074 2.324 1.493 5.078 2.368 8.04 2.368 9.877 0 15.223-8.213 15.068-15.357.925-.668 1.72-1.503 2.338-2.439z"></path>
    </svg>
  ), label: "Twitter" },
  { href: "tel:+1234567890", icon: <Phone className="h-6 w-6" />, label: "Call Us" },
  { href: "https://docs.google.com/forms", icon: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 11h-4v4h-2v-4H8v-2h4V7h2v4h4v2zm-8-9v-.57c0-.81.69-1.43 1.5-1.43h5c.81 0 1.5.62 1.5 1.43V4h-8zm12-2.26V18c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h.26C6.98 2.37 6.63 3.13 6.63 4v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-.87-.35-1.63-.92-2.26z"></path>
    </svg>
  ), label: "Google Form" },
];

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
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
              <Link href={link.href} target="_blank" rel="noopener noreferrer">
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
