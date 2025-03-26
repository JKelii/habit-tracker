import { setCompleteStatus } from "@/actions/todos";
import { Todo } from "@/app/types/TodosTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CompleteTodo = {
  id: string;
  complete: boolean;
};

export function useSetComplete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, complete }: CompleteTodo) =>
      setCompleteStatus(id, complete),
    onMutate: async ({ id, complete }) => {
      queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) =>
        oldTodos?.map((todo) =>
          todo.id === id ? { ...todo, complete: complete } : todo
        )
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
