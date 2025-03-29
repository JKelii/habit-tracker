"use client";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

export const DraggableTask = ({ id, title }: { id: string; title: string }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "w-full h-8 flex justify-start items-center gap-4 hover:bg-neutral-700/55 rounded-md px-2 py-1 cursor-grab",
        isDragging && "opacity-50"
      )}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.1) rotate(5deg) `
          : "none",
        transition: isDragging ? "none" : "transform 0.2s ease",
      }}
    >
      <article className="flex justify-center items-center gap-1">
        <GripVertical className="size-4" />
        <p className="text-sm font-semibold">{title}</p>
      </article>
    </div>
  );
};
