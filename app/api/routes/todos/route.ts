import { prisma } from "@/app/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const page = Number(url.searchParams.get("page")) || 1;
    const pageSize = Number(url.searchParams.get("pageSize")) || 10;

    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const todos = await prisma.todo.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: { userId },
      orderBy: [{ completed: "asc" }, { createdAt: "desc" }],
    });

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

    const totalPages = Math.ceil(totalCount / pageSize);

    return NextResponse.json({
      todos,
      totalPages,
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
