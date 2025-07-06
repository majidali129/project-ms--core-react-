import { SortFilterSelect } from "@/components/sort-filter-select";
import { useState } from "react";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Todo", value: "todo" },
  { label: "In-Progress", value: "progress" },
  { label: "Review", value: "review" },
  { label: "Done", value: "done" },
  { label: "Overdue", value: "overdue" },
];

export const TaskStatusSelect = () => {
  const [status, setStatus] = useState("all");
  const onStatusChange = (value: string) => {
    console.log("Selected status:", value);
    setStatus(value);
  };

  return (
    <SortFilterSelect
      options={statusOptions}
      value={status}
      onValueChange={onStatusChange}
    />
  );
};
