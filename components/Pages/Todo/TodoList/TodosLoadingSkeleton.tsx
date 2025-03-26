import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TodosLoadingSkeleton = () => {
  return (
    <section className="w-full h-full flex justify-center items-center flex-col">
      <div className="flex items-center gap-5">
        <StatsLoadingSkeleton />
        <StatsLoadingSkeleton />
        <StatsLoadingSkeleton />
      </div>
      <TodoLoadingSkeleton />
    </section>
  );
};

export default TodosLoadingSkeleton;

const TodoLoadingSkeleton = () => {
  return (
    <div className="w-full h-full animate-pulse space-y-3 rounded-2xl bg-card p-5 shadow-sm flex flex-col gap-2">
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-16" />
    </div>
  );
};

const StatsLoadingSkeleton = () => {
  return (
    <div className="w-full animate-pulse space-y-3 rounded-2xl bg-card  shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-20 w-52 rounded-lg" />
      </div>
    </div>
  );
};
