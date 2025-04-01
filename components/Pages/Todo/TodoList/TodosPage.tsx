"use client";

import { Todo } from "@/app/types/TodosTypes";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TodosList } from "./TodosList";
import { TodoGridStats } from "../GridStats/TodoGridStats";
import TodosLoadingSkeleton from "./TodosLoadingSkeleton";
import { useState } from "react";
import axios from "axios";

type ApiResponse = {
  todos: Todo[];
  totalPages: number;
  totalCount: number;
  uniqueCategoriesCount: number;
  completeTillToday: number;
  completedTodos: number;
};

const fetchTodos = async (
  page: number,
  pageSize: number
): Promise<ApiResponse> => {
  const res = await axios.get(
    `/api/routes/todos?page=${page}&pageSize=${pageSize}`
  );
  return res.data;
};

export const TodosPage = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["todos", page],
    queryFn: () => fetchTodos(page, pageSize),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <TodosLoadingSkeleton />;
  if (error instanceof Error)
    return <p className="text-destructive text-sm">Error: {error.message}</p>;

  const todos = data?.todos ?? [];
  const totalPages = data?.totalPages ?? 0;
  const uniqueCategoriesCount = data?.uniqueCategoriesCount;
  const completeTillToday = data?.completeTillToday;
  const completedTodos = data?.completedTodos;
  const totalCount = data?.totalCount ?? 0;

  return (
    <>
      <TodoGridStats
        totalCount={totalCount}
        uniqueCategoriesCount={uniqueCategoriesCount}
        completeTillToday={completeTillToday}
        completedTodos={completedTodos}
      />
      <TodosList
        totalPages={totalPages}
        todos={todos}
        page={page}
        setPage={setPage}
      />
    </>
  );
};
