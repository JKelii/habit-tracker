import { getHabits } from "@/actions/habits";
import { AddHabit } from "@/components/Pages/Habits/AddHabit";
import { HabitsList } from "@/components/Pages/Habits/HabitsList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { ListChecks } from "lucide-react";

const HabitsPage = async () => {
  const user = await currentUser();
  const habits = await getHabits();
  //TODO: ADD IMAGES/ICONS
  //TODO: CHANGE TABLE TO SOMETHING ELSE

  return (
    <main className="flex flex-col justify-center items-center p-4">
      <Card className="w-full flex flex-col justify-center items-center">
        <CardHeader>
          <CardTitle className="flex justify-center items-center gap-2 text-xl">
            Habits <ListChecks />
          </CardTitle>
          <CardDescription>Add habits to your daily routine</CardDescription>
        </CardHeader>
        <CardContent className="self-start flex flex-col w-full justify-center items-center">
          <AddHabit />
          {user ? (
            <>
              {habits ? (
                <HabitsList habits={habits} />
              ) : (
                <p className="font-bold text-2xl">You have nothing to do?</p>
              )}
            </>
          ) : (
            <p>You have to be logged in</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default HabitsPage;
