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

export type FormData = {
  title: string;
  deadline: Date;
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
        await createTodo(data.title, userId, data.deadline);
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
          <Button variant={"outline"}>Add to do</Button>
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
              <Label htmlFor="todo" className="self-start my-1">
                Title
              </Label>
              <Input id="todo" {...register("title")} />
              {errors.title && (
                <p className="text-sm text-red-500  font-semibold self-start">
                  Title is required
                </p>
              )}
              <div className="self-start w-full flex flex-col">
                <Label htmlFor="date" className="self-start my-1">
                  Deadline
                </Label>
                <DatePicker
                  setDate={setDate}
                  date={date}
                  register={register}
                  setValue={setValue}
                />
                {errors.deadline && (
                  <p className="text-sm text-red-500 font-semibold self-start">
                    Date is required
                  </p>
                )}
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
