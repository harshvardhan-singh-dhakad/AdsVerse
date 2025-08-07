
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Megaphone, TrendingUp, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const services = [
    {
      icon: <Palette className="w-8 h-8 text-accent" />,
      title: 'Brand Strategy & Identity',
      description: 'Crafting unique brand identities that resonate with your target audience and stand out in the market.',
    },
    {
      icon: <Megaphone className="w-8 h-8 text-accent" />,
      title: 'Meta & Google Ads',
      description: 'Driving targeted traffic and maximizing ROI with strategic ad campaigns on major platforms.',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      title: 'SEO Optimization',
      description: 'Improving your search engine rankings to increase organic visibility and attract qualified leads.',
    },
    {
      icon: <FileText className="w-8 h-8 text-accent" />,
      title: 'Content Marketing',
      description: 'Engaging your audience with valuable content that builds authority and drives conversions.',
    },
  ];

  const clients = [
    { name: 'QuantumLeap', logo: 'https://placehold.co/150x50/36495f/94a3b8?text=QuantumLeap', hint: 'tech company' },
    { name: 'ApexIndustries', logo: 'https://placehold.co/150x50/36495f/94a3b8?text=ApexIndustries', hint: 'industrial factory'},
    { name: 'StellarFoods', logo: 'https://placehold.co/150x50/36495f/94a3b8?text=StellarFoods', hint: 'food brand' },
    { name: 'NovaHealth', logo: 'https://placehold.co/150x50/36495f/94a3b8?text=NovaHealth', hint: 'healthcare provider' },
    { name: 'PioneerLogistics', logo: 'https://placehold.co/150x50/36495f/94a3b8?text=PioneerLogistics', hint: 'shipping company' },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full h-screen min-h-[700px] flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-transparent z-0" />
        <div className="stars stars-sm"></div>
        <div className="stars stars-md"></div>
        <div className="stars stars-lg"></div>
        <div className="z-10 p-4 space-y-6">
          <div className="w-full max-w-4xl mx-auto">
            <Image 
              src="https://github.com/HSDmarketing/Adsverse.image/blob/main/ads.logo.png?raw=true"
              alt="AdsVerse Logo"
              width={800}
              height={120}
              className="w-full h-auto"
              priority
            />
          </div>
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
      </section>

      {/* Services Overview Section */}
      <section id="services" className="w-full max-w-6xl py-16 md:py-24 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">What We Do</h2>
          <p className="text-lg text-foreground/70 mt-2">Our expertise spans the full digital marketing spectrum.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="items-center">
                {service.icon}
                <CardTitle className="mt-4 text-center">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-foreground/80">{service.description}</p>
              </CardContent>
            </Card>
          ))}
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
