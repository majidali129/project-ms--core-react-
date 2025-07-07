import { ProjectItem } from "./project-item";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProjectStatusSelect } from "./project-status-select";
import { applySearch } from "../project-slice";

export const ProjectsList = () => {
  const projects = useAppSelector((state) => state.projects.projects);
  const query = useAppSelector((state) => state.projects.query).toLowerCase();
  const { status } = useAppSelector((state) => state.projects.projectFilters);
  const dispatch = useAppDispatch();

  const filteredProjects = projects
    .filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
    )
    .filter((project) => {
      const matchesSttus = status === "all" || project.status === status;
      return matchesSttus;
    });

  console.log("query", query);
  return (
    <div className="space-y-8">
      <div className="flex-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            value={query}
            onChange={(e) => {
              console.log("Before:", e.target.value);
              const newValue = e.target.value.toLowerCase();
              console.log("After:", newValue);
              dispatch(applySearch(newValue));
            }}
            placeholder="Search tasks..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-4">
          <ProjectStatusSelect />
        </div>
      </div>
      <ul className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {filteredProjects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
};
