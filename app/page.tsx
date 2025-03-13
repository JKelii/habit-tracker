import { PageCardList } from "@/components/Pages/Home/PageCardList";
import { PageHeader } from "@/components/Pages/Home/PageHeader";

//TODO: Zapoznac sie czym jest DDD

//TODO: LYNX ZAMIAST REACT NATIVE

//TODO: DOCKER

//TODO: INTERNAL ERRORS https://www.prisma.io/docs/orm/reference/error-reference

export default function Home() {
  return (
    <article className="flex justify-center flex-col items-center w-full">
      <PageHeader />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center mb-10">
        <PageCardList />
      </section>
    </article>
  );
}
