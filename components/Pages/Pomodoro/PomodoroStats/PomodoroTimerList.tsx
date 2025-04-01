import { PomodoroTimerListType } from "@/app/types/Pomodoro";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { InfiniteScrollContainer } from "../../Habits/InfiniteScrollContainer";

export interface PomodoroTimerListProps extends PomodoroTimerListType {
  isFetching: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export const PomodoroTimerList = ({
  sortedDates,
  groupedByDate,
  isFetching,
  hasNextPage,
  fetchNextPage,
}: PomodoroTimerListProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-25rem)] w-64">
      <InfiniteScrollContainer
        className="space-y-5 w-full flex flex-col"
        onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      >
        {sortedDates &&
          sortedDates.map((date) => (
            <div
              key={date}
              className=" flex-col flex justify-center items-center w-64 mb-2"
            >
              <h3 className="text-lg font-semibold">{date}</h3>
              <Separator className="my-3 w-56" />
              {groupedByDate[date]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((pomodoro) => (
                  <div key={pomodoro.id} className="flex gap-4">
                    <p className="test-sm text-muted-foreground">
                      {new Date(pomodoro.createdAt).toLocaleTimeString()}
                    </p>
                    <p>-</p>
                    <p className="test-sm text-muted-foreground mb-1">
                      {new Date(pomodoro.finished).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
            </div>
          ))}
      </InfiniteScrollContainer>
    </ScrollArea>
  );
};
