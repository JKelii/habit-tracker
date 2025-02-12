import { CardContent } from "@/components/ui/card";

import React from "react";
import { ProgressBar } from "./ProgressBar";

export const PomodoroTimer = () => {
  return (
    <CardContent className="w-1/2 flex flex-col justify-center items-start h-full sticky top-4">
      <CardContent className="flex flex-col w-full justify-center items-center min-h-96">
        <ProgressBar />
      </CardContent>
    </CardContent>
  );
};
