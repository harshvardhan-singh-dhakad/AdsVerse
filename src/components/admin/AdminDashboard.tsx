
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeadsTable } from "./LeadsTable";
import { ServicesTable } from "./ServicesTable";
import { PortfolioTable } from "./PortfolioTable";
import { PricingTable } from "./PricingTable";

export function AdminDashboard() {
  return (
    <Tabs defaultValue="leads" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="leads">Leads</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
      </TabsList>
      <TabsContent value="leads">
        <LeadsTable />
      </TabsContent>
      <TabsContent value="services">
        <ServicesTable />
      </TabsContent>
      <TabsContent value="portfolio">
        <PortfolioTable />
      </TabsContent>
      <TabsContent value="pricing">
        <PricingTable />
      </TabsContent>
    </Tabs>
  );
}
