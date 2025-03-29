export type HabitsType = {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  description: string;
  completed: boolean;
  streak: number;
  image: string;
  completionDates: Date[];
}[];

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
