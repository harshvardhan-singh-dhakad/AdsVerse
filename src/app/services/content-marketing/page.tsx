import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { AISearchInsights } from "@/components/seo/AISearchInsights";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Content Marketing Agency India — Blog Writing & SEO Content | AdsVerse",
  description: "Grow your authority with AdsVerse's content marketing services. We create SEO-optimized blog posts, articles & content strategy for Indian businesses — driving organic traffic and brand trust.",
  alternates: {
    canonical: 'https://adsverse.in/services/content-marketing',
  },
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

const expandedFaqs = [
  {
    question: "How does content marketing help my SEO?",
    answer: "Content marketing is crucial for SEO. High-quality content allows you to target specific keywords your audience is searching for. It also helps you earn backlinks from other websites, which is a major ranking factor for Google. Fresh, relevant content signals to search engines that your site is active and authoritative."
  },
  {
    question: "What kind of content will you create for my business?",
    answer: "The type of content depends on your business and audience. While our main package focuses on blog posts, we can also create ebooks, whitepapers, case studies, infographics, video scripts, and social media content. We'll recommend a content mix that best aligns with your marketing goals."
  },
  {
    question: "Can I review the content before it's published?",
    answer: "Yes, absolutely. Our process is collaborative. We provide all content for your review and approval before it goes live. We welcome your feedback to ensure the content perfectly captures your brand's voice and message."
  },
  {
    question: "What is the difference between writing for humans and writing for AI search (GEO)?",
    answer: "Writing for humans requires emotional resonance, story-telling, clear formatting, and immediate value. Writing for AI search (GEO) requires clear schema markup, entity-based optimization, bulleted summary key points, objective factual answers to specific questions, and direct authoritative citations. We do both simultaneously."
  },
  {
    question: "How do you ensure the content matches our brand's unique tone of voice?",
    answer: "Before writing a single word, we conduct a brand voice audit. We create a customized brand style guide outlining vocabulary, prohibited words, preferred styles, and tone profiles (e.g., professional, friendly, authoritative). Every piece of content is double-checked against this guide."
  },
  {
    question: "How do you measure the ROI of content marketing?",
    answer: "We track organic session growth, average session duration, keyword rankings, social shares, email sign-ups, and direct conversions. By using tracking links (UTMs) and conversion goals in Google Analytics, we tie our writing directly to your leads and sales."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "serviceType": "Content Marketing",
      "name": "Content Marketing & Strategy Services | AdsVerse",
      "description": "Engage your audience with valuable content marketing from AdsVerse. Our services include blog writing, content strategy, and SEO optimization to build authority.",
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
        { "@type": "ListItem", "position": 3, "name": "Content Marketing", "item": "https://adsverse.in/services/content-marketing" }
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

export default function ContentMarketingPage() {
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
        
        {/* Block 1: What is Content Marketing */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-primary font-headline">What is Content Marketing and Why It Matters in 2026?</h2>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground space-y-4 max-w-none">
            <p>
              In 2026, content marketing has expanded beyond blogging. With the integration of AI tools and search assistants (like ChatGPT, Claude, and Gemini), users are asking conversational queries. If your website does not contain highly detailed, expert-written articles that comprehensively answer these questions, you simply won't exist in their results.
            </p>
            <p>
              By producing regular, research-backed blogs, case studies, and ultimate guides, you establish topical authority. This signals to both Google and AI search engines that you are the primary expert in your niche. For Indore businesses, writing about regional challenges and success stories creates a powerful human-to-human connection that builds unmatched brand trust.
            </p>
          </div>
        </section>

        {/* Block 2: Why AdsVerse Content Marketing Is Different */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Why AdsVerse Content Marketing Is Different</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "EEAT First Mentality", text: "We prioritize Experience, Expertise, Authoritativeness, and Trustworthiness. We draft articles that have actual quotes, primary research, and practical advice." },
              { title: "AI Search Readiness", text: "We structure articles with clear markdown, entity-rich terms, summary bullet points, and schemas so AI crawlers cite your content as their primary source." },
              { title: "In-Depth Topic Clusters", text: "We don't write disjointed blog posts. We map comprehensive semantic clusters to cover every angle of your core offerings completely." },
              { title: "Hinglish and Dual Language", text: "We craft content in clear, conversational Indian English that speaks naturally to Hindi-speaking business audiences across Tier-2 cities." },
              { title: "Stunning Stock & Custom Visuals", text: "Every article is accompanied by clear, descriptive headers, and high-quality optimized imagery that makes it incredibly readable and visually appealing." },
              { title: "Conversion Focused CTAs", text: "We don't write just for views. We insert logical, low-friction inline lead magnets (e-books, templates, checklists) that turn readers into hot leads." }
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
          <h2 className="text-3xl font-bold text-primary font-headline">Our Content Marketing Process</h2>
          <div className="space-y-4">
            {[
              { step: "Step 1", title: "Audience Persona Research", desc: "We interview your sales team and active customers to define the exact pain points, questions, and search terms your target buyers use daily." },
              { step: "Step 2", title: "Topic Cluster Strategy", desc: "We map out 3-month topical clusters. Rather than randomly picking keywords, we build structured content webs that prove complete authority in your space." },
              { step: "Step 3", title: "Writing & Optimization", desc: "Our professional copywriters draft in-depth content that perfectly integrates target entities, semantic phrasing, and highly engaging hooks." },
              { step: "Step 4", title: "Visual & Technical Polish", desc: "We format the draft with clear typography, tables, lists, descriptive image alt text, and relevant internal links for a premium reading experience." },
              { step: "Step 5", title: "Distribution Promotion", desc: "We don't just hit publish. We help you repurpose the articles into short LinkedIn posts, email newsletters, and WhatsApp broadcasts." },
              { step: "Step 6", title: "Analytics Optimization", desc: "Every month, we analyze which pages are drawing traffic, time-on-page metrics, and conversions, refining our strategy to focus on the highest-yielding topics." }
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
              { type: "B2B Professional Services", desc: "Firms looking to prove deep expertise (CAs, tech consultancies, medical professionals, educational institutions) and attract high-value clients." },
              { type: "SaaS & Product Startups", desc: "Software companies wanting to rank for specific problem terms and educate their market on how their tools solve daily paint points." },
              { type: "Established Local Businesses", desc: "Indore companies wanting to dominate local regional searches and build top-of-mind brand authority among local consumers." },
              { type: "Direct-to-Consumer Brands", desc: "Brands shipping across India who want to rank organically for generic product solutions without purely relying on rising ad spends." }
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
        title="Predictive Content & AEO Strategy for 2026"
        takeaways={[
          "🔍 AI-Ready Semantic Clusters",
          "📊 High-Intent Blog Packages",
          "🛡️ Solid EEAT Authoritative Copy",
          "📈 Full Performance Attribution"
        ]}
        insights={[
          {
            title: "Generative Citation Optimization",
            description: "We write structured segments optimized to be pulled as sources by LLM-based search systems."
          },
          {
            title: "Zero Waste Keywords",
            description: "Every topic is thoroughly checked against commercial search intent. We don't write fluff."
          },
          {
            title: "Local Topical Supremacy",
            description: "Build deep local authority that makes your business the natural regional choice across Central India."
          }
        ]}
      />
    </div>
    </>
  );
}
