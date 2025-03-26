import { deleteTodo } from "@/actions/todos";
import { Todo } from "@/app/types/TodosTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteTodo = {
  id: string;
};

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeleteTodo) => deleteTodo(id),
    onMutate: async ({ id }) => {
      queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) =>
        oldTodos?.filter((todo) => todo.id !== id)
      );
      return { previousTodos };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
  });
}
