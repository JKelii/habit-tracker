"use client";
import { AddHabit } from "@/components/Pages/Habits/AddHabit";
import { HabitsList } from "@/components/Pages/Habits/HabitsList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ListChecks } from "lucide-react";
import LoadingHabitsList from "@/components/Pages/Habits/LoadingHabitsList";
import axios from "axios";
import type { HabitsPage } from "../types/HabitsTypes";
import { InfiniteScrollContainer } from "@/components/Pages/Habits/InfiniteScrollContainer";

const HabitsPage = () => {
  const { data, isLoading, error, hasNextPage, isFetching, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["habits"],
      queryFn: async ({ pageParam }) => {
        const response = await axios.get<HabitsPage>("/api/routes/habits", {
          params: pageParam ? { cursor: pageParam } : {},
        });
        return response.data;
      },
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  if (isLoading) return <LoadingHabitsList />;
  if (error instanceof Error)
    return <p className="text-destructive text-sm">Error: {error.message}</p>;

  const habits = data?.pages.flatMap((page) => page.habits) || [];

  return (
    <main className="flex flex-col justify-center items-center p-4">
      <Card className="w-full flex flex-col justify-center items-center ">
        <CardHeader>
          <CardTitle className="flex justify-center items-center gap-2 text-xl">
            Habits <ListChecks />
          </CardTitle>
          <CardDescription>Add habits to your daily routine</CardDescription>
        </CardHeader>
        <CardContent className="self-start flex flex-col w-full justify-center items-center">
          <AddHabit />
          <InfiniteScrollContainer
            className="space-y-5 w-full flex flex-col"
            onBottomReached={() =>
              hasNextPage && !isFetching && fetchNextPage()
            }
          >
            <HabitsList habits={habits} />
          </InfiniteScrollContainer>
        </CardContent>
      </Card>
    </main>
  );
};

export default HabitsPage;
