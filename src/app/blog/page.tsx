
import { BlogSuggestionTool } from "@/components/pages/blog-suggestion-tool";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Insights | AdsVerse Blog",
  description: "Stay ahead of the curve with the latest news, trends, and strategies in digital marketing from the AdsVerse team.",
};

const featuredArticles = [
  {
    slug: "demystifying-seo",
    title: "Demystifying SEO: A Beginner's Guide to Ranking Higher",
    description: "Learn the fundamentals of Search Engine Optimization and how to apply them to your website to attract more organic traffic.",
    image: "https://placehold.co/600x400/8e44ad/ffffff.png",
    hint: "laptop analytics"
  },
  {
    slug: "content-is-king",
    title: "Why Content is Still King in 2024",
    description: "Explore the importance of a robust content marketing strategy and how it builds brand authority and drives conversions.",
    image: "https://placehold.co/600x400/2ecc71/ffffff.png",
    hint: "writing content"
  },
  {
    slug: "paid-ads-roi",
    title: "The Art of Paid Ads: Maximizing Your ROI",
    description: "A deep dive into creating effective paid advertising campaigns on Google and Meta that deliver measurable results.",
    image: "https://placehold.co/600x400/3498db/ffffff.png",
    hint: "charts graphs"
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-headline">Our Insights</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Stay ahead of the curve with the latest news, trends, and strategies in digital marketing.
        </p>
      </section>

      <section className="mb-24">
        <h2 className="text-4xl font-bold mb-8 font-headline">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map(article => (
            <Card key={article.slug} className="flex flex-col overflow-hidden group bg-card/50 backdrop-blur-sm">
              <Image 
                src={article.image}
                alt={article.title}
                width={600}
                height={400}
                data-ai-hint={article.hint}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
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

      <section>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Generate Blog Ideas with AI</CardTitle>
            <CardDescription>
              Stuck on what to write about? Use our AI tool to generate relevant blog topics based on current SEO trends and keywords.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BlogSuggestionTool />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
