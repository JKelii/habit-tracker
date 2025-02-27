import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { UseFormSetValue } from "react-hook-form";

type FormData = {
  title: string;
  deadline: Date;
  matrix: string;
};

type SelectPriorityType = {
  setValue: UseFormSetValue<FormData>;
};

export const SelectPriority = ({ setValue }: SelectPriorityType) => {
  const handleValueChange = (value: string) => {
    setValue("matrix", value);
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>1 - Most Important / 4 - Least Important</SelectLabel>
          <SelectItem value="1" className="hover:bg-black/50">
            1
          </SelectItem>
          <SelectItem value="2" className="hover:bg-black/50">
            2
          </SelectItem>
          <SelectItem value="3" className="hover:bg-black/50">
            3
          </SelectItem>
          <SelectItem value="4" className="hover:bg-black/50">
            4
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
