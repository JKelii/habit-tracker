"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/db";

export const getHabits = async () => {
  try {
    const user = await auth();
    const userId = user?.userId;

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

export const addHabit = async (
  title: string,
  userId: string,
  icon: string | undefined,
  description: string
) => {
  try {
    const today = new Date();
    const newHabit = await prisma.habit.create({
      data: {
        title: title,
        streak: 1,
        description: description,
        image: icon,
        user: {
          connect: { userId: userId },
        },
        completionDates: [today],
      },
    });
    return newHabit;
  } catch (error) {
    throw error;
  }
};

export const deleteHabit = async (id: string) => {
  const deleteHabit = await prisma.habit.delete({
    where: {
      id: id,
    },
  });
  return deleteHabit;
};

// const completeHabitDay = async (habitId: number, date: Date) => {
//   const complete = await prisma.habit.
// }

// export const resetHabit = async (habitIds: number[]) => {
//   const today = format(new Date(), "yyyy-MM-dd");

//   const yesterday = subDays(today, 1);

//   const isYesterday = (date: string) => isSameDay(date, yesterday);
//   if (isYesterday(today)) {
//     const reset = await prisma.habit.updateMany({
//       where: {
//         id: {
//           in: habitIds,
//         },
//         completed: true,
//       },
//       data: {
//         completed: false,
//       },
//     });
//     return reset;
//   } else {
//     return;
//   }
// };

// export const completeHabit = async (habitId: number, streak: number) => {
//   const today = format(new Date(), "dd-MM-yyyy");

//   const yesterday = subDays(today, 1);

//   const isYesterday = (date: string) => isSameDay(date, yesterday);

//   if (isYesterday(today)) {
//     const complete = await prisma.habit.update({
//       where: {
//         id: habitId,
//       },
//       data: {
//         completed: true,
//         streak: streak + 1,
//       },
//     });
//     return complete;
//   } else {
//     const reset = await prisma.habit.update({
//       where: {
//         id: habitId,
//       },
//       data: {
//         completed: true,
//         streak: (streak = 1),
//       },
//     });
//     return reset;
//   }
// };
