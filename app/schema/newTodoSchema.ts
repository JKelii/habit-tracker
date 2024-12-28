import { date, object, string } from "yup";

export const todoSchema = object({
  title: string().required().min(1),
  deadline: date().default(() => new Date()),
});
