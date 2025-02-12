"use client";
import { TableHead, TableRow } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";

type TableHeadsType = {
  onClickChange: () => void;
  isFiltered: boolean;
};

export const TableHeads = ({ onClickChange, isFiltered }: TableHeadsType) => {
  return (
    <>
      <TableRow className="w-full">
        <TableHead className="w-1/4">Completed</TableHead>
        <TableHead className="w-1/4">Name</TableHead>
        <TableHead className="w-1/4">Created</TableHead>
        <TableHead
          className="w-1/4 cursor-pointer flex items-center"
          onClick={onClickChange}
        >
          {" "}
          {isFiltered ? (
            <>
              Deadline <ChevronDown className="size-4" />
            </>
          ) : (
            "Deadline"
          )}
        </TableHead>
        <TableHead className="w-1/4">Modify</TableHead>
        <TableHead className="w-1/2">Delete</TableHead>
      </TableRow>
    </>
  );
};
