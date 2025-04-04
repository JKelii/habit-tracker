"use client";

import { habitSchema } from "@/app/schema/newHabitSchema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { yupResolver } from "@hookform/resolvers/yup";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HabitIcons } from "./HabitIcons";
import { useAddHabit } from "./hooks/useAddHabit";

type FormData = {
  title: string;
  description: string;
  icon?: string;
};

export const AddHabit = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(habitSchema),
  });

  const mutation = useAddHabit();

  const user = useUser();

  const onSubmit = (data: FormData) => {
    const userId = user.user?.id;

    if (userId) {
      mutation.mutate({
        title: data.title,
        userId,
        description: data.description,
        icon: data.icon,
      });
    }
    reset({ description: "", icon: "", title: "" });
    setIsOpen(false);
  };

  return (
    <section className="self-end mr-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Add Habit</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col justify-center items-start w-96">
          <DialogHeader>
            <DialogTitle>Add new Habit </DialogTitle>
            <DialogDescription>
              Create a new habit. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <form
            className="w-full flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} placeholder="Reading" />
            {errors.title && (
              <p className="text-sm text-red-500 py-1 font-semibold self-start">
                Title is required
              </p>
            )}
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...register("description")}
              placeholder="30 minutes of cardio"
            />
            {errors.description && (
              <p className="text-sm text-red-500 py-1 font-semibold self-start">
                Description is required
              </p>
            )}

            <Input {...register("icon")} className="hidden" />
            <HabitIcons setValue={setValue} />

            <Button
              className="mt-4 self-end "
              type="submit"
              disabled={mutation.isPending}
            >
              Save habit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
