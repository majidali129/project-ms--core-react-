import type { Priority, ProjectStatus, TaskStatus } from "@/types/index";

export const getPriorityColors: Record<Priority, string> = {
  urgent: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
};

export const getTaskStatusColors: Record<TaskStatus, string> = {
  todo: "bg-gray-100 text-gray-700",
  progress: "bg-blue-100 text-blue-700",
  review: "bg-teal-100 text-teal-700",
  done: "bg-green-100 text-green-700",
  overdue: "bg-red-100 text-red-700",
};

export const getProjectStatusColor: Record<ProjectStatus, string> = {
  active: "bg-blue-100 text-blue-700",
  planning: "bg-zinc-200 text-zinc-700",
  completed: "bg-green-100 text-green-700",
  "on-hold": "bg-lime-100 text-lime-700",
  cancelled: "bg-red-100 text-red-700",
};
