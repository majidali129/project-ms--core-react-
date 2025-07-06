import { SortFilterSelect } from "@/components/sort-filter-select";
import { useState } from "react";

const priorityOptions = [
  { label: "All Priority", value: "all" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
  { label: "Urgent", value: "urgent" },
];

export const TaskPrioritySelect = () => {
  const [status, setStatus] = useState("all");
  const onStatusChange = (value: string) => {
    console.log("Selected priority:", value);
    setStatus(value);
  };

  return (
    <SortFilterSelect
      options={priorityOptions}
      value={status}
      onValueChange={onStatusChange}
    />
  );
};
