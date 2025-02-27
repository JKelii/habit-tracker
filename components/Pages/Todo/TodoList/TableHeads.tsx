"use client";
import { TableHead, TableRow } from "@/components/ui/table";

export const TableHeads = () => {
  return (
    <TableRow className="">
      <TableHead>Completed</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Created</TableHead>
      <TableHead>Deadline</TableHead>
      <TableHead>Priority</TableHead>
      <TableHead>Modify</TableHead>
      <TableHead>Delete</TableHead>
    </TableRow>
  );
};
