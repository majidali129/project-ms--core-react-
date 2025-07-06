import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Task } from "@/types";
import { MoreHorizontal } from "lucide-react";

type TaskMoreMenuProps = {
  task: Task;
};

export const TaskMoreMenu = ({ task }: TaskMoreMenuProps) => {
  console.log(task);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Mark as Done</DropdownMenuItem>
          <DropdownMenuItem>Set to progress</DropdownMenuItem>
          <DropdownMenuItem>Set to review</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Update</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
