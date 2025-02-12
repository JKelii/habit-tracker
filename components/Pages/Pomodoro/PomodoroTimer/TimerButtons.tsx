import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";

type TimerButtonsType = {
  isRunning: boolean;
  timer: number;
  handleTimer: () => void;
  stopTimer: () => void;
};

export const TimerButtons = ({
  isRunning,
  timer,
  handleTimer,
  stopTimer,
}: TimerButtonsType) => {
  return (
    <div className="flex flex-col items-center h-40">
      <AnimatePresence>
        <Button
          variant={"default"}
          onClick={handleTimer}
          className="mt-5 w-28  transition-all duration-300"
        >
          <motion.span
            key={isRunning ? "hey" : "Bye"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isRunning ? <Pause /> : <Play />}
          </motion.span>
        </Button>

        {!isRunning && timer < 1500 && (
          <motion.div
            key={String(isRunning)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className=""
          >
            <Button
              className="mt-3 w-28"
              variant={"outline"}
              onClick={stopTimer}
            >
              End
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
