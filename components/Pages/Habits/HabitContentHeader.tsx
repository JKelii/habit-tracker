import { HabitType } from "@/app/types/HabitsTypes";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, ListRestart, LucideProps } from "lucide-react";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";

type MatchedIconType =
  | {
      name: string;
      icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
    }
  | undefined;

type HabitContentHeader = {
  habit: HabitType;
  matchedIcon: MatchedIconType;
};

export const HabitContentHeader = ({
  habit,
  matchedIcon,
}: HabitContentHeader) => {
  return (
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-md overflow-hidden bg-muted/80 flex items-center justify-center">
            {matchedIcon ? (
              <matchedIcon.icon className="size-9 p-1" />
            ) : (
              <ListRestart className="size-9 p-1" />
            )}
          </div>
          <div>
            <CardTitle>{habit.title}</CardTitle>

            <CardDescription>{habit.description}</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-red-500/25 text-orange-700 px-3 py-1 rounded-full">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="font-semibold">{habit.streak}</span>
          <span className="text-sm">day streak</span>
        </div>
      </div>
    </CardHeader>
  );
};
