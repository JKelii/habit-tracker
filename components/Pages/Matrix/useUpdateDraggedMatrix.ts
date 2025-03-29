import { updateDraggedMatrix } from "@/actions/todos";
import { Todo } from "@/app/types/TodosTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DraggedMatrix = {
  newMatrix: string;
  taskId: string;
};

export function useUpdateDraggedMatrix() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ newMatrix, taskId }: DraggedMatrix) =>
      updateDraggedMatrix(newMatrix, taskId),

    onMutate: async ({ newMatrix, taskId }) => {
      queryClient.cancelQueries({ queryKey: ["matrix"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["matrix"]);

      queryClient.setQueryData<Todo[]>(["matrix"], (oldTodos) =>
        oldTodos?.map((todo) =>
          todo.id === taskId ? { ...todo, matrix: newMatrix } : todo
        )
      );

      return { previousTodos };
    },
    onError: (_err, _var, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["matrix"], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["matrix"] });
    },
  });
}
