"use client";
import { setCompleteStatus } from "@/actions/todos";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteTodo } from "../DeleteTodo";
import { useRouter } from "next/navigation";
import { ModifyTodo } from "../ModifyTodo";
import { TodoPagination } from "./TablePagination";
import { useState } from "react";
import { Todos } from "@/app/types/TodosTypes";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CategoryBadges } from "./CategoryBadges";
import { TodoDates } from "./TodoDates";

export const TodosList = ({ todos }: { todos: Todos }) => {
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
    <>
      <Card className="w-full py-2 mt-4">
        <CardContent className="flex flex-col w-full gap-2">
          {todos.length >= 1 &&
            [...todos]
              .slice(startIndex, endIndex)
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
                          "self-start text-sm",
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
        </CardContent>
      </Card>
      {todos.length > rowPerPage && (
        <TodoPagination
          startIndex={startIndex}
          endIndex={endIndex}
          setStartIndex={setStartIndex}
          setEndIndex={setEndIndex}
          rowPerPage={rowPerPage}
          totalItems={todos.length}
        />
      )}
    </>
  );
};
