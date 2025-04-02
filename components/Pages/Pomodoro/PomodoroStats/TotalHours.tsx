"use client";
import { PomodoroTotal } from "@/app/types/Pomodoro";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export const TotalHours = () => {
  const { data } = useQuery({
    queryKey: ["totalHours"],
    queryFn: async () => {
      const response = await axios.get<PomodoroTotal>(
        "/api/routes/pomodoros/stats"
      );
      return response.data;
    },
  });

  const pomodoros = data?.totalHours ?? 0;
  const totalMinutes = pomodoros * 25;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return (
    <div className="flex items-center gap-1 ">
      <p className="text-sm text-muted-foreground">Total pomodoro time:</p>
      <p className="text-sm text-black dark:text-white font-semibold">
        {hours}h {minutes}m
      </p>
    </div>
  );
};
