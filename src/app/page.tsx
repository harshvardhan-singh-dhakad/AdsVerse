
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Megaphone, TrendingUp, FileText, type LucideProps, Bot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const services = [
  {
    id: 'automation-tools',
    iconName: 'Bot',
    title: 'Automation Tools',
    description: 'Building custom automation tools and bots to streamline your business processes and boost efficiency.',
  },
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

const icons: { [key: string]: FC<LucideProps> } = {
  Palette,
  Megaphone,
  TrendingUp,
  FileText,
  Bot,
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </div>
  );
}
