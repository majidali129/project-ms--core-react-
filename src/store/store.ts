import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "@/features/projects/project-slice";
import taskReducer from "@/features/tasks/task-slice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
