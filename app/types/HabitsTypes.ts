export type HabitsType = {
  id: number;
  userId: string;
  title: string;
  createdAt: Date;
  description: string;
  completed: boolean;
  streak: number;
  image: string;
}[];

export type HabitType = {
  id: number;
  userId: string;
  title: string;
  createdAt: Date;
  description: string;
  completed: boolean;
  streak: number;
  image: string | null;
};
