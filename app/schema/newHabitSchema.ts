import { object, string } from "yup";

export const habitSchema = object({
  title: string().required().min(1),
});
