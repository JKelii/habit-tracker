export type Todo = {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  completed: boolean;
  toBeDone: Date;
  matrix: string;
  category: string;
};

export type TodosType = { todos: Todo[] };
