"use server";
import prisma from "@/app/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const getTodos = async () => {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!user || !userId) {
      throw new Error("Can't get user");
    }

    const todos = await prisma.todo.findMany({
      where: {
        userId: user.id,
      },
    });
    return todos;
  } catch (error) {
    throw error;
  }
};

export const createTodo = async (
  title: string,
  userId: string,
  deadline: Date
) => {
  const create = await prisma.todo.create({
    data: {
      toBeDone: deadline,
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

export const setCompleteStatus = async (id: number, complete: boolean) => {
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed: !complete },
  });

  return updatedTodo;
};
