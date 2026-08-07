import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail, Twitter, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cleanTitle, validateMeta } from "@/lib/seo-guard";

// Mock author database - in a real app, this would be in Firestore
const AUTHORS: Record<string, any> = {
  "deepak-dhakad": {
    name: "Deepak Dhakad",
    role: "Founder & Digital Marketing Expert",
    bio: "Deepak Dhakad is the founder of AdsVerse, specializing in AI-driven digital marketing, SEO, and automation systems that help businesses scale efficiently.",
    image: "/images/deepak-dhakad-founder.webp",
    social: {
      twitter: "https://twitter.com/Adsverse1",
      linkedin: "https://linkedin.com/company/adsverse",
      email: "hello@adsverse.in"
    }
  }
};

interface Props {
  params: { name: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const authorSlug = params.name.toLowerCase();
  const author = AUTHORS[authorSlug];
  
  if (!author) notFound();

  const rawTitle = `${author.name} - Author at AdsVerse`;
  const cleanT = cleanTitle(rawTitle);
  const fullUrl = `https://adsverse.in/author/${authorSlug}`;

  try {
    validateMeta(fullUrl, cleanT, author.bio);
  } catch (e) {
    console.warn(e);
  }

  return {
    title: cleanT,
    description: author.bio,
    alternates: {
      canonical: fullUrl,
    },
  };
}

export default function AuthorPage({ params }: Props) {
  const authorSlug = params.name.toLowerCase();
  const author = AUTHORS[authorSlug];

  if (!author) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author.name,
    "jobTitle": author.role,
    "description": author.bio,
    "image": `https://adsverse.in${author.image}`,
    "url": `https://adsverse.in/author/${authorSlug}`,
    "worksFor": {
      "@type": "Organization",
      "name": "AdsVerse",
      "url": "https://adsverse.in"
    },
    "sameAs": [
      author.social.twitter,
      author.social.linkedin
    ].filter(Boolean)
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto py-16 px-4 max-w-4xl">
        <Button asChild variant="ghost" className="mb-8 hover:text-primary transition-colors">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <Card className="border-none bg-card/40 backdrop-blur-md shadow-xl overflow-hidden">
          <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative w-48 h-48 rounded-full overflow-hidden shrink-0 border-4 border-primary/20">
              <Image 
                src={author.image} 
                alt={author.name} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 192px, 192px"
              />
            </div>
            
            <div className="text-center md:text-left space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold font-headline">{author.name}</h1>
              <p className="text-xl text-primary font-semibold">{author.role}</p>
              <p className="text-slate-700 dark:text-muted-foreground leading-relaxed text-lg">
                {author.bio}
              </p>
              
              <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                {author.social.twitter && (
                  <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <Twitter className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </a>
                  </Button>
                )}
                {author.social.linkedin && (
                  <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </a>
                  </Button>
                )}
                {author.social.email && (
                  <Button asChild variant="outline" size="icon" className="rounded-full">
                    <a href={`mailto:${author.social.email}`} aria-label="Email">
                      <Mail className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
