"use client";

import { Drama, Lightbulb, TrainFront, TriangleAlert } from "lucide-react";
import { MatrixCard } from "./MatrixCard";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Column as ColumnType } from "../../../app/types/MatrixTypes";
import { Todo } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useUpdateDraggedMatrix } from "./useUpdateDraggedMatrix";
import { LoadingMatrixList } from "./LoadingMatrixList";

const COLUMNS: ColumnType[] = [
  {
    matrix: "1",
    title: "Urgent and Important",
    icon: <TriangleAlert className="size-4 text-purple-500" />,
  },
  {
    matrix: "2",
    title: "Important, not Urgent",
    icon: <Lightbulb className="size-4 text-red-500" />,
  },
  {
    matrix: "3",
    title: "Urgent, Not Important",
    icon: <TrainFront className="size-4 text-orange-500" />,
  },
  {
    matrix: "4",
    title: "Not Urgent, Not Important",
    icon: <Drama className="size-4 text-green-500" />,
  },
];

const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`/api/routes/matrix`);
  if (!res.ok) throw new Error("Error fetching data");
  return res.json();
};

export const MatrixList = () => {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["matrix"],
    queryFn: fetchTodos,
  });

  const { mutateAsync } = useUpdateDraggedMatrix();

  if (isLoading) return <LoadingMatrixList />;
  if (error instanceof Error)
    return <p className="text-destructive text-sm">Error: {error.message}</p>;

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newMatrix = over.id as string;

    try {
      await mutateAsync({ newMatrix, taskId });
    } catch (error) {
      console.log(error);
    }
  };

  if (!todos) return [];

  const filteredTodos = COLUMNS.map((column) => ({
    column,
    todos: todos.filter((todo) => todo.matrix === column.matrix),
  }));

  return (
    <main className="p-4 grid grid-cols-2 grid-rows-2 w-full h-[95%] gap-4 overflow-hidden">
      <DndContext onDragEnd={handleDragEnd}>
        {filteredTodos.map(({ column, todos }) => (
          <MatrixCard key={column.title} todos={todos} column={column} />
        ))}
      </DndContext>
    </main>
  );
};
