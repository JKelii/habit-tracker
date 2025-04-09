import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-up",
  "/premium",
  "/api/check-subscription(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/check-subscription")) {
    return NextResponse.next();
  }

  const userAuth = await auth();
  const { userId } = userAuth;
  const { origin } = req.nextUrl;

  if (!isPublicRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/sign-up", origin));
  }

  // Uncomment the subscription check logic when you're ready to use it
  // if (isSignedUpUserRouter(req) && userId && !pathname.startsWith("/api/")) {
  //   try {
  //     const response = await fetch(
  //       `${origin}/api/check-subscription?userId=${userId}`
  //     );
  //     const data = await response.json();
  //     if (!data.subscriptionActive) {
  //       return NextResponse.redirect(new URL("/premium", origin));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    "/(api|trpc)(.*)",
  ],
};
