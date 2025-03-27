import { updateTodoTitle } from "@/actions/todos";
import { Todo } from "@/app/types/TodosTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ModifyTodoType = {
  title: string;
  id: string;
};

export function useModifyTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, title }: ModifyTodoType) => updateTodoTitle(id, title),
    onMutate: async ({ id, title }) => {
      queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) =>
        oldTodos?.map((todo) => (todo.id === id ? { ...todo, title } : todo))
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
