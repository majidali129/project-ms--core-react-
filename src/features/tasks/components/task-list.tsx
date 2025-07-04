import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, AlertCircle } from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "Design login page mockups",
    description:
      "Create wireframes and high-fidelity mockups for the new login interface",
    project: "Website Redesign",
    assignee: { name: "Alice", avatar: "/placeholder.svg" },
    priority: "High",
    status: "In Progress",
    dueDate: "2024-01-20",
    completed: false,
    tags: ["Design", "UI/UX"],
  },
  {
    id: 2,
    title: "Implement user authentication API",
    description: "Set up JWT authentication with refresh token functionality",
    project: "API Integration",
    assignee: { name: "Frank", avatar: "/placeholder.svg" },
    priority: "High",
    status: "In Progress",
    dueDate: "2024-01-22",
    completed: false,
    tags: ["Backend", "Security"],
  },
  {
    id: 3,
    title: "Write unit tests for payment module",
    description: "Create comprehensive test suite for payment processing",
    project: "Mobile App Development",
    assignee: { name: "David", avatar: "/placeholder.svg" },
    priority: "Medium",
    status: "Todo",
    dueDate: "2024-01-25",
    completed: false,
    tags: ["Testing", "Backend"],
  },
  {
    id: 4,
    title: "Update documentation",
    description: "Revise API documentation with new endpoints",
    project: "API Integration",
    assignee: { name: "Grace", avatar: "/placeholder.svg" },
    priority: "Low",
    status: "Review",
    dueDate: "2024-01-18",
    completed: false,
    tags: ["Documentation"],
  },
  {
    id: 5,
    title: "Social media content creation",
    description: "Design graphics and write copy for Q1 campaign",
    project: "Marketing Campaign",
    assignee: { name: "Ivy", avatar: "/placeholder.svg" },
    priority: "Medium",
    status: "Completed",
    dueDate: "2024-01-15",
    completed: true,
    tags: ["Marketing", "Design"],
  },
  {
    id: 6,
    title: "Database optimization",
    description: "Optimize query performance for user data retrieval",
    project: "Website Redesign",
    assignee: { name: "Bob", avatar: "/placeholder.svg" },
    priority: "High",
    status: "Todo",
    dueDate: "2024-01-28",
    completed: false,
    tags: ["Database", "Performance"],
  },
];

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "Todo":
      return "bg-muted text-muted-foreground border-muted/20";
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

const isOverdue = (dueDate: string) => {
  return (
    new Date(dueDate) < new Date() &&
    !tasks.find((t) => t.dueDate === dueDate)?.completed
  );
};
export const TaskList = () => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">All Tasks</TabsTrigger>
        <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
        <TabsTrigger value="overdue">Overdue</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Checkbox checked={task.completed} className="mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3
                          className={` text-lg text-foreground ${
                            task.completed
                              ? "line-through text-muted-foreground"
                              : ""
                          }`}
                        >
                          {task.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant="outline" className="text-xs">
                            {task.project}
                          </Badge>
                          {task.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span
                            className={
                              isOverdue(task.dueDate)
                                ? "text-destructive font-medium"
                                : ""
                            }
                          >
                            {task.dueDate}
                            {isOverdue(task.dueDate) && (
                              <AlertCircle className="h-3 w-3 inline ml-1" />
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assignee.avatar} />
                          <AvatarFallback className="text-xs">
                            {task.assignee.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {task.assignee.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="my-tasks">
        <div className="space-y-4">
          {tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <Card
                key={task.id}
                className="hover:shadow-card transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Checkbox checked={task.completed} className="mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg">{task.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.description}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <Badge variant="outline" className="text-xs">
                              {task.project}
                            </Badge>
                            {task.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span
                              className={
                                isOverdue(task.dueDate)
                                  ? "text-destructive font-medium"
                                  : ""
                              }
                            >
                              {task.dueDate}
                              {isOverdue(task.dueDate) && (
                                <AlertCircle className="h-3 w-3 inline ml-1" />
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignee.avatar} />
                            <AvatarFallback className="text-xs">
                              {task.assignee.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">
                            {task.assignee.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </TabsContent>

      <TabsContent value="overdue">
        <div className="space-y-4">
          {tasks.filter((task) => isOverdue(task.dueDate) && !task.completed)
            .length > 0 ? (
            tasks
              .filter((task) => isOverdue(task.dueDate) && !task.completed)
              .map((task) => (
                <Card
                  key={task.id}
                  className="hover:shadow-card transition-all duration-300 border-destructive/20"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Checkbox checked={task.completed} className="mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg">{task.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {task.description}
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                              <Badge variant="outline" className="text-xs">
                                {task.project}
                              </Badge>
                              {task.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span className="text-destructive font-medium">
                                {task.dueDate}
                                <AlertCircle className="h-3 w-3 inline ml-1" />
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.assignee.avatar} />
                              <AvatarFallback className="text-xs">
                                {task.assignee.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                              {task.assignee.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No overdue tasks</p>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="completed">
        <div className="space-y-4">
          {tasks
            .filter((task) => task.completed)
            .map((task) => (
              <Card
                key={task.id}
                className="hover:shadow-card transition-all duration-300 opacity-75"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Checkbox checked={task.completed} className="mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg">{task.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.description}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <Badge variant="outline" className="text-xs">
                              {task.project}
                            </Badge>
                            {task.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{task.dueDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignee.avatar} />
                            <AvatarFallback className="text-xs">
                              {task.assignee.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">
                            {task.assignee.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
