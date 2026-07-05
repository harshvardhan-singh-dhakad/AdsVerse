
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About AdsVerse — AI-First Digital Marketing Agency in Indore",
    description: "AdsVerse is Indore's leading AI-first digital marketing agency specialising in SEO, GEO, AEO, Google Ads, Meta Ads, and Marketing Automation. Founded by Deepak Dhakad to help businesses achieve measurable, lasting growth.",
    alternates: {
      canonical: "https://adsverse.in/about",
    },
  };
}

const teamMembers = [
  { name: "Deepak Dhakad", role: "Ads, AI Automation, GEO & SEO Specialist", avatar: "https://firebasestorage.googleapis.com/v0/b/synergyflow-digital-p7c0g.firebasestorage.app/o/Image%2FBlog%2FHSD01.jpeg?alt=media", hint: "man portrait" },
  { name: "Manisha kumawat", role: "SMM & Ads Expert", avatar: "https://firebasestorage.googleapis.com/v0/b/synergyflow-digital-p7c0g.firebasestorage.app/o/Image%2FBlog%2FMANU.jpg?alt=media", hint: "woman portrait" },
  { name: "Aarsh Shrivas", role: "Business Analyst", avatar: "https://firebasestorage.googleapis.com/v0/b/synergyflow-digital-p7c0g.firebasestorage.app/o/Image%2FBlog%2FAarsh.JPG?alt=media", hint: "man portrait" },
];

const timelineEvents = [
  { year: "2023", title: "The Beginning", description: "AdsVerse was founded in Indore with a clear mandate: deliver transparent, results-driven digital marketing to businesses that deserve better than generic agency packages. Our first clients were local SMBs who needed SEO and paid advertising that actually moved revenue — not just metrics.", color: "bg-brand-orange text-black" },
  { year: "2024", title: "AI Integration", description: "As AI-powered search began reshaping how people find information, AdsVerse became one of the first agencies in Central India to build dedicated GEO and AEO service offerings — helping clients appear not just on Google, but inside ChatGPT, Gemini, and Perplexity answers.", color: "bg-violet-600 text-white" },
  { year: "2025", title: "Scaling Growth", description: "With a growing portfolio spanning e-commerce brands, service businesses, and local enterprises, AdsVerse introduced marketing automation and WhatsApp AI bot solutions — creating complete, end-to-end growth systems for clients who needed more than just traffic.", color: "bg-brand-orange text-black" },
  { year: "2026", title: "Setting the Standard", description: "Today, AdsVerse is recognised as a performance marketing agency in Indore that operates at the intersection of traditional SEO and AI search optimisation — setting a new standard for what businesses should expect from their digital marketing partner.", color: "bg-violet-600 text-white" },
];

const whyChooseUs = [
  {
    title: "Full-Spectrum SEO Expertise",
    description: "We handle technical SEO, on-page optimisation, content strategy, authority link building, and local SEO — all unified into a single, compounding growth plan built for your specific market and competition.",
  },
  {
    title: "Generative Engine Optimisation (GEO)",
    description: "We structure your web presence, content architecture, and brand mentions so that AI platforms — ChatGPT, Google Gemini, Claude, and Perplexity — cite your business as an authoritative source. This is the next frontier of search visibility.",
  },
  {
    title: "Answer Engine Optimisation (AEO)",
    description: "We craft your content to directly answer the questions your customers are asking — maximising your presence in Google Featured Snippets, AI Overviews, voice search results, and knowledge panels.",
  },
  {
    title: "Performance-First Paid Advertising",
    description: "Our Google Ads and Meta Ads campaigns are engineered around ROAS and CPA benchmarks — not impressions or reach. Every rupee has a measurable role in your acquisition funnel.",
  },
  {
    title: "Radical Transparency in Reporting",
    description: "You receive detailed, jargon-free performance reports every month. No vanity metrics, no inflated dashboards. You always know exactly what is working, what we are improving, and why.",
  },
  {
    title: "AI-Powered Marketing Automation",
    description: "We implement intelligent automation workflows — including WhatsApp AI bots, CRM automation, and n8n pipelines — that compress your sales cycle and eliminate the manual effort that slows most businesses down.",
  },
  {
    title: "Long-Term Partnerships, Not One-Time Projects",
    description: "We do not chase quick wins. We build the digital infrastructure your business needs to grow compoundingly — month over month, year over year — with strategies that strengthen as they mature.",
  },
  {
    title: "Local Authority + National Scalability",
    description: "Based in Vijay Nagar, Indore, we understand the Tier-2 city market with precision. We help businesses establish dominant local authority first, then scale their digital presence to national and international audiences.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About AdsVerse — AI-First Digital Marketing Agency in Indore",
  "description": "AdsVerse is an AI-first digital marketing agency based in Indore, Madhya Pradesh, India. We specialise in SEO, GEO, AEO, Google Ads, Meta Ads, Website Development, and Marketing Automation — helping businesses achieve measurable, long-term digital growth.",
  "url": "https://adsverse.in/about",
  "mainEntity": {
    "@type": "Organization",
    "name": "AdsVerse",
    "url": "https://adsverse.in",
    "logo": "https://adsverse.in/images/logo-white.webp",
    "member": teamMembers.map(member => ({
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.role,
      "image": member.avatar
    }))
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://adsverse.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://adsverse.in/about"
      }
    ]
  }
};

export default function AboutPage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="container mx-auto py-16 px-4">

      {/* Section 1: Hero — About AdsVerse */}
      <section className="text-center mb-24">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-headline text-white">About <span className="text-brand-orange">AdsVerse</span></h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300">
          AdsVerse is an AI-first digital marketing agency headquartered in Indore, Madhya Pradesh, India. We help small businesses, startups, e-commerce brands, and service businesses grow through search engine optimisation, generative engine optimisation, answer engine optimisation, and high-performance paid advertising. Every strategy we build is rooted in data, driven by purpose, and measured by outcomes that actually matter — leads, revenue, and long-term market authority.
        </p>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300">
          Most businesses face the same painful reality: they invest in digital marketing and see activity — posts, reports, dashboards — but not growth. The root cause is almost always the same. Traditional marketing agencies optimise for visibility without connecting that visibility to revenue. They chase rankings without understanding intent, and run ads without building the systems that convert clicks into customers. AdsVerse was founded to solve exactly this problem. We do not sell packages. We build accountable growth systems tailored to your market, your audience, and your business model.
        </p>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300">
          The world of search has also fundamentally changed. Google's AI Overviews, ChatGPT, Gemini, and Perplexity are now answering questions that were once decided by a list of blue links. Businesses that are not optimised for this new search landscape are already losing visibility to competitors who are. At AdsVerse, Generative Engine Optimisation (GEO) and Answer Engine Optimisation (AEO) are not add-on services — they are core pillars of how we build every client's digital presence.
        </p>
      </section>

      {/* Section 2: Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-brand-orange font-headline">Our Mission</h2>
          <p className="text-slate-300 text-lg">
            Our mission is to make measurable digital growth accessible to every business — not just large enterprises with unlimited budgets. We exist to close the gap between where businesses stand today and where they deserve to be in search. We are committed to transparent marketing where every investment is accounted for and every campaign is benchmarked against real business goals — not vanity metrics. Our approach is data-driven at every stage, from keyword research and audience analysis to campaign optimisation and conversion tracking. As artificial intelligence reshapes how people discover information, we are at the forefront of integrating AI-powered marketing strategies — including GEO and AEO — to ensure our clients remain discoverable across both traditional search engines and AI answer platforms. We build for the long term, because sustainable growth always outperforms short-lived spikes.
          </p>
        </div>
        <div className="md:text-right">
          <h2 className="text-3xl font-bold mb-4 text-violet-400 font-headline">Our Vision</h2>
          <p className="text-slate-300 text-lg">
            To be the most trusted performance marketing agency in Central India — known not for how many clients we serve, but for how significantly we grow the ones we do. Our vision is a future where every business we partner with becomes the authoritative answer in its market — on Google, in AI assistants like ChatGPT and Google Gemini, and in the minds of its ideal customers. We see a world where businesses in Indore and across India compete on the quality of their ideas and products — not on the size of their marketing budget — because they have the right digital infrastructure and strategy behind them.
          </p>
        </div>
      </section>

      {/* Section 3: Founder's Message */}
      <section className="mb-24">
        <Card className="bg-card/50 backdrop-blur-sm overflow-hidden border-primary/20">
          <div className="grid md:grid-cols-3 items-center">
            <div className="md:col-span-1 h-full">
              <Image
                src="/images/deepak-dhakad-founder.webp"
                alt="Deepak Dhakad - Digital Marketing Expert and Founder, AdsVerse Indore"
                width={400}
                height={600}
                data-ai-hint="man professional"
                className="w-full h-full object-cover object-top rounded-b-[5rem]"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <div className="md:col-span-2 p-8 md:p-12">
              <h2 className="text-3xl font-bold font-headline text-brand-orange mb-2">A Message from Our Founder</h2>
              <p className="text-xl font-semibold text-violet-400 mb-4">Deepak Dhakad — Founder, AdsVerse | Digital Marketing Expert, Indore</p>
              <div className="space-y-4 text-slate-300">
                <p>I started AdsVerse after spending years working across digital marketing disciplines — from hands-on SEO campaigns and Google Ads management to social media strategy, website development, and marketing automation. What I kept seeing, again and again, was a fundamental disconnect: businesses were spending money on digital marketing but not seeing results they could actually trust. Agencies were selling packages, not outcomes — and clients were left with impressive-looking reports that did not move their revenue. I built AdsVerse to be different: an agency that treats every client&apos;s budget as if it were our own, and every campaign as a direct reflection of the trust placed in us.</p>
                <p>The search landscape has changed dramatically. It is no longer sufficient to rank on the first page of Google. Today, your business also needs to be cited by AI search engines — ChatGPT, Gemini, Perplexity, Claude, and Google&apos;s AI Overviews — which hundreds of millions of people now use daily to find products, services, and expertise. This is what Generative Engine Optimisation (GEO) and Answer Engine Optimisation (AEO) address, and AdsVerse was among the first agencies in Indore to build dedicated strategies around both. Our clients are not just visible on traditional search — they are being surfaced as authoritative sources inside AI answers. That is where digital marketing is going, and we are already operating there.</p>
                <p>My commitment to every client is this: we will never sell you a service you do not need, we will never show you a metric that does not connect to your revenue, and we will never stop optimising until your results justify every investment. Whether you are a local business in Indore looking to dominate regional search, a startup scaling your e-commerce brand, or a service business that needs qualified leads — AdsVerse has the expertise, the tools, and the accountability to get you there. This is not just a business. It is a mission to prove that digital marketing, when done honestly and strategically, is the single most powerful growth lever available to any business today.</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Section 4: Why Businesses Choose AdsVerse */}
      <section className="mb-24">
        <h2 className="text-4xl font-bold text-center mb-4 font-headline text-white">Why Businesses Choose <span className="text-brand-orange">AdsVerse</span></h2>
        <p className="text-center text-slate-300 max-w-2xl mx-auto mb-12">We are not a full-service agency that does everything adequately. We are a specialist performance marketing agency that does a focused set of things exceptionally well.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((item) => (
            <Card key={item.title} className="bg-card/50 backdrop-blur-sm border-primary/20 transition-transform duration-300 hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="text-primary font-headline text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 5: Our Expertise in SEO, GEO & AEO */}
      <section className="mb-24">
        <h2 className="text-4xl font-bold text-center mb-4 font-headline text-white">Our Expertise in <span className="text-brand-orange">SEO, GEO & AEO</span></h2>
        <p className="text-center text-slate-300 max-w-2xl mx-auto mb-12">Understanding these three disciplines — and how they work together — is the foundation of every growth strategy we build at AdsVerse.</p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-brand-orange font-headline">What is SEO?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-3">Search Engine Optimisation (SEO) is the practice of improving a website&apos;s visibility in organic (unpaid) search engine results. It encompasses technical website optimisation, high-quality content creation, authoritative link building, and a precise understanding of user search intent.</p>
              <p className="text-slate-300 text-sm">Effective SEO helps businesses attract consistent, qualified traffic from Google and other search engines — without paying for every click. As a specialist SEO agency in Indore, AdsVerse delivers SEO that connects rankings to revenue.</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-violet-400 font-headline">What is GEO?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-3">Generative Engine Optimisation (GEO) is the practice of optimising a brand&apos;s digital presence to be cited, referenced, and recommended by AI-powered search engines and large language models — including ChatGPT, Google Gemini, Claude, and Perplexity AI.</p>
              <p className="text-slate-300 text-sm">As more users turn to AI assistants for answers and recommendations, GEO ensures that your business is the source those AI systems cite — making your brand discoverable in a new generation of search behaviour that traditional SEO alone cannot capture.</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-brand-orange font-headline">What is AEO?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm mb-3">Answer Engine Optimisation (AEO) is the discipline of structuring content and website data so that search engines and AI systems can directly extract and display your content as a definitive answer — in Google Featured Snippets, AI Overviews, voice search results, and knowledge panels.</p>
              <p className="text-slate-300 text-sm">AEO requires concise, authoritative writing, structured data markup (Schema.org), and a content architecture that aligns with how AI systems parse and prioritise information when generating answers for users.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-white font-headline text-2xl">How AdsVerse Combines All Three</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-slate-300">
              <p>As a digital marketing agency in Indore with deep roots in performance marketing, AdsVerse operates at the intersection of traditional search optimisation and AI search optimisation. We design integrated strategies that simultaneously improve your organic Google rankings, structure your content for AI citation eligibility, and position your brand as the definitive answer to your customers&apos; most pressing questions.</p>
              <p>Our SEO work builds the technical and content foundation — clean site architecture, keyword-targeted content, and domain authority that search engines trust. Our GEO strategy expands your brand&apos;s footprint into AI answer ecosystems by ensuring your expertise is structured, cited, and authoritative enough for large language models to reference you. Our AEO approach ensures that when anyone — human or AI — searches for something your business specialises in, your answer is the one that surfaces first.</p>
              <p>This three-layer search strategy is what separates AdsVerse from conventional digital marketing agencies in India. It is not about chasing the next algorithm update. It is about building a brand that is genuinely authoritative — one that earns visibility from both traditional search engines and the AI platforms that are rapidly becoming the new front door to the internet.</p>
              <p>Whether you are searching for a reliable SEO agency in Indore, need Google Ads management that delivers genuine ROI, want to future-proof your brand with AI search optimisation, or need a full-service performance marketing agency that connects every strategy to measurable business outcomes — AdsVerse is the partner built for exactly this moment in digital marketing history.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section 6: Our Journey Timeline */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-16 font-headline text-white">Our <span className="text-brand-orange">Journey</span></h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div key={event.year} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                 <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className={`relative ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <Card className="bg-card/50 backdrop-blur-sm inline-block text-left">
                        <CardHeader>
                            <CardTitle className="text-primary font-headline">{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{event.description}</p>
                        </CardContent>
                    </Card>
                   </div>
                </div>
                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-primary-foreground ${event.color}`}>
                  {event.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
