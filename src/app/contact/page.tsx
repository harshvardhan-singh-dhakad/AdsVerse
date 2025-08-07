import { ContactForm } from "@/components/pages/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Get in Touch</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Have a project in mind or just want to say hello? We'd love to hear from you.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-16">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-primary" />
                <span>contact@digitalflow.in</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-primary" />
                <span>+91 9977646156</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-primary" />
                <span>Scheme No. 54, Vijay Nagar, Indore (452010), INDIA</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
             <div className="flex space-x-4">
              <Button asChild variant="outline" size="icon">
                <Link href="#" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-muted-foreground hover:text-primary">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </Link>
              </Button>
              <Button asChild variant="outline" size="icon">
                <Link href="#" aria-label="LinkedIn">
                  <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="icon">
                <Link href="#" aria-label="GitHub">
                  <Github className="h-6 w-6 text-muted-foreground hover:text-primary" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Location</h3>
            <div className="aspect-video rounded-lg overflow-hidden">
                <Image 
                    src="https://placehold.co/600x400/2c3e50/8e44ad.png?text=Our+Office+Map" 
                    alt="Map to our office" 
                    width={600} 
                    height={400} 
                    data-ai-hint="city map"
                    className="w-full h-full object-cover"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
