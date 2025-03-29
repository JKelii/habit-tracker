import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const LoadingMatrixList = () => {
  return (
    <div className="p-4 grid grid-cols-2 grid-rows-2 w-full h-[95%] gap-4 overflow-hidden">
      {[...Array(4)].map((_, index) => (
        <Skeleton key={index} className="w-full h-full rounded-lg" />
      ))}
    </div>
  );
};
