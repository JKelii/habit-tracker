import { addHabit } from "@/actions/habits";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type HabitInput = {
  title: string;
  userId: string;
  icon?: string;
  description: string;
};

export function useAddHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: HabitInput) => {
      return addHabit(data.title, data.userId, data.icon, data.description);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
    onError: (err) => {
      console.error("Error while mutating:", err);
    },
  });
}
