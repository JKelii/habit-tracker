import { createTodo } from "@/actions/todos";
import { Todo } from "@/app/types/TodosTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ApiResponse = {
  todos: Todo[];
  totalPages: number;
};

type TodoInput = {
  title: string;
  userId: string;
  deadline: Date;
  matrix: string;
  category: string;
};

const TODOS_PER_PAGE = 10;

export function useAddTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TodoInput) =>
      createTodo(
        data.title,
        data.userId,
        data.deadline,
        data.matrix,
        data.category
      ),

    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const firstPageData = queryClient.getQueryData<ApiResponse>(["todos", 1]);

      const optimisticTodo: Todo = {
        userId: newTodo.userId,
        id: `temp-${Date.now()}`,
        title: newTodo.title,
        createdAt: new Date(),
        toBeDone: newTodo.deadline,
        category: newTodo.category,
        matrix: newTodo.matrix,
        completed: false,
      };

      if (firstPageData) {
        queryClient.setQueryData(["todos", 1], {
          todos: [optimisticTodo, ...firstPageData.todos],
          totalPages: firstPageData.totalPages,
        });
      }

      return { optimisticTodo, previousData: firstPageData };
    },

    onSuccess: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      queryClient.setQueryData<ApiResponse>(["todos", 1], (oldData) => {
        if (!oldData) return;

        const filteredTodos = oldData.todos.filter(
          (todo) => !todo.id.startsWith("temp-")
        );

        return {
          ...oldData,
          todos: [newTodo, ...filteredTodos].slice(0, TODOS_PER_PAGE),
        };
      });

      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },

    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(["todos", 1], context?.previousData);
      toast.error("Failed to add ToDo. Please try again");
    },
  });
}
