"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { habitIcons } from "@/constants/habitIcons";
import { HabitContentHeader } from "./HabitContentHeader";
import { HabitsType } from "@/app/types/HabitsTypes";
import { Check, X } from "lucide-react";
import { HabitDropdown } from "./HabitDropdown";
import { toast } from "sonner";
import { useCompleteHabit } from "./hooks/useCompleteHabit";

export const HabitsList = ({ habits }: { habits: HabitsType }) => {
  const mutation = useCompleteHabit();

  const completeHabitHandler = async (habitId: string, streak: number) => {
    const response = await mutation.mutateAsync({ habitId, streak });

    if (response.status === "complete") {
      toast.success("Habit marked as complete!");
    } else if (response.status === "reset") {
      toast.warning("Habit streak has been reset to 1");
    } else if (response.status === "already_completed") {
      toast.info("You've already marked this habit as complete today!");
    }
  };

  const getDayLabels = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toLocaleDateString());
    }
    return days;
  };

  const dayLabels = getDayLabels();
  console.log(dayLabels);

  return (
    <section className="w-full mt-2">
      {habits.length >= 1 &&
        habits.map((habit) => {
          const matchedIcon = habitIcons.find(
            (icon) => icon.name === habit.image
          );

          return (
            <Card key={habit.id} className="overflow-hidden mt-4">
              <div
                className="w-full h-full  cursor-pointer"
                onClick={() => completeHabitHandler(habit.id, habit.streak)}
              >
                <HabitContentHeader habit={habit} matchedIcon={matchedIcon} />
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {dayLabels.map((day, index) => {
                      const isCompleted = habit.completionDates.some(
                        (item) => day === new Date(item).toLocaleDateString()
                      );
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <span className="text-xs font-semibold text-black dark:text-white mb-1">
                            {day}
                          </span>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center">
                            {isCompleted ? (
                              <Check className="text-green-500" />
                            ) : (
                              <X className="text-red-500" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </div>
              <CardFooter className="border-t px-6 py-3">
                <div className="flex items-center justify-between w-full">
                  <p className="text-sm text-muted-foreground">
                    {`${
                      habit.completionDates.filter((date) =>
                        dayLabels.includes(new Date(date).toLocaleDateString())
                      ).length
                    }/7 days completed`}
                  </p>
                  <div className="">
                    <HabitDropdown habitId={habit.id} />
                  </div>
                </div>
              </CardFooter>
            </Card>
          );
        })}
    </section>
  );
};
