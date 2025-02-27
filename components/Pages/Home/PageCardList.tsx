import React from "react";
import { PageCard } from "./PageCard";
import { CheckCheck, CheckSquare, ListOrdered, Timer } from "lucide-react";

export const PageCardList = () => {
  return (
    <>
      <PageCard
        icon={<CheckSquare className="mr-2 h-5 w-5 text-primary" />}
        title="ToDos"
        description="Start organizing your tasks"
        content="Ready to tackle your tasks? Click here to add a new item to your
              todo list and stay on top of your goals."
        link="/todo"
      />
      <PageCard
        icon={<CheckCheck className="mr-2 h-5 w-5 text-primary" />}
        title="Habits"
        description="Build lasting positive routines"
        content="  Want to develop a new habit? Click here to start your journey
              towards growth and self-improvement."
        link="/habits"
      />
      <PageCard
        icon={<Timer className="mr-2 h-5 w-5 text-primary" />}
        title="Pomodoro"
        description="25/5 studying method"
        content="Timer helps with most optimal learning method"
        link="/pomodoro"
      />
      <PageCard
        icon={<ListOrdered className="mr-2 h-5 w-5 text-primary" />}
        title="EM"
        description="1-4 tasks scale"
        content="Eisenhower Matrix helps you prioritize tasks"
        link="/matrix"
      />
    </>
  );
};
