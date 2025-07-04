import { useState } from "react";
import { SidebarItem } from "./sidebar-item";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  FileText,
  Folder,
  // Calendar,
  Users,
  Check,
  Clock,
  User,
  Settings,
  Target,
} from "lucide-react";
import {
  // calendarPath,
  dashboardPath,
  homePath,
  profilePath,
  projectsPath,
  reportsPath,
  settingsPath,
  tasksPath,
  teamsPath,
} from "@/paths";
import { Link } from "react-router";

const navLinks = [
  { label: "Dashboard", href: dashboardPath(), icon: <Folder /> },
  { label: "Projects", href: projectsPath(), icon: <FileText /> },
  { label: "Tasks", href: tasksPath(), icon: <Check /> },
  // { label: "Calendar", href: calendarPath(), icon: <Calendar /> },
  { label: "Teams", href: teamsPath(), icon: <Users /> },
  { label: "Reports", href: reportsPath(), icon: <Clock /> },
  { label: "Profile", href: profilePath(), icon: <User /> },
  { label: "Settings", href: settingsPath(), icon: <Settings /> },
];

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <aside
      className={`max-md:fixed relative max-md:top-0 max-md:left-0 min-h-screen w-14 max-md:z-30 px-2 md:px-4  md:w-[14rem] bg-sidebar transition-all duration-300 ease-in-out `}
    >
      <div className="min-h-14   flex items-center justify-start relative">
        <Link to={homePath()} className="w-full">
          <h4 className="text-center hidden md:!block text-foreground">
            ProjectFlow
          </h4>
          <div className="md:!hidden w-full flex-center">
            <Target className="size-8 text-primary/80" />
          </div>
        </Link>
        <div
          role="button"
          className="absolute hidden -right-[17px] top-1/2 -translate-y-1/2 !size-9 p-1"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <ArrowLeftCircleIcon className=" w-7 h-7 stroke-1 " />
          ) : (
            <ArrowRightCircleIcon className=" w-7 h-7 stroke-1 " />
          )}
        </div>
      </div>
      <ul className="flex flex-col gap-y-2 py-8 md:py-3">
        {navLinks.map((link) => (
          <SidebarItem key={link.href} link={link} />
        ))}
      </ul>
      {/* <UserProfile open={open} /> */}
    </aside>
  );
};
