import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Trophy,
  Target,
  Edit2,
  Camera,
  Bell,
  Shield,
  Palette,
} from "lucide-react";

export const Profile = () => {
  const userStats = {
    projectsCompleted: 24,
    tasksCompleted: 187,
    hoursWorked: 1240,
    teamCollaborations: 15,
    efficiency: 89,
    currentStreak: 12,
  };

  const recentProjects = [
    {
      name: "Website Redesign",
      role: "Lead Designer",
      completion: 85,
      status: "In Progress",
    },
    {
      name: "Mobile App Development",
      role: "UI Designer",
      completion: 100,
      status: "Completed",
    },
    {
      name: "API Integration",
      role: "Design Consultant",
      completion: 60,
      status: "In Progress",
    },
  ];

  const skills = [
    { name: "UI/UX Design", level: 95, category: "Design" },
    { name: "Figma", level: 90, category: "Tools" },
    { name: "Prototyping", level: 85, category: "Design" },
    { name: "User Research", level: 80, category: "Research" },
    { name: "Design Systems", level: 88, category: "Design" },
    { name: "React", level: 75, category: "Development" },
  ];

  const achievements = [
    {
      title: "Project Champion",
      description: "Led 5+ successful projects",
      icon: Trophy,
      earned: true,
      date: "2024-01-15",
    },
    {
      title: "Team Player",
      description: "Collaborated on 10+ projects",
      icon: Target,
      earned: true,
      date: "2023-12-20",
    },
    {
      title: "Speed Demon",
      description: "Complete tasks 20% faster than average",
      icon: Clock,
      earned: false,
      date: null,
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
        <Button className="gap-2">
          <Edit2 className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Overview */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className="relative mx-auto">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-2xl">AC</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <CardTitle>Alice Chen</CardTitle>
                <CardDescription>Senior Designer</CardDescription>
                <Badge variant="outline">Design Team</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  alice@company.com
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  +1 (555) 123-4567
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  San Francisco, CA
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Joined March 2022
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Profile Completion</span>
                  <span className="text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {userStats.projectsCompleted}
                </div>
                <div className="text-xs text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {userStats.tasksCompleted}
                </div>
                <div className="text-xs text-muted-foreground">Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {userStats.hoursWorked}
                </div>
                <div className="text-xs text-muted-foreground">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {userStats.efficiency}%
                </div>
                <div className="text-xs text-muted-foreground">Efficiency</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Recent Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>
                    Your latest project involvement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentProjects.map((project, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div className="flex-1">
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {project.role}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Progress
                              value={project.completion}
                              className="flex-1 h-2"
                            />
                            <span className="text-sm text-muted-foreground min-w-[3rem]">
                              {project.completion}%
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant={
                            project.status === "Completed"
                              ? "default"
                              : "secondary"
                          }
                          className="ml-3"
                        >
                          {project.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                  <CardDescription>
                    Your technical and professional skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{skill.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {skill.category}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>
                    Your accomplishments and milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {achievements.map((achievement, index) => {
                      const Icon = achievement.icon;
                      return (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${
                            achievement.earned
                              ? "bg-success/5 border-success/20"
                              : "bg-muted/20 border-muted/20 opacity-60"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`p-2 rounded-lg ${
                                achievement.earned
                                  ? "bg-success/10 text-success"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">
                                {achievement.title}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {achievement.description}
                              </div>
                              {achievement.earned && achievement.date && (
                                <div className="text-xs text-muted-foreground mt-2">
                                  Earned {achievement.date}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Alice" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Chen" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="alice@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      defaultValue="Senior Designer with 5+ years of experience in UI/UX design and product development."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="pst">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">
                          Pacific Standard Time
                        </SelectItem>
                        <SelectItem value="est">
                          Eastern Standard Time
                        </SelectItem>
                        <SelectItem value="cst">
                          Central Standard Time
                        </SelectItem>
                        <SelectItem value="mst">
                          Mountain Standard Time
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </CardTitle>
                  <CardDescription>
                    Manage your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive updates via email
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Task Reminders</div>
                      <div className="text-sm text-muted-foreground">
                        Get reminders for due tasks
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Project Updates</div>
                      <div className="text-sm text-muted-foreground">
                        Updates on project progress
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Weekly Reports</div>
                      <div className="text-sm text-muted-foreground">
                        Weekly productivity summaries
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Theme */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Appearance
                  </CardTitle>
                  <CardDescription>
                    Customize your interface appearance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Compact Mode</div>
                      <div className="text-sm text-muted-foreground">
                        Use condensed layout
                      </div>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest actions and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        action: "Completed task 'Design login page mockups'",
                        time: "2 hours ago",
                        type: "task",
                      },
                      {
                        action: "Updated project 'Website Redesign' status",
                        time: "4 hours ago",
                        type: "project",
                      },
                      {
                        action: "Added comment to 'Mobile App Development'",
                        time: "1 day ago",
                        type: "comment",
                      },
                      {
                        action: "Joined team meeting for API Integration",
                        time: "2 days ago",
                        type: "meeting",
                      },
                      {
                        action: "Uploaded design assets to project",
                        time: "3 days ago",
                        type: "upload",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg border"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                        <div className="flex-1">
                          <div className="font-medium">{activity.action}</div>
                          <div className="text-sm text-muted-foreground">
                            {activity.time}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Password</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Last changed 30 days ago
                        </span>
                        <Button variant="outline" size="sm">
                          Change Password
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">
                        Two-Factor Authentication
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Add an extra layer of security
                        </span>
                        <Button variant="outline" size="sm">
                          Enable 2FA
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">Active Sessions</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <div className="text-sm font-medium">
                              Current session
                            </div>
                            <div className="text-xs text-muted-foreground">
                              San Francisco, CA • Chrome
                            </div>
                          </div>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
