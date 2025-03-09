"use client";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type ApiResponse = {
  message: string;
  error?: string;
};

const CreateProfileRequest = async () => {
  const response = await fetch("/api/create-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json() as Promise<ApiResponse>;
};

const CreateProfile = () => {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const { mutate, isPending } = useMutation<ApiResponse, Error>({
    mutationFn: CreateProfileRequest,
    onSuccess: () => {
      router.push("/premium");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (isLoaded && isSignedIn && !isPending) {
      mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn]);

  return <div>Processing sign in...</div>;
};

export default CreateProfile;
