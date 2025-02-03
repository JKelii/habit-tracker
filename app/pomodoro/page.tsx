import { getPomodoros } from "@/actions/pomodoro";
import { PomodoroStats } from "@/components/Pages/Pomodoro/PomodoroStats";
import { PomodoroTimer } from "@/components/Pages/Pomodoro/PomodoroTimer";
import { Card } from "@/components/ui/card";

import React from "react";

const page = async () => {
  const pomodoros = await getPomodoros();

  return (
    <main className="flex h-[95%] justify-center items-center p-4">
      <Card className="w-full h-full flex justify-center items-cent">
        <PomodoroTimer />
        <PomodoroStats pomodoros={pomodoros} />
      </Card>
    </main>
  );
};

export default page;
