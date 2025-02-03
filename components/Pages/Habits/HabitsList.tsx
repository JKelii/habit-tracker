"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DeleteHabit } from "./DeleteHabit";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { completeHabit } from "@/actions/habits";

type HabitsType = {
  id: number;
  userId: string;
  title: string;
  createdAt: Date;
  completed: boolean;
  streak: number;
}[];

export const HabitsList = ({ habits }: { habits: HabitsType }) => {
  const dailyComplete = async (habitId: number, streak: number) => {
    await completeHabit(habitId, streak);
  };

  // const habitId = habits.map((habit) => habit.id);

  // useEffect(() => {
  //   resetHabit(habitId);
  // }, []);

  return (
    <section className="w-full mt-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Name</TableHead>
            <TableHead className="w-1/4">Streak</TableHead>
            <TableHead className="w-1/4">Completed</TableHead>
            <TableHead className="w-1/4">Created</TableHead>
            <TableHead className="w-1/2">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {habits.length >= 1 &&
            habits.map((habit) => (
              <TableRow key={habit.id}>
                <TableCell className="w-1/4">
                  <p className="text-sm font-semibold">{habit.title}</p>
                </TableCell>
                <TableCell className="w-1/4 flex items-center">
                  <Flame className="text-orange-500" />{" "}
                  <p className="text-sm font-semibold">{habit.streak}</p>
                </TableCell>
                <TableCell className="w-1/4">
                  <Button
                    variant={"outline"}
                    onClick={() => dailyComplete(habit.id, habit.streak)}
                  >
                    <p
                      className={cn(
                        habit.completed ? "text-green-500" : "text-red-500",
                        "text-sm tracking-wider"
                      )}
                    >
                      {habit.completed ? "Done" : "False"}
                    </p>
                  </Button>
                </TableCell>
                <TableCell className="w-1/4">
                  <p className="text-sm font-semibold">
                    {habit.createdAt.toLocaleDateString()}
                  </p>
                </TableCell>
                <TableCell className="w-1/2">
                  <DeleteHabit habitId={habit.id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </section>
  );
};
