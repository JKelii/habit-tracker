import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { Dispatch } from "react";

//TODO: Modift popup to look better

export const Popup = ({
  setShowPopup,
  showPopup,
}: {
  setShowPopup: Dispatch<React.SetStateAction<boolean>>;
  showPopup: boolean;
}) => {
  return (
    <Dialog open={showPopup} onOpenChange={setShowPopup}>
      <DialogContent className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <DialogTitle className="text-xl font-semibold">
          Time&apos;s up!
        </DialogTitle>
        <p className="mt-4">Your timer has finished.</p>
        <div className="mt-6 flex justify-center">
          <Button onClick={() => setShowPopup((prev) => !prev)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
