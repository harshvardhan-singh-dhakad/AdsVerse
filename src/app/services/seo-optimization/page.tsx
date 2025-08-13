
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { TrendingUp, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Optimization Services | AdsVerse",
  description: "Improve your search engine rankings and attract organic traffic with AdsVerse's SEO services, including technical audits, keyword research, and link building.",
};

const service = {
  id: 'seo-optimization',
  icon: <TrendingUp className="w-12 h-12 text-accent" />,
  title: 'SEO Optimization',
  description: [
     {
      heading: "The Foundation of Digital Visibility",
      text: "Search Engine Optimization (SEO) is the art and science of making your website more visible in organic (non-paid) search engine results. In a world where most online experiences begin with a search engine, SEO is not a luxury—it's a fundamental necessity for sustainable business growth. It's about earning your place at the top of the results page, connecting you with customers who are actively looking for the solutions you provide. Unlike paid ads, which offer immediate but temporary visibility, a strong SEO strategy builds a long-term asset for your business. It enhances your credibility, drives high-quality traffic, and delivers a consistent stream of leads and sales over time. At AdsVerse, we view SEO as a holistic discipline that encompasses technical excellence, high-quality content, and authoritative backlinks. Our goal is to build a powerful online presence for your brand that stands the test of time and ever-changing algorithms."
    },
    {
      heading: "Our Comprehensive SEO Methodology",
      text: "Our SEO services are built on the three pillars of modern optimization: Technical SEO, On-Page SEO, and Off-Page SEO. We begin with a thorough technical audit of your website to ensure it's built on a solid foundation. This includes optimizing site speed, ensuring mobile-friendliness, fixing crawl errors, and implementing structured data. A technically sound website is one that search engines can easily crawl and understand. Next, we focus on On-Page SEO. This involves in-depth keyword research to understand the language of your customers and strategically integrating those keywords into your website's content, title tags, headers, and meta descriptions. We ensure your content is not just keyword-rich, but also valuable, relevant, and structured in a way that provides an excellent user experience. Finally, we build your site's authority through Off-Page SEO. This is primarily focused on earning high-quality backlinks from reputable and relevant websites, a crucial signal that tells search engines your site is a trusted resource. We do this through ethical, white-hat strategies like content marketing, digital PR, and relationship-building."
    },
    {
      heading: "What Our SEO Service Delivers",
      text: "Our SEO Optimization service is a continuous process of improvement designed to achieve and maintain top search rankings. Our monthly package provides a complete solution. It starts with a comprehensive website audit and keyword research strategy. From there, we perform ongoing on-page optimizations, including content creation and updates, as well as technical monitoring to catch and fix any issues that arise. A significant portion of our efforts is dedicated to a strategic link-building campaign to grow your website's domain authority. You'll receive a detailed monthly report that tracks your keyword rankings, organic traffic growth, and key conversion metrics. We believe in complete transparency, so our reports are easy to understand and clearly outline the work performed and its impact on your business goals. Investing in SEO with AdsVerse is investing in the long-term health and visibility of your brand online. We build strategies that deliver not just rankings, but real, measurable business growth."
    },
  ],
   pricing: {
    title: "E-commerce SEO",
    price: "₹15,000",
    frequency: "/mo",
    features: [
      "Comprehensive SEO Audit",
      "Keyword Research & Strategy",
      "On-Page & Technical Optimization",
      "Monthly Link Building & Reporting",
    ],
  }
};

export default function SeoOptimizationPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-8">
        <Button asChild variant="link" className="p-0 text-muted-foreground hover:text-primary">
          <Link href="/services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm transition-all duration-300">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">{service.icon}</div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{service.title}</h1>
        </CardHeader>
        <CardContent className="px-6 md:px-12 py-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-6">
              {service.description.slice(0, 2).map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-semibold text-primary">{section.heading}</h2>
                  <p className="text-muted-foreground">{section.text}</p>
                </div>
              ))}
            </div>
            <Card className="bg-background/50 sticky top-24">
              <CardHeader>
                <CardTitle className="text-accent text-2xl">{service.pricing.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-extrabold mb-4">{service.pricing.price} <span className="text-lg font-normal text-muted-foreground">{service.pricing.frequency}</span></p>
                <ul className="space-y-3">
                  {service.pricing.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-accent hover:bg-accent/90">
                  <Link href="/contact">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-6 pt-8 border-t border-border">
            {service.description.slice(2).map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-semibold text-primary">{section.heading}</h2>
                <p className="text-muted-foreground">{section.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
