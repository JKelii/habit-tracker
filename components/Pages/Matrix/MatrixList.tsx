"use client";

import { Drama, Lightbulb, TrainFront, TriangleAlert } from "lucide-react";
import { MatrixCard } from "./MatrixCard";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { updateDraggedMatrix } from "@/actions/todos";
import {
  Column as ColumnType,
  TodosType,
} from "../../../app/types/MatrixTypes";
import { useRouter } from "next/navigation";
import { startTransition, useOptimistic } from "react";

const COLUMNS: ColumnType[] = [
  {
    matrix: "1",
    title: "Urgent and Important",
    icon: <TriangleAlert className="size-4 text-red-500" />,
  },
  {
    matrix: "2",
    title: "Important, not Urgent",
    icon: <Lightbulb className="size-4 text-purple-500" />,
  },
  {
    matrix: "3",
    title: "Urgent, Not Important",
    icon: <TrainFront className="size-4 text-blue-500" />,
  },
  {
    matrix: "4",
    title: "Not Urgent, Not Important",
    icon: <Drama className="size-4 text-green-500" />,
  },
];

export const MatrixList = ({ todos }: TodosType) => {
  const router = useRouter();
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = Number(active.id);
    const newMatrix = over.id as string;

    startTransition(() => {
      setOptimisticTodos((prev) =>
        prev.map((todo) =>
          todo.id === taskId ? { ...todo, matrix: newMatrix } : todo
        )
      );
    });

    try {
      await updateDraggedMatrix(newMatrix, taskId);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {COLUMNS.map((column) => (
        <MatrixCard
          key={column.title}
          todos={optimisticTodos.filter(
            (todo) => todo.matrix === column.matrix
          )}
          column={column}
        />
      ))}
    </DndContext>
  );
};
