
"use client";

import { LeadsTable } from "./LeadsTable";
import { DashboardStats } from "./DashboardStats";
import { ServicesTable } from "./ServicesTable";
import { PortfolioTable } from "./PortfolioTable";
import { PricingTable } from "./PricingTable";
import { BlogTable } from "./BlogTable";
import { AuditLeadsTable } from "./AuditLeadsTable";
import { SubscriptionsPanel } from "./SubscriptionsPanel";
import { CompetitorRadar } from "./CompetitorRadar";
import { type AdminTab } from "./AdminSidebar";

interface AdminDashboardProps {
  activeTab: AdminTab;
}

export function AdminDashboard({ activeTab }: AdminDashboardProps) {
  switch (activeTab) {
    case "dashboard":
      return <DashboardStats />;
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
    case "blogs":
      return <BlogTable />;
    default:
      return <DashboardStats />;
  }
}
