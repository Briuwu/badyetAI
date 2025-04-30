"use client";
import { Bot, Goal, Home, Inbox, PieChart } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

export const AppSidebar = () => {
  const pathname = usePathname();
  // Menu items.
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: Inbox,
      active: pathname === "/dashboard/transactions",
    },
    {
      title: "Budgets",
      url: "/dashboard/budgets",
      icon: PieChart,
      active: pathname === "/dashboard/budgets",
    },
    {
      title: "Goals",
      url: "/dashboard/goals",
      icon: Goal,
      active: pathname === "/dashboard/goals",
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader className="py-2">
        <Link href="/dashboard">
          <span className="text-3xl font-semibold text-slate-800">
            BadyetAI
          </span>
        </Link>
      </SidebarHeader>
      <Separator className="mb-5" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">Application</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-3">
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center gap-2">
                <SidebarMenuButton
                  tooltip="Quick Create"
                  className="text-primary-foreground hover:text-primary-foreground active:text-primary-foreground min-w-8 bg-slate-800 py-6 duration-200 ease-linear hover:bg-slate-800/90 active:bg-slate-800/90"
                >
                  <Bot />
                  <span>Quick Create</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn("py-6", item.active && "border border-black")}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
