"use client";
import { Home, ListChecks, CheckSquare, CheckCheck, Timer } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { UserSection } from "./UserSection";
import Link from "next/link";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Habits",
    url: "/habits",
    icon: CheckCheck,
  },
  {
    title: "To do",
    url: "/todo",
    icon: CheckSquare,
  },
  {
    title: "Pomodoro",
    url: "/pomodoro",
    icon: Timer,
  },
  // {
  //   title: "Calendar",
  //   url: "#",
  //   icon: Calendar,
  // },
];

export const AppSidebar = () => {
  const { isMobile, toggleSidebar } = useSidebar();
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <ListChecks />
            <p className="font-semibold">Habit tracker</p>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader className="text-sm text-muted-foreground uppercase font-semibold">
            Overview
          </SidebarHeader>
          <SidebarGroupContent>
            {isMobile ? (
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} onClick={toggleSidebar}>
                        <item.icon />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            ) : (
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarHeader className="text-sm text-muted-foreground uppercase font-semibold">
        SETTINGS
      </SidebarHeader>
      <SidebarFooter>
        <UserSection />
      </SidebarFooter>
    </Sidebar>
  );
};
