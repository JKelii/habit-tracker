import { date, object, string } from "yup";

export const todoSchema = object({
  title: string().required().min(1).max(32),
  deadline: date()
    .nullable()
    .required("Deadline is required")
    .typeError("Invalid date"),
  matrix: string().required("Select priority"),
  category: string().required(),
});
