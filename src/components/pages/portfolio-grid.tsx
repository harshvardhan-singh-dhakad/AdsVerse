
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type PortfolioItem as PortfolioItemType } from "@/lib/definitions";
import { Loader2 } from "lucide-react";

const filters = ["all", "web", "seo", "branding", "digital launch"];

const FALLBACK_PORTFOLIO_ITEMS: PortfolioItemType[] = [
  {
    id: "1",
    title: "E-Commerce Brand Scaling (Meta & Google Ads)",
    category: "digital launch",
    imageUrl: "/images/og-adsverse-2026.png",
    description: "<p>Scaled a D2C fashion brand from ₹5L to ₹45L monthly revenue with 4.2x ROAS using high-converting Meta Ads and Google Shopping campaigns.</p>",
    projectDate: "2026-01-15",
  },
  {
    id: "2",
    title: "Local Healthcare Clinic 10x Lead Growth",
    category: "seo",
    imageUrl: "/images/og-adsverse-2026.png",
    description: "<p>Dominates top 3 local pack rankings across 25 high-intent medical search terms in Indore. Increased monthly appointment inquiries by 340%.</p>",
    projectDate: "2025-11-20",
  },
  {
    id: "3",
    title: "B2B SaaS WhatsApp Lead Automation",
    category: "web",
    imageUrl: "/images/og-adsverse-2026.png",
    description: "<p>Built an automated n8n & Gemini AI chatbot workflow connecting Instagram DMs directly to WhatsApp and Zoho CRM for instant lead qualification.</p>",
    projectDate: "2025-10-10",
  },
];

export function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItemType | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItemType[]>(FALLBACK_PORTFOLIO_ITEMS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      try {
        const { collection, query, orderBy, getDocs } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase-server");
        const q = query(collection(db, "portfolioItems"), orderBy("projectDate", "desc"));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PortfolioItemType[];
          setPortfolioItems(items);
        }
      } catch (e) {
        // Keep static fallback
      }
    }
    fetchItems();
  }, []);
  
  useEffect(() => {
    const body = document.body;
    if (selectedItem) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
    return () => {
      body.style.overflow = 'auto';
    };
  }, [selectedItem]);


  const filteredItems = activeFilter === "all"
    ? portfolioItems
    : portfolioItems?.filter(item => item.category.toLowerCase() === activeFilter.toLowerCase());

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

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems?.map((item, index) => (
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
                  data-ai-hint={item.title}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
      )}

      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-3xl grid-rows-[auto_1fr] p-0">
          {selectedItem && (
            <>
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-3xl mb-2 font-headline">{selectedItem.title}</DialogTitle>
                <div className="text-sm text-muted-foreground">
                  <Badge variant="secondary" className="capitalize">{selectedItem.category}</Badge>
                </div>
              </DialogHeader>
              <ScrollArea className="max-h-[70vh]">
                <div className="px-6 pb-6">
                  <Image
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    width={800}
                    height={500}
                    data-ai-hint={selectedItem.title}
                    className="rounded-lg mb-4 w-full h-auto object-cover"
                    sizes="(max-width: 1200px) 100vw, 800px"
                  />
                  <div 
                    className="text-muted-foreground prose prose-sm dark:prose-invert" 
                    dangerouslySetInnerHTML={{ __html: selectedItem.description }}
                  />
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
