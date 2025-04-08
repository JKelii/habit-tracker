"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type SubscribeResponse = {
  url: string;
};

type SubscribeError = {
  error: string;
};

const subscribeToPlan = async (
  planType: string,
  userID: string,
  email: string
): Promise<SubscribeResponse> => {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      planType,
      userID,
      email,
    }),
  });

  if (!response.ok) {
    const errorData: SubscribeError = await response.json();
    console.error("Error in /api/checkout:", errorData.error);
    throw new Error(errorData.error || "Something went wrong");
  }

  const data: SubscribeResponse = await response.json();
  return data;
};

export const SubscribeButtons = ({ isYearly }: { isYearly: boolean }) => {
  const { user } = useUser();
  const router = useRouter();

  const userID = user?.id;
  const email = user?.emailAddresses[0].emailAddress || "";

  const { mutate, isPending } = useMutation<
    SubscribeResponse,
    Error,
    { planType: string }
  >({
    mutationFn: async ({ planType }) => {
      if (!userID) {
        throw new Error("User not signed in.");
      }
      return subscribeToPlan(planType, userID, email);
    },
    onMutate: () => {
      toast.loading("Processing your subscription");
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSubscribe = (planType: string) => {
    if (!userID) {
      router.push("/sign-up");
      return;
    }

    mutate({ planType });
  };

  return (
    <Button
      variant={"default"}
      className="w-full"
      disabled={isPending}
      onClick={() => handleSubscribe(isYearly ? "year" : "week")}
    >
      {isPending
        ? "Please wait..."
        : `Subscribe to ${isYearly ? "Yearly Plan" : "Monthly Plan"}`}
    </Button>
  );
};
