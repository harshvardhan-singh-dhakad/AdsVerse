
"use client";

import { LeadsTable } from "./LeadsTable";
import { ServicesTable } from "./ServicesTable";
import { PortfolioTable } from "./PortfolioTable";
import { PricingTable } from "./PricingTable";
import { BlogTable } from "./BlogTable";
import { type AdminTab } from "./AdminSidebar";

interface AdminDashboardProps {
  activeTab: AdminTab;
}

export function AdminDashboard({ activeTab }: AdminDashboardProps) {
  switch (activeTab) {
    case "leads":
      return <LeadsTable />;
    case "services":
      return <ServicesTable />;
    case "portfolio":
      return <PortfolioTable />;
    case "pricing":
      return <PricingTable />;
    case "blogs":
      return <BlogTable />;
    default:
      return <LeadsTable />;
  }
}
