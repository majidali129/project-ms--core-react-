import { ReusableDialog } from "@/components/re-usable-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import { AssignTaskForm } from "@/features/tasks/components/assign-task-form";
import { useAppSelector } from "@/store/hooks";
import type { Project } from "@/types";
import { getPriorityColors, getTaskStatusColors } from "@/utils/constants";
import { format } from "date-fns";
import { Calendar, ClipboardList, Plus, User } from "lucide-react";
import { useState } from "react";

type Role = "project-manager" | "admin" | "user";

type ProjectTasksListProps = {
  project: Project;
};
export const ProjectTasksList = ({ project }: ProjectTasksListProps) => {
  const [role] = useState<Role>("project-manager");
  const allTasks = useAppSelector((state) => state.tasks.tasks);
  const isManagerOrAdmin = role === "project-manager" || role === "admin";
  const projectTasks = allTasks.filter((task) => task.project === project.id);
  console.log(projectTasks);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Project Tasks ({projectTasks.length})
          </CardTitle>
          {isManagerOrAdmin && (
            <ReusableDialog
              className="sm:max-w-[35rem]"
              children={<AssignTaskForm project={project} />}
              trigger={
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Assign Task
                  </Button>
                </DialogTrigger>
              }
            />
          )}
        </div>
        <CardDescription>Tasks assigned to team members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {projectTasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{task.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {task.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getTaskStatusColors[task.status]}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={getPriorityColors[task.priority]}
                  >
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{task.assignee}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      Due: {format(new Date(task.dueDate!), "MMM dd")}
                    </span>
                  </div>
                </div>

                {task.tags && task.tags.length > 0 && (
                  <div className="flex gap-1">
                    {task.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
