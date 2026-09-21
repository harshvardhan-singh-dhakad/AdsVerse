
"use client";

import { LeadsTable } from "./LeadsTable";
import { UsersTable } from "./UsersTable";
import { DashboardStats } from "./DashboardStats";
import { ServicesTable } from "./ServicesTable";
import { PortfolioTable } from "./PortfolioTable";
import { PricingTable } from "./PricingTable";
import { BlogTable } from "./BlogTable";
import { AuditLeadsTable } from "./AuditLeadsTable";
import { SubscriptionsPanel } from "./SubscriptionsPanel";
import { CompetitorRadar } from "./CompetitorRadar";
import { type AdminTab } from "./AdminSidebar";
import { MediaLibrary } from "./MediaLibrary";
import { BrandSettings } from "./BrandSettings";
import { NavigationSettings } from "./NavigationSettings";
import { TestimonialsTable } from "./TestimonialsTable";
import { FaqTable } from "./FaqTable";

interface AdminDashboardProps {
  activeTab: AdminTab;
}

export function AdminDashboard({ activeTab }: AdminDashboardProps) {
  switch (activeTab) {
    case "dashboard":
      return <DashboardStats />;
    case "users":
      return <UsersTable />;
    case "leads":
      return <LeadsTable />;
    case "audit-leads":
      return <AuditLeadsTable />;
    case "subscriptions":
      return <SubscriptionsPanel />;
    case "seo-radar":
      return <CompetitorRadar />;
    case "services":
      return <ServicesTable />;
    case "portfolio":
      return <PortfolioTable />;
    case "pricing":
      return <PricingTable />;
    case "testimonials":
      return <TestimonialsTable />;
    case "faqs":
      return <FaqTable />;
    case "blogs":
      return <BlogTable />;
    case "brand":
      return <BrandSettings />;
    case "navigation":
      return <NavigationSettings />;
    case "media":
      return (
        <div className="rounded-3xl border border-border/60 bg-card/60 p-5 shadow-sm md:p-7">
          <div className="mb-6">
            <h2 className="text-2xl font-black tracking-tight text-foreground">Media Library</h2>
            <p className="mt-1 text-sm text-muted-foreground">Upload, organize and reuse blog images from Firebase Storage.</p>
          </div>
          <MediaLibrary />
        </div>
      );
    default:
      return <DashboardStats />;
  }
}
