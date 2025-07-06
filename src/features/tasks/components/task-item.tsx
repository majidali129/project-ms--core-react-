import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, AlertCircle } from "lucide-react";
import {
  getPriorityColors,
  getTaskStatusColors,
} from "@/utils/constans/colors";
import { format } from "date-fns";
import type { Task } from "@/types";
import { cn } from "@/lib/utils";
import { TaskMoreMenu } from "./task-more-menu";

type TaskItemProps = {
  task: Task;
};

const isOverdue = (task: Task) => {
  return (
    task.dueDate !== null && task.dueDate < new Date() && task.status !== "done"
  );
};
export const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <Card
      key={task.id}
      className={cn(
        `hover:shadow-card transition-all duration-300 gap-0 py-6 *:px-4${
          isOverdue(task) ? "border-destructive/20" : ""
        } ${task.status === "done" ? "opacity-80" : ""}`
      )}
    >
      <CardHeader>
        <div className="flex flex-between">
          <h5
            className={`text-[1rem] font-medium  text-foreground line-clamp-1 ${
              task.status === "done" ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.title}
          </h5>
          <TaskMoreMenu task={task} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <Badge className={getPriorityColors[task.priority]}>
              {task.priority}
            </Badge>
            <Badge className={getTaskStatusColors[task.status]}>
              {task.status}
            </Badge>
          </div>
          <CardDescription className="text-xs line-clamp-1">
            {task.description}
          </CardDescription>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={task.assignee!} />
                <AvatarFallback className="text-xs">
                  {task.assignee?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {task.assignee}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span
                className={
                  isOverdue(task) ? "text-destructive font-medium" : ""
                }
              >
                {format(task.dueDate!, "d MM yyyy")}
                {isOverdue(task) && (
                  <AlertCircle className="h-[14px] w-[14px] inline ml-1" />
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[0.8rem]">
              {task.project}
            </Badge>
            {task.tags.slice(0, 1).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
