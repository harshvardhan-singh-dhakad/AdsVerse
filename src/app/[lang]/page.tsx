
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, Megaphone, Users } from "lucide-react";

const featuredServices = [
  {
    icon: <Search className="w-8 h-8 text-accent" />,
    title: "SEO Optimization",
    description: "Climb the ranks and get discovered by more customers organically.",
    link: "/services/seo-optimization"
  },
  {
    icon: <Megaphone className="w-8 h-8 text-accent" />,
    title: "Paid Ads",
    description: "Targeted campaigns on Google & Meta to drive immediate, high-quality traffic.",
    link: "/services/paid-ads"
  },
  {
    icon: <Users className="w-8 h-8 text-accent" />,
    title: "Social Media",
    description: "Build a vibrant community and engage with your audience effectively.",
    link: "/services/social-media-management"
  },
];

const testimonials = [
    {
        name: "Aarav Patel",
        role: "Founder, TechSolutions",
        text: "AdsVerse transformed our online presence. Their SEO strategy doubled our organic traffic in just three months. Highly recommended!",
        avatar: "https://picsum.photos/seed/1/100/100",
        hint: "man portrait"
    },
    {
        name: "Priya Sharma",
        role: "Marketing Head, FashionFiesta",
        text: "The social media campaigns created by AdsVerse were phenomenal. Our engagement rates skyrocketed, and we saw a direct impact on sales.",
        avatar: "https://picsum.photos/seed/2/100/100",
        hint: "woman portrait"
    },
    {
        name: "Rohan Gupta",
        role: "CEO, Innovate Hub",
        text: "Working with AdsVerse felt like having an in-house marketing team. Their dedication and data-driven approach are second to none.",
        avatar: "https://picsum.photos/seed/3/100/100",
        hint: "man smiling"
    }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "AdsVerse",
      "url": "https://adsverse.in",
      "logo": "https://github.com/HSDmarketing/Adsverse.image/blob/main/adsverse.png?raw=true",
      "description": "AdsVerse is a full-service digital marketing agency specializing in SEO, Paid Ads, Social Media Management, and Web Development. We help businesses grow online.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9977646156",
        "contactType": "Customer Service",
        "email": "contact@adsverse.in",
        "areaServed": "IN",
        "availableLanguage": ["en", "hi"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Scheme No. 54, Vijay Nagar",
        "addressLocality": "Indore",
        "postalCode": "452010",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://www.facebook.com/share/1E56NG5ZZL/",
        "https://x.com/Adsverse1?t=vG0NYqyjhKobVoztl4xIPw&s=09",
        "https://www.linkedin.com/company/dmafia/",
        "https://www.instagram.com/adsverse.ai?igsh=bnl2aTJqZjB4Nm4=",
        "https://wa.me/919977646156"
      ],
      "review": testimonials.map(t => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": t.name
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": t.text,
        "itemReviewed": {
          "@type": "Organization",
          "name": "AdsVerse",
           "url": "https://adsverse.in"
        }
      }))
    },
    {
      "@type": "WebSite",
      "url": "https://adsverse.in",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://adsverse.in/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "url": "https://adsverse.in",
      "name": "AdsVerse | Digital Marketing That Drives Results",
      "description": "AdsVerse is a full-service digital marketing agency specializing in SEO, Paid Ads, Social Media Management, and Web Development. We help businesses grow online.",
      "isPartOf": {
        "@id": "https://adsverse.in/#website"
      },
      "breadcrumb": {
        "@id": "https://adsverse.in/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://adsverse.in/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://adsverse.in"
        }
      ]
    }
  ]
};

export default function HomePage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <main>
      {/* Hero Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-headline">
            Digital Marketing That <span className="text-primary">Drives Results</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We blend creativity with data-driven strategies to elevate your brand, engage your audience, and boost your bottom line.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/services">Our Services</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-24">
          <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold font-headline">What We Do</h2>
                  <p className="text-muted-foreground mt-2">A glimpse into our core digital marketing services.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {featuredServices.map(service => (
                       <Card key={service.title} className="text-center bg-card/50 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2">
                           <CardHeader>
                              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                                  {service.icon}
                              </div>
                              <CardTitle className="font-headline">{service.title}</CardTitle>
                           </CardHeader>
                           <CardContent>
                               <p className="text-muted-foreground">{service.description}</p>
                           </CardContent>
                           <CardFooter className="justify-center">
                               <Button asChild variant="link" className="p-0 text-accent">
                                 <Link href={service.link}>
                                   Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                 </Link>
                               </Button>
                           </CardFooter>
                       </Card>
                  ))}
              </div>
          </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold font-headline">What Our Clients Say</h2>
                  <p className="text-muted-foreground mt-2">We're proud to have earned the trust of amazing clients.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.map(t => (
                       <Card key={t.name} className="flex flex-col justify-between bg-card/50 backdrop-blur-sm">
                          <CardContent className="p-6">
                              <p className="text-foreground/80 italic">"{t.text}"</p>
                          </CardContent>
                          <CardFooter className="bg-background/50 p-4 flex items-center gap-4 border-t border-border/50">
                              <Image 
                                  src={t.avatar} 
                                  alt={t.name} 
                                  width={50} 
                                  height={50} 
                                  data-ai-hint={t.hint}
                                  className="rounded-full" 
                              />
                              <div>
                                  <p className="font-semibold">{t.name}</p>
                                  <p className="text-sm text-muted-foreground">{t.role}</p>
                              </div>
                          </CardFooter>
                      </Card>
                  ))}
              </div>
          </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32">
          <div className="container mx-auto px-4">
              <div className="bg-gradient-to-r from-primary to-accent/80 rounded-lg p-12 text-center text-primary-foreground">
                  <h2 className="text-4xl font-bold font-headline">Ready to Grow Your Business?</h2>
                  <p className="mt-4 max-w-2xl mx-auto text-lg">
                      Let's have a conversation about your goals. We'll provide a free, no-obligation consultation to explore how we can help you succeed.
                  </p>
                  <Button asChild size="lg" variant="secondary" className="mt-8">
                    <Link href="/contact">Schedule a Free Consultation</Link>
                  </Button>
              </div>
          </div>
      </section>

    </main>
    </>
  );
}
