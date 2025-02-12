"use client";
import { motion } from "framer-motion";

export const PageHeader = () => {
  return (
    <section className="w-full py-12  flex justify-center items-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center w-full">
          <div className="space-y-2">
            <motion.h1
              style={{ overflow: "hidden", whiteSpace: "nowrap" }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="text-xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
            >
              Build Better Habits, Achieve Your Goals
            </motion.h1>
            <motion.p
              style={{ overflow: "hidden", whiteSpace: "nowrap" }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut", delay: 2 }}
              className="text-sm md:text-md lg:text-lg mx-auto max-w-[700px] text-gray-500 md:text-xl font-semibold dark:text-gray-400"
            >
              Start your journey to a better You today
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};
