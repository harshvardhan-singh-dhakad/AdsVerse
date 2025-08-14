
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const portfolioItems = [
  { id: 1, title: "Sports Mania Website & SEO", category: "web", imageUrl: "https://github.com/harshvardhan-singh-dhakad/image/blob/main/sm.png?raw=true", hint: "sports website", description: "Designed and developed a dynamic website for Sports Mania and implemented a robust SEO strategy to boost their online visibility and search rankings." },
  { id: 2, title: "Steadfast Spoken English Local SEO", category: "seo", imageUrl: "https://github.com/harshvardhan-singh-dhakad/image/blob/main/sf.png?raw=true", hint: "local map", description: "Boosted local presence for Steadfast Spoken English through comprehensive local business setup and optimization, driving more foot traffic and local inquiries." },
  { id: 4, title: "Evalvue Pvt. Ltd. Full Service", category: "branding", imageUrl: "https://github.com/harshvardhan-singh-dhakad/image/blob/main/eve.png?raw=true", hint: "business growth", description: "Provided a comprehensive digital marketing solution for Evalvue Pvt. Ltd., including SEO, paid ads, and social media management to drive holistic growth." },
  { id: 5, title: "Funland Pvt. Ltd. Digital Launch", category: "web", imageUrl: "https://github.com/harshvardhan-singh-dhakad/image/blob/main/fun.png?raw=true", hint: "business website", description: "Built a complete digital presence for Funland Pvt. Ltd. from the ground up. This included a new website design, a full SEO strategy, and local business setup to attract and engage their target audience." },
  { id: 6, title: "E-commerce Store for ChicBoutique", category: "web", imageUrl: "https://github.com/harshvardhan-singh-dhakad/image/blob/main/image.png?raw=true", hint: "fashion website", description: "Designed and developed a scalable Shopify e-commerce store for a fashion startup, featuring a seamless checkout process and mobile-first design." },
];

const filters = ["all", "web", "seo", "branding", "smm"];

type PortfolioItem = typeof portfolioItems[0];

export function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = activeFilter === "all"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter || (activeFilter === 'seo' && item.category === 'local-seo'));

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <Card 
            key={item.id} 
            className="overflow-hidden cursor-pointer group"
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
                <DialogTitle className="text-3xl mb-2">{selectedItem.title}</DialogTitle>
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
                <p className="text-muted-foreground">{selectedItem.description}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
