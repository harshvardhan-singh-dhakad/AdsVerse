
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Megaphone, TrendingUp, FileText, type LucideProps } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const services = [
  {
    id: 'brand-strategy',
    iconName: 'Palette',
    title: 'Brand Strategy & Identity',
    description: 'Crafting unique brand identities that resonate with your target audience and stand out in the market.',
  },
  {
    id: 'paid-ads',
    iconName: 'Megaphone',
    title: 'Meta & Google Ads',
    description: 'Driving targeted traffic and maximizing ROI with strategic ad campaigns on major platforms.',
  },
  {
    id: 'seo-optimization',
    iconName: 'TrendingUp',
    title: 'SEO Optimization',
    description: 'Improving your search engine rankings to increase organic visibility and attract qualified leads.',
  },
  {
    id: 'content-marketing',
    iconName: 'FileText',
    title: 'Content Marketing',
    description: 'Engaging your audience with valuable content that builds authority and drives conversions.',
  },
];

const clients = [
  { name: "Sports Mania", logo: "https://images.unsplash.com/photo-1606419866333-ced28837d700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8c3BvcnRzJTIwY29tcGFueXxlbnwwfHx8fDE3NTUwNjk3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080", hint: "sports company" },
  { name: "Steadfast Spoken English", logo: "https://images.unsplash.com/photo-1648337564744-f919c7c2fc02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxlZHVjYXRpb24lMjBjb21wYW55fGVufDB8fHx8MTc1NTA2OTc5OHww&ixlib=rb-4.1.0&q=80&w=1080", hint: "education company" },
  { name: "JSM Pvt. Ltd.", logo: "https://images.unsplash.com/photo-1657672733176-b48c9b0eec0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxidXNpbmVzcyUyMGNvbXBhbnl8ZW58MHx8fHwxNzU1MDY5Nzk4fDA&ixlib=rb-4.1.0&q=80&w=1080", hint: "business company" },
  { name: "Evalvue", logo: "https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx0ZWNoJTIwY29tcGFueXxlbnwwfHx8fDE3NTUwNjk3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080", hint: "tech company" },
  { name: "Funland", logo: "https://images.unsplash.com/photo-1554976343-df6383b85587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxlbnRlcnRhaW5tZW50JTIwY29tcGFueXxlbnwwfHx8fDE3NTUwNjk3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080", hint: "entertainment company" },
  { name: "ChicBoutique", logo: "https://images.unsplash.com/photo-1590664863685-a99ef05e9f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxmYXNoaW9uJTIwYnJhbmR8ZW58MHx8fHwxNzU1MDY5Nzk4fDA&ixlib=rb-4.1.0&q=80&w=1080", hint: "fashion brand" },
];

const icons: { [key: string]: FC<LucideProps> } = {
  Palette,
  Megaphone,
  TrendingUp,
  FileText
};

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex items-start justify-center text-center relative overflow-hidden pt-8 pb-12 md:pb-16">
        <div className="absolute inset-0 bg-transparent z-0" />
        <div className="stars stars-sm"></div>
        <div className="stars stars-md"></div>
        <div className="stars stars-lg"></div>
        <div className="z-10 p-4 space-y-6">
          <div className="w-full max-w-4xl mx-auto relative" style={{ left: '0.75rem' }}>
            <Image 
              src="https://github.com/HSDmarketing/Adsverse.image/blob/main/ads.logo.png?raw=true"
              alt="AdsVerse Logo"
              width={800}
              height={120}
              className="w-full h-auto"
              priority
            />
          </div>
          <div className="relative bottom-12 space-y-6">
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/80">
              Elevating Brands with Innovative Digital Marketing Solutions. We blend creativity with data to drive measurable results.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30 transform hover:scale-105 transition-transform">
                <Link href="/services">Our Services</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 transform hover:scale-105 transition-transform">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section id="services" className="w-full max-w-6xl py-16 md:py-24 px-4 pt-0 md:pt-0">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">What We Do</h2>
          <p className="text-lg text-foreground/70 mt-2">Our expertise spans the full digital marketing spectrum.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon = icons[service.iconName];
            return (
              <Link key={service.id} href={`/services/${service.id}`} className="flex">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col w-full">
                  <CardHeader className="items-center">
                    {Icon && <Icon className="w-8 h-8 text-accent" />}
                    <CardTitle className="mt-4 text-center">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-center text-foreground/80">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Client Showcase Section */}
      <section className="w-full bg-card/30 backdrop-blur-sm py-16 md:py-24">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold">Trusted by Industry Leaders</h2>
          <p className="text-lg text-foreground/70 mt-2 mb-12">We are proud to partner with innovative companies worldwide.</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {clients.map((client) => (
              <div key={client.name} className="grayscale hover:grayscale-0 transition-all duration-300" title={client.name}>
                <Image
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  width={150}
                  height={50}
                  data-ai-hint={client.hint}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
