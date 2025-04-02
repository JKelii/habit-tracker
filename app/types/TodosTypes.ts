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

export type TodoApiResponse = {
  todos: Todo[];
  totalPages: number;
};

export type TodoStatsApiResponse = {
  uniqueCategoriesCount: number;
  completeTillToday: number;
  completedTodos: number;
  totalCount: number;
};
