import { cloneElement, type ReactElement } from "react";
import { NavLink } from "react-router";

type SidebarItemProps = {
  link: {
    label: string;
    href: string;
    icon: ReactElement<{ className: string }>;
  };
};

export const SidebarItem = ({ link }: SidebarItemProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `bg-transparent text-foreground  hover:bg-primary/10 py-1.5 text-[.87rem] px-2.5 rounded flex items-center max-md:justify-center gap-1.5  not(.isActive):hover:text-zinc-800 ${
          isActive ? "!bg-primary text-white " : ""
        } `
      }
      to={link.href}
    >
      {cloneElement(link.icon, { className: "w-[19px] h-[19px]" })}
      <span className="hidden md:block">{link.label}</span>
    </NavLink>
  );
};
