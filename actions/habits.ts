"use server";

import { prisma } from "@/app/lib/db";
import { auth } from "@clerk/nextjs/server";
import { subDays } from "date-fns";

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
      orderBy: {
        createdAt: "asc",
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
        completionDates: { set: [today] },
      },
    });
    return newHabit;
  } catch (error) {
    throw error;
  }
};

export const deleteHabit = async (id: string) => {
  try {
    console.log("Checking if habit exists...");

    const habit = await prisma.habit.findUnique({
      where: { id },
    });

    if (!habit) {
      console.error("Habit not found!");
      throw new Error("Habit not found");
    }

    console.log("Deleting habit with ID:", id);
    const deleteHabit = await prisma.habit.delete({
      where: { id },
    });

    console.log("Successfully deleted:", deleteHabit);
    return deleteHabit;
  } catch (error) {
    console.error("Error deleting habit:", error);
    throw error;
  }
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

export const completeHabit = async (habitId: string, streak: number) => {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = subDays(new Date(), 1).toISOString().split("T")[0];

  const habit = await prisma.habit.findUnique({
    where: {
      id: habitId,
    },
  });

  if (!habit) {
    throw new Error("Habit not found");
  }

  const formattedCompletions = habit.completionDates.map(
    (item) => item.toISOString().split("T")[0]
  );

  const wasCompletedYesterday = formattedCompletions.some(
    (date) => date === yesterday
  );

  const wasAlreadyCompleted = formattedCompletions.some(
    (date) => date === today
  );

  if (wasAlreadyCompleted) {
    return { status: "already_completed" };
  }

  if (wasCompletedYesterday) {
    await prisma.habit.update({
      where: {
        id: habitId,
      },
      data: {
        completed: true,
        streak: {
          set: streak + 1,
        },
        completionDates: {
          push: new Date(),
        },
      },
    });
    return { status: "complete" };
  } else {
    await prisma.habit.update({
      where: {
        id: habitId,
      },
      data: {
        completed: true,
        streak: 1,
        completionDates: {
          set: [new Date()],
        },
      },
    });

    return { status: "reset" };
  }
};
