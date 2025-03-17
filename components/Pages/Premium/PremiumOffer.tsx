import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

import { premiumFeatures } from "@/constants/features";
import { SubscribeButtons } from "./SubscribeButtons";
export const PremiumOffer = ({ isYearly }: { isYearly: boolean }) => {
  return (
    <motion.div
      initial={{ y: -5 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Card className="flex justify-center items-center w-full flex-col">
        <CardHeader className="w-full flex flex-col justify-center items-center">
          {isYearly && (
            <div className="self-end">
              <Badge>Best Value</Badge>
            </div>
          )}
          <div className="self-center">
            <Sparkles className="bg-white text-black rounded-full size-8 p-1" />
          </div>
          <CardTitle className="text-3xl ">Premium</CardTitle>
          <CardDescription className="text-lg ">For ambitious</CardDescription>
          <article className="mt-2 flex justify-center items-center gap-1">
            <h3 className="text-4xl">{isYearly ? "$179.99" : "$19.99"}</h3>
            <p className="text-sm font-semibold self-end text-muted-foreground">
              /{isYearly ? "year" : "month"}
            </p>
          </article>
        </CardHeader>
        <CardContent className="w-full">
          <div className="mb-4">
            <p className="font-medium mb-4 mt-2 text-center">
              Everything you need to succeed:
            </p>
            <ul className="space-y-3">
              {premiumFeatures.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <SubscribeButtons isYearly={isYearly} />
        </CardContent>
      </Card>
    </motion.div>
  );
};
