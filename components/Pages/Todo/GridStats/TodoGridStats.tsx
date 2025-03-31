import { BookType, CheckCircle2, Clock } from "lucide-react";
import { GridCard } from "./GridCard";

type TodoGridStatsProps = {
  completeTillToday: number | undefined;
  uniqueCategoriesCount: number | undefined;
  completedTodos: number | undefined;
  totalCount: number | undefined;
};

export const TodoGridStats = ({
  completeTillToday,
  uniqueCategoriesCount,
  completedTodos = 0,
  totalCount = 0,
}: TodoGridStatsProps) => {
  const completedOutOfAll =
    totalCount > 0
      ? Number(((completedTodos / totalCount) * 100).toFixed(0))
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      <GridCard
        icon={
          <CheckCircle2 className="size-8 text-blue-600 dark:text-blue-300" />
        }
        statName="Completion Rate"
        stat={completedOutOfAll}
        operator="%"
        completedStat={completedTodos}
        completedStatLength={totalCount}
      />
      <GridCard
        icon={<Clock className="size-8 text-purple-600 dark:text-purple-300" />}
        statName="Due Today"
        stat={completeTillToday ?? 0}
        statDescription="Tasks to complete today"
      />
      <GridCard
        icon={
          <BookType className="size-8 text-orange-600 dark:text-orange-300" />
        }
        statName="Categories"
        stat={uniqueCategoriesCount ?? 0}
        statDescription="Different task types"
      />
    </div>
  );
};
