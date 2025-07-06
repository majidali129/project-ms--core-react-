import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, Target } from "lucide-react";
import { getProjectStatusColor } from "@/utils/constans/colors";
import type { Project } from "@/types/index";

type ProjectItemProps = {
  project: Project;
};

export const ProjectItem = ({ project }: ProjectItemProps) => {
  // const formatCurrency = (amount: number) => {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //     minimumFractionDigits: 0,
  //   }).format(amount);
  // };

  return (
    <Card
      key={project.id}
      className="hover:shadow-card transition-all duration-300 hover:-translate-y-1 gap-0 py-6 *:px-4"
    >
      {/* Same card content */}
      <CardHeader>
        <div className="flex flex-between ">
          <h5
            className={`text-[1rem] font-medium  text-foreground line-clamp-1`}
          >
            {project.name}
          </h5>
          {/* <TaskMoreMenu task={task} /> */}
          <MoreHorizontal className="size-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3.5">
          <div className="flex items-center gap-3">
            <Badge variant="outline">{/* {} */} web-dev</Badge>

            <Badge className={getProjectStatusColor[project.status]}>
              {project.status}
            </Badge>
          </div>
          <CardDescription className="text-xs line-clamp-1">
            {project.description}
          </CardDescription>
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          {/* Tasks */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Target className="w-3 h-3" />
              <span>Tasks</span>
            </div>
            <span className="font-medium">
              {/* {project.tasksCompleted} / {project.tasksTotal} */}
              20/43
            </span>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {project.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
