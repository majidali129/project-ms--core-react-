import { ProjectItem } from "./project-item";
import { Input } from "@/components/ui/input";
import { TaskStatusSelect } from "@/features/tasks/components/task-status-select";
import { TaskPrioritySelect } from "@/features/tasks/components/task-priority-select";
import { Search } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

export const ProjectsList = () => {
  const projects = useAppSelector((state) => state.projects.projects);
  return (
    <div className="space-y-8">
      <div className="flex-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search tasks..." className="pl-10" />
        </div>
        <div className="flex gap-4">
          <TaskStatusSelect />
          <TaskPrioritySelect />
        </div>
      </div>
      <ul className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
};
