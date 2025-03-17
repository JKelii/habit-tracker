import { Todos } from "@/app/types/TodosTypes";
import { GridCard } from "./GridStats/GridCard";
import { CheckCircle2, Clock } from "lucide-react";

export const TodoGridStats = ({ todos }: { todos: Todos }) => {
  const completedTodosLength = todos.filter((item) => item.completed).length;
  const todosLength = todos.length;

  const completionPercentage =
    todosLength > 0
      ? Number(((completedTodosLength / todosLength) * 100).toFixed(0))
      : 0;

  const today = new Date().toLocaleDateString();

  const dueToday = todos.filter((item) => {
    const itemDate = new Date(item.toBeDone).toLocaleDateString();
    return itemDate === today;
  });

  const categoriesLength = todos
    .map((item) => item.category)
    .filter((value, index, self) => self.indexOf(value) === index).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      <GridCard
        icon={
          <CheckCircle2 className="size-8 text-blue-600 dark:text-blue-300" />
        }
        statName="Completion Rate"
        stat={completionPercentage}
        operator="%"
        completedStat={completedTodosLength}
        completedStatLength={todos.length}
      />
      <GridCard
        icon={<Clock className="size-8 text-purple-600 dark:text-purple-300" />}
        statName="Due Today"
        stat={dueToday.length}
        statDescription="Tasks to complete today"
      />
      <GridCard
        icon={<Clock className="size-8 text-orange-600 dark:text-orange-300" />}
        statName="Categories"
        stat={categoriesLength}
        statDescription="Different task types"
      />
    </div>
  );
};
