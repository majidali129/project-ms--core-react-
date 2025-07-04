import { Button } from "@/components/ui/button";
import { DashboardStats } from "./dashboard-stats";
import { Folder, MoveRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, Check } from "lucide-react";
import { Link } from "react-router";
import { projectsPath } from "@/paths";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Modernizing the company website with new UI/UX",
    progress: 75,
    status: "In Progress",
    dueDate: "Dec 15, 2024",
    team: ["Alice", "Bob", "Carol"],
    priority: "High",
    tasksCompleted: 15,
    totalTasks: 20,
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Building iOS and Android mobile applications",
    progress: 45,
    status: "In Progress",
    dueDate: "Jan 30, 2025",
    team: ["David", "Eve", "Frank", "Grace"],
    priority: "Medium",
    tasksCompleted: 9,
    totalTasks: 20,
  },
  {
    id: 3,
    name: "API Integration",
    description: "Connecting third-party services and APIs",
    progress: 90,
    status: "Review",
    dueDate: "Nov 25, 2024",
    team: ["Henry", "Ivy"],
    priority: "High",
    tasksCompleted: 18,
    totalTasks: 20,
  },
  {
    id: 4,
    name: "Marketing Campaign",
    description: "Q1 digital marketing strategy and execution",
    progress: 25,
    status: "Planning",
    dueDate: "Mar 15, 2025",
    team: ["Jack", "Kate", "Liam"],
    priority: "Low",
    tasksCompleted: 5,
    totalTasks: 20,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Progress":
      return "bg-status-progress text-status-progress-foreground";
    case "Review":
      return "bg-status-review text-status-review-foreground";
    case "Planning":
      return "bg-status-todo text-status-todo-foreground";
    case "Completed":
      return "bg-status-done text-status-done-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-destructive text-destructive-foreground";
    case "Medium":
      return "bg-warning text-warning-foreground";
    case "Low":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const Dashboard = () => {
  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h2>Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <Button>
          <Folder className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>
      <DashboardStats />
      <div className="space-y-5">
        <div className="flex-between">
          <h3>Active Projects</h3>
          <Button
            asChild
            variant="outline"
            className="h-auto group hover:not(.dark):!text-primary hover:not(.dark):!bg-primary/5 transition-all duration-200"
          >
            <Link to={projectsPath()}>
              View All Projects
              <span className="hidden group-hover:block transition-all duration-200">
                <MoveRight />
              </span>
            </Link>
          </Button>
        </div>

        {/* Projects Grid */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="b group cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className=" group-hover:text-primary transition-colors">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </div>
                  <Badge className={getPriorityColor(project.priority)}>
                    {project.priority}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">
                      {project.progress}%
                    </span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Status and Due Date */}
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {}
                  </div>
                </div>

                {/* Tasks and Team */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Check className="h-4 w-4 mr-1" />
                    {project.tasksCompleted}/{project.totalTasks} tasks
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {project.team.length} members
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
