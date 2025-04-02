import { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";

export const metadata: Metadata = {
  title: "Habit Tracker Eisenhower Matrix",
};

const MatrixList = dynamic(() =>
  import("@/components/Pages/Matrix/MatrixList").then((mod) => mod.MatrixList)
);

const page = () => {
  return <MatrixList />;
};

export default page;
