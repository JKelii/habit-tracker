export const CATEGORIES = [
  { id: 1, name: "Work" },
  { id: 2, name: "Personal" },
  { id: 3, name: "Shopping" },
  { id: 4, name: "Health" },
  { id: 5, name: "Finance" },
  { id: 6, name: "Education" },
  { id: 7, name: "Other" },
];

export const CATEGORY_STYLES: Record<string, string> = {
  Personal: "bg-blue-700",
  Work: "bg-amber-950",
  Shopping: "bg-pink-800",
  Health: "bg-emerald-800",
  Finance: "bg-amber-500",
  Education: "bg-fuchsia-800",
  Other: "bg-rose-800",
};

export const CATEGORY_BORDERS: Record<string, string> = {
  Personal: "border-l-4 border-blue-700",
  Work: "border-l-4 border-amber-950",
  Shopping: "border-l-4 border-pink-800",
  Health: "border-l-4 border-emerald-800",
  Finance: "border-l-4 border-amber-500",
  Education: "border-l-4 border-fuchsia-800",
  Other: "border-l-4 border--rose-800",
};

export const MATRIX_LABELS: Record<string, string> = {
  "1": "Very High",
  "2": "High",
  "3": "Medium",
  "4": "Low",
};
