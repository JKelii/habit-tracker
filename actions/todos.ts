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
      where: { userId: userId },
    });
    return todos;
  } catch (error) {
    throw error;
  }
};

export const createTodo = async (
  title: string,
  userId: string,
  deadline: Date,
  matrix: string
) => {
  const create = await prisma.todo.create({
    data: {
      toBeDone: deadline,
      title,
      matrix: matrix,
      user: {
        connect: { userId: userId },
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

export const updateTodoTitle = async (id: number, title: string) => {
  const updateTitle = await prisma.todo.update({
    where: {
      id: id,
    },
    data: { title: title },
  });
  return updateTitle;
};

export const getTodoByName = async () => {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!user || !userId) {
      throw new Error("Can't get user");
    }

    const updateByName = await prisma.todo.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        title: "asc",
      },
    });
    return updateByName;
  } catch (error) {
    console.log(error);
  }
};

export const getTodoByDeadline = async () => {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!user || !userId) {
      throw new Error("Can't get user");
    }

    const updateByName = await prisma.todo.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        toBeDone: "asc",
      },
    });
    return updateByName;
  } catch (error) {
    console.log(error);
  }
};

export const updateDraggedMatrix = async (matrix: string, id: number) => {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!user || !userId) {
      throw new Error("Can't get user");
    }

    const updated = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        matrix: matrix,
      },
    });
    return updated;
  } catch (error) {
    console.log(error);
  }
};
