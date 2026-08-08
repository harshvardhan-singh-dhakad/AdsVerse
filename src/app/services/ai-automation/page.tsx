import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Bot, CheckCircle, ArrowLeft, Zap, Settings, Users, BarChart3, Globe, Building2, ShoppingCart, Headphones } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { AISearchInsights } from "@/components/seo/AISearchInsights";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "AI Automation Agency — Business Process Automation Services | AdsVerse",
  description: "AdsVerse is an AI automation agency specialising in business process automation, BPM workflows, and RPA solutions for Indian SMBs. Automate your entire business — from lead gen to CRM — with AI agents built in Indore.",
  keywords: [
    "ai automation agency",
    "ai automation services",
    "business automation",
    "business process automation",
    "bpm automation",
    "enterprise process automation",
    "workflow automation services",
    "rpa services india",
  ],
  alternates: {
    canonical: 'https://adsverse.in/services/ai-automation',
  },
  openGraph: {
    title: "AI Automation Agency — Business Process Automation | AdsVerse",
    description: "AI-first business automation agency. BPM, RPA, workflow automation, and AI agents for Indian businesses. n8n · WhatsApp AI · Gemini · CRM automation.",
    url: 'https://adsverse.in/services/ai-automation',
    siteName: 'AdsVerse',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://adsverse.in/images/og-adsverse-2026.png',
        width: 1200,
        height: 630,
        alt: 'AdsVerse AI Automation Agency — Business Process Automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation Agency — Business Process Automation | AdsVerse',
    description: 'BPM, RPA, workflow automation & AI agents for Indian SMBs. Built by AdsVerse — India\'s AI-first automation agency.',
    creator: '@Adsverse1',
  },
};

const packages = [
  {
    title: "Starter Bot",
    price: "₹12,000",
    frequency: "one-time",
    features: [
      "Automate one core business task",
      "Basic workflow design & deployment",
      "1 app integration (e.g., Google Sheets)",
      "Standard support & documentation",
    ],
  },
  {
    title: "Business Pro",
    price: "₹35,000",
    frequency: "one-time",
    features: [
      "Complex multi-step workflow automation",
      "AI Chatbot / Lead Qualification Bot",
      "Up to 3 app integrations (CRM, Email, WA)",
      "Priority support & performance dashboard",
    ],
  },
  {
    title: "Enterprise Suite",
    price: "Custom",
    frequency: "project-based",
    features: [
      "End-to-end business process automation",
      "AI Telecaller + Deal Closing Agent",
      "Custom UI dashboard & reporting",
      "Dedicated account manager",
    ],
  },
];

const faqs = [
  {
    question: "What is business process automation (BPA) and how does it work?",
    answer: "Business process automation (BPA) is the use of technology to replace repetitive, manual tasks with automated digital workflows. Instead of your team manually copying data between apps, sending follow-up emails, or updating spreadsheets, BPA handles it automatically 24/7. At AdsVerse, we design these workflows using tools like n8n, WhatsApp Business API, and AI agents — all connected to your existing CRM, website, and communication tools.",
  },
  {
    question: "How does AI automation differ from simple rule-based automation?",
    answer: "Simple automation follows rigid, pre-set rules (e.g., 'when a form is filled, send an email'). AI automation uses large language models (LLMs) like Gemini to make intelligent decisions — it can understand unstructured user inputs, classify intent, draft personalised responses, and handle dynamic voice or chat interactions. This means your automated system can handle exceptions and edge cases that would break a rule-based bot.",
  },
  {
    question: "What kinds of businesses benefit from AI automation services?",
    answer: "Almost every Indian SMB with repetitive digital tasks benefits — real estate lead teams, e-commerce brands tracking orders, education institutes managing admissions, BPOs handling customer queries, healthcare clinics with appointment workflows, and service agencies managing client onboarding. If your team spends hours on copy-paste, follow-ups, or data entry, automation saves you that time immediately.",
  },
  {
    question: "How long does it take to automate my business process?",
    answer: "A Starter Bot (one core task) takes 1–2 weeks from audit to deployment. A Business Pro setup with CRM integration and AI chatbot takes 3–4 weeks. Enterprise end-to-end automation with AI agents and custom dashboards takes 4–8 weeks, including rigorous testing and edge-case handling.",
  },
  {
    question: "Can you integrate with Indian tools like Vyapar, Tally, Zoho, or Razorpay?",
    answer: "Yes. We build custom integrations for Zoho, Vyapar, Tally (via cloud APIs and desktop connectors), Razorpay, WhatsApp Business API, Shiprocket, and other India-specific tools. Our automation stack is specifically designed for the Indian business software ecosystem.",
  },
  {
    question: "What is BPM (Business Process Management) software and do I need it?",
    answer: "BPM (Business Process Management) software is a platform that lets you design, execute, monitor, and optimise your business workflows visually. It's ideal for businesses with complex multi-step processes involving multiple teams, approvals, or data sources. At AdsVerse, we use n8n and custom BPM setups to give you full visibility and control over every automated process in your business.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "serviceType": "AI Automation Agency",
      "name": "AI Automation Agency — Business Process Automation | AdsVerse",
      "description": "AI-first business process automation agency. BPM workflows, RPA, workflow automation, and AI agents for Indian SMBs and enterprises.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "AdsVerse",
        "url": "https://adsverse.in",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Indore",
          "addressRegion": "Madhya Pradesh",
          "addressCountry": "IN",
        },
        "telephone": "+919685123339",
      },
      "areaServed": {
        "@type": "Country",
        "name": "India",
      },
      "offers": packages.map((pkg) => ({
        "@type": "Offer",
        "name": pkg.title,
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": pkg.price === "Custom" ? "0" : pkg.price.replace(/[^0-9.]/g, ""),
          "priceCurrency": "INR",
          "valueAddedTaxIncluded": false,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adsverse.in" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://adsverse.in/services" },
        { "@type": "ListItem", "position": 3, "name": "AI Automation Agency", "item": "https://adsverse.in/services/ai-automation" },
      ],
    },
  ],
};

export default function AIAutomationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto py-16 px-4 max-w-5xl">
        {/* Back Link */}
        <div className="mb-8">
          <Button asChild variant="link" className="p-0 text-muted-foreground hover:text-primary">
            <Link href="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
          </Button>
        </div>

        {/* ── HERO ── */}
        <Card className="bg-card/50 backdrop-blur-sm transition-all duration-300 mb-16">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-6">
              <Bot className="w-12 h-12 text-accent" />
            </div>
            <div className="inline-flex items-center justify-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-medium text-accent mb-4 mx-auto">
              AI Automation Agency · 2,400+ searches/mo · +81% YoY demand
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">
              AI Automation Agency
            </h1>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
              Business Process Automation · BPM Workflow Design · RPA · AI Agents — built for Indian SMBs by AdsVerse, Indore.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                <Link href="/contact">Get Free Automation Audit</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#automation-packages">See Pricing</Link>
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* ── SECTION 1: Business Process Automation ── */}
        <section className="mb-16 space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">
            Business Process Automation
          </h2>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground space-y-4 max-w-none">
            <p>
              Business automation is the practice of using technology to perform repetitive, manual business tasks automatically — reducing human error, cutting costs, and freeing your team to focus on growth. As an <strong>AI automation agency</strong>, AdsVerse designs, builds, and deploys custom automation workflows for Indian SMBs, enterprises, and agencies across every industry.
            </p>
            <p>
              Our <strong>business process automation services</strong> cover the entire pipeline — from lead capture and customer onboarding to invoice generation, CRM sync, and performance reporting. Whether you're a real estate firm handling 200 leads a day or a D2C brand managing orders across Shiprocket, we automate the exact processes where your team is losing time.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {[
              { icon: <Zap className="w-6 h-6 text-primary" />, title: "Workflow Design", desc: "Visual end-to-end workflow architecture for your most time-intensive processes." },
              { icon: <Settings className="w-6 h-6 text-primary" />, title: "Process Mapping", desc: "Identify bottlenecks and map the highest-ROI automation opportunities first." },
              { icon: <BarChart3 className="w-6 h-6 text-primary" />, title: "Enterprise Automation", desc: "Multi-department, multi-app enterprise process automation with live dashboards." },
            ].map((item, i) => (
              <Card key={i} className="bg-card/30 border border-border/40 p-6">
                <div className="flex items-center gap-3 mb-3">
                  {item.icon}
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── SECTION 2: BPM & Workflow Automation ── */}
        <section className="mb-16 space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">
            BPM & Workflow Automation
          </h2>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground space-y-4 max-w-none">
            <p>
              <strong>BPM automation</strong> (Business Process Management) goes beyond simple task automation — it gives you a visual, monitorable system to design, execute, and continuously optimise your core business workflows. Our BPM and workflow automation services connect your apps, teams, and data into a single, self-running system.
            </p>
            <p>
              We use n8n as our primary <strong>BPM automation software</strong> — a powerful, self-hosted platform that gives you full data control, unlimited workflow complexity, and zero per-execution pricing. Every workflow we build includes real-time monitoring, automatic error recovery, and a custom dashboard showing exactly what's running and what needs attention.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "BPM Workflow Automation", desc: "Design and automate multi-step approval, notification, and data-routing workflows across your entire business." },
              { title: "Workflow Automation Services", desc: "Connect 500+ apps in your stack — CRM, email, WhatsApp, Sheets, Razorpay, Zoho — into one automated pipeline." },
              { title: "Business Management Process Software", desc: "n8n-powered BPM setups with visual flow designers, version control, and team collaboration built in." },
              { title: "Automated Reporting & Scheduling", desc: "Cron-based automation for daily reports, data sync, batch jobs, and scheduled notifications." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border/30 bg-card/10">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground text-base mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: RPA ── */}
        <section className="mb-16 space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">
            RPA & Intelligent Automation
          </h2>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground space-y-4 max-w-none">
            <p>
              <strong>RPA (Robotic Process Automation)</strong> uses software bots to replicate the exact actions a human would take on a computer — clicking, copying, entering data — across applications that have no API. Combined with AI agents, this creates <em>intelligent automation</em> that can adapt to changing inputs rather than breaking on exceptions.
            </p>
            <p>
              Our RPA implementations are particularly valuable for businesses still running on legacy desktop software (Tally, Vyapar, offline ERPs) who need data to flow into modern cloud tools without expensive custom integrations.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "RPA Business Analyst", desc: "We map your existing manual processes and design the exact bot logic needed to replicate them automatically." },
              { title: "Legacy App Integration", desc: "Connect Tally, Vyapar, and offline ERPs to your modern CRM and cloud tools without API access." },
              { title: "Intelligent Bot Monitoring", desc: "Every RPA bot we build includes error logging, alerting, and automatic fallback to human escalation." },
            ].map((item, i) => (
              <Card key={i} className="bg-card/30 border border-border/40 p-6">
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── SECTION 4: Industries ── */}
        <section className="mb-16 space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">
            Industries We Automate
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our automation workflows are production-tested across Indian industries — not generic templates, but purpose-built processes that match the real operational patterns of each sector.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Building2 className="w-8 h-8 text-accent" />, industry: "Real Estate", use: "Lead capture → WhatsApp qualification → CRM entry → agent assignment. 0 manual steps." },
              { icon: <ShoppingCart className="w-8 h-8 text-accent" />, industry: "E-Commerce", use: "Order sync, stock alerts, return workflows, Shiprocket status updates on WhatsApp." },
              { icon: <Headphones className="w-8 h-8 text-accent" />, industry: "BPO & Support", use: "Ticket routing, auto-reply bots, escalation logic, and SLA monitoring dashboards." },
              { icon: <Users className="w-8 h-8 text-accent" />, industry: "Education & Coaching", use: "Admission inquiry bots, batch notification, fee reminder sequences, and enquiry CRM." },
            ].map((item, i) => (
              <Card key={i} className="bg-card/30 border border-border/40 p-5">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-foreground mb-2">{item.industry}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.use}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── SECTION 5: How We Build It (Tool Stack — Conversion/GEO, not ranking) ── */}
        <section className="mb-16 space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">
            How We Build Your Automation
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our technology stack is chosen for reliability, scalability, and full data ownership — not convenience or lock-in. Every automation we deploy runs on your infrastructure, with your data staying in your control.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "n8n Workflow Engine", desc: "Our primary automation platform. Self-hosted, unlimited workflows, no per-execution cost, full visual editor, and 500+ built-in integrations." },
              { title: "WhatsApp Business API (Meta)", desc: "Official WABA integration for broadcast campaigns, AI bot conversations, lead capture, and CRM sync via WhatsApp." },
              { title: "Google Gemini AI", desc: "Gemini-powered AI agents for intelligent lead qualification, natural language responses, content generation, and data analysis within workflows." },
              { title: "CRM & App Integrations", desc: "Zoho, HubSpot, Salesforce, Airtable, Razorpay, Shiprocket, Google Workspace, and 100+ India-relevant tools — all connected into one pipeline." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border/30 bg-card/10">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground text-base mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 6: Our Process ── */}
        <section className="mb-16 space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Our 6-Step Automation Process</h2>
          <div className="space-y-4">
            {[
              { step: "Step 1", title: "Workflow Audit", desc: "We map every repetitive digital task in your business and identify the highest-value automation opportunities." },
              { step: "Step 2", title: "Architecture Design", desc: "We create a visual blueprint — apps, webhooks, triggers, AI agents, and data flows — for your exact process." },
              { step: "Step 3", title: "Sandbox Development", desc: "We build and test every workflow in a staging environment before touching your live business data." },
              { step: "Step 4", title: "AI Tuning", desc: "For AI-powered workflows, we engineer prompts, memory, and guardrails to handle edge cases reliably." },
              { step: "Step 5", title: "Production Deploy", desc: "We go live, set up error monitoring, and hand over a complete workflow documentation package." },
              { step: "Step 6", title: "Training & Support", desc: "We train your team, provide a monitoring dashboard, and offer ongoing support as your business scales." },
            ].map((p, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-border/30 bg-card/10">
                <div className="h-8 w-16 bg-accent/10 border border-accent/20 rounded flex items-center justify-center text-xs font-bold text-accent shrink-0">
                  {p.step}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base mb-1">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 7: Case Studies ── */}
        <section className="mb-16 space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">Automation in Action</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card/50 border border-border/40 p-6">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
                SimplyHerbal — D2C Brand
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2">WhatsApp Lead Funnel + CRM Sync</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Automated the entire WhatsApp → lead qualification → Zoho CRM pipeline. Result: 4.8x ROAS on ad spend, zero manual data entry, and 100% of leads followed up within 3 minutes.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-accent/10 text-accent border border-accent/20 px-2 py-1 rounded">4.8x ROAS</span>
                <span className="text-xs bg-accent/10 text-accent border border-accent/20 px-2 py-1 rounded">3-min follow-up</span>
                <span className="text-xs bg-accent/10 text-accent border border-accent/20 px-2 py-1 rounded">Zero manual entry</span>
              </div>
            </Card>
            <Card className="bg-card/50 border border-border/40 p-6">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
                AssistHour — Service Agency
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2">AI Telecaller + Appointment Booking</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Deployed an AI voice caller that handles initial lead contact, qualification, and appointment scheduling automatically — running 24/7 without human intervention.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-accent/10 text-accent border border-accent/20 px-2 py-1 rounded">24/7 operation</span>
                <span className="text-xs bg-accent/10 text-accent border border-accent/20 px-2 py-1 rounded">60% cost reduction</span>
                <span className="text-xs bg-accent/10 text-accent border border-accent/20 px-2 py-1 rounded">3x bookings</span>
              </div>
            </Card>
          </div>
        </section>

        {/* ── SECTION 8: FAQ (AEO format) ── */}
        <section className="mb-16 space-y-6">
          <h2 className="text-3xl font-bold text-primary font-headline">
            Frequently Asked Questions — AI Automation
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border/30 rounded-lg px-4 bg-card/20"
                role="region"
              >
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

        {/* ── SECTION 9: Packages ── */}
        <section id="automation-packages" className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 font-headline">
            AI Automation Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => (
              <Card key={pkg.title} className="bg-card/50 backdrop-blur-sm flex flex-col">
                <CardHeader>
                  <CardTitle className="text-accent text-2xl font-headline">{pkg.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-4xl font-extrabold mb-4">
                    {pkg.price} <span className="text-lg font-normal text-muted-foreground">{pkg.frequency}</span>
                  </p>
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

        {/* ── CTA ── */}
        <section className="rounded-2xl bg-gradient-to-r from-accent/20 to-primary/20 border border-border/40 p-10 text-center mb-16">
          <h2 className="text-3xl font-bold font-headline mb-4">
            Ready to Automate Your Business?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Book a free 30-minute workflow audit. We'll identify your top 3 automation opportunities and estimate the hours + revenue impact — no commitment required.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Serving pan-India businesses from Indore, Madhya Pradesh — remote delivery, on-site consultation available.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
            <Link href="/contact">Book Free Automation Audit</Link>
          </Button>
        </section>

        <AISearchInsights
          title="Why AdsVerse is India's Leading AI Automation Agency (2026)"
          takeaways={[
            "🤖 AI-native workflows — not brittle scripts",
            "🇮🇳 India-first integrations: Zoho, Vyapar, Tally, Razorpay",
            "📈 BPM + RPA + AI agents in one agency",
            "📍 Built in Indore, deployed pan-India",
          ]}
          insights={[
            {
              title: "Business Process Automation Demand +81% YoY",
              description: "Searches for 'ai automation agency' have grown 81% year-on-year — Indian SMBs are actively looking for automation partners, not just tools.",
            },
            {
              title: "AI vs. Rule-Based Automation",
              description: "AI automation handles edge cases, unstructured inputs, and dynamic decisions that rule-based bots fail on — delivering 3x higher process completion rates.",
            },
            {
              title: "Full Data Ownership with n8n",
              description: "Unlike SaaS automation tools, our n8n setups are self-hosted on your infrastructure — your business data never leaves your control.",
            },
          ]}
        />
      </div>
    </>
  );
}
