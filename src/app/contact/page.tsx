
import { ContactForm } from "@/components/pages/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact AdsVerse — Free Audit & Consultation",
    description: "Get a free SEO audit and consultation from AdsVerse, Indore's top AI marketing agency. Contact us at +91-9685123339.",
    alternates: {
      canonical: "https://adsverse.in/contact",
    },
  };
}

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
    "logo": "https://adsverse.in/images/logo-white.webp",
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
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-headline text-white">Get in <span className="text-brand-orange">Touch</span></h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300">
          Have a project in mind or just want to say hello? We'd love to hear from you.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-16">
        <Card className="bg-card/50 backdrop-blur-sm md:col-span-6">
          <CardHeader>
            <CardTitle className="text-3xl font-headline text-center">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="space-y-8 md:col-span-4">
          <div>
            <h3 className="text-2xl font-bold mb-4 font-headline">Contact Information</h3>
            <div className="space-y-4 text-slate-300">
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
            <h3 className="text-2xl font-bold mb-4 font-headline text-violet-400">Follow Us</h3>
              <Button asChild variant="outline" size="icon">
                <Link href="https://www.instagram.com/adsverse.ai" aria-label="Instagram" target="_blank" rel="noopener noreferrer nofollow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-muted-foreground hover:text-primary">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
              </Button>
              <Button asChild variant="outline" size="icon">
                <Link href="https://www.facebook.com/adsverse.in" aria-label="Facebook" target="_blank" rel="noopener noreferrer nofollow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-muted-foreground hover:text-primary">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V21.878A10.003 10.003 0 0 0 22 12z"></path>
                  </svg>
                </Link>
              </Button>
              <Button asChild variant="outline" size="icon">
                <Link href="https://x.com/Adsverse" aria-label="X" target="_blank" rel="noopener noreferrer nofollow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-muted-foreground hover:text-primary">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </Link>
              </Button>
              <Button asChild variant="outline" size="icon">
                <Link href="https://www.linkedin.com/company/adsverse" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer nofollow">
                  <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary" />
                </Link>
              </Button>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4 font-headline text-brand-orange">Our Location</h3>
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

      <div className="border-t border-border/50 my-16" />

      <section className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-white">Frequently Asked <span className="text-brand-orange">Questions</span></h2>
          <p className="mt-2 text-slate-400">Everything you need to know about working with AdsVerse.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white font-headline">What happens after I submit the contact form?</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Once you submit the form, our digital marketing and automation consultants in Vijay Nagar, Indore will analyze your website and current digital presence. We will reach out to you via email or phone within 2 business hours to schedule a 30-minute discovery call where we share our initial analysis.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white font-headline">Is the initial audit and consultation really free?</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Yes, absolutely. We provide a complimentary SEO audit and business workflow automation assessment. This audit identifies clear growth bottlenecks in your current search presence, paid campaign performance, and manual workflows, with zero obligation to hire us.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white font-headline">Do you serve clients outside of Indore, India?</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Yes! While our primary office is located in Scheme No. 54, Vijay Nagar, Indore, we serve clients globally. We regularly collaborate with business owners, brands, and agencies across India, North America, and the Middle East using Google Meet and Zoom for smooth communication.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white font-headline">What services are covered under custom AI automation?</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Our AI automation capabilities include building custom n8n/Make automation workflows, CRM integrations (Zoho, HubSpot, Salesforce), automated WhatsApp AI customer support bots powered by Gemini API, and auto-lead routing systems to streamline your sales team's daily processes.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
