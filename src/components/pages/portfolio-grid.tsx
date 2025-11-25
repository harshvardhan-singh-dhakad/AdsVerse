
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const portfolioItems = [
  { 
    id: 1, 
    title: "Sports Mania: Website & SEO", 
    category: "web", 
    imageUrl: "https://github.com/harshvardhan-singh-dhakad/image/blob/main/sm.png?raw=true", 
    hint: "sports website",
    description: "<strong>Problem:</strong> Sports Mania, an emerging sports goods retailer in Indore, had a minimal online presence and struggled to compete with established stores. They needed a professional website and a strategy to attract local sports enthusiasts searching online.<br/><br/><strong>Solution:</strong> We designed a dynamic, mobile-first website to showcase their wide range of products. Alongside the website, we launched a targeted <a href='/services/seo-optimization' class='text-accent hover:underline'>Local SEO campaign</a>, optimizing their Google Business Profile and creating content around local sports events. This helped them rank for terms like 'best cricket gear in Indore' and 'sports shop near me'.<br/><br/><strong>Result:</strong> Within 6 months, their organic search traffic increased by 150%, and they reported a 40% rise in walk-in customers who found them online."
  },
  { 
    id: 2, 
    title: "Steadfast Spoken English: Local SEO", 
    category: "seo", 
    imageUrl: "https://github.com/harshvardhan-singh-dhakad/image/blob/main/sf.png?raw=true", 
    hint: "local map",
    description: "<strong>Problem:</strong> Steadfast, a leading English-speaking institute in Indore, was not appearing in the top results for local searches like 'spoken English classes in Vijay Nagar'. Their enrollments were plateauing as competitors dominated the online space.<br/><br/><strong>Solution:</strong> We implemented a hyper-local SEO strategy focused on making them the top choice in their vicinity. This involved a complete overhaul of their Google Business Profile, generating positive student reviews, and creating location-specific landing pages. We also ran a <a href='/services/paid-ads' class='text-accent hover:underline'>Google Ads campaign</a> targeting students in specific Indore neighborhoods.<br/><br/><strong>Result:</strong> Steadfast now ranks in the top 3 on Google Maps for their target keywords. They saw a 60% increase in inquiries through their website and a significant boost in student enrollments from their key localities."
  },
  { 
    id: 4, 
    title: "Evalvue Pvt. Ltd.: Full Service", 
    category: "branding", 
    imageUrl: "https://github.com/harshvardhan-singh-dhakad/image/blob/main/eve.png?raw=true", 
    hint: "business growth",
    description: "<strong>Problem:</strong> Evalvue, a B2B tech firm in Indore, had a great product but struggled with brand recognition and lead generation. Their brand identity was inconsistent, and their marketing efforts were not generating qualified leads.<br/><br/><strong>Solution:</strong> We provided a full-service digital marketing solution. We started with a complete <a href='/services/brand-strategy' class='text-accent hover:underline'>brand strategy and identity redesign</a> to create a professional and modern look. We then built a lead-generation-focused content marketing plan and managed their LinkedIn presence to establish thought leadership. An <a href='/services/automation-tools' class='text-accent hover:underline'>automated CRM workflow</a> was set up to nurture every lead effectively.<br/><br/><strong>Result:</strong> The rebranding led to a 200% increase in engagement on LinkedIn. Their sales pipeline grew by 75% in the first quarter, with higher quality leads thanks to the new content and automation strategy."
  },
  { 
    id: 5, 
    title: "Funland: Digital Launch", 
    category: "web", 
    imageUrl: "https://github.com/harshvardhan-singh-dhakad/image/blob/main/fun.png?raw=true", 
    hint: "business website",
    description: "<strong>Problem:</strong> Funland, a new family entertainment center in Indore, needed to make a big splash for their launch. They had no website, no social media presence, and no digital strategy to attract families.<br/><br/><strong>Solution:</strong> We handled their complete digital launch. This included building a vibrant, user-friendly <a href='/services/web-design-development' class='text-accent hover:underline'>website</a> with an online booking feature. We created and managed their Instagram and Facebook pages, running 'coming soon' campaigns and contests that built huge local excitement. A targeted <a href='/services/social-media-management' class='text-accent hover:underline'>social media ad campaign</a> reached thousands of families in Indore.<br/><br/><strong>Result:</strong> Funland had a sold-out opening week, with over 70% of bookings coming directly from the new website. Their Instagram page grew to 5,000 local followers in just two months."
  },
  { 
    id: 6, 
    title: "ChicBoutique: E-commerce Store", 
    category: "web", 
    imageUrl: "https://github.com/harshvardhan-singh-dhakad/image/blob/main/image.png?raw=true", 
    hint: "fashion website",
    description: "<strong>Problem:</strong> An Indore-based fashion boutique, ChicBoutique, wanted to expand its reach beyond its physical store. They needed a stylish and functional e-commerce platform to sell their products nationwide.<br/><br/><strong>Solution:</strong> We developed a beautiful and scalable Shopify e-commerce store. The website was optimized for mobile shopping and featured high-quality product photography. We integrated a secure payment gateway and implemented an <a href='/services/automation-tools' class='text-accent hover:underline'>abandoned cart recovery automation</a> via email and WhatsApp to boost conversions.<br/><br/><strong>Result:</strong> ChicBoutique's online sales now account for 30% of their total revenue. The abandoned cart automation alone has recovered over 15% of potentially lost sales. Ready to launch your online store? <a href='/contact' class='text-accent hover:underline'>Contact us today</a>."
  },
];

const filters = ["all", "web", "seo", "branding"];

type PortfolioItem = typeof portfolioItems[0];

export function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = activeFilter === "all"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {filters.map(filter => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            onClick={() => setActiveFilter(filter)}
            className="capitalize"
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, index) => (
          <Card 
            key={item.id} 
            className="overflow-hidden cursor-pointer group bg-card/50 backdrop-blur-sm"
            onClick={() => setSelectedItem(item)}
          >
            <CardContent className="p-0 relative">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={600}
                height={400}
                data-ai-hint={item.hint}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                priority={index < 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                <Badge variant="secondary" className="capitalize w-fit">{item.category}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-3xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl mb-2 font-headline">{selectedItem.title}</DialogTitle>
                <DialogDescription>
                  <Badge variant="secondary" className="capitalize">{selectedItem.category}</Badge>
                </DialogDescription>
              </DialogHeader>
              <div>
                <Image
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  width={800}
                  height={500}
                  data-ai-hint={selectedItem.hint}
                  className="rounded-lg mb-4 w-full h-auto object-cover"
                />
                <div 
                  className="text-muted-foreground prose prose-sm dark:prose-invert" 
                  dangerouslySetInnerHTML={{ __html: selectedItem.description }}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
