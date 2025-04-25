import {
  BotMessageSquare,
  Goal,
  Home,
  Inbox,
  PieChart,
  PlusCircleIcon,
} from "lucide-react";

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
import { Separator } from "./ui/separator";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: Inbox,
  },
  {
    title: "Budgets",
    url: "/dashboard/budgets",
    icon: PieChart,
  },
  {
    title: "Goals",
    url: "/dashboard/goals",
    icon: Goal,
  },
  {
    title: "AI Assistant",
    url: "/dashboard/assistant",
    icon: BotMessageSquare,
  },
];

export const AppSidebar = () => {
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
                  <PlusCircleIcon />
                  <span>Quick Create</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="py-6">
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
