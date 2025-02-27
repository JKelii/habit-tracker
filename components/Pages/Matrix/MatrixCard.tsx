import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import React, { ReactNode } from "react";

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

export const MatrixCard = ({
  title,
  icon,
  data,
}: {
  title: string;
  icon: ReactNode;
  data: GetByMatrixType;
}) => {
  return (
    <Card className="w-full px-4 flex items-center flex-col py-1">
      <div className="self-start text-sm flex justify-center items-center gap-1">
        {icon}
        <p>{title}</p>
      </div>
      <div className="flex justify-start w-full flex-col items-start mt-2">
        {data?.map((item) => (
          <div
            key={item.id}
            draggable="true"
            className="w-full flex justify-start items-center gap-4 hover:bg-neutral-700/55 rounded-md px-2 py-1"
          >
            <Checkbox />
            <p className="text-sm font-semibold">{item.title}</p>
          </div>
        ))}
      </div>{" "}
    </Card>
  );
};
