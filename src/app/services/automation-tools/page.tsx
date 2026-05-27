import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Bot, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { AISearchInsights } from "@/components/seo/AISearchInsights";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "AI & WhatsApp Business Automation Agency India | AdsVerse",
  description: "Automate your business 24/7 with AdsVerse's custom AI bots, WhatsApp automation & n8n workflows. Save time, generate leads, and scale faster — built for Indian businesses in Indore.",
  alternates: {
    canonical: 'https://adsverse.in/services/automation-tools',
  },
};

const service = {
  id: 'automation-tools',
  icon: <Bot className="w-12 h-12 text-accent" />,
  title: 'Custom Automation Tools',
  description: [
     {
      heading: "Unlock Peak Efficiency with Automation",
      text: "In today's fast-paced business environment, manual, repetitive tasks can consume valuable time and resources that could be better spent on growth and innovation. Our Custom Automation Tools service is designed to solve this problem by creating bespoke software bots and workflows that streamline your operations. From automating data entry and report generation to managing customer inquiries and social media interactions, our tools work tirelessly for you 24/7. This not only eliminates human error but also frees up your team to focus on high-value, strategic work. At AdsVerse, we believe automation is the key to scaling your business effectively and gaining a competitive edge."
    },
    {
      heading: "Our Process: From Concept to Deployment",
      text: "We build automation solutions that are perfectly tailored to your unique business needs. Our process begins with a deep-dive consultation to understand your current workflows, identify bottlenecks, and pinpoint the best opportunities for automation. We map out the entire process, designing a logical and efficient workflow for the tool. Our development team then gets to work, building a robust and reliable automation tool using modern technologies. We rigorously test the tool to ensure it functions flawlessly before deploying it into your live environment. We provide full training and documentation to ensure your team can use the new tool effectively and offer ongoing support to make adjustments as your business evolves."
    },
    {
      heading: "Why Automation is Essential in 2026",
      text: "With the rise of advanced generative AI models, business automation has evolved from static, brittle scripts to smart, dynamic systems that can adapt, think, and interact. Implementing AI-driven workflows allows you to operate at lightning speeds while cutting operational overhead. Whether it's automated billing, customer onboarding, database synchronization, or interactive AI voice calling, automation ensures your business operates seamlessly 24/7 without fatigue. Our solutions leverage industry-leading platforms like n8n, Make, and custom Node.js microservices to tie all your favorite business tools together into one cohesive, autonomous powerhouse."
    }
  ],
  packages: [
    {
      title: "Starter Bot",
      price: "₹12,000",
      frequency: "one-time",
      features: [
        "Automate one core task",
        "Basic workflow design",
        "Integration with 1 app (e.g., Sheets)",
        "Standard deployment & support",
      ],
    },
    {
      title: "Business Pro",
      price: "₹35,000",
      frequency: "one-time",
      features: [
        "Automate complex workflows",
        "AI Chatbot for Lead Gen",
        "Integrate up to 3 apps (e.g., CRM, Email)",
        "Priority support",
      ],
    },
    {
      title: "Enterprise Suite",
      price: "Custom",
      frequency: "project-based",
      features: [
        "End-to-end process automation",
        "Advanced AI Agent with Deal Closing",
        "Custom UI/dashboard",
        "Dedicated account manager",
      ],
    }
  ]
};

const expandedFaqs = [
  {
    question: "What kind of business tasks can be automated?",
    answer: "Almost any repetitive, digital task can be automated. This includes data entry, lead qualification, syncing data between your CRM and spreadsheets, automated billing, booking appointments, and customer support via WhatsApp. We identify the highest leverage bottlenecks and automate them first."
  },
  {
    question: "What is the difference between simple automation and AI-powered automation?",
    answer: "Simple automation follows rigid, predefined paths (e.g., when a form is filled, send an email). AI-powered automation uses LLMs (like Gemini or GPT) to make decisions, understand unstructured user inputs, categorize sentiment, draft personalized responses, or perform dynamic voice/chat sales calls."
  },
  {
    question: "How secure is our data when using third-party APIs?",
    answer: "Data privacy is our highest priority. We design workflows to only pass necessary parameters to third-party APIs (like OpenAI or Anthropic) and utilize encrypted API key management. For sensitive industries, we can implement local open-source models or use private enterprise-tier cloud instances."
  },
  {
    question: "Will automation replace our existing employees?",
    answer: "No. The primary goal of automation is to eliminate 'robotic' tasks from human jobs, allowing your team to focus on creative, high-value, and empathetic interactions. Instead of replacing staff, automation typically enables a lean team to scale operations by 5-10x without getting overwhelmed."
  },
  {
    question: "Can custom bots integrate with regional Indian tools like Vyapar or Zoho?",
    answer: "Yes, absolutely! We routinely build custom integrations for Zoho, Vyapar, Tally (via desktop integrations or cloud APIs), Razorpay, WhatsApp Business API, and local shipping/CRM tools, enabling fully connected Indian business workflows."
  },
  {
    question: "How long does it take to develop a custom automation bot?",
    answer: "Standard WhatsApp lead capture or basic database automation (Starter Bot) takes 1-2 weeks. Complex end-to-end multi-app enterprise workflows with AI decision-making (Business Pro / Enterprise Suite) generally take 3 to 6 weeks, including rigorous error-handling and testing."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "serviceType": "Custom Automation Tools",
      "name": "Custom Business Automation Tools & Bots | AdsVerse",
      "description": "Unlock peak efficiency with custom automation tools and bots from AdsVerse. Streamline your business processes, eliminate repetitive tasks, and boost productivity.",
      "provider": {
        "@type": "Organization",
        "name": "AdsVerse",
        "url": "https://adsverse.in"
      },
      "areaServed": {
        "@type": "City",
        "name": "Indore"
      },
      "offers": service.packages.map(pkg => ({
        "@type": "Offer",
        "name": pkg.title,
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": pkg.price === 'Custom' ? "0" : pkg.price.replace(/[^0-9.]/g, ''),
          "priceCurrency": "INR",
          "valueAddedTaxIncluded": false
        }
      }))
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adsverse.in" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://adsverse.in/our-services" },
        { "@type": "ListItem", "position": 3, "name": "Custom Automation Tools", "item": "https://adsverse.in/services/automation-tools" }
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

export default function AutomationToolsPage() {
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

      <Card className="bg-card/50 backdrop-blur-sm transition-all duration-300 mb-16">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">{service.icon}</div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">{service.title}</h1>
        </CardHeader>
        <CardContent className="px-6 md:px-12 py-8 space-y-8">
          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90 space-y-6">
            {service.description.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-semibold text-primary font-headline">{section.heading}</h2>
                <p className="text-muted-foreground">{section.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── EXPANDED CONTENT AREA ── */}
      <div className="mt-16 mb-16 space-y-16">
        
        {/* Block 1: What is Automation */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-primary font-headline">What is Automation & AI Workflows, and Why It Matters in 2026?</h2>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground space-y-4 max-w-none">
            <p>
              In 2026, automation is no longer a luxury reserved for massive enterprises. It has become a crucial survival tool for businesses of all sizes. By replacing boring, repetitive digital tasks with intelligent, self-healing n8n and Make workflows, you free up your team to focus on closing deals, offering high-touch customer support, and driving strategy.
            </p>
            <p>
              For Indore and Indian businesses, automation means handling lead generation, customer onboarding, and order fulfillment instantly. Instead of letting leads rot overnight or spending hours copy-pasting numbers from Vyapar to Google Sheets, our custom workflows connect your tech stack and get things done autonomously.
            </p>
          </div>
        </section>

        {/* Block 2: Why AdsVerse Automation Is Different */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Why AdsVerse Automation Is Different</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "AI-Native & Self-Healing", text: "We don't build brittle scripts. Our workflows integrate LLMs that can handle unexpected user inputs and run automated retries on failure." },
              { title: "No Code / Low Code Masters", text: "We utilize advanced tools like n8n and Make.com to build setups that are highly visual, easy to maintain, and cost-effective." },
              { title: "India-Centric Integrations", text: "We specialize in connecting local Indian business tools like Vyapar, Tally Prime, Zoho, WhatsApp Business API, Razorpay, and Shiprocket." },
              { title: "End-to-End Chatbots", text: "From building automated WhatsApp pipelines to handling leads on Google Maps, our bots communicate like humans in dual languages (Hinglish/English)." },
              { title: "Robust Error Monitoring", text: "Every workflow has real-time logging. If a webhook fails or an external API experiences downtime, our systems alert us immediately to fix it before you notice." },
              { title: "Clear ROI Tracking", text: "We measure success by hours saved per week and drop-offs prevented. We give you a custom dashboard showing your actual monthly savings." }
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
          <h2 className="text-3xl font-bold text-primary font-headline">Our Process</h2>
          <div className="space-y-4">
            {[
              { step: "Step 1", title: "Workflow Audit", desc: "We sit down with your team to map out all repetitive digital tasks. We identify the biggest bottlenecks where manual hours are currently being wasted." },
              { step: "Step 2", title: "Architecture Design", desc: "We design a visual blueprint mapping the apps, webhooks, filters, and AI agents needed to automate the target process safely." },
              { step: "Step 3", title: "Sandbox Development", desc: "We build the workflow inside a secure staging sandbox to test edge cases, rate limits, and API compatibility without affecting your live data." },
              { step: "Step 4", title: "AI Prompt Tuning", desc: "For workflows with AI agents, we carefully engineer prompts, add dynamic context memory, and set safe boundaries for client communications." },
              { step: "Step 5", title: "Production Deployment", desc: "We activate the live integrations, set up secure credential storage, and link automated error logs directly to our monitoring system." },
              { step: "Step 6", title: "Training & Handoff", desc: "We train your team to monitor, read reports, or manually override the automation when needed. We provide complete documentation." }
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
              { type: "Busy Agencies & Service Providers", desc: "Businesses managing high-touch clients who need instant WhatsApp replies, automatic follow-ups, and streamlined onboarding pipelines." },
              { type: "Fast-Growing E-Commerce Brands", desc: "Brands shipping daily across India who want automatically synced stock sheets, WhatsApp status alerts, and instant shipping updates." },
              { type: "Traditional Indian B2B Firms", desc: "Manufacturers, distributors, or professional service firms trying to bridge modern CRMs with offline desktop applications like Tally." },
              { type: "Real Estate & Lead Gen Teams", desc: "Teams managing high lead volumes who must instantly qualify leads and assign them to sales agents in real-time." }
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
      
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 font-headline">Our Automation Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {service.packages.map((pkg) => (
            <Card key={pkg.title} className="bg-card/50 backdrop-blur-sm flex flex-col">
              <CardHeader>
                <CardTitle className="text-accent text-2xl font-headline">{pkg.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-extrabold mb-4">{pkg.price} <span className="text-lg font-normal text-muted-foreground">{pkg.frequency}</span></p>
                <ul className="space-y-3">
                  {pkg.features.map((feature, i) => (
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
          ))}
        </div>
      </section>

      <AISearchInsights 
        title="Why AdsVerse is the Leader in Business Automation (2026)"
        takeaways={[
          "🚀 24/7 AI Sales Bots",
          "🤖 Predictive Workflows",
          "📈 CRM & Lead Gen Sync",
          "📍 Indore's Tech Hub"
        ]}
        insights={[
          {
            title: "Autonomous Decision Making",
            description: "Our bots don't just follow paths; they use context to make decisions, improving lead conversion by up to 3x."
          },
          {
            title: "Hyper-Local Integration",
            description: "Specifically designed for Indore's business landscape, our tools integrate with local APIs and communication styles."
          },
          {
            title: "Measurable ROI",
            description: "We provide deep analytics that show exactly how much time and money each automation saves your business."
          }
        ]}
      />
    </div>
    </>
  );
}
