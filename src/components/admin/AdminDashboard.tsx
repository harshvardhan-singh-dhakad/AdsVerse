
"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import type { AdminTab } from "./AdminSidebar";

function PanelLoading({ label }: { label: string }) {
  return (
    <div className="flex min-h-[260px] items-center justify-center gap-3 rounded-2xl border border-border/50 bg-card/30 text-sm text-muted-foreground" role="status" aria-live="polite">
      <Loader2 className="h-5 w-5 animate-spin text-primary" />
      <span>Loading {label}…</span>
    </div>
  );
}

const DashboardStats = dynamic(() => import("./DashboardStats").then((module) => module.DashboardStats), {
  loading: () => <PanelLoading label="dashboard" />,
});
const UsersTable = dynamic(() => import("./UsersTable").then((module) => module.UsersTable), {
  loading: () => <PanelLoading label="users" />,
});
const LeadsTable = dynamic(() => import("./LeadsTable").then((module) => module.LeadsTable), {
  loading: () => <PanelLoading label="leads" />,
});
const AuditLeadsTable = dynamic(() => import("./AuditLeadsTable").then((module) => module.AuditLeadsTable), {
  loading: () => <PanelLoading label="audit leads" />,
});
const SubscriptionsPanel = dynamic(() => import("./SubscriptionsPanel").then((module) => module.SubscriptionsPanel), {
  loading: () => <PanelLoading label="subscriptions" />,
});
const CompetitorRadar = dynamic(() => import("./CompetitorRadar").then((module) => module.CompetitorRadar), {
  loading: () => <PanelLoading label="SEO & AI Radar" />,
});
const ServicesTable = dynamic(() => import("./ServicesTable").then((module) => module.ServicesTable), {
  loading: () => <PanelLoading label="services" />,
});
const PortfolioTable = dynamic(() => import("./PortfolioTable").then((module) => module.PortfolioTable), {
  loading: () => <PanelLoading label="portfolio" />,
});
const PricingTable = dynamic(() => import("./PricingTable").then((module) => module.PricingTable), {
  loading: () => <PanelLoading label="pricing" />,
});
const TestimonialsTable = dynamic(() => import("./TestimonialsTable").then((module) => module.TestimonialsTable), {
  loading: () => <PanelLoading label="testimonials" />,
});
const FaqTable = dynamic(() => import("./FaqTable").then((module) => module.FaqTable), {
  loading: () => <PanelLoading label="FAQs" />,
});
const BlogTable = dynamic(() => import("./BlogTable").then((module) => module.BlogTable), {
  loading: () => <PanelLoading label="blogs" />,
});
const IndustryContentManager = dynamic(() => import("./IndustryContentManager").then((module) => module.IndustryContentManager), {
  loading: () => <PanelLoading label="industry pages" />,
});
const MobilePostersManager = dynamic(() => import("./MobilePostersManager").then((module) => module.MobilePostersManager), {
  loading: () => <PanelLoading label="mobile posters" />,
});

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
    case "industries":
      return <IndustryContentManager />;
    case "mobile-posters":
      return <MobilePostersManager />;
    default:
      return <DashboardStats />;
  }
}
