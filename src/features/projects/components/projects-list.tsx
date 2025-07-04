import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Users } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of company website with modern design",
    status: "In Progress",
    progress: 65,
    dueDate: "2024-02-15",
    team: [
      { name: "Alice", avatar: "/placeholder.svg" },
      { name: "Bob", avatar: "/placeholder.svg" },
      { name: "Carol", avatar: "/placeholder.svg" },
    ],
    tasks: 24,
    completedTasks: 16,
    priority: "High",
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "iOS and Android app for customer engagement",
    status: "Planning",
    progress: 15,
    dueDate: "2024-03-30",
    team: [
      { name: "David", avatar: "/placeholder.svg" },
      { name: "Eve", avatar: "/placeholder.svg" },
    ],
    tasks: 42,
    completedTasks: 6,
    priority: "Medium",
  },
  {
    id: 3,
    name: "API Integration",
    description: "Third-party service integrations and API development",
    status: "Review",
    progress: 90,
    dueDate: "2024-01-25",
    team: [
      { name: "Frank", avatar: "/placeholder.svg" },
      { name: "Grace", avatar: "/placeholder.svg" },
      { name: "Henry", avatar: "/placeholder.svg" },
    ],
    tasks: 18,
    completedTasks: 16,
    priority: "High",
  },
  {
    id: 4,
    name: "Marketing Campaign",
    description: "Q1 marketing campaign launch and content creation",
    status: "Completed",
    progress: 100,
    dueDate: "2024-01-15",
    team: [
      { name: "Ivy", avatar: "/placeholder.svg" },
      { name: "Jack", avatar: "/placeholder.svg" },
    ],
    tasks: 12,
    completedTasks: 12,
    priority: "Low",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Planning":
      return "bg-warning/10 text-warning border-warning/20";
    case "In Progress":
      return "bg-primary/10 text-primary border-primary/20";
    case "Review":
      return "bg-accent/10 text-accent-foreground border-accent/20";
    case "Completed":
      return "bg-success/10 text-success border-success/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "Medium":
      return "bg-warning/10 text-warning border-warning/20";
    case "Low":
      return "bg-muted text-muted-foreground border-muted/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};
export const ProjectsList = () => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">All Projects</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="overdue">Overdue</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {project.description}
                    </CardDescription>
                  </div>
                  <Badge className={getPriorityColor(project.priority)}>
                    {project.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status and Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {project.progress}%
                    </span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      {project.completedTasks}/{project.tasks} tasks
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{project.dueDate}</span>
                  </div>
                </div>

                {/* Team */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Team</span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.team.map((member, index) => (
                      <Avatar
                        key={index}
                        className="h-6 w-6 border-2 border-background"
                      >
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-xs">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="active">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects
            .filter((p) => p.status !== "Completed")
            .map((project) => (
              <Card
                key={project.id}
                className="hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                {/* Same card content as above */}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {project.description}
                      </CardDescription>
                    </div>
                    <Badge className={getPriorityColor(project.priority)}>
                      {project.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {project.progress}%
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {project.completedTasks}/{project.tasks} tasks
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{project.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Team
                      </span>
                    </div>
                    <div className="flex -space-x-2">
                      {project.team.map((member, index) => (
                        <Avatar
                          key={index}
                          className="h-6 w-6 border-2 border-background"
                        >
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="text-xs">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </TabsContent>

      <TabsContent value="completed">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects
            .filter((p) => p.status === "Completed")
            .map((project) => (
              <Card
                key={project.id}
                className="hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                {/* Same card content */}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {project.description}
                      </CardDescription>
                    </div>
                    <Badge className={getPriorityColor(project.priority)}>
                      {project.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {project.progress}%
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {project.completedTasks}/{project.tasks} tasks
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{project.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Team
                      </span>
                    </div>
                    <div className="flex -space-x-2">
                      {project.team.map((member, index) => (
                        <Avatar
                          key={index}
                          className="h-6 w-6 border-2 border-background"
                        >
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="text-xs">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </TabsContent>

      <TabsContent value="overdue">
        <div className="text-center py-8">
          <p className="text-muted-foreground">No overdue projects</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};
