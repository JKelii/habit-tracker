import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const HabitsPage = () => {
  return (
    <main className="flex flex-col justify-center items-center p-4">
      <Card className="w-full flex flex-col justify-center items-center">
        <CardHeader className="border border-gray-100 p-4 rounded-lg my-4 rounded-gl">
          <CardTitle>Habits</CardTitle>
          <CardDescription>Manage your habits</CardDescription>
          <CardContent className="w-full border border-gray-100">
            Hello
          </CardContent>
        </CardHeader>
      </Card>
    </main>
  );
};

export default HabitsPage;
