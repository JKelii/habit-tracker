"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();

  return (
    <article className="flex justify-center items-center w-full ">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Build Better Habits, Achieve Your Goals
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Habit tracker helps you create, track, and maintain positive
                habits. Start your journey to a better you today.
              </p>
            </div>
            <div className="space-x-4">
              <SignedOut>
                <Button asChild size={"lg"}>
                  <Link href={"/api/sign-up"}>Sign in</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-center items gap-2">
                  <p className="font-medium">Welcome {user?.firstName}</p>{" "}
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
