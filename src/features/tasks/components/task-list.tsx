import { TaskItem } from "./task-item";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TaskStatusSelect } from "./task-status-select";
import { TaskPrioritySelect } from "./task-priority-select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { applySearch } from "../task-slice";

export const TaskList = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const query = useAppSelector((state) => state.tasks.query).toLowerCase();
  const { status, priority } = useAppSelector(
    (state) => state.tasks.taskFilters
  );
  const dispatch = useAppDispatch();

  const filteredTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
    )
    .filter((task) => {
      const matchesSttus = status === "all" || task.status === status;
      const matchesPriority = priority === "all" || task.priority === priority;
      return matchesSttus && matchesPriority;
    });
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
          <TaskStatusSelect />
          <TaskPrioritySelect />
        </div>
      </div>

      <ul className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {filteredTasks.map((task) => (
          <TaskItem task={task} />
        ))}
      </ul>
    </div>
  );
};
