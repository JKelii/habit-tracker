import { TodosPage } from "@/components/Pages/Todo/TodoList/TodosPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo } from "lucide-react";

const page = async () => {
  return (
    <div className="flex flex-col justify-center items-center px-2">
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
