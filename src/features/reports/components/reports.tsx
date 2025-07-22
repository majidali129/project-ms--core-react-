"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  CheckCircle2,
  DollarSign,
  Filter,
  FolderOpen,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Search,
  Users,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";

type ProjectStatus =
  | "planning"
  | "active"
  | "on-hold"
  | "completed"
  | "cancelled";
type ProjectPriority = "high" | "medium" | "low" | "critical";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  teamMembers: TeamMember[];
  tasksTotal: number;
  tasksCompleted: number;
  client: string;
  tags: string[];
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Platform Redesign",
    description:
      "Complete overhaul of the existing e-commerce platform with modern UI/UX, improved performance, and mobile-first approach.",
    status: "active",
    priority: "high",
    progress: 65,
    budget: 150000,
    spent: 97500,
    startDate: "2024-01-01",
    endDate: "2024-04-30",
    teamMembers: [
      {
        id: "1",
        name: "Sarah Johnson",
        role: "Project Manager",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: "2",
        name: "Mike Chen",
        role: "Lead Developer",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: "3",
        name: "Emma Davis",
        role: "UI/UX Designer",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    tasksTotal: 45,
    tasksCompleted: 29,
    client: "TechCorp Inc.",
    tags: ["web", "ecommerce", "redesign"],
  },
  {
    id: "2",
    name: "Mobile Banking App",
    description:
      "Development of a secure mobile banking application with biometric authentication and real-time transaction monitoring.",
    status: "planning",
    priority: "critical",
    progress: 15,
    budget: 200000,
    spent: 30000,
    startDate: "2024-02-01",
    endDate: "2024-08-31",
    teamMembers: [
      {
        id: "4",
        name: "Alex Rivera",
        role: "Tech Lead",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: "5",
        name: "Lisa Wang",
        role: "Security Expert",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    tasksTotal: 60,
    tasksCompleted: 9,
    client: "SecureBank Ltd.",
    tags: ["mobile", "banking", "security"],
  },
  {
    id: "3",
    name: "Data Analytics Dashboard",
    description:
      "Business intelligence dashboard for real-time data visualization and reporting with advanced analytics capabilities.",
    status: "completed",
    priority: "medium",
    progress: 100,
    budget: 80000,
    spent: 75000,
    startDate: "2023-10-01",
    endDate: "2024-01-15",
    teamMembers: [
      {
        id: "6",
        name: "John Smith",
        role: "Data Engineer",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: "7",
        name: "Maria Garcia",
        role: "Frontend Developer",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    tasksTotal: 32,
    tasksCompleted: 32,
    client: "DataFlow Systems",
    tags: ["analytics", "dashboard", "data"],
  },
  {
    id: "4",
    name: "Cloud Migration Project",
    description:
      "Migration of legacy systems to cloud infrastructure with improved scalability and cost optimization.",
    status: "on-hold",
    priority: "low",
    progress: 40,
    budget: 120000,
    spent: 48000,
    startDate: "2023-12-01",
    endDate: "2024-06-30",
    teamMembers: [
      {
        id: "8",
        name: "David Kim",
        role: "DevOps Engineer",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: "9",
        name: "Rachel Brown",
        role: "Cloud Architect",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    tasksTotal: 28,
    tasksCompleted: 11,
    client: "Legacy Corp",
    tags: ["cloud", "migration", "infrastructure"],
  },
  {
    id: "5",
    name: "AI Chatbot Integration",
    description:
      "Implementation of AI-powered chatbot for customer support with natural language processing and machine learning.",
    status: "cancelled",
    priority: "medium",
    progress: 25,
    budget: 90000,
    spent: 22500,
    startDate: "2023-11-01",
    endDate: "2024-03-31",
    teamMembers: [
      {
        id: "10",
        name: "Tom Wilson",
        role: "AI Engineer",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    tasksTotal: 35,
    tasksCompleted: 8,
    client: "SupportTech Inc.",
    tags: ["ai", "chatbot", "ml"],
  },
];

const statusColors = {
  planning: "bg-purple-100 text-purple-800 border-purple-200",
  active: "bg-blue-100 text-blue-800 border-blue-200",
  "on-hold": "bg-yellow-100 text-yellow-800 border-yellow-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const priorityColors = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

const statusIcons = {
  planning: Clock,
  active: Play,
  "on-hold": Pause,
  completed: CheckCircle2,
  cancelled: Target,
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) => {
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || project.priority === priorityFilter;
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const updateProjectStatus = (projectId: string, newStatus: ProjectStatus) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, status: newStatus } : project
      )
    );
  };

  const updateProjectPriority = (
    projectId: string,
    newPriority: ProjectPriority
  ) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, priority: newPriority }
          : project
      )
    );
  };

  const markAsCompleted = (projectId: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, status: "completed", progress: 100 }
          : project
      )
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  //   const getProgressColor = (progress: number) => {
  //     if (progress >= 80) return "bg-green-500";
  //     if (progress >= 60) return "bg-blue-500";
  //     if (progress >= 40) return "bg-yellow-500";
  //     return "bg-gray-400";
  //   };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track your project portfolio
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.filter((p) => p.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.filter((p) => p.status === "completed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(projects.reduce((sum, p) => sum + p.budget, 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => {
          const StatusIcon = statusIcons[project.status];
          return (
            <Card
              key={project.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
              onClick={() => setSelectedProject(project)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-lg leading-tight">
                      {project.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`text-xs ${
                          statusColors[project.status]
                        } flex items-center gap-1`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {project.status.charAt(0).toUpperCase() +
                          project.status.slice(1).replace("-", " ")}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          priorityColors[project.priority]
                        }`}
                      >
                        {project.priority.charAt(0).toUpperCase() +
                          project.priority.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsCompleted(project.id);
                        }}
                        disabled={project.status === "completed"}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Mark as Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          updateProjectStatus(project.id, "active");
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Set to Active
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          updateProjectStatus(project.id, "on-hold");
                        }}
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Put on Hold
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="line-clamp-2">
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

                {/* Budget */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <DollarSign className="w-3 h-3" />
                    <span>Budget</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {formatCurrency(project.spent)} /{" "}
                      {formatCurrency(project.budget)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((project.spent / project.budget) * 100)}% used
                    </div>
                  </div>
                </div>

                {/* Tasks */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Target className="w-3 h-3" />
                    <span>Tasks</span>
                  </div>
                  <span className="font-medium">
                    {project.tasksCompleted} / {project.tasksTotal}
                  </span>
                </div>

                {/* Team */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>Team</span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.teamMembers.slice(0, 3).map((member) => (
                      <Avatar
                        key={member.id}
                        className="w-6 h-6 border-2 border-background"
                      >
                        <AvatarImage
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                        />
                        <AvatarFallback className="text-xs">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.teamMembers.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                        +{project.teamMembers.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Client */}
                <div className="text-sm text-muted-foreground">
                  Client:{" "}
                  <span className="font-medium text-foreground">
                    {project.client}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedProject.name}
                </DialogTitle>
                <DialogDescription>
                  Project details and management options
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Status and Priority */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={selectedProject.status}
                      onValueChange={(value: ProjectStatus) => {
                        updateProjectStatus(selectedProject.id, value);
                        setSelectedProject({
                          ...selectedProject,
                          status: value,
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={selectedProject.priority}
                      onValueChange={(value: ProjectPriority) => {
                        updateProjectPriority(selectedProject.id, value);
                        setSelectedProject({
                          ...selectedProject,
                          priority: value,
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={selectedProject.description}
                    readOnly
                    className="min-h-[100px]"
                  />
                </div>

                {/* Progress and Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-2">
                        {selectedProject.progress}%
                      </div>
                      <Progress
                        value={selectedProject.progress}
                        className="h-2"
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Budget Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-1">
                        {Math.round(
                          (selectedProject.spent / selectedProject.budget) * 100
                        )}
                        %
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(selectedProject.spent)} /{" "}
                        {formatCurrency(selectedProject.budget)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Task Completion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-1">
                        {Math.round(
                          (selectedProject.tasksCompleted /
                            selectedProject.tasksTotal) *
                            100
                        )}
                        %
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedProject.tasksCompleted} /{" "}
                        {selectedProject.tasksTotal} tasks
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline and Client */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(
                          selectedProject.startDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(selectedProject.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Client</Label>
                    <div className="p-2 border rounded">
                      <span className="font-medium">
                        {selectedProject.client}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div className="space-y-3">
                  <Label>Team Members</Label>
                  <div className="grid gap-3">
                    {selectedProject.teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center gap-3 p-3 border rounded-lg"
                      >
                        <Avatar>
                          <AvatarImage
                            src={member.avatar || "/placeholder.svg"}
                            alt={member.name}
                          />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {member.role}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => {
                      markAsCompleted(selectedProject.id);
                      setSelectedProject({
                        ...selectedProject,
                        status: "completed",
                        progress: 100,
                      });
                    }}
                    disabled={selectedProject.status === "completed"}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Mark as Completed
                  </Button>
                  <Button variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline">Edit Project</Button>
                  <Button variant="outline">Add Team Member</Button>
                  <Button variant="outline">Export Report</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
