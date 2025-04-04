import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModifyTodo } from "@/components/Pages/Todo/ModifyTodo/ModifyTodo";
import user from "@testing-library/user-event";

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
        <ModifyTodo title="Hello" id="1" matrix="1" />
      </QueryClientProvider>
    );

    const modifyButton = screen.getByTestId("modify");
    expect(modifyButton).toBeInTheDocument();

    await user.click(modifyButton);

    const titleInput = screen.getByLabelText(/Title/i);
    expect(titleInput).toBeInTheDocument();

    await user.type(titleInput, "Test Todo");

    const priorityInput = await screen.getByTestId("modifyPriority");
    user.hover(priorityInput);
    user.click(priorityInput);

    const veryHighOption = await screen.findByText("High");
    user.clear(veryHighOption);

    const saveButton = await screen.getByText("Modify");
    user.click(saveButton);
  });
});
