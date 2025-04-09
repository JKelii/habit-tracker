import dynamic from "next/dynamic";

const PremiumComponent = dynamic(() =>
  import("@/components/Pages/Premium/PremiumComponent").then(
    (mod) => mod.PremiumComponent
  )
);

const page = () => {
  return (
    <div className="flex justify-center items-center flex-col w-full">
      <PremiumComponent />
    </div>
  );
};

export default page;
