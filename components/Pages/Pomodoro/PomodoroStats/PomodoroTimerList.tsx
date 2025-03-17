import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React from "react";

type PomodoroTimerList = {
  sortedDates: string[];
  groupedByDate: Record<
    string,
    {
      id: number;
      createdAt: Date;
      userId: string;
      finished: Date;
    }[]
  >;
};

export const PomodoroTimerList = ({
  sortedDates,
  groupedByDate,
}: PomodoroTimerList) => {
  return (
    <ScrollArea className="h-[calc(100vh-25rem)] w-64">
      {sortedDates &&
        sortedDates.map((date) => (
          <div
            key={date}
            className=" flex-col flex justify-center items-center w-64 mb-2"
          >
            <h3 className="text-lg font-semibold">{date}</h3>
            <Separator className="my-3 w-56" />
            {groupedByDate[date]
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
              .map((pomodoro) => (
                <div key={pomodoro.id} className="flex gap-4">
                  <p className="test-sm text-muted-foreground">
                    {pomodoro.createdAt.toLocaleTimeString()}
                  </p>
                  <p>-</p>
                  <p className="test-sm text-muted-foreground mb-1">
                    {pomodoro.finished.toLocaleTimeString()}
                  </p>
                </div>
              ))}
          </div>
        ))}
    </ScrollArea>
  );
};
