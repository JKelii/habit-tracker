import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import user from "@testing-library/user-event";
import { DeleteTodo } from "@/components/Pages/Todo/ModifyTodo/DeleteTodo";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

vi.mock("@clerk/nextjs", () => ({
  useUser: () => ({
    isSignedIn: true,
    user: { id: "test-user-id", email: "test@example.com" },
  }),
  ClerkProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
  SignedIn: ({ children }: { children: ReactNode }) => <>{children}</>,
  SignedOut: () => null,
}));

describe("ModifyTodo Component", () => {
  it("renders Todo and modify Todo for signed-in users", async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <DeleteTodo todoId="1" />
      </QueryClientProvider>
    );

    const deleteTrigger = screen.getByTestId("delete");
    expect(deleteTrigger).toBeInTheDocument();

    await user.click(deleteTrigger);

    const deleteButton = screen.getByText("Delete");
    await user.click(deleteButton);
  });
});
