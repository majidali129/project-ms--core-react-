import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { projects } from "@/data/projects";
import { teams } from "@/data/teams";
import { projectStatusColor, teamDomainColors } from "@/utils/constants";
import { statusIcons } from "@/utils/constants";
import { formatCurrency } from "@/utils/helpers";
import { SelectTrigger } from "@radix-ui/react-select";
import { format } from "date-fns";
import {
  Clock,
  Target,
  Plus,
  Settings,
  Building2,
  X,
  Users,
  User,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useState } from "react";

type Role = "project-manager" | "admin" | "user";
const ProjectDetails = () => {
  const [openTeamAllocateDialog, setOpenTeamAllocateDialog] = useState(false);
  const [project, setProject] = useState(projects[0]);
  const [domainFilter, setDomainFilter] = useState("all");
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [role] = useState<Role>("project-manager");
  const canManageTeams = role === "project-manager" || role === "admin";
  const StatusIcon = statusIcons[project.status];
  const availableDomains = teams.map((team) => team.domain);
  const allocatedTeamsIDs = project.teams.map((team) => team.id);
  const totalTeamMembersToProject = project.teams.reduce(
    (curr, acc) => curr + acc.members.length,
    0
  );

  const availableTeams = teams.filter(
    (team) => !allocatedTeamsIDs.includes(team.id)
  );

  const filteredAvailableTeams =
    domainFilter === "all"
      ? availableTeams
      : availableTeams.filter((team) => team.domain === domainFilter);

  const handleTeamAllocation = () => {
    const newTeams = teams.filter((team) => selectedTeams.includes(team.id));
    setProject((prev) => ({ ...prev, teams: [...newTeams, ...prev.teams] }));
    setOpenTeamAllocateDialog(false);
    setSelectedTeams([]);
    setDomainFilter("all");
  };

  const handleRemoveAllocatedTeam = (teamId: string) => {
    setProject((prev) => ({
      ...prev,
      teams: prev.teams.filter((team) => team.id !== teamId),
    }));
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h2>{project.name}</h2>
            <Badge className={projectStatusColor[project.status]}>
              <StatusIcon />
              {project.status}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            {" "}
            Project ID: <span className="text-sm">{project.id} </span>
          </p>
        </div>
        <div className="flex items-center flex-col *:max-md:w-full md:flex-row gap-2">
          <Dialog
            open={!!openTeamAllocateDialog}
            onOpenChange={setOpenTeamAllocateDialog}
          >
            {allocatedTeamsIDs.length === 0 && (
              <DialogTrigger asChild>
                <Button onClick={() => setOpenTeamAllocateDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Allocate Teams
                </Button>
              </DialogTrigger>
            )}
            <DialogContent className=" !max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Allocate Teams to Project</DialogTitle>
                <DialogDescription>
                  Select teams from different domains to assign to this project
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Domain Filter */}
                <div className="space-y-2">
                  <Label>Filter by Domain</Label>
                  <Select value={domainFilter} onValueChange={setDomainFilter}>
                    <SelectTrigger className="w-full text-start text-sm !outline-1 outline-border py-1.5 px-2 rounded">
                      <SelectValue placeholder="Select domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Domains</SelectItem>
                      {availableDomains.map((domain) => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Available Teams */}
                <div className="space-y-3">
                  <Label>Available Teams {availableTeams.length}</Label>
                  {availableTeams.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No teams available for allocation</p>
                      {domainFilter !== "all" && (
                        <p className="text-sm">
                          Try changing the domain filter
                        </p>
                      )}
                    </div>
                  )}
                  <div className="grid gap-3 max-h-60 overflow-y-auto">
                    {filteredAvailableTeams.map((team) => (
                      <div
                        key={team.id}
                        className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <Checkbox
                          id={team.name}
                          checked={selectedTeams.includes(team.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTeams([...selectedTeams, team.id]);
                            } else {
                              setSelectedTeams(
                                selectedTeams.filter(
                                  (sTeam) => sTeam !== team.id
                                )
                              );
                            }
                          }}
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={team.name}>
                              <h4 className="font-medium text-sm">
                                {team.name}
                              </h4>
                            </Label>
                            <Badge variant="outline">{team.domain}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {team.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-3 h-3" />
                            <span>{team.members.length}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Selected Teams Summary */}
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">
                    {selectedTeams.length} team(s) selected for allocation
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button
                    disabled={selectedTeams.length === 0}
                    onClick={handleTeamAllocation}
                  >
                    Allocate Selected Teams
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Settings />
            Edit Project
          </Button>
        </div>
      </div>

      {/* Project Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.progress}%</div>
            <Progress value={project.progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Usage</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((project.spent / project.budget) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalTeamMembersToProject}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {project.teams.length} teams
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.ceil(
                (project.endDate.getTime() - project.startDate.getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              days
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {format(project.startDate, "MMM dd yyyy")} -{" "}
              {format(project.endDate, "MMM dd, yyyy")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Project Details */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Description */}
          <Card className="gap-3">
            <CardHeader>
              <CardTitle>
                <h3>Project Description</h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </CardContent>
          </Card>

          {/* Allocated Teams */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  <h3> Allocated Teams ({project.teams.length})</h3>
                </CardTitle>
                {canManageTeams && project.teams.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setOpenTeamAllocateDialog(true)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add More
                  </Button>
                )}
              </div>
              <CardDescription>
                Teams currently working on this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              {project.teams.length === 0 ? (
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3>No Teams Allocated</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This project doesn't have any teams assigned yet.
                  </p>
                  {canManageTeams && (
                    <Button onClick={() => setOpenTeamAllocateDialog(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Allocate Teams
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {project.teams.map((team) => (
                    <div key={team.id} className="border rounded p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{team.name}</h4>
                            <Badge
                              variant="outline"
                              className={
                                teamDomainColors[
                                  team.domain as keyof typeof teamDomainColors
                                ]
                              }
                            >
                              {team.domain}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {team.description}
                          </p>
                        </div>
                        {canManageTeams && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveAllocatedTeam(team.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      {/* Team Members */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Users className="w-4 h-4" />
                          Team Members ({team.members.length})
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {team.members.map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center gap-2 text-sm"
                            >
                              <Avatar className="w-6 h-6">
                                <AvatarImage
                                  src={`/placeholder.svg?height=24&width=24`}
                                  alt={member.userName}
                                />
                                <AvatarFallback className="text-xs">
                                  {member.userName
                                    .split(".")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="truncate">
                                {member.userName}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle>
                <h3>Project Information</h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Created By</Label>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {project.createdBy.replace("-", " ")}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Timeline</Label>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>
                      Start: {format(project.startDate, "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>End: {format(project.endDate, "MMM dd, yyyy")}</span>
                  </div>
                </div>
              </div>

              {canManageTeams && (
                <>
                  <Separator />

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Budget Details
                    </Label>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Total Budget:</span>
                        <span className="font-medium">
                          {formatCurrency(project.budget)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Amount Spent:</span>
                        <span className="font-medium">
                          {formatCurrency(project.spent)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Remaining:</span>
                        <span className="font-medium text-green-600">
                          {formatCurrency(project.budget - project.spent)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {project.tags && project.tags.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tags</Label>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
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
                </>
              )}

              <Separator />

              <div className="space-y-1 text-xs text-muted-foreground">
                <div>
                  Created:{" "}
                  {format(project.createdAt, "MMM dd, yyyy 'at' HH:mm")}
                </div>
                <div>
                  Updated:{" "}
                  {format(project.updatedAt, "MMM dd, yyyy 'at' HH:mm")}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          {canManageTeams && (
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>Quick Actions</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Project
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Teams
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Update Progress
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export { ProjectDetails };
