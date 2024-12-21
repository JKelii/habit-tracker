"use client";
import { deleteTodo } from "@/actions/todos";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useTransition } from "react";

type Todo = {
  id: number;
  title: string;
  createdAt: Date;
  userId: string;
  completed: boolean;
}[];

export const TodosList = ({ todos }: { todos: Todo }) => {
  //TODO: Upgrade visuals, table
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const deleteTodoById = (id: number) => {
    if (id) {
      startTransition(async () => {
        await deleteTodo(id);
      });
    }
    router.refresh();
  };

  return (
    <Table className="w-full p-4 mt-4">
      <TableHeader className="w-full p-4 mt-4">
        <TableRow className="w-full">
          <TableHead className="w-1/4">ID</TableHead>
          <TableHead className="w-1/4">Name</TableHead>
          <TableHead className="w-1/4">Completed</TableHead>
          <TableHead className="w-1/4"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell className="w-1/4">{todo.id}</TableCell>
            <TableCell className="w-1/2">{todo.title}</TableCell>
            <TableCell className="w-1/4">
              {todo.completed ? "Yes" : "No"}
            </TableCell>

            <TableCell className="w-1/2 ">
              <Button
                variant={"outline"}
                onClick={() => deleteTodoById(todo.id)}
                disabled={isPending}
              >
                <Trash2 className="text-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
