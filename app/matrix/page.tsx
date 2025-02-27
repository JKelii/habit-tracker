import { getTodosByMatrix } from "@/actions/todos";
import { MatrixList } from "@/components/Pages/Matrix/MatrixList";
import React from "react";

const page = async () => {
  const urgentImportantTodos = await getTodosByMatrix("1");
  const importantNotUrgentTodos = await getTodosByMatrix("2");
  const urgentNotImportantTodos = await getTodosByMatrix("3");
  const notUrgentNotImportantTodos = await getTodosByMatrix("4");

  return (
    <main className="p-4 grid grid-cols-2 grid-rows-2 w-full h-[95%] gap-4">
      <MatrixList
        urgentImportant={urgentImportantTodos}
        importantNotUrgent={importantNotUrgentTodos}
        urgentNotImportant={urgentNotImportantTodos}
        notUrgentNotImportant={notUrgentNotImportantTodos}
      />
    </main>
  );
};

export default page;
