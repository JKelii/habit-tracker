"use client";
import { setCompleteStatus } from "@/actions/todos";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { DeleteTodo } from "./DeleteTodo";
import { useRouter } from "next/navigation";
import { ModifyTodo } from "./ModifyTodo";

type Todo = {
  id: number;
  title: string;
  createdAt: Date;
  userId: string;
  completed: boolean;
  toBeDone: Date;
}[];

export const TodosList = ({ todos }: { todos: Todo }) => {
  const router = useRouter();

  const setStatus = async (id: number, complete: boolean) => {
    if (id) {
      await setCompleteStatus(id, complete);
    }
    router.refresh();
  };

  return (
    <Table className="w-full p-4 mt-4">
      <TableHeader className="w-full p-4 mt-4">
        <TableRow className="w-full">
          <TableHead className="w-1/4">Completed</TableHead>
          <TableHead className="w-1/4">Name</TableHead>
          <TableHead className="w-1/4">Created</TableHead>
          <TableHead className="w-1/4">Deadline</TableHead>
          <TableHead className="w-1/4">Modify</TableHead>
          <TableHead className="w-1/2">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {todos.length >= 1 &&
          [...todos]
            .sort((a, b) => Number(a.completed) - Number(b.completed))
            .map((todo) => (
              <TableRow
                key={todo.id}
                className={cn(
                  todo.completed &&
                    "bg-gray-100 dark:bg-gray-50/10 line-through "
                )}
              >
                <TableCell className="w-1/4">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => setStatus(todo.id, todo.completed)}
                  />
                </TableCell>
                <TableCell className="w-1/4 font-semibold">
                  {todo.title}
                </TableCell>
                <TableCell className="w-1/4 font-semibold">
                  {todo.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell className="w-1/4">
                  <p className="font-semibold">
                    {new Date(todo.toBeDone).toLocaleDateString()}{" "}
                  </p>
                </TableCell>
                <TableCell className="w-1/2 ">
                  <ModifyTodo title={todo.title} id={todo.id} />
                </TableCell>
                <TableCell className="w-1/2 ">
                  <DeleteTodo todoId={todo.id} />
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
};
