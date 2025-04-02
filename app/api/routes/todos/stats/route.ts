import { prisma } from "@/app/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await auth();
    const userId = user.userId;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const totalCount = await prisma.todo.count({ where: { userId } });

    const today = new Date();

    const completeTillToday = await prisma.todo.count({
      where: { userId, toBeDone: { lt: today } },
    });

    const uniqueCategories = await prisma.todo.findMany({
      where: { userId },
      select: { category: true },
      distinct: ["category"],
    });

    const completedTodos = await prisma.todo.count({
      where: { userId, completed: true },
    });

    const uniqueCategoriesCount = uniqueCategories.length;

    return NextResponse.json({
      totalCount,
      uniqueCategoriesCount,
      completeTillToday,
      completedTodos,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
