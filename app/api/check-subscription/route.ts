import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

//TODO: CREATE CONSTANT ERRORS...

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { userId: userId },
      select: { subscriptionActive: true },
    });
    return NextResponse.json({ subscriptionActive: user?.subscriptionActive });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
