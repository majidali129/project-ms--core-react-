import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TabsContent } from "@/components/ui/tabs";
import { Clock, Target, Trophy } from "lucide-react";

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

export const ProfileOverview = () => {
  return (
    <TabsContent value="overview" className="space-y-6">
      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>Your latest project involvement</CardDescription>
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
                    project.status === "Completed" ? "default" : "secondary"
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
          <CardDescription>Your accomplishments and milestones</CardDescription>
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
                      <div className="font-medium">{achievement.title}</div>
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
  );
};
