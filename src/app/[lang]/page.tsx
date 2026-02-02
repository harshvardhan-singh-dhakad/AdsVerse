
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
import { AnimatedCounter } from "@/components/pages/animated-counter";

export const metadata: Metadata = {
  title: "AdsVerse | Digital Marketing That Drives Results",
  description: "We are a data-driven digital marketing agency specializing in SEO, Paid Ads, and Web Development. Partner with us to achieve measurable growth and dominate your market.",
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'hi': '/hi',
    },
  },
};

const featuredServices = [
  {
    icon: <TrendingUp className="w-10 h-10 text-accent" />,
    title: "SEO Optimization",
    description: "Climb the ranks and get discovered by more customers organically through our data-driven SEO strategies.",
    link: "/services/seo-optimization",
    imageUrl: "https://picsum.photos/seed/seo/600/400",
    imageHint: "analytics graph"
  },
  {
    icon: <Megaphone className="w-10 h-10 text-accent" />,
    title: "Paid Ads",
    description: "Targeted campaigns on Google & Meta to drive immediate, high-quality traffic and maximize your ROI.",
    link: "/services/paid-ads",
    imageUrl: "https://picsum.photos/seed/ads/600/400",
    imageHint: "marketing dashboard"
  },
  {
    icon: <Users className="w-10 h-10 text-accent" />,
    title: "Social Media",
    description: "Build a vibrant community, engage your audience, and foster brand loyalty with expert management.",
    link: "/services/social-media-management",
    imageUrl: "https://picsum.photos/seed/social/600/400",
    imageHint: "social media feed"
  },
  {
    icon: <FileText className="w-10 h-10 text-accent" />,
    title: "Content Marketing",
    description: "Engage your audience with valuable, SEO-optimized content that builds authority and drives conversions.",
    link: "/services/content-marketing",
    imageUrl: "https://picsum.photos/seed/content/600/400",
    imageHint: "writing blog"
  },
  {
    icon: <Code className="w-10 h-10 text-accent" />,
    title: "Web Development",
    description: "Creating beautiful, functional, and high-performing websites that convert visitors into customers.",
    link: "/services/web-design-development",
    imageUrl: "https://picsum.photos/seed/web/600/400",
    imageHint: "website code"
  },
  {
    icon: <Bot className="w-10 h-10 text-accent" />,
    title: "Automation Tools",
    description: "Streamline your business processes with custom bots and automation solutions to boost efficiency.",
    link: "/services/automation-tools",
    imageUrl: "https://picsum.photos/seed/automation/600/400",
    imageHint: "robot gears"
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
    },
    {
        name: "Sunita Singh",
        role: "Owner, Local Eats",
        text: "Their Local SEO service put us on the map! We are now the top-rated restaurant in our area on Google.",
        avatar: "https://picsum.photos/seed/4/100/100",
        hint: "woman smiling"
    },
    {
        name: "Vikram Chauhan",
        role: "Director, BuildRight Constructions",
        text: "The new website they built for us is not only beautiful but also incredibly fast. Our lead generation has increased by over 50% since the launch.",
        avatar: "https://picsum.photos/seed/5/100/100",
        hint: "man architect"
    },
    {
        name: "Neha Reddy",
        role: "Co-founder, EduGrowth",
        text: "The automation tool AdsVerse created for our admissions process has saved us hundreds of hours. It's a game-changer for our productivity.",
        avatar: "https://picsum.photos/seed/6/100/100",
        hint: "woman professional"
    },
    {
        name: "Ankit Jain",
        role: "E-commerce Manager, GadgetGalaxy",
        text: "Their Google Ads management is superb. Our Return on Ad Spend (ROAS) has never been higher, and they are always transparent with their reports.",
        avatar: "https://picsum.photos/seed/7/100/100",
        hint: "man entrepreneur"
    },
    {
        name: "Deepika Iyer",
        role: "Founder, WellnessFirst",
        text: "The content marketing strategy they developed has established us as a thought leader in the wellness space. The quality of their blog posts is outstanding.",
        avatar: "https://picsum.photos/seed/8/100/100",
        hint: "woman yoga"
    },
    {
        name: "Siddharth Malhotra",
        role: "CTO, FinSecure",
        text: "A truly professional and knowledgeable team. They delivered a complex web application on time and on budget. I'm thoroughly impressed.",
        avatar: "https://picsum.photos/seed/9/100/100",
        hint: "man technology"
    },
    {
        name: "Ishita Verma",
        role: "Brand Manager, LuxeLiving",
        text: "AdsVerse helped us with a complete rebrand, and the results are stunning. Our new brand identity truly reflects our values and connects with our audience.",
        avatar: "https://picsum.photos/seed/10/100/100",
        hint: "woman elegant"
    },
    {
        name: "Rajesh Kumar",
        role: "Owner, FreshBites Cafe",
        text: "Their social media management has built such a fun and engaging community around our cafe. We've seen a noticeable increase in new customers.",
        avatar: "https://picsum.photos/seed/11/100/100",
        hint: "man chef"
    }
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
  "description": "Professional digital marketing, SEO, Social media automation & branding services in Indore, Madhya Pradesh.",
  "url": "https://adsverse.in",
  "telephone": "+919685123339",
  "email": "contact@adsverse.in",
  "logo": "https://github.com/HSDmarketing/Adsverse.image/blob/main/adsverse.png?raw=true",
  "image": "https://github.com/harshvardhan-singh-dhakad/image/blob/main/insta%26facbook%20card.jpeg?raw=true",
  "hasMap": "https://maps.app.goo.gl/uT39bw6amkjFBuBUA",
  "sameAs": [
    "https://www.facebook.com/share/1E56NG5ZZL/",
    "https://x.com/Adsverse1?t=vG0NYqyjhKobVoztl4xIPw&s=09",
    "https://www.linkedin.com/company/dmafia/",
    "https://www.instagram.com/adsverse.ai?igsh=bnl2aTJqZjB4Nm4=",
    "https://wa.me/919685123339"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "stree no.11 , Near Marriot Hotel",
    "addressLocality": "Indore",
    "addressRegion": "MP",
    "postalCode": "452010",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 22.7503073,
    "longitude": 75.8824535
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "19:30"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "11"
  },
  "review": testimonials.map(t => ({
    "@type": "Review",
    "author": { "@type": "Person", "name": t.name },
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": t.text,
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": "AdsVerse",
      "url": "https://adsverse.in"
    }
  })),
  "paymentAccepted": ["Cash", "Credit Card", "UPI", "NetBanking"],
  "service": [
    {"@type": "Service", "name": "Search Engine Optimization (SEO)"},
    {"@type": "Service", "name": "Social Media Marketing"},
    {"@type": "Service", "name": "Paid Advertising (PPC)"},
    {"@type": "Service", "name": "Website Development"},
    {"@type": "Service", "name": "Marketing Automation"},
    {"@type": "Service", "name": "Brand Strategy"},
    {"@type": "Service", "name": "Content Marketing"}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredServices.map(service => (
                     <Link key={service.title} href={service.link} className="block group">
                       <Card className="bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 flex flex-col overflow-hidden h-full">
                           <CardHeader>
                              <div className="flex items-center gap-4">
                                {service.icon}
                                <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                              </div>
                           </CardHeader>
                           <CardContent className="flex-grow">
                               <p className="text-foreground/90">{service.description}</p>
                           </CardContent>
                       </Card>
                     </Link>
                  ))}
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
