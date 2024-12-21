import { ClerkProvider } from "@clerk/nextjs";
import React, { ReactNode } from "react";
import { SidebarProvider } from "../ui/sidebar";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ClerkProvider
        signInFallbackRedirectUrl="/api/auth/creation"
        signUpFallbackRedirectUrl="/api/auth/creation"
      >
        <SidebarProvider>{children}</SidebarProvider>
      </ClerkProvider>
    </>
  );
};
