"use client";

import { createTodo } from "@/actions/todos";
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
import { useRouter } from "next/navigation";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "@/app/schema/newTodoSchema";
import { DatePicker } from "./DatePicker";
import { toast } from "sonner";
import { SelectPriority } from "./TodoList/SelectPriority";
import { SelectCategory } from "./TodoList/SelectCategory";

export type FormData = {
  title: string;
  deadline: Date;
  matrix: string;
  category: string;
};

export const AddToDo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [isPending, startTransition] = useTransition();

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

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const userId = user.user?.id;
    if (userId && date) {
      startTransition(async () => {
        await createTodo(
          data.title,
          userId,
          data.deadline,
          data.matrix,
          data.category
        );
      });
      console.log(data);
      setIsOpen(false);
      reset({
        title: "",
      });
      setDate(undefined);
    }
    router.refresh();
    toast("ToDo added to your list ✔");
  };

  return (
    <section className="self-end mr-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"default"}>Add to do</Button>
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
                Save to do
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
