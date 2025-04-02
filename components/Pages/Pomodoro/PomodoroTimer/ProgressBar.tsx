"use client";

import { Progress } from "@/components/ui/progress";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPomodoro } from "@/actions/pomodoro";
import { useRouter } from "next/navigation";
import { Popup } from "./Popup";
import { TimeDisplay } from "./TimeDisplay";
import { TimerButtons } from "./TimerButtons";

export const ProgressBar = ({
  finishedToday,
}: {
  finishedToday: string[] | undefined;
}) => {
  const totalTime = 1500;

  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(totalTime);
  const [showPopup, setShowPopup] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const elapsedTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const router = useRouter();

  const updateTimer = useCallback(() => {
    if (!startTimeRef.current) return;

    const elapsed =
      Math.floor((Date.now() - startTimeRef.current) / 1000) +
      elapsedTimeRef.current;
    const remainingTime = Math.max(totalTime - elapsed, 0);
    setTimer(remainingTime);
    localStorage.setItem("pomodoroTimer", remainingTime.toString());

    if (remainingTime > 0) {
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    } else {
      handlePomodoroCreation(new Date(Date.now() - elapsed * 1000), new Date());
    }
  }, []);

  useEffect(() => {
    const savedStartTime = localStorage.getItem("pomodoroStartTime");
    const savedElapsedTime = localStorage.getItem("pomodoroElapsedTime");
    const savedTimer = localStorage.getItem("pomodoroTimer");
    const savedIsRunning = localStorage.getItem("pomodoroIsRunning");

    if (savedTimer) {
      setTimer(parseInt(savedTimer, 10));
      elapsedTimeRef.current = totalTime - parseInt(savedTimer, 10);
    }

    if (savedIsRunning === "true" && savedStartTime) {
      const startTime = parseInt(savedStartTime, 10);
      const elapsed = savedElapsedTime ? parseInt(savedElapsedTime, 10) : 0;
      const newElapsed = Math.floor((Date.now() - startTime) / 1000) + elapsed;
      const remainingTime = Math.max(totalTime - newElapsed, 0);

      if (remainingTime > 0) {
        elapsedTimeRef.current = newElapsed;
        startTimeRef.current = startTime;
        setTimer(remainingTime);
        setIsRunning(true);
        animationFrameRef.current = requestAnimationFrame(updateTimer);
      } else {
        localStorage.removeItem("pomodoroStartTime");
        localStorage.removeItem("pomodoroElapsedTime");
        localStorage.removeItem("pomodoroIsRunning");
      }
    }
  }, [updateTimer]);

  const handleTimer = () => {
    if (isRunning) {
      cancelAnimationFrame(animationFrameRef.current!);
      elapsedTimeRef.current = totalTime - timer;
      startTimeRef.current = null;
      localStorage.removeItem("pomodoroStartTime");
      localStorage.setItem(
        "pomodoroElapsedTime",
        elapsedTimeRef.current.toString()
      );
      localStorage.setItem("pomodoroIsRunning", "false");
    } else {
      startTimeRef.current = Date.now();
      localStorage.setItem(
        "pomodoroStartTime",
        startTimeRef.current.toString()
      );
      localStorage.setItem(
        "pomodoroElapsedTime",
        elapsedTimeRef.current.toString()
      );
      localStorage.setItem("pomodoroIsRunning", "true");

      animationFrameRef.current = requestAnimationFrame(updateTimer);
    }
    setIsRunning((prev) => !prev);
  };

  const handlePomodoroCreation = async (started: Date, finished: Date) => {
    try {
      await createPomodoro(started, finished);
      router.refresh();
      setShowPopup(true);
      setTimer(totalTime);
      localStorage.removeItem("pomodoroStartTime");
      localStorage.removeItem("pomodoroElapsedTime");
      localStorage.removeItem("pomodoroTimer");
      localStorage.removeItem("pomodoroIsRunning");
    } catch (error) {
      console.error("Error creating pomodoro:", error);
    }
  };

  const stopTimer = () => {
    cancelAnimationFrame(animationFrameRef.current!);
    startTimeRef.current = null;
    elapsedTimeRef.current = 0;
    setIsRunning(false);
    setTimer(totalTime);
    localStorage.removeItem("pomodoroStartTime");
    localStorage.removeItem("pomodoroElapsedTime");
    localStorage.removeItem("pomodoroTimer");
    localStorage.removeItem("pomodoroIsRunning");
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const progress = ((totalTime - timer) / totalTime) * 100;

  return (
    <>
      <TimeDisplay
        minutes={minutes}
        seconds={seconds}
        isRunning={isRunning}
        timer={timer}
      />
      <Progress className="w-96 mt-4" value={progress} />
      <TimerButtons
        isRunning={isRunning}
        stopTimer={stopTimer}
        handleTimer={handleTimer}
        timer={timer}
      />
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          showPopup={showPopup}
          finishedToday={finishedToday}
        />
      )}
    </>
  );
};
