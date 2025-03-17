import { Badge } from "@/components/ui/badge";
import { MATRIX_LABELS } from "@/constants/categories";
import { cn } from "@/lib/utils";
import React from "react";

export const CategoryBadges = ({
  category,
  matrix,
}: {
  category: string;
  matrix: string;
}) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <Badge
        className={cn(
          "text-white",
          category === "Personal" && "bg-blue-700",
          category === "Work" && "bg-amber-950",
          category === "Shopping" && "bg-pink-800",
          category === "Health" && "bg-emerald-800",
          category === "Finance" && "bg-amber-500",
          category === "Education" && "bg-fuchsia-800",
          category === "Other" && "bg-rose-800"
        )}
      >
        {category}
      </Badge>
      <Badge
        className={cn(
          "text-white",
          matrix === "1" && "bg-purple-500",
          matrix === "2" && "bg-red-500",
          matrix === "3" && "bg-orange-500",
          matrix === "4" && "bg-green-500"
        )}
      >
        {MATRIX_LABELS[matrix]}
      </Badge>
    </div>
  );
};
