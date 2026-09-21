"use client";

import {
  LayoutDashboard,
  Users,
  UserCheck,
  Briefcase,
  IndianRupee,
  LogOut,
  FileText,
  Globe,
  Crown,
  Sparkles,
  ChevronRight,
  Menu,
  Quote,
  CircleHelp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import AdsVerseLogo from "@/components/AdsVerseLogo";

export type AdminTab =
  | "dashboard"
  | "users"
  | "leads"
  | "audit-leads"
  | "subscriptions"
  | "seo-radar"
  | "services"
  | "portfolio"
  | "pricing"
  | "blogs"
  | "brand"
  | "navigation"
  | "testimonials"
  | "faqs";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onLogout: () => void;
  userName: string;
  logoUrl?: string;
}

const groups = [
  {
    label: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Content",
    items: [
      { id: "blogs", label: "Blogs", icon: FileText },
      { id: "portfolio", label: "Portfolio", icon: Briefcase },
      { id: "services", label: "Services", icon: Globe },
      { id: "pricing", label: "Pricing", icon: IndianRupee },
      { id: "testimonials", label: "Testimonials", icon: Quote },
      { id: "faqs", label: "FAQs", icon: CircleHelp },
    ],
  },
  {
    label: "Brand",
    items: [
      { id: "brand", label: "Brand Settings", icon: Sparkles },
    ],
  },
  {
    label: "Site",
    items: [
      { id: "navigation", label: "Header Navigation", icon: Menu },
    ],
  },
  {
    label: "Business",
    items: [
      { id: "users", label: "Users", icon: UserCheck },
      { id: "leads", label: "Leads", icon: Users },
      { id: "audit-leads", label: "Audit Leads", icon: Sparkles },
      { id: "subscriptions", label: "Subscriptions", icon: Crown },
    ],
  },
  {
    label: "Growth",
    items: [
      { id: "seo-radar", label: "SEO & AI Radar", icon: Sparkles },
    ],
  },
] satisfies Array<{
  label: string;
  items: Array<{ id: AdminTab; label: string; icon: typeof LayoutDashboard }>;
}>;

export function AdminSidebar({ activeTab, onTabChange, onLogout, userName, logoUrl }: AdminSidebarProps) {
  return (
    <Sidebar variant="inset" className="border-r border-border/60 bg-background">
      <SidebarHeader className="border-b border-border/60 p-5">
        <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/70 p-3">
          <div className="min-w-0 flex-1 overflow-hidden">
            <AdsVerseLogo logoUrl={logoUrl} size="text-xl" className="max-w-full" />
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Admin workspace</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        {groups.map((group) => (
          <SidebarGroup key={group.label} className="mb-5">
            <SidebarGroupLabel className="px-2 text-[10px] font-black uppercase tracking-[0.16em] text-muted-foreground/70">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => onTabChange(item.id)}
                        isActive={active}
                        className={cn(
                          "group h-10 rounded-xl px-3 transition-all",
                          active
                            ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                            : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                        )}
                      >
                        <Icon className={cn("mr-3 h-4 w-4", active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                        <span className="text-sm font-semibold">{item.label}</span>
                        {active && <ChevronRight className="ml-auto h-4 w-4 opacity-80" />}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/60 p-4">
        <div className="mb-3 rounded-2xl border border-border/60 bg-card/60 p-3">
          <p className="truncate text-sm font-semibold text-foreground">{userName}</p>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Administrator</p>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onLogout}
              className="h-10 rounded-xl px-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span className="text-sm font-semibold">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
