
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, X, Instagram, Facebook, Linkedin, Twitter, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const socialLinks = [
  { href: "https://instagram.com", icon: <Instagram className="h-6 w-6" />, label: "Instagram" },
  { href: "https://facebook.com", icon: <Facebook className="h-6 w-6" />, label: "Facebook" },
  { href: "https://wa.me/1234567890", icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.447-4.435-9.884-9.888-9.884-5.448 0-9.886 4.434-9.889 9.884-.001 2.225.651 4.315 1.847 6.061l-1.219 4.436 4.542-1.195z" />
    </svg>
    ), label: "WhatsApp" },
  { href: "https://linkedin.com", icon: <Linkedin className="h-6 w-6" />, label: "LinkedIn" },
  { href: "https://twitter.com", icon: <Twitter className="h-6 w-6" />, label: "Twitter" },
  { href: "tel:+1234567890", icon: <Phone className="h-6 w-6" />, label: "Call Us" },
  { href: "https://docs.google.com/forms", icon: (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ), label: "Google Form" },
];

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative flex flex-col items-center gap-4">
        {isOpen && (
          <div className="flex flex-col items-center gap-4 transition-all duration-300">
            {socialLinks.map((link, index) => (
              <Button
                key={index}
                asChild
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
                aria-label={link.label}
              >
                <Link href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.icon}
                </Link>
              </Button>
            ))}
          </div>
        )}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
        >
          {isOpen ? <X className="h-8 w-8" /> : <Plus className="h-8 w-8" />}
        </Button>
      </div>
    </div>
  );
}
