"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "./AddToDo";

export const DatePicker = ({
  setDate,
  date,
  register,
}: {
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  date: Date | undefined;
  register: UseFormRegister<FormData>;
}) => {
  const today = new Date();

  return (
    <Popover modal>
      <PopoverTrigger asChild id="date">
        <Button
          type="button"
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          {...register("deadline")}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          disabled={(currentDate) => {
            today.setHours(0, 0, 0, 0);
            return currentDate < today;
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
