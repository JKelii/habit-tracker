"use server";

import prisma from "@/app/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const getHabits = async () => {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!user || !userId) {
      throw new Error("Can't get user");
    }

    const habits = await prisma.habit.findMany({
      where: {
        userId: userId,
      },
    });
    return habits;
  } catch (error) {
    throw error;
  }
};

export const addHabit = async (title: string, userId: string) => {
  try {
    const newHabit = await prisma.habit.create({
      data: {
        title: title,
        streak: 1,
        user: {
          connect: { id: userId },
        },
      },
    });
    return newHabit;
  } catch (error) {
    throw error;
  }
};
