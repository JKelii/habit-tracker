"use client";
import { Card } from "@/components/ui/card";
import { DraggableTask } from "./DraggableTask";
import { Column, TodoType } from "@/app/types/MatrixTypes";
import { useDroppable } from "@dnd-kit/core";

//ADD SCROLL AREA?

export const MatrixCard = ({
  column,
  todos,
}: {
  column: Column;
  todos: TodoType[];
}) => {
  const { setNodeRef } = useDroppable({ id: column.matrix });

  return (
    <Card className="w-full h-full  px-4 flex items-center flex-col py-1 ">
      <div className="self-start  text-sm flex justify-center items-center gap-1">
        {column.icon}
        <p>{column.title}</p>
      </div>
      <div
        ref={setNodeRef}
        className="flex justify-start w-full h-full  flex-col items-center gap-2 mt-2 "
      >
        {todos?.map((item) => (
          <DraggableTask key={item.id} id={item.id} title={item.title} />
        ))}
      </div>
    </Card>
  );
};
