import { getTodos } from "@/actions/todos";
import { MatrixList } from "@/components/Pages/Matrix/MatrixList";
import React from "react";

const page = async () => {
  const todos = await getTodos();

  return (
    <main className="p-4 grid grid-cols-2 grid-rows-2 w-full h-[95%] gap-4 overflow-hidden">
      <MatrixList todos={todos} />
    </main>
  );
};

export default page;
