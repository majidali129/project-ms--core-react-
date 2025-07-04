import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus, Search } from "lucide-react";
import { TaskList } from "./task-list";

export const Tasks = () => {
  return (
    <section className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Tasks</h2>
          <p className="text-muted-foreground">Track and manage your tasks</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>
      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search tasks..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Tasks Grid */}
      <TaskList />
    </section>
  );
};
