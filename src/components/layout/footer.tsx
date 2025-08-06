import Link from "next/link";
import { Logo } from "@/components/icons/logo";
import { Github, Twitter, Linkedin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8" />
              <span className="font-bold text-xl">PixelCraft Digital</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Blending creativity with data to drive measurable results and elevate brands.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="GitHub">
                <Github className="h-6 w-6 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="/portfolio" className="text-sm text-muted-foreground hover:text-primary">Portfolio</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@synergyflow.digital</li>
              <li>123 Tech Avenue, Suite 100</li>
              <li>Innovation City, 12345</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-2">Stay updated with our latest insights.</p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PixelCraft Digital. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
