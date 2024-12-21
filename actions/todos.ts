"use server";
import prisma from "@/app/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const getTodos = async () => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    throw new Error("Can't get user");
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: userId,
    },
  });

  return todos;
};

export const createTodo = async (title: string, userId: string) => {
  const create = await prisma.todo.create({
    data: {
      title,
      user: {
        connect: { id: userId },
      },
    },
  });
  console.log("created");
  return create;
};

export const deleteTodo = async (id: number) => {
  const deleteTodoById = await prisma.todo.delete({
    where: {
      id: id,
    },
  });
  return deleteTodoById;
};
