
"use client";

import { useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { type PricingPlan } from "@/lib/definitions";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  return (
    <Card className={`group relative bg-card/40 backdrop-blur-xl flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-border/40 ${plan.isPopular ? 'border-primary/50' : ''}`}>
      {plan.isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-primary-foreground text-[10px] uppercase font-bold tracking-widest py-1 px-4 transform rotate-45 translate-x-[25px] translate-y-[10px] shadow-sm">
            Popular
          </div>
        </div>
      )}
      <CardHeader className="pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-headline font-bold text-foreground group-hover:text-primary transition-colors">{plan.name}</CardTitle>
          {plan.subCategory && <p className="text-xs font-medium text-primary/80 uppercase tracking-wider">{plan.subCategory}</p>}
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mt-2 leading-relaxed">{plan.description}</p>
      </CardHeader>
      <CardContent className="flex-grow space-y-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight text-foreground">{plan.price}</span>
          {plan.frequency && <span className="text-sm font-medium text-muted-foreground">{plan.frequency}</span>}
        </div>
        <ul className="space-y-3">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
              <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-2">
         <Button asChild className={`w-full font-bold h-11 ${plan.isPopular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-secondary hover:bg-secondary/80 text-foreground'}`}>
            <Link href="/contact">{plan.callToAction || 'Get Quote'}</Link>
         </Button>
      </CardFooter>
    </Card>
  );
}

export default function PricingPage() {
  const firestore = useFirestore();

  const pricingPlansQuery = useMemoFirebase(() =>
    query(collection(firestore, 'pricingPlans'), orderBy('displayOrder', 'asc')),
    [firestore]
  );
  const { data: pricingPlans, isLoading } = useCollection<PricingPlan>(pricingPlansQuery);

  // Group by category
  const groupedPlans = pricingPlans?.reduce((acc, plan) => {
    const cat = plan.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(plan);
    return acc;
  }, {} as Record<string, PricingPlan[]>);

  const categories = groupedPlans ? Object.keys(groupedPlans) : [];

  return (
    <div className="relative min-h-screen">
      {/* Background Glows */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="glow-effect opacity-30" />

      <div className="container mx-auto py-20 px-6 relative z-10">
        <section className="text-center mb-20 space-y-4">
          <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse">
            Investment Guide
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter font-headline text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60">
            Our Services & <span className="text-primary italic">Pricing</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            Transparent pricing for our comprehensive suite of digital marketing solutions. Achieve hyper-growth with data-backed strategies.
          </p>
        </section>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-16">
            {categories.length > 0 ? (
              <Tabs defaultValue={categories[0]} className="w-full">
                <div className="flex justify-center mb-12">
                   <TabsList className="bg-card/30 backdrop-blur-md p-1 border border-border/40 overflow-x-auto flex-nowrap max-w-full justify-start h-auto">
                    {categories.map(cat => (
                      <TabsTrigger key={cat} value={cat} className="px-6 py-2.5 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs font-bold uppercase tracking-wider transition-all">
                        {cat}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {categories.map(cat => (
                  <TabsContent key={cat} value={cat} className="space-y-8 animate-in fade-in zoom-in duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {groupedPlans![cat].map((plan) => (
                        <PricingCard key={plan.id} plan={plan} />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
                <div className="text-center py-20 bg-card/20 rounded-3xl border border-dashed border-border/40">
                  <p className="text-muted-foreground">No pricing plans found. Check back later!</p>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
