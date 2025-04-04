import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { AddToDo } from "@/components/Pages/Todo/ModifyTodo/AddToDo/AddToDo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

describe("AddToDo Component", () => {
  it("renders AddToDo for signed-in users", async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <AddToDo />
      </QueryClientProvider>
    );

    expect(screen.getByText("Add to do")).toBeInTheDocument();
    const addToDoButton = screen.getByRole("button", { name: "Add to do" });
    await user.click(addToDoButton);
    expect(screen.getByText("Add new ToDo")).toBeInTheDocument();

    const titleInput = screen.getByLabelText(/Title/i);
    expect(titleInput).toBeInTheDocument();

    const dateInput = screen.getByLabelText(/Deadline/i);
    expect(dateInput).toBeInTheDocument();

    const priorityInput = screen.getByLabelText(/Priority/i);
    expect(priorityInput).toBeInTheDocument();

    const categoryInput = screen.getByLabelText(/Category/i);
    expect(categoryInput).toBeInTheDocument();
  });

  it("shows validation errors when required fields are empty", async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <AddToDo />
      </QueryClientProvider>
    );

    const addToDoButton = screen.getByRole("button", { name: "Add to do" });
    await user.click(addToDoButton);

    const saveButton = screen.getByRole("button", { name: "Save to do" });
    await user.click(saveButton);

    expect(
      screen.getByText("Title is required (max 32 chars)")
    ).toBeInTheDocument();
    expect(screen.getByText("Date is required")).toBeInTheDocument();
    expect(screen.getByText("Priority is required")).toBeInTheDocument();
    expect(screen.getByText("Category is required")).toBeInTheDocument();
  });

  it("handles clicking 'Add to do' button and opening form", async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <AddToDo />
      </QueryClientProvider>
    );

    const addToDoButton = screen.getByRole("button", { name: "Add to do" });
    await user.click(addToDoButton);
    expect(screen.getByText("Add new ToDo")).toBeInTheDocument();
  });

  it("submits the form", async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <AddToDo />
      </QueryClientProvider>
    );

    const addToDoButton = screen.getByRole("button", { name: "Add to do" });
    await user.click(addToDoButton);

    const titleInput = await screen.findByLabelText(/Title/i);
    const dateInput = await screen.findByLabelText(/Deadline/i);
    const priorityInput = await screen.getByTestId("priority");
    const categoryInput = await screen.getByTestId("category");

    await user.type(titleInput, "Test Todo");
    await user.type(dateInput, "2025-05-01");

    user.hover(priorityInput);
    user.click(priorityInput);
    const veryHighOption = await screen.findByText("Very High");
    user.click(veryHighOption);

    user.hover(categoryInput);
    user.click(categoryInput);

    const workOption = await screen.findByText("Work");
    user.click(workOption);

    const saveToDoButton = await screen.getByText("Save to do");
    user.click(saveToDoButton);
  });
});
