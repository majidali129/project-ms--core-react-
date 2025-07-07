import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/store/hooks";
import type { Project } from "@/types";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";
import { deleteProject } from "../project-slice";
import { Button } from "@/components/ui/button";

type ProjectMoreMenuProps = {
  project: Project;
};

export const ProjectMoreMenu = ({ project }: ProjectMoreMenuProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="icon" variant="ghost" className="">
          <MoreHorizontal className="size-5 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              navigate(`${project.id}`);
            }}
          >
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem>Update</DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteProject({ id: project.id as string }));
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
