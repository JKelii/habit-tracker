import { Label } from "@/components/ui/label";
import { habitIcons } from "@/lib/habitIcons";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

export const HabitIcons = ({
  setValue,
}: {
  setValue: UseFormSetValue<{
    icon?: string | undefined;
    title: string;
    description: string;
  }>;
}) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleIconSelect = (iconName: string) => {
    if (iconName) {
      setValue("icon", iconName);
      setSelectedIcon(iconName);
    } else {
      setValue("icon", "");
      setSelectedIcon(iconName);
    }
  };

  return (
    <div className="grid gap-2">
      <Label>Choose an Icon</Label>
      <div className="grid grid-cols-6 gap-2 p-2 border rounded-md max-h-[200px] overflow-y-auto">
        {habitIcons.map((iconOption, index) => {
          const IconComponent = iconOption.icon;
          const isSelected = selectedIcon === iconOption.name;
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleIconSelect(iconOption.name)}
              className={cn(
                isSelected ? "bg-neutral-300/20" : "",
                `p-2 rounded-md flex flex-col items-center justify-center gap-1 text-xs hover:bg-muted transition-colors`
              )}
              title={iconOption.name}
            >
              <IconComponent className="h-6 w-6" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
