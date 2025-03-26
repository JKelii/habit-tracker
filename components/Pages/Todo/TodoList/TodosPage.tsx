"use client";

import React, { useState } from "react";
import { Todo } from "@/app/types/TodosTypes";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TodosList } from "./TodosList";
import { TodoGridStats } from "../GridStats/TodoGridStats";
import TodosLoadingSkeleton from "./TodosLoadingSkeleton";

type ApiResponse = {
  todos: Todo[];
  totalPages: number;
};

const fetchProducts = async (
  page: number,
  pageSize: number
): Promise<ApiResponse> => {
  const res = await fetch(
    `/api/routes/todos?page=${page}&pageSize=${pageSize}`
  );
  if (!res.ok) throw new Error("Error fetching data");
  const data = await res.json();
  return data;
};

export const TodosPage = () => {
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["todos", page],
    queryFn: () => fetchProducts(page, pageSize),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <TodosLoadingSkeleton />;
  if (error instanceof Error)
    return <p className="text-destructive text-sm">Error: {error.message}</p>;

  const todos = data?.todos ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <TodoGridStats todos={todos} />

      <TodosList
        todos={todos}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        page={page}
      />
    </>
  );
};
