import { NextResponse } from "next/server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/app/lib/db";

export async function POST() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json(
        { error: "User not found in Clerk." },
        { status: 404 }
      );
    }

    const email = clerkUser.emailAddresses?.[0]?.emailAddress || "";
    if (!email) {
      return NextResponse.json(
        { error: "User does not have an email address." },
        { status: 400 }
      );
    }

    const existingProfile = await prisma.user.findUnique({
      where: { userId: clerkUser.id },
    });

    if (existingProfile) {
      return NextResponse.json({ message: "Profile already exists." });
    }

    await prisma.user.create({
      data: {
        userId: clerkUser.id,
        email,
      },
    });

    console.log(`Prisma profile created for user: ${clerkUser.id}`);
    return NextResponse.json(
      { message: "Profile created successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in create-profile API:", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
