"use client";
import { PomodoroTimer } from "./PomodoroTimer/PomodoroTimer";
import { PomodoroStats } from "./PomodoroStats/PomodoroStats";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { PomodorosPage } from "@/app/types/Pomodoro";
import { LoadingPomodoroList } from "./LoadingPomodoroList";

export const PomodoroList = () => {
  const { data, isLoading, error, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["pomodoros"],
      queryFn: async ({ pageParam }) => {
        const response = await axios.get<PomodorosPage>(
          "/api/routes/pomodoros",
          {
            params: pageParam ? { cursor: pageParam } : {},
          }
        );
        return response.data;
      },
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  if (isLoading) return <LoadingPomodoroList />;
  if (error instanceof Error)
    return (
      <p className="text-destructive text-sm mx-auto">Error: {error.message}</p>
    );

  const pomodoros = data?.pages.flatMap((page) => page.pomodoros) || [];

  const pomodorosFinishedToday = pomodoros?.map((pomodoro) =>
    new Date(pomodoro.finished).toLocaleDateString()
  );

  const today = new Date().toLocaleDateString();
  const finishedToday = pomodorosFinishedToday?.filter(
    (pomodoro) => pomodoro === today
  );

  return (
    <>
      <PomodoroTimer finishedToday={finishedToday} />

      <PomodoroStats
        pomodoros={pomodoros}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  );
};
