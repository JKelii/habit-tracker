import React from "react";

type HabitsType = {
  id: number;
  userId: string;
  title: string;
  createdAt: Date;
  completed: boolean;
  streak: number;
}[];

export const HabitsList = ({ habits }: { habits: HabitsType }) => {
  return (
    <div>
      {habits.map((habit) => (
        <div className="" key={habit.id}>
          <p>{habit.title}</p>
          <p>{habit.streak}</p>
        </div>
      ))}
    </div>
  );
};
