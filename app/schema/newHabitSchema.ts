import { object, string } from "yup";

export const habitSchema = object({
  title: string().required().min(1),
  description: string().required().min(1).max(40),
  icon: string().optional(),
});
