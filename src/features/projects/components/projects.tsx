import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProjectsList } from "./projects-list";
import { ReusableDialog } from "@/components/re-usable-dialog";
import { CreateProjectForm } from "./create-project-form";
import { DialogTrigger } from "@/components/ui/dialog";

export const Projects = () => {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Projects</h2>
          <p className="text-muted-foreground">
            Manage and track all your projects
          </p>
        </div>

        <ReusableDialog
          className="sm:max-w-[35rem]"
          trigger={
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
          }
        >
          <CreateProjectForm />
        </ReusableDialog>
      </div>
      <ProjectsList />
    </section>
  );
};
