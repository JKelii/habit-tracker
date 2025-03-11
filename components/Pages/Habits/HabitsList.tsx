"use client";

import { completeHabit } from "@/actions/habits";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Flame, LaptopMinimalCheck } from "lucide-react";

type HabitsType = {
  id: number;
  userId: string;
  title: string;
  createdAt: Date;
  completed: boolean;
  streak: number;
}[];

export const HabitsList = ({ habits }: { habits: HabitsType }) => {
  const dailyComplete = async (habitId: number, streak: number) => {
    await completeHabit(habitId, streak);
  };

  const getDayLabels = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.getDate());
    }
    return days;
  };

  const dayLabels = getDayLabels();

  return (
    <section className="w-full mt-2">
      {habits.length >= 1 &&
        habits.map((habit) => (
          <Card key={habit.id} className="overflow-hidden mt-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-md overflow-hidden bg-muted flex items-center justify-center">
                    <LaptopMinimalCheck className="size-8 p-1" />
                  </div>
                  <div>
                    <CardTitle>{habit.title}</CardTitle>
                    <CardDescription>description</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-red-500/25 text-orange-700 px-3 py-1 rounded-full">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="font-semibold">{habit.streak}</span>
                  <span className="text-sm">day streak</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="self-star grid grid-cols-7 gap-2 mt-2">
                {dayLabels.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <span className="text-xs font-semibold text-white mb-1">
                      {day}
                    </span>
                    <button
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors}`}
                      onClick={() => console.log(index)}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-3">
              <div className="text-sm text-muted-foreground">
                1/7 days completed
              </div>
            </CardFooter>
          </Card>
        ))}
    </section>
  );
};
