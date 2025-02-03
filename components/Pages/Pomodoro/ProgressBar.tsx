"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

import React, { useEffect, useState } from "react";
import { Popup } from "./Popup";

//TODO: Add query and saving time
//TODO: ADD PROGRESS VALUE

const totalTime = 25 * 60;

export const ProgressBar = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [timer, setTimer] = useState(totalTime);

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
          setShowPopup(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [isRunning]);

  const stopTimer = () => {
    setIsRunning(false);
    setTimer(25 * 60);
  };

  const progress = ((totalTime - timer) / totalTime) * 100;

  return (
    <>
      <p className="text-md text-muted-foreground">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </p>
      <div className="h-5">
        <AnimatePresence>
          {!isRunning && timer < 1500 && (
            <motion.p
              key={String(isRunning)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-muted-foreground transition-opacity duration-300"
            >
              Stopped
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <Progress className="w-96 mt-4" value={progress} />
      <div className="flex flex-col items-center h-40">
        <AnimatePresence>
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

          {!isRunning && timer < 1500 && (
            <motion.div
              key={String(isRunning)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className=""
            >
              <Button
                className="mt-3 w-28"
                variant={"outline"}
                onClick={stopTimer}
              >
                End
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showPopup && <Popup setShowPopup={setShowPopup} showPopup={showPopup} />}
    </>
  );
};
