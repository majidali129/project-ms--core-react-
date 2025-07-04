import { Outlet } from "react-router";
import { Sidebar } from "./navigation/sidebar/sidebar";

export const AppLayout = () => {
  return (
    <section className="min-h-screen flex w-full ">
      <Sidebar />
      <main className=" w-full flex-1 p-4 *:py-5 bg-background">
        <Outlet />
      </main>
    </section>
  );
};
