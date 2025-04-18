import { modifyTodoSchema } from "@/app/schema/modifyTodoTitle";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { SquarePen } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useModifyTodo } from "../hooks/useModifyTodo";
import { SelectModifyPriority } from "./SelectModifyPriority";

type ModifyTodoType = {
  title: string;
  id: string;
  matrix: string;
};

type formData = {
  title: string;
  matrix: string;
};

export const ModifyTodo = ({ title, id, matrix }: ModifyTodoType) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate } = useModifyTodo();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formData>({ resolver: yupResolver(modifyTodoSchema) });

  const handleFormSubmit = (data: formData) => {
    mutate({ id, title: data.title, matrix: data.matrix });
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"} data-testid="modify">
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
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Label htmlFor={title}>Title</Label>
            <Input
              defaultValue={title}
              id={title}
              {...register("title")}
              className="mb-2"
            />
            {errors.title && (
              <p className="text-sm text-red-500  font-semibold self-start">
                Title is required
              </p>
            )}
            <SelectModifyPriority setValue={setValue} matrix={matrix} />
            {errors.matrix && (
              <p className="text-sm text-red-500  font-semibold self-start">
                Priority is required
              </p>
            )}
            <DialogFooter className="w-full mt-4">
              <div className="flex justify-between w-full items-center">
                <Button
                  type="button"
                  className="self-start"
                  variant={"default"}
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
                <Button type="submit" className="self-end" variant={"outline"}>
                  Modify
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
