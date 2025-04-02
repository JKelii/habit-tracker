import HabitsPage from "@/components/Pages/Habits/HabitsPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Habit Tracker",
};

const page = () => {
  return <HabitsPage />;
};

export default page;
