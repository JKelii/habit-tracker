"use client";

import { DeleteTodo } from "../ModifyTodo/DeleteTodo";
import { ModifyTodo } from "../ModifyTodo/ModifyTodo";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TodoDates } from "./TodoDates";
import { Todo } from "@prisma/client";
import { TodoPagination } from "./TablePagination";
import { AddToDo } from "../ModifyTodo/AddToDo/AddToDo";
import { Dispatch, SetStateAction } from "react";
import { TodoTitles } from "./TodoTitles";

type TodoListProps = {
  todos: Todo[];
  totalPages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export const TodosList = ({
  todos,
  totalPages,
  page,
  setPage,
}: TodoListProps) => {
  return (
    <>
      <Card className="w-full mt-2">
        <CardContent className="flex flex-col w-full gap-2">
          <AddToDo />

          {todos.length >= 1 &&
            [...todos]
              .sort((a, b) => Number(a.completed) - Number(b.completed))
              .map((todo) => (
                <section
                  key={todo.id}
                  className={cn(
                    "flex justify-between items-center w-full gap-4 flex-1 hover:bg-gray-100/5 rounded-lg py-1 border px-1",
                    todo.completed && "bg-gray-100/15",
                    todo.matrix === "1" && "border-l-4 border-l-purple-500",
                    todo.matrix === "2" && "border-l-4 border-l-red-500",
                    todo.matrix === "3" && "border-l-4 border-l-yellow-500",
                    todo.matrix === "4" && "border-l-4 border-l-green-500"
                  )}
                >
                  <TodoTitles
                    completed={todo.completed}
                    matrix={todo.matrix}
                    id={todo.id}
                    title={todo.title}
                    category={todo.category}
                  />
                  <TodoDates
                    createdAt={todo.createdAt}
                    deadline={todo.toBeDone}
                  />
                  <div className="flex items-center gap-1">
                    <ModifyTodo
                      title={todo.title}
                      id={todo.id}
                      matrix={todo.matrix}
                    />
                    <DeleteTodo todoId={todo.id} />
                  </div>
                </section>
              ))}
          {totalPages > 1 && (
            <TodoPagination
              totalPages={totalPages}
              page={page}
              setPage={setPage}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};
