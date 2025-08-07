
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Palette, Megaphone, TrendingUp, FileText, Share2, Code } from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: 'brand-strategy',
    icon: <Palette className="w-12 h-12 text-accent" />,
    title: 'Brand Strategy & Identity',
    description: "Crafting unique brand identities that resonate and stand out.",
  },
  {
    id: 'paid-ads',
    icon: <Megaphone className="w-12 h-12 text-accent" />,
    title: 'Meta & Google Ads',
    description: "Driving targeted traffic and maximizing ROI with strategic ad campaigns.",
  },
  {
    id: 'seo-optimization',
    icon: <TrendingUp className="w-12 h-12 text-accent" />,
    title: 'SEO Optimization',
    description: "Improving search rankings to increase organic visibility and attract leads.",
  },
  {
    id: 'content-marketing',
    icon: <FileText className="w-12 h-12 text-accent" />,
    title: 'Content Marketing',
    description: "Engaging your audience with valuable content that builds authority.",
  },
  {
    id: 'social-media-management',
    icon: <Share2 className="w-12 h-12 text-accent" />,
    title: 'Social Media Management',
    description: "Building and nurturing your online community to foster brand loyalty.",
  },
  {
    id: 'web-design-development',
    icon: <Code className="w-12 h-12 text-accent" />,
    title: 'Web Design & Development',
    description: "Creating beautiful, functional websites that convert visitors into customers.",
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Our Services</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          A comprehensive suite of digital marketing solutions designed to elevate your brand and achieve your business goals.
        </p>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
                <Card key={service.id} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                    <CardHeader className="items-center text-center">
                        {service.icon}
                        <CardTitle className="mt-4 text-center">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-center text-foreground/80">{service.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild variant="link" className="p-0 text-accent w-full justify-center">
                            <Link href={`/services/${service.id}`}>
                                Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </main>
    </div>
  );
}
