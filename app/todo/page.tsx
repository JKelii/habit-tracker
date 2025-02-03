import { getTodos } from "@/actions/todos";
import { AddToDo } from "@/components/Pages/Todo/AddToDo";
import { TodosList } from "@/components/Pages/Todo/TodosList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";

import { ListTodo } from "lucide-react";
import React from "react";

const page = async () => {
  const user = await currentUser();
  const todos = await getTodos();

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <Card className="w-full flex flex-col justify-center items-center">
        <CardHeader>
          <CardTitle className="flex justify-center items-center gap-2 text-xl">
            ToDos <ListTodo />
          </CardTitle>
          <CardDescription>Add things to your list</CardDescription>
        </CardHeader>
        <CardContent className="self-start flex flex-col w-full justify-center items-center">
          {user ? (
            <>
              <AddToDo />
              {todos ? (
                <TodosList todos={todos} />
              ) : (
                <p className="font-bold text-2xl">You have nothing to do?</p>
              )}
            </>
          ) : (
            <p>You have to be logged in</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
