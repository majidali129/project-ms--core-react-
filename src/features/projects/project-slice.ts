import { projects } from "@/data/projects";
import { teams } from "@/data/teams";
import type { Project, ProjectStatus } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type FilterValue<T> = T | "all";

type ProjectsInitialState = {
  projects: Project[];
  projectFilters: {
    status: FilterValue<ProjectStatus>;
  };
  query: string;
};

const initialState = {
  projects: projects,
  projectFilters: {
    status: "all",
  },
  query: "",
} satisfies ProjectsInitialState as ProjectsInitialState;

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.unshift(action.payload);
    },
    deleteProject: (state, action: PayloadAction<{ id: string }>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload.id
      );
    },
    updateProject: (
      state,
      action: PayloadAction<{ projectId: string; updatedProject: Project }>
    ) => {
      const { projectId, updatedProject } = action.payload;
      state.projects = state.projects.map((project) =>
        project.id === projectId ? updatedProject : project
      );
    },
    allocateNewTeam: (
      state,
      action: PayloadAction<{ projectId: string; allocatedTeams: string[] }>
    ) => {
      const { projectId, allocatedTeams } = action.payload;
      const newTeams = teams.filter((team) => allocatedTeams.includes(team.id));

      state.projects = state.projects.map((project) =>
        project.id === projectId
          ? { ...project, teams: [...newTeams, ...project.teams] }
          : project
      );
    },

    deAllocateTeam: (
      state,
      action: PayloadAction<{ projectId: string; teamId: string }>
    ) => {
      const { projectId, teamId } = action.payload;
      state.projects = state.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              teams: project.teams.filter((team) => team.id !== teamId),
            }
          : project
      );
    },

    applyFilters: (state, action: PayloadAction<{ status: ProjectStatus }>) => {
      state.projectFilters.status = action.payload.status;
    },

    applySearch: (state, action: PayloadAction<string>) => {
      if (action.payload) state.projectFilters.status = "all";
      state.query = action.payload;
    },
  },
});

export const {
  addProject,
  deleteProject,
  allocateNewTeam,
  applyFilters,
  deAllocateTeam,
  updateProject,
  applySearch,
} = projectSlice.actions;

export default projectSlice.reducer;
