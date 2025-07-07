export type TaskStatus = "todo" | "progress" | "review" | "done" | "overdue";
export type Priority = "high" | "medium" | "low" | "urgent";
export type ProjectStatus =
  | "planning"
  | "active"
  | "on-hold"
  | "completed"
  | "cancelled";
export type TaskType = "bug" | "feature" | "improvement";

export type Team = {
  id: string;
  name: string;
  description: string;
  domain: string;
  members: { userName: string; id: string }[];
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  id: string | number;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  budget: number;
  spent: number;
  createdBy: string; // PROJECT-MANAGER | ADMIN
  startDate: string;
  endDate: string;
  teams: Team[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  project: string;
  type: TaskType;
  priority: Priority;
  status: TaskStatus;
  assignee: string | null;
  dueDate: string | null;
  estimatedTime: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};
