import {
  CheckCheck,
  CheckSquare,
  Home,
  ListOrdered,
  Timer,
} from "lucide-react";

export const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Habits",
    url: "/habits",
    icon: CheckCheck,
  },
  {
    title: "To do",
    url: "/todo",
    icon: CheckSquare,
  },
  {
    title: "Pomodoro",
    url: "/pomodoro",
    icon: Timer,
  },
  {
    title: "Eisenhower Matrix ",
    url: "/matrix",
    icon: ListOrdered,
  },
];
