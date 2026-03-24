
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingUp, Megaphone, Users, FileText, Code, Bot, Search, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { AnimatedCounter } from "@/components/pages/animated-counter";
import { useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { type Service } from "@/lib/definitions";

// Note: Metadata is usually handled in server components, but we'll keep it for static export context.
// For dynamic metadata, you'd use the `generateMetadata` export.
// export const metadata: Metadata = { ... };

const serviceIcons: { [key: string]: React.ReactNode } = {
  TrendingUp: <TrendingUp className="w-10 h-10 text-accent" />,
  Megaphone: <Megaphone className="w-10 h-10 text-accent" />,
  Users: <Users className="w-10 h-10 text-accent" />,
  FileText: <FileText className="w-10 h-10 text-accent" />,
  Code: <Code className="w-10 h-10 text-accent" />,
  Bot: <Bot className="w-10 h-10 text-accent" />,
  Search: <Search className="w-10 h-10 text-accent" />,
};

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
    },
];

const faqs = [
    {
      question: "How long does it take to see results from SEO?",
      answer: "SEO is a long-term strategy. While foundational improvements can be seen within weeks, it typically takes 4-6 months to see significant, lasting results in organic traffic and rankings, depending on your industry's competitiveness."
    },
    {
      question: "How much should I spend on paid ads?",
      answer: "Your ad spend depends on your industry, goals, and competition. We recommend starting with a test budget you're comfortable with. As we gather data, we provide data-driven recommendations for scaling your ad spend to maximize ROI."
    },
    {
      question: "Do you offer custom service packages?",
      answer: "Yes! We understand that every business is unique. We can create custom packages tailored to your specific needs and goals. Contact us for a free consultation to discuss a personalized plan."
    },
    {
      question: "What makes AdsVerse different from other agencies?",
      answer: "We blend creativity with a data-obsessed approach. Our focus is on achieving measurable results and a tangible return on investment for our clients. We act as a true partner, not just a service provider, and specialize in integrating automation to make your marketing efforts more efficient."
    }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Adsverse | Top Digital Marketing agency | Automation agency in Indore",
  // ... (rest of JSON-LD is the same)
};

export default function HomePage() {
  const firestore = useFirestore();
  const servicesQuery = useMemoFirebase(() => 
    query(collection(firestore, 'services'), orderBy('displayOrder', 'asc')),
    [firestore]
  );
  const { data: services, isLoading: isLoadingServices } = useCollection<Service>(servicesQuery);

  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <main>
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-headline text-primary">
            Automate. Elevate. Dominate.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            The Future of Digital Marketing is Here.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-primary text-black hover:bg-primary/90 shadow-lg shadow-primary/20 transform hover:scale-105 transition-transform">
              <Link href="/contact">Get Your Free Proposal</Link>
            </Button>
            <Button asChild size="lg" variant="link" className="text-accent">
              <Link href="/our-services">Explore Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Audit Tool Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-card/50 backdrop-blur-sm p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">Free SEO Audit Tool</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Uncover technical issues & on-page optimization opportunities. Enter your website URL to get an instant, comprehensive SEO analysis.
            </p>
            <form action="/tools/seo-audit" method="GET" className="flex gap-2 max-w-xl mx-auto">
              <Input
                type="url"
                name="url"
                placeholder="https://yourwebsite.com"
                className="flex-grow h-12 text-lg bg-input"
                required
              />
              <Button type="submit" size="lg" className="h-12 bg-accent hover:bg-accent/90">
                <Search className="h-6 w-6" />
                <span className="ml-2 hidden md:inline">Analyze</span>
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold font-headline text-primary">Our Core Services</h2>
                  <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">We provide a complete suite of digital marketing services to fuel your growth at every stage.</p>
              </div>
              {isLoadingServices ? (
                 <div className="flex justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                 </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services?.map(service => (
                       <Link key={service.id} href={`/our-services`} className="block group">
                         <Card className="bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 flex flex-col overflow-hidden h-full">
                             <CardHeader>
                                <div className="flex items-center gap-4">
                                  {service.iconName && serviceIcons[service.iconName] ? serviceIcons[service.iconName] : <TrendingUp className="w-10 h-10 text-accent" />}
                                  <CardTitle className="font-headline text-2xl">{service.name}</CardTitle>
                                </div>
                             </CardHeader>
                             <CardContent className="flex-grow">
                                 <p className="text-foreground/90">{service.description}</p>
                             </CardContent>
                         </Card>
                       </Link>
                    ))}
                </div>
              )}
          </div>
      </section>

      {/* Results Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-headline text-primary">We Deliver Real Results</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Our strategies are designed for one thing: measurable growth.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-primary/20 text-center p-6">
              <div className="text-5xl font-extrabold text-primary">
                <AnimatedCounter target={400} suffix="%" />
              </div>
              <p className="text-muted-foreground mt-2">Increase in Organic Traffic</p>
            </Card>
            <Card className="bg-primary/20 text-center p-6">
              <div className="text-5xl font-extrabold text-primary">
                <AnimatedCounter target={3} suffix="x" />
              </div>
              <p className="text-muted-foreground mt-2">Higher Conversion Rates</p>
            </Card>
            <Card className="bg-primary/20 text-center p-6">
              <div className="text-5xl font-extrabold text-primary">
                <AnimatedCounter target={50} suffix="%" />
              </div>
              <p className="text-muted-foreground mt-2">Reduction in Ad Spend</p>
            </Card>
             <Card className="bg-primary/20 text-center p-6">
              <div className="text-5xl font-extrabold text-primary">
                <AnimatedCounter target={10} suffix="x" />
              </div>
              <p className="text-muted-foreground mt-2">Return on Investment</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold font-headline text-primary">What Our Clients Say</h2>
                  <p className="text-muted-foreground mt-2">We're proud to have earned the trust of amazing clients.</p>
              </div>
               <Carousel
                  opts={{
                    loop: true,
                  }}
                  className="w-full max-w-4xl mx-auto"
                >
                <CarouselContent>
                  {testimonials.map((t, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card className="bg-gradient-to-r from-primary to-accent/80 text-center p-8 relative overflow-hidden rounded-lg">
                           <div className="absolute inset-0 bg-black/20"></div>
                          <CardContent className="p-0 relative z-10">
                              <p className="text-lg md:text-xl text-primary-foreground/80 italic mb-6">"{t.text}"</p>
                              <div className="flex items-center justify-center gap-4">
                                <Avatar>
                                    <AvatarImage src={t.avatar} alt={t.name} data-ai-hint={t.hint} width={50} height={50} />
                                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-primary-foreground">{t.name}</p>
                                    <p className="text-sm text-primary-foreground/70">{t.role}</p>
                                </div>
                              </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
          </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
          <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold font-headline">Frequently Asked Questions</h2>
                  <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Have questions? We have answers.</p>
              </div>
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-lg text-left hover:no-underline">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
              </div>
          </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24">
          <div className="container mx-auto px-4">
              <div className="bg-gradient-to-r from-primary to-accent/80 rounded-lg p-12 text-center text-primary-foreground relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10">
                    <h2 className="text-4xl font-bold font-headline">Ready to Grow Your Business?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg opacity-90">
                        Let's have a conversation about your goals. We'll provide a free, no-obligation consultation and a detailed proposal on how we can help you succeed.
                    </p>
                    <Button asChild size="lg" variant="secondary" className="mt-8 text-lg py-6 px-8 shadow-lg transform hover:scale-105 transition-transform">
                      <Link href="/contact">Schedule Your Free Consultation</Link>
                    </Button>
                  </div>
              </div>
          </div>
      </section>

    </main>
    </>
  );
}
