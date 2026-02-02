
import { ContactForm } from "@/components/pages/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact AdsVerse | Digital Marketing Agency",
  description: "Get in touch with the AdsVerse team. Whether you have a project in mind, need a quote, or just want to say hello, we'd love to hear from you.",
  alternates: {
    canonical: '/contact',
    languages: {
      'en': '/en/contact',
      'hi': '/hi/contact',
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact AdsVerse | Digital Marketing Agency",
  "description": "Get in touch with the AdsVerse team. Whether you have a project in mind or just want to say hello, we'd love to hear from you.",
  "url": "https://adsverse.in/contact",
  "mainEntity": {
    "@type": "Organization",
    "name": "AdsVerse",
    "url": "https://adsverse.in",
    "logo": "https://github.com/HSDmarketing/Adsverse.image/blob/main/adsverse.png?raw=true",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9685123339",
      "contactType": "Customer Service",
      "email": "contact@adsverse.in",
      "areaServed": "IN",
      "availableLanguage": "en"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Scheme No. 54, Vijay Nagar",
      "addressLocality": "Indore",
      "postalCode": "452010",
      "addressCountry": "IN"
    }
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://adsverse.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact Us",
        "item": "https://adsverse.in/contact"
      }
    ]
  }
};

export default function ContactPage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="container mx-auto py-16 px-4">
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-headline text-primary">Get in Touch</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Have a project in mind or just want to say hello? We'd love to hear from you.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-16">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-headline text-center">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 font-headline">Contact Information</h3>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-primary" />
                <span>contact@adsverse.in</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-primary" />
                <span>+91 9685123339</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-primary" />
                <span>Scheme No. 54, Vijay Nagar, Indore (452010), INDIA</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 font-headline">Follow Us</h3>
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
            <h3 className="text-2xl font-bold mb-4 font-headline">Our Location</h3>
            <div className="aspect-video rounded-lg overflow-hidden border border-border">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!m12!m3!1d3679.982601291194!2d75.8919195154341!3d22.7289196328963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd40c2656961%3A0x82f2c1c999d36513!2sVijay%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh%20452010%2C%20India!5e0!3m2!1sen!2sus!4v1683838383838!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="border-0 filter grayscale-[1] invert-[1] opacity-90"
                    title="Our Office Location"
                ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
