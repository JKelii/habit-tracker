"use client";
import { TableHead, TableRow } from "@/components/ui/table";

export const TableHeads = () => {
  return (
    <TableRow className="w-">
      <TableHead className="w-1/4">Completed</TableHead>
      <TableHead className="w-1/4">Name</TableHead>
      <TableHead className="w-1/4">Created</TableHead>
      <TableHead className="w-1/4">Deadline</TableHead>
      <TableHead className="w-1/2">Modify</TableHead>
      <TableHead className="w-1/2">Delete</TableHead>
    </TableRow>
  );
};
