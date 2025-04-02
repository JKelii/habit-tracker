import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { PomodoroTimerList } from "./PomodoroTimerList";
import { InfiniteScrollContainer } from "../../Habits/InfiniteScrollContainer";
import { PomodorosPage, PomodorosType } from "@/app/types/Pomodoro";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { TotalHours } from "./TotalHours";

type PomodoroStatsProps = {
  pomodoros: PomodorosType;
  isFetching: boolean;
  hasNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<PomodorosPage, unknown>, Error>
  >;
};

export const PomodoroStats = ({
  pomodoros,
  hasNextPage,
  fetchNextPage,
  isFetching,
}: PomodoroStatsProps) => {
  const groupedByDate = pomodoros.reduce<Record<string, typeof pomodoros>>(
    (acc, pomodoro) => {
      const dateKey = new Date(pomodoro.createdAt).toLocaleDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(pomodoro);
      return acc;
    },
    {}
  );

  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <CardContent className=" w-1/2 h-full flex flex-col justify-start mt-10 items-center">
      <TotalHours />
      <Separator className="my-5 w-56" />
      <InfiniteScrollContainer
        className="py-5"
        onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      >
        <PomodoroTimerList
          sortedDates={sortedDates}
          groupedByDate={groupedByDate}
          fetchNextPage={fetchNextPage}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
        />
      </InfiniteScrollContainer>
    </CardContent>
  );
};
