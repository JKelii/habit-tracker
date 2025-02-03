import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

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
  return (
    <CardContent className="w-1/2 flex flex-col justify-start mt-10 items-center">
      <div className="">
        <p className="text-sm text-muted-foreground">total pomodoro time:</p>
      </div>
      <Separator className="my-5" />
      {pomodoros &&
        pomodoros?.map((pomodoro) => (
          <div key={pomodoro.id}>
            <p>{pomodoro.createdAt.toISOString()}</p>
          </div>
        ))}
    </CardContent>
  );
};
