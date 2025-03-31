"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useDeleteHabit } from "./hooks/useDeleteHabit";

type DeleteHabitProps = {
  habitId: string;
  open: boolean;
  onClose: () => void;
};

export const DeleteHabit = ({ habitId, open, onClose }: DeleteHabitProps) => {
  const mutation = useDeleteHabit();

  function handleOpenChange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="flex flex-col justify-center items-start w-96 ">
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              habit.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="w-full">
            <div className="flex justify-between w-full items-center">
              <Button
                className="self-start"
                variant={"outline"}
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => {
                  console.log("Clicked delete button, habitId:", habitId);
                  mutation.mutate({ habitId }, { onSuccess: onClose });
                }}
                disabled={mutation.isPending}
              >
                <Trash2 /> Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
