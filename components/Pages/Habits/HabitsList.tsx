"use client";

// import { completeHabit } from "@/actions/habits";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import { habitIcons } from "@/lib/habitIcons";
import { HabitContentHeader } from "./HabitContentHeader";

type HabitsType = {
  id: number;
  userId: string;
  title: string;
  createdAt: Date;
  description: string;
  completed: boolean;
  streak: number;
  image: string | null;
}[];

export const HabitsList = ({ habits }: { habits: HabitsType }) => {
  // const dailyComplete = async (habitId: number, streak: number) => {
  //   await completeHabit(habitId, streak);
  // };

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
        habits.map((habit) => {
          const matchedIcon = habitIcons.find(
            (icon) => icon.name === habit.image
          );

          return (
            <Card key={habit.id} className="overflow-hidden mt-4">
              <HabitContentHeader habit={habit} matchedIcon={matchedIcon} />
              <CardContent>
                <div className="self-start grid grid-cols-7 gap-2 mt-2">
                  {dayLabels.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <span className="text-xs font-semibold text-white mb-1">
                        {day}
                      </span>
                      <button
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors`}
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
          );
        })}
    </section>
  );
};
