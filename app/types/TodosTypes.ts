export type Todos = {
  id: number;
  title: string;
  createdAt: Date;
  userId: string;
  completed: boolean;
  toBeDone: Date;
  matrix: string;
  category: string;
}[];
