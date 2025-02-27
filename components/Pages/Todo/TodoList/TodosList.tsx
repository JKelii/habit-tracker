"use client";
import { setCompleteStatus } from "@/actions/todos";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { DeleteTodo } from "../DeleteTodo";
import { useRouter } from "next/navigation";
import { ModifyTodo } from "../ModifyTodo";
import { TableHeads } from "./TableHeads";
import { TablePagination } from "./TablePagination";
import { useState } from "react";

type Todo = {
  id: number;
  title: string;
  createdAt: Date;
  userId: string;
  completed: boolean;
  toBeDone: Date;
  matrix: string;
}[];

export const TodosList = ({ todos }: { todos: Todo }) => {
  const rowPerPage = 10;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowPerPage);
  const router = useRouter();

  const setStatus = async (id: number, complete: boolean) => {
    try {
      if (id) {
        await setCompleteStatus(id, complete);
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table className="w-full p-4 mt-4">
      <TableHeader className="w-full p-4 mt-4">
        <TableHeads />
      </TableHeader>
      <TableBody className="w-full">
        {todos.length >= 1 &&
          [...todos]
            .slice(startIndex, endIndex)
            .sort((a, b) => Number(a.completed) - Number(b.completed))
            .map((todo) => (
              <TableRow
                key={todo.id}
                className={cn(
                  todo.completed &&
                    "bg-gray-100 dark:bg-gray-50/10 line-through "
                )}
              >
                <TableCell className="">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => setStatus(todo.id, todo.completed)}
                  />
                </TableCell>
                <TableCell className=" font-semibold">{todo.title}</TableCell>
                <TableCell className=" font-semibold">
                  {todo.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <p className="font-semibold">
                    {new Date(todo.toBeDone).toLocaleDateString()}{" "}
                  </p>
                </TableCell>
                <TableCell className=" font-bold pl-5">{todo.matrix}</TableCell>

                <TableCell>
                  <ModifyTodo title={todo.title} id={todo.id} />
                </TableCell>
                <TableCell>
                  <DeleteTodo todoId={todo.id} />
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
      {todos.length > 10 && (
        <TablePagination
          startIndex={startIndex}
          endIndex={endIndex}
          setStartIndex={setStartIndex}
          setEndIndex={setEndIndex}
          rowPerPage={rowPerPage}
          totalItems={todos.length}
        />
      )}
    </Table>
  );
};
