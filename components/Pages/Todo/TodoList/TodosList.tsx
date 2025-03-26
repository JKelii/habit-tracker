"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DeleteTodo } from "../ModifyTodo/DeleteTodo";

import { ModifyTodo } from "../ModifyTodo/ModifyTodo";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CategoryBadges } from "./CategoryBadges";
import { TodoDates } from "./TodoDates";
import { Todo } from "@prisma/client";
import { TodoPagination } from "./TablePagination";
import { AddToDo } from "../ModifyTodo/AddToDo/AddToDo";
import { useSetComplete } from "../hooks/useSetComplete";
import { useCallback } from "react";

type TodoListProps = {
  todos: Todo[];
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  page: number;
};

export const TodosList = ({
  todos,
  handleNextPage,
  handlePreviousPage,
  page,
}: TodoListProps) => {
  const { mutateAsync } = useSetComplete();

  const setStatus = useCallback(
    async (id: string, complete: boolean) => {
      await mutateAsync({ id, complete });
    },
    [mutateAsync]
  );

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
                    todo.completed && "bg-gray-100/15"
                  )}
                >
                  <div className="flex items-center gap-8">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => setStatus(todo.id, todo.completed)}
                      className="ml-2"
                    />
                    <article className="flex flex-col justify-center w-44 items-center">
                      <p
                        className={cn(
                          "self-start text-sm font-semibold",
                          todo.completed && "line-through"
                        )}
                      >
                        {todo.title}
                      </p>
                      <CategoryBadges
                        category={todo.category}
                        matrix={todo.matrix}
                      />
                    </article>
                  </div>
                  <TodoDates
                    createdAt={todo.createdAt}
                    deadline={todo.toBeDone}
                  />
                  <div className="flex items-center gap-1">
                    <ModifyTodo title={todo.title} id={todo.id} />
                    <DeleteTodo todoId={todo.id} />
                  </div>
                </section>
              ))}
          {todos.length > 10 && (
            <TodoPagination
              totalItems={todos.length}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              page={page}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};
