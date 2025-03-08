"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
export const BillingButtons = ({
  isYearly,
  setIsYearly,
}: {
  isYearly: boolean;
  setIsYearly: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-6">
      <section className="border py-2 px-6 rounded-full flex justify-between items-center gap-4">
        <button
          className={cn(
            "rounded-full text-xs px-2 py-1 font-semibold",
            !isYearly && "bg-white text-black px-4"
          )}
          onClick={() => setIsYearly(false)}
        >
          Monthly
        </button>
        <button
          className={cn(
            "rounded-full text-xs px-2 py-1 font-semibold",
            isYearly && "bg-white text-black px-4"
          )}
          onClick={() => setIsYearly(true)}
        >
          Yearly
        </button>
      </section>
      {isYearly && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center"
        >
          <Badge
            variant="outline"
            className="bg-white text-black rounded-full border-0 py-1 px-3"
          >
            Save $60 with yearly billing
          </Badge>
        </motion.div>
      )}
    </div>
  );
};
