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
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const deadlineDate = new Date(deadline);
  const pastDate = yesterday > deadlineDate;

  return (
    <>
      <p className="font-semibold w-36 text-xs">
        Created at: {formatDate(createdAt)}
      </p>
      <p
        className={cn("font-semibold w-36 text-xs", pastDate && "text-red-500")}
      >
        Deadline: {formatDate(deadline)}
      </p>
    </>
  );
};
