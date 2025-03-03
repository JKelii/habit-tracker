import { ReactNode } from "react";

export type TodoType = {
  id: number;
  title: string;
  createdAt: Date;
  toBeDone: Date;
  userId: string;
  matrix: string;
  completed: boolean;
};

export type TodosType = { todos: TodoType[] };

export type Column = {
  matrix: string;
  title: string;
  icon: ReactNode;
};
