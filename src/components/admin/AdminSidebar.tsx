"use client";

import { LayoutDashboard, Users, Briefcase, IndianRupee, LogOut, ChevronRight, FileText } from "lucide-react";
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

export type AdminTab = "leads" | "services" | "portfolio" | "pricing" | "blogs";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onLogout: () => void;
  userName: string;
}

export function AdminSidebar({ activeTab, onTabChange, onLogout, userName }: AdminSidebarProps) {
  const menuItems = [
    { id: "leads", label: "Leads", icon: Users },
    { id: "services", label: "Services", icon: LayoutDashboard },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },
    { id: "pricing", label: "Pricing", icon: IndianRupee },
    { id: "blogs", label: "Blogs", icon: FileText },
  ];

  return (
    <Sidebar variant="inset" className="border-r border-border/40 bg-card/50 backdrop-blur-xl">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20">
            A
          </div>
          <div>
            <h2 className="font-headline font-bold text-lg text-primary leading-tight">AdsVerse</h2>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/60 px-2 mb-2">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id as AdminTab)}
                    isActive={activeTab === item.id}
                    className={cn(
                      "transition-all duration-200 group h-11 px-3 rounded-lg",
                      activeTab === item.id 
                        ? "bg-primary/10 text-primary hover:bg-primary/20" 
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn(
                      "w-5 h-5 mr-3 transition-colors",
                      activeTab === item.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )} />
                    <span className="font-medium">{item.label}</span>
                    {activeTab === item.id && <ChevronRight className="ml-auto w-4 h-4 opacity-70" />}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-border/40">
        <div className="mb-4 px-2">
          <p className="text-sm font-medium text-foreground">{userName}</p>
          <p className="text-xs text-muted-foreground truncate">Administrator</p>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={onLogout}
              className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive h-10 px-3 rounded-lg"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
