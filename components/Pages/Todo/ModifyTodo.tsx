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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquarePen } from "lucide-react";
import React, { useState } from "react";

type ModifyTodoType = {
  title: string;
};
//TODO: ADD FORM AND DEADLINE CHANGE
export const ModifyTodo = ({ title }: ModifyTodoType) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            <SquarePen />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Your ToDo</DialogTitle>
            <DialogDescription>
              Change fields and then click save
            </DialogDescription>
          </DialogHeader>
          <Label htmlFor={title}>Title</Label>
          <Input defaultValue={title} id={title} />
          <DialogFooter className="w-full">
            <div className="flex justify-between w-full items-center">
              <Button
                className="self-start"
                variant={"outline"}
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
