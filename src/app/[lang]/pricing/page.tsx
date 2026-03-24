
"use client";

import { useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { type PricingPlan } from "@/lib/definitions";

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  return (
    <Card className={`bg-card/70 backdrop-blur-md flex flex-col ${plan.isPopular ? 'border-2 border-accent shadow-2xl shadow-accent/20' : 'border-border/40'}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">{plan.name}</CardTitle>
        <p className="text-muted-foreground text-sm">{plan.description}</p>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-4xl font-bold text-accent">{plan.price}
            {plan.frequency && <span className="text-lg font-normal text-muted-foreground ml-1">{plan.frequency}</span>}
        </p>
        <ul className="space-y-3 text-muted-foreground">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
         <Button asChild className="w-full bg-accent hover:bg-accent/90">
            <Link href="/contact">{plan.callToAction || 'Get Started'}</Link>
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

  return (
    <div className="container mx-auto py-16 px-4">
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-headline text-primary">Our Services &amp; Pricing</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Transparent pricing for our comprehensive suite of digital marketing solutions. Find the perfect package to elevate your brand and achieve your goals.
        </p>
      </section>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans?.map((plan) => (
                <PricingCard key={plan.id} plan={plan} />
            ))}
        </section>
      )}
    </div>
  );
}
