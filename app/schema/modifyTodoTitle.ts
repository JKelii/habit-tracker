import { object, string } from "yup";

export const modifyTodoSchema = object({
  title: string().required().min(1),
});
