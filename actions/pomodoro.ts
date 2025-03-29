"use server";

import { prisma } from "@/app/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

export const getPomodoros = async () => {
  try {
    const user = await auth();
    const userId = user?.userId;
    if (!user || !userId) {
      throw new Error("Can't find pomodoro");
    }
    const pomodoro = await prisma.pomodoro.findMany({
      where: {
        userId: userId,
      },
    });
    if (pomodoro) return pomodoro;
  } catch (error) {
    console.log(error);
  }
};

export const createPomodoro = async (createdAt: Date, finished: Date) => {
  const user = await currentUser();
  const userId = user?.id;

  try {
    if (!user || !user.id) {
      throw new Error("Can't find pomodoro");
    }

    const create = await prisma.pomodoro.create({
      data: {
        user: {
          connect: { userId: userId },
        },
        createdAt,
        finished,
      },
    });
    return create;
  } catch (error) {
    console.log(error);
  }
};
