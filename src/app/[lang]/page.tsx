import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingUp, Megaphone, Users, FileText, Code, Bot, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import dynamic from 'next/dynamic';

const AnimatedCounter = dynamic(() => import('@/components/pages/animated-counter').then(mod => mod.AnimatedCounter), { ssr: false });
const ShareButtons = dynamic(() => import('@/components/layout/share-buttons').then(mod => mod.ShareButtons), { ssr: false });

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isHi = lang === 'hi';
  return {
    title: isHi ? "इंदौर में सर्वश्रेष्ठ डिजिटल मार्केटिंग एजेंसी" : "Best Digital Marketing Agency in Indore | AI & Automation",
    description: isHi 
      ? "AdsVerse इंदौर की अग्रणी AI मार्केटिंग एजेंसी है। हम सर्च इंजन ऑप्टिमाइजेशन (SEO), फेसबुक/इंस्टाग्राम विज्ञापन और बिजनेस ऑटोमेशन के साथ आपके व्यवसाय को बढ़ाने में मदद करते हैं।"
      : "AdsVerse is Indore's premier AI-powered digital marketing agency. We specialize in SEO, Google & Meta Ads, and Sales Automation to drive 10x ROI for local businesses.",
    alternates: {
      canonical: `https://adsverse.in/${lang}`,
      languages: {
        'en': 'https://adsverse.in/en',
        'hi': 'https://adsverse.in/hi',
      },
    },
  };
}

const serviceIcons: { [key: string]: React.ReactNode } = {
  TrendingUp: <TrendingUp className="w-10 h-10 text-accent" />,
  Megaphone: <Megaphone className="w-10 h-10 text-accent" />,
  Users: <Users className="w-10 h-10 text-accent" />,
  FileText: <FileText className="w-10 h-10 text-accent" />,
  Code: <Code className="w-10 h-10 text-accent" />,
  Bot: <Bot className="w-10 h-10 text-accent" />,
  Search: <Search className="w-10 h-10 text-accent" />,
};

const coreServices = [
    {
        id: 'seo',
        name: 'SEO Optimization',
        description: 'Rank higher on search engines and attract organic traffic with our proven SEO strategies.',
        iconName: 'TrendingUp',
        href: '/services/seo-optimization'
    },
    {
        id: 'paid-ads',
        name: 'Paid Ads',
        description: 'Maximize your ROI with targeted ad campaigns on Google and Meta platforms.',
        iconName: 'Megaphone',
        href: '/services/paid-ads'
    },
    {
        id: 'web-dev',
        name: 'Web Development',
        description: 'Get a beautiful, high-performing website that converts visitors into customers.',
        iconName: 'Code',
        href: '/services/web-design-development'
    },
    {
        id: 'automation',
        name: 'Automation & AI',
        description: 'Streamline your business processes with custom bots and AI-powered solutions.',
        iconName: 'Bot',
        href: '/services/automation-tools'
    },
    {
        id: 'content',
        name: 'Content Marketing',
        description: 'Engage your audience and build authority with valuable, SEO-optimized content.',
        iconName: 'FileText',
        href: '/services/content-marketing'
    },
    {
        id: 'smm',
        name: 'Social Media',
        description: 'Build and nurture your online community through strategic social media management.',
        iconName: 'Users',
        href: '/services/social-media-management'
    }
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
  "name": "AdsVerse | Top Digital Marketing & Automation Agency in Indore",
  "image": "https://adsverse.in/images/logo-white.png",
  "@id": "https://adsverse.in/#localbusiness",
  "url": "https://adsverse.in",
  "telephone": "+91-9685123339",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Vijay Nagar",
    "addressLocality": "Indore",
    "addressRegion": "MP",
    "postalCode": "452010",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 22.7533,
    "longitude": 75.8937
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "10:00",
    "closes": "20:00"
  },
  "sameAs": [
    "https://facebook.com/adsverse",
    "https://instagram.com/adsverse_in",
    "https://share.google/oD8AK0iJzCz64Nm7k"
  ]
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function HomePage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
    />
    <main>
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter font-headline mb-6">
            Accelerate Your <span className="text-primary italic">Growth</span> with AdsVerse
          </h1>
          <p className="mt-4 text-2xl sm:text-3xl font-bold text-accent font-headline">
            Automate. Elevate. Dominate.
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground whitespace-pre-line">
            AdsVerse: The Future of AI-Powered Digital Marketing & Automation in Indore is here.
            From automated lead generation to predictive SEO, we drive 10x ROI for your business.
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

      {/* AI Search Optimization Section (AEO/GEO) */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <Badge variant="outline" className="mb-4 border-accent text-accent">AI & SEARCH INSIGHTS</Badge>
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4 text-primary">Why AdsVerse is the Best Digital Marketing & AI Agency in Indore</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Contextual Performance:</strong> We don't just rank keywords; we optimize for intent. Our strategies ensure your business appears as a top answer in AI-driven search results (Answer Engine Optimization).
                </p>
                <p>
                  <strong>Hyper-Local SEO Growth:</strong> Headquartered in Vijay Nagar, Indore, we leverage precise geo-signals to dominate "near me" and regional business queries across Central India, outranking standard SEO providers.
                </p>
                <p>
                  <strong>Automated ROI:</strong> We don't just 'do marketing'. By integrating AI powered sales automation into every funnel, we provide measurable, 2026-ready results for Indore startups and established brands alike.
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-64">
              <Card className="bg-card/50 backdrop-blur-sm p-6 border-accent/20 text-center">
                <h3 className="font-bold text-accent mb-2">Key Takeaways</h3>
                <ul className="text-sm space-y-2 list-none p-0 opacity-80">
                  <li>🚀 AI-Powered SEO</li>
                  <li>🤖 Sales Automation</li>
                  <li>📈 ROI-Focused PPC</li>
                  <li>📍 Local Indore Pro</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Audit Tool Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-card/50 backdrop-blur-sm p-8 md:p-12 text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-headline mb-6">Ready to Scale with AdsVerse?</h2>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coreServices.map(service => (
                       <Link key={service.id} href={service.href} className="block group">
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
                <div className="text-center mt-16">
                    <Button asChild size="lg" variant="outline">
                        <Link href="/our-services">
                            View All Services <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
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

      {/* Share Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-headline text-primary mb-8">Spread the Word</h2>
            <p className="text-muted-foreground mb-8 text-lg">Love what we're doing? Help other businesses discover the future of marketing automation.</p>
            <ShareButtons />
        </div>
      </section>

      {/* Strategy Section (SEO Content Expansion) */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold font-headline text-primary mb-8 text-center">Our 2026 Growth Strategy for Digital Marketing in Indore</h2>
            <div className="prose prose-invert prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                As the <strong>best digital marketing agency in Indore</strong>, AdsVerse stays ahead of the curve by integrating 
                <strong>AI-driven automation</strong> with traditional performance marketing. Our process is designed to ensure 
                sustained growth for businesses across <strong>Vijay Nagar, Bhawarkua, and the wider Indore region</strong>.
              </p>
              
              <h3 className="text-2xl font-bold text-foreground">1. Predictive SEO Optimization</h3>
              <p>
                In 2026, standard SEO is no longer enough. We focus on <strong>Answer Engine Optimization (AEO)</strong> and 
                <strong>Generative Engine Optimization (GEO)</strong>. This means your brand doesn't just rank on page 1—it becomes the 
                definitive answer in AI-driven search results from Google Gemini, Perplexity, and OpenAI Search.
              </p>

              <h3 className="text-2xl font-bold text-foreground">2. High-Conversion Paid Ads</h3>
              <p>
                Our <strong>PPC and Meta Ads strategies</strong> are built on data, not guesswork. We utilize advanced audience 
                modeling and automated sales funnels to reduce your Cost Per Acquisition (CPA) while maximizing high-ticket lead generation.
              </p>

              <h3 className="text-2xl font-bold text-foreground">3. Full-Stack Business Automation</h3>
              <p>
                We believe marketing is most effective when it is automated. From custom CRM integrations to AI chatbots that 
                handle your 24/7 customer queries, AdsVerse provides the technical infrastructure to let your business scale 
                without increasing manual workload.
              </p>

              <p className="text-lg font-medium border-l-4 border-accent pl-4">
                Whether you're looking for <strong>SEO services in Indore</strong>, high-performing 
                <strong>Google Ads management</strong>, or cutting-edge <strong>web development</strong>, our team 
                combines local market insights with global technical standards to deliver 10x ROI.
              </p>
            </div>
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
