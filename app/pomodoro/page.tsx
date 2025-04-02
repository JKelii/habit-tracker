import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Timer } from "lucide-react";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Habit Tracker Pomodoro Timer",
};

const PomodoroList = dynamic(() =>
  import("@/components/Pages/Pomodoro/PomodoroList").then(
    (mod) => mod.PomodoroList
  )
);

const page = () => {
  return (
    <main className="flex h-[95%] justify-center items-center p-4 w-full">
      <Card className="w-full h-full flex flex-col justify-center items-center">
        <CardHeader>
          <CardTitle className="flex justify-center items-center gap-2 text-xl mt-8">
            Pomodoro <Timer />
          </CardTitle>
          <CardDescription>Track time with pomodoro technique</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row w-full h-full items-center ">
          <PomodoroList />
        </CardContent>
      </Card>
    </main>
  );
};

export default page;
