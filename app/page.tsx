import { PageCardList } from "@/components/Pages/Home/PageCardList";

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
                habits. Start your journey to a better You today.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
        <PageCardList />
      </section>
    </article>
  );
}
