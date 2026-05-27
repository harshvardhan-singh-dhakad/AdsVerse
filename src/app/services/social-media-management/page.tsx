import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Share2, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { AISearchInsights } from "@/components/seo/AISearchInsights";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Social Media Marketing Agency India — Instagram & Facebook | AdsVerse",
  description: "Grow your brand on Instagram, Facebook & LinkedIn with AdsVerse's expert social media management. We create content, manage communities & run ads for Indian businesses in Indore.",
  alternates: {
    canonical: 'https://adsverse.in/services/social-media-management',
  },
};

const service = {
  id: 'social-media-management',
  icon: <Share2 className="w-12 h-12 text-accent" />,
  title: 'Social Media Management',
  description: [
     {
      heading: "Building and Nurturing Your Online Community",
      text: "Social media is more than just a marketing channel; it's a platform for building a community around your brand. Effective social media management involves creating and sharing engaging content, interacting with your followers, and fostering a loyal community that advocates for your business. It's your direct line to your customers, offering invaluable insights and the opportunity to build authentic relationships. In a world where consumers expect brands to be accessible and responsive, a strong social media presence is non-negotiable. It humanizes your brand, enhances customer loyalty, and drives traffic to your website. At AdsVerse, we manage your social media with a strategic approach, focusing on creating a vibrant and interactive community that supports your business goals. We go beyond just posting content; we create conversations and build connections."
    },
    {
      heading: "Our Approach to Social Media Success",
      text: "Our social media management process is comprehensive and tailored to your brand. We begin by developing a social media strategy that defines your target audience, key platforms (like Instagram, Facebook, LinkedIn, etc.), content pillars, and brand voice. We create a detailed monthly content calendar, planning out posts in advance to ensure a consistent and strategic presence. Our team creates all the content for you, from writing compelling captions to designing eye-catching graphics and videos that align with your brand identity. But our work doesn't stop at posting. We actively manage your community, responding to comments and messages promptly, engaging with your followers' content, and monitoring conversations about your brand. This active engagement is key to building a thriving community. We also run targeted social media advertising campaigns to expand your reach and achieve specific objectives, like generating leads or driving sales."
    },
    {
      heading: "A Complete Social Media Solution",
      text: "Our Social Media Management package is a full-service solution designed to grow your online presence and free up your time. Our standard package includes the complete management of two social media platforms. This covers strategy development, content calendar creation, daily posting, community management, and proactive engagement. We also provide a detailed monthly performance report that tracks key metrics like follower growth, engagement rate, reach, and website clicks. These reports offer clear insights into what's working and how our efforts are contributing to your overall business objectives. We stay on top of the latest trends and algorithm changes to ensure your strategy remains effective and ahead of the curve. With AdsVerse handling your social media, you can be confident that your brand is building a strong, engaged, and loyal community online."
    },
  ],
   pricing: {
    title: "Social Media Management",
    price: "₹14,999",
    frequency: "/mo",
    features: [
      "Management of 2 Platforms",
      "Monthly Content Calendar",
      "Daily Posting & Engagement",
      "Performance Reporting",
    ],
  }
};

const expandedFaqs = [
  {
    question: "Which social media platforms do you manage?",
    answer: "We manage all major platforms including Instagram, Facebook, LinkedIn, YouTube (Shorts), Twitter (X), and Pinterest. Our standard packages focus on Instagram and Facebook, but we can customize to include B2B optimization on LinkedIn."
  },
  {
    question: "Will you create the content (graphics and video Reels) for my social media?",
    answer: "Yes, absolutely! Our service is 100% all-inclusive. Our creative design and copywriting team handles scriptwriting, video editing for Reels/Shorts, graphic posts, carousels, and stories tailored to each platform's guidelines."
  },
  {
    question: "How do you measure the success of social media campaigns?",
    answer: "We track standard engagement metrics (likes, shares, saves, comments), reach, impressions, follower growth, inbound direct messages (DMs), link clicks, and overall attributed lead generation, delivering a clean report monthly."
  },
  {
    question: "Do we need to provide raw photos and video footage of our business?",
    answer: "While we can use stock media and high-quality graphics, authentic photos and videos of your team, products, and office in Indore dramatically improve engagement. We help you storyboard simple videos your team can record with a phone."
  },
  {
    question: "How often do you post on our accounts?",
    answer: "For our standard package, we post 3-4 high-quality creatives per week on two platforms (totaling 15-18 posts/month), including a balanced mix of static graphics, interactive carousel guides, and trending short-form video Reels."
  },
  {
    question: "Will your team respond to direct messages and comments?",
    answer: "Yes. We actively monitor your comments and direct messages during business hours. We draft custom replies to basic FAQs and immediately forward qualified leads or urgent service queries directly to your sales team over WhatsApp."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "serviceType": "Social Media Management",
      "name": "Social Media Management Services | AdsVerse",
      "description": "Build and nurture your online community with our expert social media management services. We handle content creation, daily engagement, and performance reporting.",
      "provider": {
        "@type": "Organization",
        "name": "AdsVerse",
        "url": "https://adsverse.in"
      },
      "areaServed": {
        "@type": "City",
        "name": "Indore"
      },
      "offers": {
        "@type": "Offer",
        "name": service.pricing.title,
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": service.pricing.price.replace(/[^0-9.]/g, ''),
          "priceCurrency": "INR",
          "valueAddedTaxIncluded": false
        }
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adsverse.in" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://adsverse.in/our-services" },
        { "@type": "ListItem", "position": 3, "name": "Social Media Management", "item": "https://adsverse.in/services/social-media-management" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": expandedFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ]
};

export default function SocialMediaManagementPage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="container mx-auto py-16 px-4 max-w-5xl">
      <div className="mb-8">
        <Button asChild variant="link" className="p-0 text-muted-foreground hover:text-primary">
          <Link href="/our-services">
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

      {/* ── EXPANDED CONTENT AREA ── */}
      <div className="mt-16 space-y-16">
        
        {/* Block 1: What is Social Media */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-primary font-headline">What is Organic Social Media Management, and Why It Matters in 2026?</h2>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground space-y-4 max-w-none">
            <p>
              In 2026, social media profiles are as important as search engines. More than 60% of modern Indian consumers research businesses on Instagram or LinkedIn before buying. If your profiles look dead, outdated, or generic, you immediately lose prospective buyers to competitors.
            </p>
            <p>
              An active, premium, and value-packed social media grid acts as social proof, validating your authority. By telling stories, sharing educational reels, and actively answering questions, you build a community of loyal brand fans.
            </p>
          </div>
        </section>

        {/* Block 2: Why AdsVerse Social Media Is Different */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Why AdsVerse Social Media Is Different</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Trending Short-Form Focus", text: "We understand that short video Reels and Shorts rule social feeds. We craft engaging scripts, storyboard formats, and edit videos for maximum viral potential." },
              { title: "Bespoke Brand Styling", text: "No low-quality templates. We design custom carousels, layouts, and post graphics utilizing your exact brand colors, modern typography, and imagery." },
              { title: "Double-Language Scripts", text: "We write highly engaging captions and video scripts in Hinglish and conversational Indian English that connect immediately with Tier-2 India consumers." },
              { title: "Active Inbox Monitoring", text: "We don't just post. We respond to every comment and basic direct message query to convert casual interest into hot leads." },
              { title: "Topical Authority Planning", text: "We plan content calendars mapped to holidays, local trends, and customer questions to show that your business is highly active." },
              { title: "Attributed ROI Reports", text: "We track clear metrics: follower growth, engagement index, inbound direct message queries, and profile referral links." }
            ].map((item, i) => (
              <Card key={i} className="bg-card/30 border border-border/40 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Block 3: Our Process */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Our Social Media Process</h2>
          <div className="space-y-4">
            {[
              { step: "Step 1", title: "Social Audit & Competitor Scan", desc: "We review your active channels, catalog existing engagement rates, identify quick wins, and scan competitors." },
              { step: "Step 2", title: "Creative Concept & Grid Design", desc: "We define standard visual templates, typography matching, content pillars (e.g., educational, promotional, case studies)." },
              { step: "Step 3", title: "Scripting & Storyboarding", desc: "Our copywriters write highly engaging caption copy, video script hooks, and outline visual instructions for Reels/Shorts." },
              { step: "Step 4", title: "Graphic Post & Video Production", desc: "Our designers craft beautiful carousels and our video editors trim, color-grade, and caption reels to match viral formats." },
              { step: "Step 5", title: "Proactive Engagement", desc: "We set up automated calendar scheduling, post during peak hours, and spend initial hours replying to comments." },
              { step: "Step 6", title: "Monthly Insights & Adjustment", desc: "We review top-performing posts, compile overall growth reports, and refine visual layouts and hooks for the following month." }
            ].map((p, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border/30 bg-card/10">
                <div className="h-8 w-16 bg-accent/10 border border-accent/20 rounded flex items-center justify-center text-xs font-bold text-accent shrink-0">
                  {p.step}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-base mb-1">{p.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Block 4: Who Is This For? */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Who Is This For?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { type: "Lifestyle & Retail Brands", desc: "Salons, gyms, clothing brands, restaurants in Indore who rely heavily on visual proof and community engagement." },
              { type: "B2B Founders & Consultants", desc: "Founders, CAs, and business consultants wanting to build high-authority personal profiles on LinkedIn and Instagram." },
              { type: "Clinics & Professional Centers", desc: "Hospitals, clinics, and academic institutes wanting to post valuable guides and build patient/student confidence." },
              { type: "E-Commerce Products", desc: "Direct-to-consumer businesses wanting to run organic visual campaigns, showcases, and customer video reviews." }
            ].map((w, i) => (
              <div key={i} className="p-5 rounded-xl border border-border/30 bg-card/20">
                <h4 className="font-bold text-accent mb-2">{w.type}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Block 5: FAQ Accordion */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {expandedFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border/30 rounded-lg px-4 bg-card/20" role="region">
                <AccordionTrigger className="text-base text-left hover:no-underline font-headline font-semibold text-foreground py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

      </div>

      <AISearchInsights 
        title="Predictive Social Performance & AEO Strategy for 2026"
        takeaways={[
          "🚀 Video-First Engagement Focus",
          "📱 Bespoke Brand Consistency",
          "🛡️ Proactive Inbox Monitoring",
          "📈 Lead Attributed Growth"
        ]}
        insights={[
          {
            title: "Viral Hook Optimization",
            description: "We write and time our video script hooks (first 3s) using behavioral patterns for maximum user retention."
          },
          {
            title: "Omnipresent Branding",
            description: "Synchronize visual design guidelines across Instagram, Facebook, and LinkedIn for complete brand authority."
          },
          {
            title: "Attributed Conversions",
            description: "Direct tracking links and customized UTM tags to connect social views directly to business revenue metrics."
          }
        ]}
      />
    </div>
    </>
  );
}
