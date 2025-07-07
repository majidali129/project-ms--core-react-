import { CheckCircle2, Clock, Pause, Play, Target } from "lucide-react";

export const statusIcons = {
  planning: Clock,
  active: Play,
  "on-hold": Pause,
  completed: CheckCircle2,
  cancelled: Target,
};

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

export const projectStatusColor: Record<ProjectStatus, string> = {
  planning: "bg-purple-100 text-purple-800 border-purple-200",
  active: "bg-blue-100 text-blue-800 border-blue-200",
  "on-hold": "bg-yellow-100 text-yellow-800 border-yellow-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

export const teamDomainColors = {
  Frontend: "bg-blue-100 text-blue-800",
  Backend: "bg-green-100 text-green-800",
  Design: "bg-purple-100 text-purple-800",
  DevOps: "bg-orange-100 text-orange-800",
  QA: "bg-red-100 text-red-800",
  Mobile: "bg-indigo-100 text-indigo-800",
  Data: "bg-teal-100 text-teal-800",
};
