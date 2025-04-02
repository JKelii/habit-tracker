import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo } from "lucide-react";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Habit Tracker Todo",
};

const TodosPage = dynamic(() =>
  import("@/components/Pages/Todo/TodoList/TodosPage").then(
    (mod) => mod.TodosPage
  )
);

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center px-2 min-w-[760px]">
      <Card className="w-full flex flex-col justify-center items-center ">
        <CardHeader>
          <CardTitle className="flex justify-center items-center gap-2 text-xl">
            ToDos <ListTodo />
          </CardTitle>
        </CardHeader>
        <CardContent className="self-start flex flex-col w-full justify-center items-center">
          <TodosPage />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
