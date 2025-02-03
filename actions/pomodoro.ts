"use server";

import prisma from "@/app/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const getPomodoros = async () => {
  const user = await currentUser();
  const userId = user?.id;

  try {
    if (!user || !user.id) {
      throw new Error("Can't find pomodoro");
    }
    const pomodoro = await prisma.pomodoro.findMany({
      where: {
        userId: userId,
      },
    });
    return pomodoro;
  } catch (error) {
    console.log(error);
  }
};
//TODO: CREATE POMODORO
