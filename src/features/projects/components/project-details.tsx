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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { users } from "@/data/users";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { projectStatusColor } from "@/utils/constants";
import { statusIcons } from "@/utils/constants";
import { formatCurrency } from "@/utils/helpers";
import { format } from "date-fns";
import {
  Clock,
  Target,
  Plus,
  Settings,
  Building2,
  Users,
  User,
  Calendar,
  DollarSign,
  X,
  UserPlus,
  ClipboardList,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  addNewMembers,
  removeMember,
  updateProjectDeadline,
  updateProjectStatus,
} from "../project-slice";
import type { ProjectStatus } from "@/types";
import { DatePicker } from "@/components/date-picker";
import { ReusableDialog } from "@/components/re-usable-dialog";
import { AssignTaskForm } from "../../tasks/components/assign-task-form";
import { ProjectTasksList } from "./projec-tasks-list";
import { useUser } from "@/features/auth/hooks/use-user";
import { isPmOrAdmin } from "@/utils/is-pm-or-admin";
import { isOwner as isOwnerApi } from "@/utils/is-owner";

const ProjectDetails = () => {
  const [openAddTeamMember, setOpenAddTeamMember] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);
  const [domainFilter, setDomainFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const { projectId } = useParams<{ projectId: string }>();
  const projects = useAppSelector((state) => state.projects.projects);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const { user } = useUser();
  const isManagerOrAdmin = isPmOrAdmin(user?.user_metadata.role);
  const project = projects.find((project) => project.id === projectId)!;
  const isOwner = isOwnerApi(user?.user_metadata.userName, project?.createdBy);
  const [newStatus, setNewStatus] = useState<ProjectStatus | null>(null);
  const [newEndDate, setNewEndDate] = useState("");

  const availableDomains = Array.from(
    new Set(users.map((user) => user.domain))
  );

  const projectTasks = tasks.filter((task) => task.project === project?.id);

  // MOVE TO TOP ON MOUNT
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (project) {
      setNewStatus(project.status);
      setNewEndDate(project.endDate);
    }
  }, [project]);

  const handleUserAllocation = () => {
    dispatch(addNewMembers({ projectId: project.id as string, selectedUsers }));

    setOpenAddTeamMember(false);
    setDomainFilter("all");
    setSelectedUsers([]);
  };

  const handleStatusUpdate = () => {
    dispatch(
      updateProjectStatus({
        projectId: project.id as string,
        status: newStatus!,
      })
    );

    setIsStatusDialogOpen(false);
  };
  const handleDateUpdate = () => {
    dispatch(
      updateProjectDeadline({
        projectId: project.id as string,
        endDate: newEndDate,
      })
    );
    setIsDateDialogOpen(false);
  };
  console.log(project);

  const udpateStatusButton =
    isManagerOrAdmin && isOwner ? (
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Target className="w-4 h-4 mr-2" />
          Update Status
        </Button>
      </DialogTrigger>
    ) : null;
  const updateDueDateButton =
    isManagerOrAdmin && isOwner ? (
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          Update Due Date
        </Button>
      </DialogTrigger>
    ) : null;

  const editProjectButton =
    isManagerOrAdmin && isOwner ? (
      <DialogTrigger asChild>
        <Button size="sm" className="w-full" variant="outline">
          <Settings />
          Edit Project
        </Button>
      </DialogTrigger>
    ) : null;

  if (!project)
    return (
      <div className="text-4xl text-white text-center ">
        Project no longer exist
      </div>
    );

  const StatusIcon = statusIcons[project.status];
  const totalTeamMembersToProject = project.team.members.length || 0;
  const allocatedUserIDs = project.team.members.map((member) => member.id);
  const availableUsers = users.filter(
    (user) => !allocatedUserIDs?.includes(user.id)
  );
  const filteredAvailableusers =
    domainFilter === "all"
      ? availableUsers
      : availableUsers.filter((user) => user.domain === domainFilter);

  const addMemberToTeamButton =
    allocatedUserIDs?.length === 0 && isManagerOrAdmin ? (
      <DialogTrigger asChild>
        <Button size="sm" onClick={() => setOpenAddTeamMember(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </DialogTrigger>
    ) : null;

  const assignTaskButton =
    isManagerOrAdmin && isOwner && totalTeamMembersToProject > 0 ? (
      <DialogTrigger asChild>
        <Button size="sm" className="w-full">
          <UserPlus className="w-4 h-4 mr-2" />
          Assign Task
        </Button>
      </DialogTrigger>
    ) : null;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-wrap">{project.name}</h2>
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
                (new Date(project.endDate).getTime() -
                  new Date(project.startDate).getTime()) /
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectTasks.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {projectTasks.filter((task) => task.status === "done").length ||
                0}{" "}
              completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Project Details */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Description */}
          <Card className="gap-3 ">
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

          {/* Project Tasks */}
          <ProjectTasksList project={project} />

          {/* Allocated Teams */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  <h3>
                    {" "}
                    Allocated Team{" "}
                    <Badge className="ml-2">{project.team.name}</Badge>{" "}
                  </h3>
                </CardTitle>
                {isManagerOrAdmin &&
                  project.team &&
                  project.team.members.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOpenAddTeamMember(true)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add More
                    </Button>
                  )}
              </div>
              <CardDescription>
                Team members currently working on this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              {project.team?.members.length === 0 ? (
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3>No Team Member Allocated Yet.</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This project doesn't have any team to work yet.
                  </p>
                  {isManagerOrAdmin && (
                    <Button onClick={() => setOpenAddTeamMember(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Members
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Users className="w-4 h-4" />
                      Team Members ({project.team?.members.length})
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-2 py-2">
                      {project.team?.members.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between gap-2 text-sm shadow-lg border border-input rounded py-1.5 px-2"
                        >
                          <div className="flex items-center gap-1.5">
                            <Avatar className="w-8 h-8">
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
                            <span className="truncate">{member.userName}</span>
                          </div>
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full hover:bg-destructive/10"
                            onClick={() =>
                              dispatch(
                                removeMember({
                                  projectId: project.id as string,
                                  memberId: member.id,
                                })
                              )
                            }
                          >
                            <X className="text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Info */}
          <Card className="">
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

              {isManagerOrAdmin && (
                <>
                  <Separator />

                  {isOwner && (
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
                  )}
                </>
              )}

              {project.tags && project.tags.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tags</Label>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
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
          {isManagerOrAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>
                  <h3>Quick Actions</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-col gap-2">
                  <Dialog
                    open={!!openAddTeamMember}
                    onOpenChange={setOpenAddTeamMember}
                  >
                    {addMemberToTeamButton}
                    <DialogContent className=" !max-w-2xl max-h-[80vh] md:max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Allocate Teams to Project</DialogTitle>
                        <DialogDescription>
                          Select teams from different domains to assign to this
                          project
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        {/* Domain Filter */}
                        <div className="space-y-2">
                          <Label>Filter by Domain</Label>
                          <Select
                            value={domainFilter}
                            onValueChange={setDomainFilter}
                          >
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
                          <Label>Available Teams {availableUsers.length}</Label>
                          {availableUsers.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                              <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                              <p>No users available for allocation</p>
                              {domainFilter !== "all" && (
                                <p className="text-sm">
                                  Try changing the domain filter
                                </p>
                              )}
                            </div>
                          )}
                          <div className="grid gap-3 max-h-60 overflow-y-auto">
                            {filteredAvailableusers.map((user) => (
                              <div
                                key={user.id}
                                className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                              >
                                <Checkbox
                                  id={user.id}
                                  checked={selectedUsers.includes(user.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedUsers([
                                        ...selectedUsers,
                                        user.id,
                                      ]);
                                    } else {
                                      setSelectedUsers(
                                        selectedUsers.filter(
                                          (sUser) => sUser !== user.id
                                        )
                                      );
                                    }
                                  }}
                                />
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <Label htmlFor={user.id}>
                                      <h4 className="font-medium text-sm">
                                        {user.userName}
                                      </h4>
                                    </Label>
                                    <Badge variant="outline">
                                      {user.domain}
                                    </Badge>
                                  </div>
                                  {/* <p className="text-sm text-muted-foreground">
                            {user.description}
                          </p> */}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Selected Teams Summary */}
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium text-blue-900">
                            {selectedUsers.length} user(s) selected for
                            allocation
                          </p>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setOpenAddTeamMember(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            disabled={selectedUsers.length === 0}
                            onClick={handleUserAllocation}
                          >
                            Allocate Selected Teams
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <>
                    <ReusableDialog
                      className="sm:!max-w-[35rem]  max-h-[50vh] md:max-h-[90vh] overflow-y-auto"
                      children={<AssignTaskForm project={project} />}
                      trigger={assignTaskButton}
                    />
                    {/* Status Update Dialog */}
                    <Dialog
                      open={isStatusDialogOpen}
                      onOpenChange={setIsStatusDialogOpen}
                    >
                      {udpateStatusButton}
                      <DialogContent className="!max-w-sm px-4 md:px-6">
                        <DialogHeader>
                          <DialogTitle>Update Project Status</DialogTitle>
                          <DialogDescription>
                            Change the current status of this project
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Current Status</Label>
                            <div className="flex items-center gap-2 p-2 border rounded">
                              <StatusIcon className="w-4 h-4" />
                              <span className="capitalize">
                                {project.status.replace("-", " ")}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>New Status</Label>
                            <Select
                              value={newStatus!}
                              onValueChange={(value: ProjectStatus) =>
                                setNewStatus(value)
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="planning">
                                  Planning
                                </SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="on-hold">On Hold</SelectItem>
                                <SelectItem value="completed">
                                  Completed
                                </SelectItem>
                                <SelectItem value="cancelled">
                                  Cancelled
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex justify-end gap-2 pt-4">
                            <Button
                              variant="outline"
                              onClick={() => setIsStatusDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleStatusUpdate}
                              disabled={newStatus === project.status}
                            >
                              Update Status
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {/* Due Date Update Dialog */}
                    <Dialog
                      open={isDateDialogOpen}
                      onOpenChange={setIsDateDialogOpen}
                    >
                      {updateDueDateButton}
                      <DialogContent className="!max-w-sm px-4 md:px-6">
                        <DialogHeader>
                          <DialogTitle>Update Due Date</DialogTitle>
                          <DialogDescription>
                            Change the project's end date
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Current Due Date</Label>
                            <div className="flex items-center gap-2 p-2 border rounded">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {format(project.endDate, "MMM dd, yyyy")}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <DatePicker
                              label="New Due Date"
                              defaultValue={newEndDate}
                              onDateChange={(date) =>
                                setNewEndDate(date.toISOString())
                              }
                            />
                          </div>
                          <div className="flex justify-end gap-2 pt-4">
                            <Button
                              variant="outline"
                              onClick={() => setIsDateDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleDateUpdate}
                              disabled={
                                new Date(newEndDate).getTime() ===
                                new Date(project.endDate).getTime()
                              }
                            >
                              Update Due Date
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>

                  <ReusableDialog
                    className="sm:!max-w-[35rem] max-h-[80vh] md:max-h-[90vh] overflow-y-auto"
                    children={<h1>Project Edit Form</h1>}
                    trigger={editProjectButton}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export { ProjectDetails };
