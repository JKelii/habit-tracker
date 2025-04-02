import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const LoadingPomodoroList = () => {
  return (
    <div className="w-full flex justify-center items-center ">
      <div className="w-1/2  text-center">
        <LoadingTimer />
      </div>
      <div className="w-1/2 text-center ">
        <div className="w-full animate-pulse space-y-3 rounded-2xl bg-card  shadow-sm">
          <div className="flex justify-center items-center flex-wrap gap-3 flex-col mb-8">
            <Skeleton className="w-64 h-96" />
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingTimer = () => {
  return (
    <div className="w-full animate-pulse space-y-3 rounded-2xl bg-card  shadow-sm">
      <div className="flex justify-center items-center flex-wrap gap-3 flex-col mb-8">
        <Skeleton className="h-12 w-52 rounded-lg" />
        <Skeleton className="h-4 w-96 rounded-lg" />
        <Skeleton className="h-16 w-24 rounded-lg" />
        <Skeleton className="h-16 w-24 rounded-lg" />
      </div>
    </div>
  );
};
