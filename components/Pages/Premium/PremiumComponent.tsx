"use client";
import { BillingButtons } from "@/components/Pages/Premium/BillingButtons";
import { PremiumSection } from "@/components/Pages/Premium/PremiumSection";
import React, { useState } from "react";
import { PremiumOffer } from "./PremiumOffer";

export const PremiumComponent = () => {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <div>
      <PremiumSection />
      <BillingButtons isYearly={isYearly} setIsYearly={setIsYearly} />
      <PremiumOffer isYearly={isYearly} />
    </div>
  );
};
