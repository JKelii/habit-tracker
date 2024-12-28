"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export const UserSection = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="space-x-4 my-2 justify-start items-center h-full py-2 flex hover:bg-gray-100 w-full rounded-lg mr-3">
      {isSignedIn ? (
        <>
          <SignedIn>
            <div className="flex justify-start items-center gap-2">
              <UserButton />
              <p className="font-medium text-sm ml-1">{user?.firstName}</p>{" "}
            </div>
          </SignedIn>
        </>
      ) : (
        <>
          <SignedOut>
            <Button asChild size={"lg"}>
              <Link href={"/api/sign-up"}>Sign in</Link>
            </Button>
          </SignedOut>
        </>
      )}
    </div>
  );
};
