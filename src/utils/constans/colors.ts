// utils/colors.ts

// import type { Priority, Status } from "@/features/tasks/task-slice";
export type Priority = "High" | "Medium" | "Low" | "Urgent";
export type Status = "todo" | "progress" | "review" | "done";

export const priorityColors: Record<Priority, string> = {
  Urgent: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

export const statusColors: Record<Status, string> = {
  todo: "bg-gray-100 text-gray-700",
  progress: "bg-blue-100 text-blue-700",
  review: "bg-teal-100 text-teal-700",
  done: "bg-green-100 text-green-700",
};
