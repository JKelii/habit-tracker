import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Timer } from "lucide-react";
import React from "react";
import { ProgressBar } from "./ProgressBar";

export const PomodoroTimer = () => {
  return (
    <CardContent className="w-1/2 flex flex-col justify-center items-center">
      <CardHeader>
        <CardTitle className="flex justify-center items-center gap-2 text-xl">
          Pomodoro <Timer />
        </CardTitle>
        <CardDescription>Track time with pomodoro technique</CardDescription>
      </CardHeader>
      <CardContent className="self-start flex flex-col w-full justify-center items-center min-h-96">
        <ProgressBar />
      </CardContent>
    </CardContent>
  );
};
