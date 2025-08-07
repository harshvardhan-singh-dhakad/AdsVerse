
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Palette, Megaphone, TrendingUp, FileText, Share2, Code, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    id: 'brand-strategy',
    icon: <Palette className="w-12 h-12 text-accent" />,
    title: 'Brand Strategy & Identity',
    description: [
      {
        heading: "What is Brand Strategy & Identity?",
        text: "Brand Strategy and Identity is the soul of your business. It's not just a logo or a color palette; it's the entire experience and perception your audience has of your company. A strong brand strategy defines what you stand for, the promise you make to your customers, and the personality you convey. It's the blueprint that guides your marketing, your customer service, and your business decisions. A compelling brand identity visually expresses this strategy through logos, typography, colors, and imagery, creating a consistent and memorable presence across all platforms. At AdsVerse, we believe a great brand is built on a foundation of purpose and authenticity. It's about telling a compelling story that resonates deeply with your target audience, turning them from one-time buyers into loyal advocates. We dive deep to uncover your unique value proposition and translate it into a powerful identity that captures attention and builds lasting trust."
      },
      {
        heading: "Our Process: From Discovery to Delivery",
        text: "Our approach to brand strategy is meticulous and collaborative. We begin with a comprehensive discovery phase, immersing ourselves in your world. We conduct in-depth market research, analyze your competitors, and hold stakeholder interviews to understand your business goals, values, and vision. We identify your target audience, creating detailed personas to ensure every element of your brand speaks directly to them. From this research, we distill your core messaging, defining your mission, vision, and unique brand voice. The next step is bringing this strategy to life through design. Our creative team develops a full brand identity suite, starting with a memorable logo and expanding to a complete visual system. This includes selecting a color palette that evokes the right emotions, choosing typography that reflects your personality, and establishing guidelines for imagery and graphic elements. We present you with a comprehensive brand guidelines document, a vital tool that ensures consistency and cohesion as your business grows and evolves across different channels."
      },
      {
        heading: "What's Included and Why It Matters",
        text: "When you partner with AdsVerse for Brand Strategy & Identity, you receive a complete toolkit for success. This isn't just about deliverables; it's about empowering your business with a clear and powerful identity. Our package includes a deep-dive strategy workshop, competitor analysis, and audience profiling. The creative deliverables include multiple logo concepts with revisions, a full brand identity guide (covering logo usage, color palette, typography, and voice), and templates for key marketing materials like business cards and social media profiles. Investing in a professional brand strategy is one of the most crucial decisions a business can make. It differentiates you from the competition, builds credibility and trust, and creates an emotional connection with your customers. A well-defined brand guides your internal team, ensuring everyone is aligned and working towards the same goals. It makes your marketing more effective and your business more valuable in the long run. Let us help you build a brand that not only looks good but also drives tangible results."
      },
    ],
    pricing: {
      title: "Brand Identity Package",
      price: "₹25,000",
      frequency: "one-time",
      features: [
        "In-depth Discovery Workshop",
        "Full Brand Strategy Document",
        "Logo & Visual Identity Design",
        "Comprehensive Brand Guidelines",
      ],
    }
  },
  {
    id: 'paid-ads',
    icon: <Megaphone className="w-12 h-12 text-accent" />,
    title: 'Meta & Google Ads',
    description: [
      {
        heading: "Harnessing the Power of Paid Advertising",
        text: "In today's crowded digital marketplace, paid advertising on platforms like Meta (Facebook & Instagram) and Google is the fastest way to connect with your target audience. While organic growth is essential, paid ads provide immediate visibility, laser-targeted reach, and measurable results. Google Ads captures customers at their moment of intent—when they are actively searching for your products or services. Meta Ads allows you to build awareness and generate demand by reaching people based on their interests, demographics, and online behavior. A successful digital strategy leverages the unique strengths of both. At AdsVerse, we specialize in creating data-driven ad campaigns that are not just about clicks and impressions; they're about driving meaningful business outcomes. We transform your advertising spend from an expense into a strategic investment that delivers a significant return (ROI)."
      },
      {
        heading: "Our Strategic Approach to Ad Management",
        text: "Our process is built on a foundation of strategy, precision, and continuous optimization. We start by developing a deep understanding of your business objectives and target audience. For Google Ads, this involves extensive keyword research to identify high-intent search terms. For Meta Ads, we create detailed audience personas to build highly targeted custom and lookalike audiences. The next phase is creating compelling ad creative and copy that stops the scroll and inspires action. We A/B test different headlines, images, videos, and calls-to-action to identify what resonates most with your audience. A crucial, often-overlooked element is the landing page. We ensure your landing pages are fully optimized for conversions, providing a seamless experience from ad click to conversion. Campaign launch is just the beginning. We continuously monitor performance, analyzing key metrics like click-through rate (CTR), cost per acquisition (CPA), and return on ad spend (ROAS). This data allows us to make real-time adjustments, reallocating budget to top-performing ads and refining our targeting for maximum efficiency."
      },
      {
        heading: "Maximizing Your Return on Investment",
        text: "Our Meta & Google Ads management service is a comprehensive solution designed to maximize your ROI. We handle every aspect of your campaigns, from initial strategy and setup to ongoing management and detailed reporting. Our package includes audience research, keyword strategy, ad copywriting and design, landing page recommendations, and conversion tracking setup (like the Meta Pixel and Google conversion tags). You receive regular, transparent performance reports that clearly explain what we're doing, why we're doing it, and the results we're achieving. We demystify the complexity of paid advertising, providing you with clear insights and a direct line of sight to your campaign's performance. By partnering with AdsVerse, you're not just buying ads; you're investing in a strategic growth engine. We focus relentlessly on the metrics that matter most to your bottom line, ensuring every rupee of your ad budget works as hard as possible to grow your business."
      },
    ],
     pricing: {
      title: "Ads Management",
      price: "From ₹9,000",
      frequency: "/mo + ad spend",
      features: [
        "Google & Meta Campaign Setup",
        "Audience & Keyword Targeting",
        "Ongoing Optimization & A/B Testing",
        "Monthly Performance Reports",
      ],
    }
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    id: 'web-design-development',
    icon: <Code className="w-12 h-12 text-accent" />,
    title: 'Web Design & Development',
    description: [
       {
        heading: "Your Digital Storefront, Perfected",
        text: "Your website is the center of your digital universe. It's often the first impression a potential customer has of your brand, and it serves as your 24/7 salesperson. A great website is more than just a pretty design; it's a powerful business tool that combines stunning aesthetics with seamless functionality and an exceptional user experience (UX). It must be intuitive to navigate, fast to load, and fully responsive, looking and working perfectly on any device, from a desktop computer to a smartphone. At AdsVerse, we design and develop websites that are not only beautiful but are also built for performance. We create digital experiences that captivate users, communicate your brand's value, and are optimized to convert visitors into customers. Your website is your most important digital asset, and we build it to be a strong foundation for all your marketing efforts."
      },
      {
        heading: "Our Design and Development Process",
        text: "We follow a structured and collaborative process to ensure your website project is a success. It begins with a discovery and planning phase, where we define the project scope, sitemap, user flows, and technical requirements. We work to understand your brand, audience, and business goals to ensure the final product is perfectly aligned with your vision. Next, our UI/UX designers create wireframes and mockups, focusing on creating an intuitive and user-friendly layout. Once the design is approved, we move into the development phase. Our developers use modern, clean code and the latest technologies (including platforms like Next.js for high performance) to bring the designs to life. We build websites that are secure, scalable, and optimized for search engines from the ground up. Throughout the process, we conduct rigorous testing across different browsers and devices to ensure a flawless experience for every user. Before launch, we provide training so you can easily manage and update your new website."
      },
      {
        heading: "What You Get With an AdsVerse Website",
        text: "Our Web Design & Development service delivers a professional, high-performing website that you can be proud of. Our basic 5-page website package is perfect for most small and medium-sized businesses. It includes a custom design, a fully responsive build, and on-page SEO optimization for all pages. We ensure the website is integrated with Google Analytics so you can track its performance from day one. The package also includes a content management system (CMS) that allows you to easily update text and images without any technical knowledge. For businesses looking to sell online, we also offer robust e-commerce solutions. An investment in a professional website from AdsVerse is an investment in a powerful engine for growth, designed to attract, engage, and convert your target audience effectively."
      },
    ],
    pricing: {
      title: "Basic Website",
      price: "₹30,000",
      frequency: "one-time",
      features: [
        "Up to 5 Custom-Designed Pages",
        "Responsive, Mobile-First Build",
        "Basic On-Page SEO Setup",
        "Content Management System (CMS)",
      ],
    }
  },
];

const ServiceSection = ({ service }: { service: typeof services[0] }) => (
  <section id={service.id} className="mb-24 scroll-mt-20">
    <Card className="bg-card/50 backdrop-blur-sm transition-all duration-300">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-6">{service.icon}</div>
        <h2 className="text-4xl font-bold">{service.title}</h2>
      </CardHeader>
      <CardContent className="px-6 md:px-12 py-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-6">
            {service.description.map((section, index) => (
              index < 2 && (
                <div key={index}>
                  <h3 className="text-2xl font-semibold text-primary">{section.heading}</h3>
                  <p className="text-muted-foreground">{section.text}</p>
                </div>
              )
            ))}
          </div>
          <Card className="bg-background/50">
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
            {service.description.map((section, index) => (
              index >= 2 && (
                <div key={index}>
                  <h3 className="text-2xl font-semibold text-primary">{section.heading}</h3>
                  <p className="text-muted-foreground">{section.text}</p>
                </div>
              )
            ))}
        </div>
      </CardContent>
    </Card>
  </section>
);


export default function ServicesPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Our Services</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          A comprehensive suite of digital marketing solutions designed to elevate your brand and achieve your business goals.
        </p>
      </header>

      <main className="space-y-24">
        {services.map((service) => (
          <ServiceSection key={service.id} service={service} />
        ))}
      </main>
    </div>
  );
}
