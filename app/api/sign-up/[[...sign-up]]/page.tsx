import { SignUp } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <article className="flex justify-center items-center h-[calc(100vh-28px)]">
      <SignUp fallbackRedirectUrl={"/api/auth/creation"} />
    </article>
  );
};

export default page;
