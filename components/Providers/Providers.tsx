import React, { ReactNode } from "react";
import { SidebarProvider } from "../ui/sidebar";
import { Toaster } from "../ui/sonner";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        {children}
        <Toaster />
      </SidebarProvider>
    </>
  );
};
