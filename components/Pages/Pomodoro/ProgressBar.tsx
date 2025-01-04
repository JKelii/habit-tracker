"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import React, { useEffect, useState } from "react";

//TODO: Add query and saving time
//TODO: ADD PROGRESS VALUE
export const ProgressBar = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(25 * 60);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const handleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  useEffect(() => {
    if (!isRunning) return;
    const timerId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(timerId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [isRunning]);

  return (
    <>
      <p className="text-sm text-muted-foreground">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </p>
      <motion.p
        key={String(isRunning)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={
          "text-sm text-muted-foreground h-1 transition-opacity duration-300"
        }
      >
        {!isRunning && timer < 1500 && "Stopped"}
      </motion.p>
      <Progress className="w-96 mt-4" />
      <div className="flex flex-col items-center">
        <Button
          variant={"default"}
          onClick={handleTimer}
          className="mt-5 w-28  transition-all duration-300"
        >
          <motion.span
            key={isRunning ? "hey" : "Bye"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              isRunning ? "from:opacity-0 to" : "opacity-100",
              "transition-all"
            )}
          >
            {isRunning ? "Stop Timer" : "Start timer"}
          </motion.span>
        </Button>
      </div>
    </>
  );
};
