"use client";

import { createTodo } from "@/actions/todos";
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
import { useRouter } from "next/navigation";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
};

export const AddToDo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit } = useForm<FormData>();

  const user = useUser();

  const router = useRouter();

  //TODO: Create a toaster and delete button, start transition?

  const onSubmit = async (data: FormData) => {
    const userId = user.user?.id;
    if (userId) {
      startTransition(async () => {
        await createTodo(data.title, userId);
      });

      setIsOpen(false);
    }
    router.refresh();
  };

  return (
    <section className="self-end mr-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Add to do</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col justify-center items-start w-96">
          <DialogHeader>
            <DialogTitle>Add New ToDo</DialogTitle>
            <DialogDescription>
              Create a new todo item. Click save when you&apos;re done.
            </DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label htmlFor="todo">Title</Label>
              <Input id="todo" {...register("title")} />
              <Button className="self-end mt-2" disabled={isPending}>
                Save to do
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};
