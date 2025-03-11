"use client";
import { addHabit } from "@/actions/habits";
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
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
};

export const AddHabit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(habitSchema),
  });

  const user = useUser();
  const router = useRouter();
  const onSubmit = (data: FormData) => {
    const userId = user.user?.id;
    startTransition(async () => {
      if (userId) {
        await addHabit(data.title, userId);
      }
      setIsOpen(false);
      router.refresh();
    });
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
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500 py-1 font-semibold self-start">
                This field is required
              </p>
            )}
            <Button
              className="mt-4 self-end"
              type="submit"
              disabled={isPending}
            >
              Save habit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
