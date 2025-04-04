import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import user from "@testing-library/user-event";
import { AddHabit } from "@/components/Pages/Habits/AddHabit";

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

describe("AddHabit Component", () => {
  it("Adds habit", async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <AddHabit />
      </QueryClientProvider>
    );

    const AddHabitTrigger = screen.getByRole("button", { name: "Add Habit" });
    expect(AddHabitTrigger).toBeInTheDocument();

    await user.click(AddHabitTrigger);

    await screen.findByText("Add new Habit");

    const titleInput = await screen.findByLabelText(/Title/i);
    const descriptionInput = await screen.findByLabelText(/Description/i);

    await user.type(titleInput, "Morning Run");
    await user.type(descriptionInput, "30 minutes of cardio");

    const saveButton = screen.getByRole("button", { name: "Save habit" });
    await user.click(saveButton);
  });
  it("Displays validation errors when submitting empty form", async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <AddHabit />
      </QueryClientProvider>
    );

    const AddHabitTrigger = screen.getByRole("button", { name: "Add Habit" });
    expect(AddHabitTrigger).toBeInTheDocument();
    await user.click(AddHabitTrigger);

    await screen.findByText("Add new Habit");

    const saveButton = screen.getByRole("button", { name: "Save habit" });
    await user.click(saveButton);

    expect(await screen.findByText("Title is required")).toBeInTheDocument();
    expect(
      await screen.findByText("Description is required")
    ).toBeInTheDocument();
  });
});
