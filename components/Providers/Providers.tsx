import { ClerkProvider } from "@clerk/nextjs";
import React, { ReactNode } from "react";
import { SidebarProvider } from "../ui/sidebar";
import { Toaster } from "../ui/sonner";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ClerkProvider
        dynamic
        signInFallbackRedirectUrl="/api/auth/creation"
        signUpFallbackRedirectUrl="/api/auth/creation"
      >
        <SidebarProvider>
          {children}
          <Toaster />
        </SidebarProvider>
      </ClerkProvider>
    </>
  );
};
