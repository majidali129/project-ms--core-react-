import { Navigate, Route, Routes } from "react-router";
import {
  calendarPath,
  dashboardPath,
  profilePath,
  projectsPath,
  reportsPath,
  settingsPath,
  signInPath,
  signUpPath,
  tasksPath,
  teamPath,
  teamsPath,
} from "./paths";
import { DashboardPage } from "./pages/dashboard";
import { ProjectsPage } from "./pages/projects";
import { TasksPage } from "./pages/tasks";
import { CalendarPage } from "./pages/calendar";
import { SettingsPage } from "./pages/settings";
import { ProfilePage } from "./pages/profile";
import { ReportsPage } from "./pages/reports";
import { TeamsPage } from "./pages/teams";
import { TeamPage } from "./pages/team";
import { AuthLayout } from "./features/auth/components/auth-layout";
import { SignUpPage } from "./pages/sign-up";
import { SignInPage } from "./pages/sign-in";
import { AppLayout } from "./components/app-layout";
import { ProjectDetailsPage } from "./pages/project-details-page";

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to={dashboardPath()} />} />
        <Route path={dashboardPath()} element={<DashboardPage />} />
        <Route path={projectsPath()} element={<ProjectsPage />} />
        <Route path="projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path={tasksPath()} element={<TasksPage />} />
        <Route path={calendarPath()} element={<CalendarPage />} />
        <Route path={teamPath()} element={<TeamPage />} />
        <Route path={teamsPath()} element={<TeamsPage />} />
        <Route path={reportsPath()} element={<ReportsPage />} />
        <Route path={profilePath()} element={<ProfilePage />} />
        <Route path={settingsPath()} element={<SettingsPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path={signUpPath()} element={<SignUpPage />} />
        <Route path={signInPath()} element={<SignInPage />} />
      </Route>
    </Routes>
  );
};

export default App;
