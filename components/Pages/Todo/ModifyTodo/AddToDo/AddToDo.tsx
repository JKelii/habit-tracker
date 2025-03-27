"use client";

import React, { useState } from "react";
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
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "@/app/schema/newTodoSchema";
import { toast } from "sonner";
import { SelectPriority } from "../../TodoList/SelectPriority";
import { SelectCategory } from "../../TodoList/SelectCategory";
import { DatePicker } from "./DatePicker";
import { useAddTodo } from "../../hooks/useAddTodo";

export type FormData = {
  title: string;
  deadline: Date;
  matrix: string;
  category: string;
};

export const AddToDo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(todoSchema),
  });

  const user = useUser();

  const { mutate, isPending } = useAddTodo();

  const onSubmit = (data: FormData) => {
    const userId = user.user?.id;
    if (userId && date) {
      mutate(
        {
          title: data.title,
          userId,
          deadline: date,
          matrix: data.matrix,
          category: data.category,
        },
        {
          onSuccess: () => {
            setIsOpen(false);
            reset({ title: "" });
            setDate(undefined);
          },
          onError: () => {
            toast.error("Failed to add ToDo. Please try again.");
          },
        }
      );
    }
  };

  return (
    <section className="self-end py-3 mr-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"default"} size={"sm"}>
            Add to do
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col justify-center items-start w-96">
          <DialogHeader>
            <DialogTitle>Add new ToDo</DialogTitle>
            <DialogDescription>
              Create a new todo item. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full justify-start flex flex-col items-center gap-2"
            >
              <Label htmlFor="todo" className="self-start my-1 text-xs">
                Title
              </Label>
              <Input id="todo" {...register("title")} />
              {errors.title && (
                <p className="ml-1 text-sm text-red-500  font-semibold self-start">
                  Title is required
                </p>
              )}
              <div className="self-start w-full flex flex-col">
                <Label htmlFor="date" className="self-start my-1 text-xs">
                  Deadline
                </Label>
                <DatePicker
                  setDate={setDate}
                  date={date}
                  register={register}
                  setValue={setValue}
                />
                {errors.deadline && (
                  <p className="ml-1 text-sm text-red-500 font-semibold self-start">
                    Date is required
                  </p>
                )}
                <div className="flex gap-4 mt-1">
                  <div className="flex flex-col w-full ">
                    <SelectPriority setValue={setValue} />
                    {errors.matrix && (
                      <p className="ml-1 text-sm text-red-500 font-semibold self-start">
                        Select priority
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <SelectCategory setValue={setValue} />
                    {errors.category && (
                      <p className="ml-1 text-sm text-red-500 font-semibold self-start">
                        Select priority
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <Button
                className="mt-4 self-end"
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Save to do"}
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
