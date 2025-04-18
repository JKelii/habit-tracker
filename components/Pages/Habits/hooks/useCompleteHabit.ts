import { completeHabit } from "@/actions/habits";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateHabit = {
  habitId: string;
  streak: number;
};

export function useCompleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateHabit) => {
      return completeHabit(data.habitId, data.streak);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
    onError: (err) => {
      console.error("Error while mutating:", err);
    },
  });
}
