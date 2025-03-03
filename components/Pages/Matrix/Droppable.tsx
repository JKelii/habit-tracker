import { useDroppable } from "@dnd-kit/core";

export const Droppable = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="p-2 border border-gray-700 rounded-md">
      {children}
    </div>
  );
};
