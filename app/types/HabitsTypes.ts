export type HabitType = {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  description: string;
  completed: boolean;
  streak: number;
  image: string | null;
  completionDates: Date[];
};

export type HabitsType = HabitType[];

export type HabitsPage = {
  habits: HabitsType;
  nextCursor: string | null;
};
