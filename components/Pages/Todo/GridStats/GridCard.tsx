import { Card, CardContent } from "@/components/ui/card";
import React, { ReactNode } from "react";

type GridCardType = {
  icon: ReactNode;
  statName: string;
  stat: number;
  operator?: string;
  completedStat?: number;
  completedStatLength?: number;
  statDescription?: string;
};

export const GridCard = ({
  icon,
  statName,
  stat,
  operator,
  completedStat,
  completedStatLength,
  statDescription,
}: GridCardType) => {
  return (
    <Card>
      <CardContent className="pb-2.5 flex items-center gap-4 flex-1">
        <div className=" rounded-full">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{statName}</p>
          <p className="text-2xl font-bold">
            {stat}
            {operator}
          </p>
          {completedStat ? (
            <p className="text-xs text-muted-foreground h-2">
              {completedStat} of {completedStatLength} tasks
            </p>
          ) : (
            <p className="text-xs text-muted-foreground h-2">
              {statDescription}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
