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
import { useQuery } from "@tanstack/react-query";
import { ListChecks } from "lucide-react";
import { HabitsType } from "../types/HabitsTypes";
import LoadingHabitsList from "@/components/Pages/Habits/LoadingHabitsList";

type ApiResponse = {
  habits: HabitsType;
};

const fetchHabits = async (): Promise<ApiResponse> => {
  const res = await fetch(`/api/routes/habits`);
  if (!res.ok) throw new Error("Can't fetch items");
  const data = await res.json();
  return data;
};

const HabitsPage = () => {
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["habits"],
    queryFn: fetchHabits,
  });

  if (isLoading) return <LoadingHabitsList />;
  if (error instanceof Error)
    return <p className="text-destructive text-sm">Error: {error.message}</p>;

  const habits = data?.habits ?? [];
  console.log("To jest habit", habits);

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
          <HabitsList habits={habits} />
        </CardContent>
      </Card>
    </main>
  );
};

export default HabitsPage;
