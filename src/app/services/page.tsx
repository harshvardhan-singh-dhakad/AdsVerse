import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Megaphone, TrendingUp, FileText, Share2, Code } from 'lucide-react';

const services = [
  {
    icon: <Palette className="w-12 h-12 text-accent" />,
    title: 'Brand Strategy & Identity',
    description: 'We build memorable brands from the ground up. Our process includes market research, brand positioning, logo design, and comprehensive style guides to ensure consistency across all channels.',
  },
  {
    icon: <Megaphone className="w-12 h-12 text-accent" />,
    title: 'Meta & Google Ads',
    description: 'Maximize your reach and ROI with our expert-led paid advertising campaigns. We handle everything from audience targeting and ad creation to performance tracking and optimization.',
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-accent" />,
    title: 'SEO Optimization',
    description: 'Climb the search rankings and drive organic traffic. Our SEO services include keyword research, on-page and off-page optimization, technical SEO, and transparent reporting.',
  },
  {
    icon: <FileText className="w-12 h-12 text-accent" />,
    title: 'Content Marketing',
    description: "Engage your audience with high-quality, relevant content. We create blog posts, articles, whitepapers, and more to establish your brand as an industry leader and nurture leads.",
  },
  {
    icon: <Share2 className="w-12 h-12 text-accent" />,
    title: 'Social Media Management',
    description: 'Build a vibrant community around your brand. We develop content calendars, manage your social profiles, engage with followers, and run targeted social media campaigns.',
  },
  {
    icon: <Code className="w-12 h-12 text-accent" />,
    title: 'Web Design & Development',
    description: 'Your website is your digital storefront. We design and develop beautiful, responsive, and high-performing websites that provide an exceptional user experience and drive conversions.',
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Our Services</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          A comprehensive suite of digital marketing solutions designed to elevate your brand and achieve your business goals.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="bg-card/50 backdrop-blur-sm flex flex-col transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-2">
              <CardHeader className="items-center text-center">
                {service.icon}
                <CardTitle className="mt-6 text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-center text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
