"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { UserSection } from "./UserSection";
import Link from "next/link";
import { items } from "@/constants/items";
import { ChartArea, ListChecks } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const AppSidebar = () => {
  const { isMobile, toggleSidebar } = useSidebar();

  const pathName = usePathname();

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
          <SidebarGroupLabel className="text-sm text-muted-foreground uppercase font-semibold">
            Overview
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {isMobile ? (
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = pathName === item.url;
                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className={cn(
                        isActive
                          ? "bg-neutral-300 text-black  pointer-events-none"
                          : "hover:bg-neutral-200 hover:text-black",
                        "rounded-lg"
                      )}
                    >
                      <SidebarMenuButton asChild>
                        <Link href={item.url} onClick={toggleSidebar}>
                          <item.icon />
                          <span className="text-sm">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            ) : (
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = pathName === item.url;
                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className={cn(
                        isActive
                          ? "bg-neutral-300 text-black  pointer-events-none"
                          : "hover:bg-neutral-200 hover:text-black",
                        "rounded-lg"
                      )}
                    >
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span className="text-sm">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel className="text-sm text-muted-foreground uppercase font-semibold">
              PREMIUM
            </SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link
                    href={"/premium"}
                    className="flex justify-center items-center text-sm gap-1"
                  >
                    {" "}
                    <ChartArea />
                    Premium
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroupLabel className="text-sm text-muted-foreground uppercase font-semibold">
          SETTINGS
        </SidebarGroupLabel>

        <UserSection />
      </SidebarFooter>
    </Sidebar>
  );
};
