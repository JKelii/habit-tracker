import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-up",
  "/premium",
  "api/webhook(.*)",
  "/api/check-subscription(.*)",
]);

const isSignedUpUserRouter = createRouteMatcher([
  "/todo",
  "/habits",
  "/pomodoro",
  "/matrix",
  "api/webhook(.*)",
  "/api/check-subscription(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const userAuth = await auth();
  const { userId } = userAuth;
  const { pathname, origin } = req.nextUrl;

  if (pathname.startsWith("/api/check-subscription")) {
    return NextResponse.next();
  }

  if (!isPublicRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/sign-up", origin));
  }

  if (isSignedUpUserRouter(req) && userId && !pathname.startsWith("/api/")) {
    try {
      const response = await fetch(
        `${origin}/api/check-subscription?userId=${userId}`
      );
      const data = await response.json();
      if (!data.subscriptionActive) {
        return NextResponse.redirect(new URL("/premium", origin));
      }
    } catch (error) {
      console.log(error);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
