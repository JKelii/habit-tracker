import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { UseFormSetValue } from "react-hook-form";

type FormData = {
  title: string;
  deadline: Date;
  matrix: string;
  category: string;
};

type SelectPriorityType = {
  setValue: UseFormSetValue<FormData>;
};

export const SelectPriority = ({ setValue }: SelectPriorityType) => {
  const handleValueChange = (value: string) => {
    setValue("matrix", value);
  };

  return (
    <>
      <Label htmlFor="matrix" className="self-start my-2 text-xs">
        Priority
      </Label>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1" className="hover:bg-black/50">
              Very High
            </SelectItem>
            <SelectItem value="2" className="hover:bg-black/50">
              High
            </SelectItem>
            <SelectItem value="3" className="hover:bg-black/50">
              Medium
            </SelectItem>
            <SelectItem value="4" className="hover:bg-black/50">
              Low
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
