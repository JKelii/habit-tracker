import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import React, { Dispatch } from "react";

//TODO: Modift popup to look better

export const Popup = ({
  finishedToday,
  setShowPopup,
  showPopup,
}: {
  finishedToday: string[] | undefined;
  setShowPopup: Dispatch<React.SetStateAction<boolean>>;
  showPopup: boolean;
}) => {
  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent className="p-8 rounded-lg shadow-lg max-w-sm w-full bg-black flex flex-col justify-center items-center">
        <DialogTitle className="text-center text-2xl">
          Great job! 🎉
        </DialogTitle>
        <DialogDescription className="text-center text-lg">
          You&apos;ve completed a Pomodoro session
        </DialogDescription>
        <div className="flex flex-col items-center py-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <span className="text-2xl font-bold">
                  {finishedToday?.length}
                </span>
              </div>
            </div>
          </div>
          <p className="text-center text-muted-foreground">
            You&apos;ve completed {finishedToday?.length}{" "}
            {finishedToday?.length === 1 ? "session" : "sessions"} today.
            {finishedToday &&
            finishedToday?.length % 4 === 0 &&
            finishedToday?.length > 0
              ? " Time for a longer break!"
              : " Take a short break or continue working."}
          </p>
        </div>
        <div className="mt-2 flex justify-center">
          <Button onClick={() => setShowPopup((prev) => !prev)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
