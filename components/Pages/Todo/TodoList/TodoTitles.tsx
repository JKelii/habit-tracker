import { Checkbox } from "@/components/ui/checkbox";
import React, { useCallback } from "react";
import { useSetComplete } from "../hooks/useSetComplete";
import { cn } from "@/lib/utils";
import { CategoryBadges } from "./CategoryBadges";

type TodoTitlesProps = {
  completed: boolean;
  matrix: string;
  id: string;
  title: string;
  category: string;
};

export const TodoTitles = ({
  completed,
  matrix,
  id,
  title,
  category,
}: TodoTitlesProps) => {
  const { mutate } = useSetComplete();

  const setStatus = useCallback(
    async (id: string, complete: boolean) => {
      mutate({ id, complete });
    },
    [mutate]
  );

  return (
    <div className="flex items-center gap-8">
      <Checkbox
        checked={completed}
        onCheckedChange={() => setStatus(id, completed)}
        className="ml-2"
      />
      <article className="flex flex-col justify-center w-44 items-center">
        <p
          className={cn(
            "self-start text-sm font-semibold",
            completed && "line-through"
          )}
        >
          {title}
        </p>
        <CategoryBadges category={category} matrix={matrix} />
      </article>
    </div>
  );
};
