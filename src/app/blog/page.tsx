
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing Insights & Trends | AdsVerse Blog",
  description: "Stay ahead of the curve with the latest news, trends, and strategies in digital marketing from the AdsVerse team. Explore articles on SEO, paid ads, and content.",
  alternates: {
    canonical: '/blog',
  },
};

const featuredArticles = [
  {
    slug: "why-automation-is-essential",
    title: "Why Automation is Essential for Modern Companies",
    description: "Learn how automation tools can save you time, reduce costly errors, and free up your team to focus on business growth.",
    image: "https://picsum.photos/seed/automation1/600/400",
    hint: "gears automation"
  },
  {
    slug: "best-digital-marketing-services-in-indore",
    title: "Best Digital Marketing Services in Indore – Grow Your Business",
    description: "A guide on why digital marketing matters for businesses in Indore, what services to look for, and how to find the best digital marketing agency.",
    image: "https://github.com/harshvardhan-singh-dhakad/image/blob/main/Digital%20Marketing%20Indore.jpeg?raw=true",
    hint: "cityscape marketing"
  },
  {
    slug: "best-automation-tools-for-business",
    title: "Best Automation Tools for Business – Save Time and Boost Productivity",
    description: "Discover how automation tools can streamline your workflow, reduce errors, and free up time to focus on growing your business.",
    image: "https://github.com/harshvardhan-singh-dhakad/image/blob/main/Best%20Automation.jpeg?raw=true",
    hint: "automation tools"
  },
  {
    slug: "demystifying-seo",
    title: "Demystifying SEO: A Beginner's Guide to Ranking Higher",
    description: "Learn the fundamentals of Search Engine Optimization and how to apply them to your website to attract more organic traffic.",
    image: "https://github.com/harshvardhan-singh-dhakad/image/blob/main/Demystifying%20SEO%20A%20Beginner's%20Guide%20to%20Ranking%20Higher.jpg?raw=true",
    hint: "laptop analytics"
  },
  {
    slug: "content-is-king",
    title: "Why Content is Still King in 2024",
    description: "Explore the importance of a robust content marketing strategy and how it builds brand authority and drives conversions.",
    image: "https://github.com/harshvardhan-singh-dhakad/image/blob/main/Why%20Content%20is%20Still%20King%20in%202024.jpg?raw=true",
    hint: "writing content"
  },
  {
    slug: "paid-ads-roi",
    title: "The Art of Paid Ads: Maximizing Your ROI",
    description: "A deep dive into creating effective paid advertising campaigns on Google and Meta that deliver measurable results.",
    image: "https://github.com/harshvardhan-singh-dhakad/image/blob/main/The%20Art%20of%20Paid%20Ads%20Maximizing%20Your%20ROI.jpg?raw=true",
    hint: "charts graphs"
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Digital Marketing Insights & Trends | AdsVerse Blog",
  "description": "Stay ahead of the curve with the latest news, trends, and strategies in digital marketing from the AdsVerse team.",
  "url": "https://adsverse.in/blog",
  "publisher": {
    "@type": "Organization",
    "name": "AdsVerse",
    "logo": {
      "@type": "ImageObject",
      "url": "https://github.com/HSDmarketing/Adsverse.image/blob/main/adsverse.png?raw=true"
    }
  },
  "blogPost": featuredArticles.map(article => ({
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://adsverse.in/blog/${article.slug}`
    },
    "headline": article.title,
    "description": article.description,
    "image": article.image,
    "author": {
      "@type": "Organization",
      "name": "AdsVerse"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AdsVerse",
      "logo": {
        "@type": "ImageObject",
        "url": "https://github.com/HSDmarketing/Adsverse.image/blob/main/adsverse.png?raw=true"
      }
    }
  }))
};


export default function BlogPage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="container mx-auto py-16 px-4">
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-headline">Our Insights</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Stay ahead of the curve with the latest news, trends, and strategies in digital marketing.
        </p>
      </section>

      <section className="mb-24">
        <h2 className="text-4xl font-bold text-center mb-8 font-headline">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <Card key={article.slug} className="flex flex-col overflow-hidden group bg-card/50 backdrop-blur-sm">
              <Image 
                src={article.image}
                alt={article.title}
                width={600}
                height={400}
                data-ai-hint={article.hint}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                priority={index < 3}
              />
              <CardHeader>
                <CardTitle className="font-headline">{article.title}</CardTitle>
                <CardDescription className="pt-2">{article.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow"></CardContent>
              <CardFooter>
                 <Button asChild variant="link" className="p-0 text-accent">
                   <Link href={`/blog/${article.slug}`}>
                     Read More <ArrowRight className="ml-2 h-4 w-4" />
                   </Link>
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
