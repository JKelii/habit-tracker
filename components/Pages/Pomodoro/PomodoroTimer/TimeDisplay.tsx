import { motion, AnimatePresence } from "framer-motion";

type TimeDisplayType = {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  timer: number;
};

export const TimeDisplay = ({
  minutes,
  seconds,
  isRunning,
  timer,
}: TimeDisplayType) => {
  return (
    <>
      <div className="flex justify-center items-center gap-[1px]">
        <span className="text-xl text-black dark:text-white font-semibold">
          {String(minutes).padStart(2, "0")}
        </span>
        <span>:</span>
        <span className="text-xl text-black dark:text-white font-semibold">
          {String(seconds).padStart(2, "0")}
        </span>
      </div>
      <div className="h-5">
        <AnimatePresence>
          {!isRunning && timer < 1500 && (
            <motion.p
              key={String(isRunning)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-muted-foreground transition-opacity duration-300 flex items-center gap-1"
            >
              Stopped
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
