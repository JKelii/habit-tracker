import { Drama, Lightbulb, TrainFront, TriangleAlert } from "lucide-react";
import { MatrixCard } from "./MatrixCard";

type GetByMatrixType =
  | {
      id: number;
      title: string;
      createdAt: Date;
      toBeDone: Date;
      userId: string;
      matrix: string;
      completed: boolean;
    }[]
  | undefined;

type MatrixListProps = {
  urgentImportant: GetByMatrixType;
  importantNotUrgent: GetByMatrixType;
  urgentNotImportant: GetByMatrixType;
  notUrgentNotImportant: GetByMatrixType;
};

export const MatrixList = ({
  urgentImportant,
  importantNotUrgent,
  urgentNotImportant,
  notUrgentNotImportant,
}: MatrixListProps) => {
  return (
    <>
      <MatrixCard
        title="Urgent and Important"
        icon={<TriangleAlert className="size-4 text-red-500" />}
        data={urgentImportant}
      />
      <MatrixCard
        title="Important, not Urgent"
        icon={<Lightbulb className="size-4 text-purple-500" />}
        data={importantNotUrgent}
      />
      <MatrixCard
        title="Urgent, Not Important"
        icon={<TrainFront className="size-4 text-blue-500" />}
        data={urgentNotImportant}
      />
      <MatrixCard
        title="Not Urgent, Not Important"
        icon={<Drama className="size-4 text-green-500" />}
        data={notUrgentNotImportant}
      />
    </>
  );
};
