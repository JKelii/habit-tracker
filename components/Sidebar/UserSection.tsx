"use client";

import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

export const UserSection = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="space-x-4 my-2 justify-start items-center h-full flex w-full">
      {isSignedIn ? (
        <>
          <SignedIn>
            <div className="flex justify-start items-center gap-2">
              <UserButton />
              <p className="font-medium text-sm ml-1">
                {user.firstName
                  ? user.firstName
                  : user?.primaryEmailAddress?.emailAddress}
              </p>{" "}
            </div>
          </SignedIn>
        </>
      ) : (
        <>
          <SignedOut>
            <Button asChild size={"sm"} variant={"outline"}>
              <SignInButton />
            </Button>
            <Button asChild size={"sm"}>
              <Link href={"/sign-up"}>Sign up</Link>
            </Button>
          </SignedOut>
        </>
      )}
    </div>
  );
};
