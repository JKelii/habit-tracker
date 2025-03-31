"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { DeleteHabit } from "./DeleteHabit";

type HabitDropdownProps = {
  habitId: string;
};

export const HabitDropdown = ({ habitId }: HabitDropdownProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div whileHover={{ scale: 1.1 }}>
            <EllipsisIcon className="text-muted-foreground" />
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
            <span className="flex items-center gap-3 text-destructive">
              <Trash2 className="size-4" />
              Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteHabit
        habitId={habitId}
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
    </>
  );
};
