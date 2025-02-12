import { deleteTodo } from "@/actions/todos";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";

export const DeleteTodo = ({ todoId }: { todoId: number }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const deleteTodoById = (id: number) => {
    if (id) {
      startTransition(async () => {
        await deleteTodo(id);
      });
    }

    toast("ToDo deleted from your list ❌");
    router.refresh();
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            <Trash2 className="text-red-500" />
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col justify-center items-start w-96 ">
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              todo.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="w-full">
            <div className="flex justify-between w-full items-center">
              <Button
                className="self-start"
                variant={"outline"}
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => deleteTodoById(todoId)}
                disabled={isPending}
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
