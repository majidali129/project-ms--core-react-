import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Project } from "@/types";
import { MoreHorizontal } from "lucide-react";

type ProjectMoreMenuProps = {
  project: Project;
};

export const ProjectMoreMenu = ({ project }: ProjectMoreMenuProps) => {
  console.log(project);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        <DropdownMenuGroup>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Update</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
