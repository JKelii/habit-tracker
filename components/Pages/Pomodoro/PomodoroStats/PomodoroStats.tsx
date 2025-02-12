import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { PomodoroTimerList } from "./PomodoroTimerList";

type PomodoroStatsType = {
  pomodoros:
    | {
        id: number;
        createdAt: Date;
        userId: string;
        finished: Date;
      }[]
    | undefined;
};

export const PomodoroStats = ({ pomodoros }: PomodoroStatsType) => {
  if (!pomodoros) return null;

  const totalMinutes = pomodoros.length * 25;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const groupedByDate = pomodoros.reduce<Record<string, typeof pomodoros>>(
    (acc, pomodoro) => {
      const dataKey = pomodoro.createdAt.toLocaleDateString();
      if (!acc[dataKey]) {
        acc[dataKey] = [];
      }
      acc[dataKey].push(pomodoro);
      return acc;
    },
    {}
  );

  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <CardContent className=" w-1/2 flex flex-col justify-start mt-10 items-center">
      <div className="flex items-center gap-1">
        <p className="text-sm text-muted-foreground">Total pomodoro time:</p>
        <p className="text-sm text-black dark:text-white font-semibold">
          {hours}h {minutes}m
        </p>
      </div>
      <Separator className="my-5 w-56" />
      <PomodoroTimerList
        sortedDates={sortedDates}
        groupedByDate={groupedByDate}
      />
    </CardContent>
  );
};
