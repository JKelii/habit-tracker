import { PageCard } from "@/components/Pages/Home/PageCard";
import { CheckCheck, CheckSquare } from "lucide-react";

//TODO: Skeleton for user

export default function Home() {
  return (
    <article className="flex justify-center flex-col items-center w-full ">
      <section className="w-full py-12  flex justify-center items-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Build Better Habits, Achieve Your Goals
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Habit tracker helps you create, track, and maintain positive
                habits. Start your journey to a better you today.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center w-full gap-10">
        <PageCard
          icon={<CheckSquare className="mr-2 h-5 w-5 text-primary" />}
          title="ToDo"
          description="Start organizing your tasks"
          content="Ready to tackle your tasks? Click here to add a new item to your
              todo list and stay on top of your goals."
          link="/todo"
        />
        <PageCard
          icon={<CheckCheck className="mr-2 h-5 w-5 text-primary" />}
          title="Habit"
          description="Build lasting positive routines"
          content="  Want to develop a new habit? Click here to start your journey
              towards growth and self-improvement."
          link="/habits"
        />
      </section>
    </article>
  );
}
