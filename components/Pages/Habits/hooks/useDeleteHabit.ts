import { deleteHabit } from "@/actions/habits";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type DeleteHabit = {
  habitId: string;
};

export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ habitId }: DeleteHabit) => {
      await deleteHabit(habitId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      toast("Habit deleted from your list ❌");
    },
    onError: (err) => {
      console.error("Error while mutating:", err);
      toast.error("Failed to delete habit. Please try again later.");
    },
  });
}
