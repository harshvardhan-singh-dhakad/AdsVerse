
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Marketing Services | AdsVerse",
  description: "Engage your audience with valuable content marketing from AdsVerse. Our services include blog writing, content strategy, and SEO optimization to build authority.",
};

const service = {
  id: 'content-marketing',
  icon: <FileText className="w-12 h-12 text-accent" />,
  title: 'Content Marketing',
  description: [
    {
      heading: "Building Trust and Authority Through Value",
      text: "Content Marketing is a strategic approach focused on creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience — and, ultimately, to drive profitable customer action. In an era of information overload and skepticism towards traditional advertising, content is how you build trust and establish your brand as an expert in your field. It's about providing solutions and answering your audience's questions before they even think about making a purchase. From blog posts and articles to videos and whitepapers, content is the engine that powers your entire digital marketing strategy. It fuels your SEO efforts by targeting keywords, populates your social media channels with engaging material, and nurtures leads through your sales funnel. At AdsVerse, we believe that great content is the heart of great marketing. It's about putting your audience first and building relationships that last."
    },
    {
      heading: "Our Content Creation & Strategy Process",
      text: "Our content marketing services are designed to turn your brand into a go-to resource. Our process begins with strategy. We work with you to develop a content strategy that aligns with your business goals. This involves defining your target audience, identifying key themes and topics, and mapping out a content calendar. We perform keyword research to ensure our content is optimized for search engines, maximizing its reach and visibility. Once the strategy is in place, our team of expert writers, designers, and strategists gets to work. We create a variety of content types tailored to your audience and channels, including SEO-optimized blog posts, in-depth articles, engaging social media updates, and lead-generating assets like e-books and infographics. Every piece of content we create is meticulously researched, professionally written, and aligned with your brand's unique voice and tone. We focus on creating content that is not only informative but also engaging and shareable."
    },
    {
      heading: "Content That Converts",
      text: "Our Content Marketing package is designed to provide you with a consistent stream of high-quality content that drives results. Our most popular plan includes the research, writing, and optimization of four blog posts per month. These posts are designed to attract organic traffic, engage your audience, and establish your thought leadership. We also provide a monthly content strategy session to plan upcoming topics and review performance. We track key metrics like organic traffic, time on page, and conversions to measure the effectiveness of our content and continuously refine our approach. We also help you with content distribution, ensuring your content reaches the widest possible audience through social media, email newsletters, and other channels. With AdsVerse, you're not just getting content; you're getting a strategic partner dedicated to using content to build your brand and grow your business."
    },
  ],
   pricing: {
    title: "Blog Content Package",
    price: "₹10,000",
    frequency: "/mo",
    features: [
      "Monthly Content Strategy",
      "4 High-Quality Blog Posts",
      "SEO Keyword Optimization",
      "Stock Imagery Included",
    ],
  }
};

export default function ContentMarketingPage() {
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
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">{service.title}</h1>
        </CardHeader>
        <CardContent className="px-6 md:px-12 py-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-6">
              {service.description.slice(0, 2).map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-semibold text-primary font-headline">{section.heading}</h2>
                  <p className="text-muted-foreground">{section.text}</p>
                </div>
              ))}
            </div>
            <Card className="bg-background/50 sticky top-24">
              <CardHeader>
                <CardTitle className="text-accent text-2xl font-headline">{service.pricing.title}</CardTitle>
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
                <h2 className="text-2xl font-semibold text-primary font-headline">{section.heading}</h2>
                <p className="text-muted-foreground">{section.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
