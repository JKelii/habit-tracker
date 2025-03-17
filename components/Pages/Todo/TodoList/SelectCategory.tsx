import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/constants/categories";
import React from "react";
import { UseFormSetValue } from "react-hook-form";

type FormData = {
  title: string;
  deadline: Date;
  matrix: string;
  category: string;
};

type SelectCategoryType = {
  setValue: UseFormSetValue<FormData>;
};

export const SelectCategory = ({ setValue }: SelectCategoryType) => {
  const handleValueChange = (value: string) => {
    setValue("category", value);
  };

  return (
    <>
      <Label htmlFor="category" className="self-start my-2 text-xs">
        Category
      </Label>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {CATEGORIES.map((category) => (
              <SelectItem
                value={category.name}
                key={category.id}
                className="hover:bg-black/50"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
