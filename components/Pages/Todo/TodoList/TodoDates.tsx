import { cn } from "@/lib/utils";
import React from "react";

export const TodoDates = ({
  createdAt,
  deadline,
}: {
  createdAt: Date;
  deadline: Date;
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);

  const pastDate = today > deadlineDate;
  const tillToday = today.getTime() === deadlineDate.getTime();
  return (
    <>
      <p className="font-semibold w-36 text-xs">
        Created at: {formatDate(createdAt)}
      </p>
      <p
        className={cn(
          "font-semibold w-36 text-xs",
          pastDate && "text-red-500",
          tillToday && "text-amber-500"
        )}
      >
        Deadline: {formatDate(deadline)}
      </p>
    </>
  );
};
