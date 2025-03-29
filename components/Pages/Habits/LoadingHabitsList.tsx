import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const LoadingHabitsList = () => {
  return (
    <section className="w-full h-[95%] flex justify-center items-center flex-col">
      <div className="flex items-center gap-5 mb-16">
        <StatsLoadingSkeleton />
      </div>

      <HabitLoadingSkeleton />
    </section>
  );
};

export default LoadingHabitsList;

const HabitLoadingSkeleton = () => {
  return (
    <div className="w-full h-full animate-pulse space-y-3 rounded-2xl bg-card p-5 shadow-sm flex flex-col gap-2">
      <Skeleton className="w-full h-48" />
      <Skeleton className="w-full h-48" />
      <Skeleton className="w-full h-48" />
    </div>
  );
};

const StatsLoadingSkeleton = () => {
  return (
    <div className="w-full animate-pulse space-y-3 rounded-2xl bg-card  shadow-sm mt-6">
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-20 w-52 rounded-lg" />
      </div>
    </div>
  );
};
