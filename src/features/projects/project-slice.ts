import { projects } from "@/data/projects";
import type { Project } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ProjectsInitialState = {
  projects: Project[];
};

const initialState = {
  projects: projects,
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
  },
});

export const { addProject, deleteProject } = projectSlice.actions;

export default projectSlice.reducer;
