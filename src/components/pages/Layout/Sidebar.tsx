import { FolderKanban, LayoutDashboard, Users } from "lucide-react";

import { NavLink } from "react-router";

const sideItem = [
  { label: "Dashboard", Icon: LayoutDashboard, path: "/dashboard" },
  { label: "Projects", Icon: FolderKanban, path: "/projects" },
  { label: "Members", Icon: Users, path: "/members" },
];

const Sidebar = () => {
  return (
    <div className="h-full w-60 bg-slate-300 border-r border-slate-200 flex flex-col space-y-4 border-b ">
      <div className="text-2xl p-3 border-b border-slate-300 bg-linear-to-br from-purple-600 via-blue-500 to-red-600 text-white font-semibold mt-5  w-15 h-15 rounded-2xl mx-auto">
        <h1>AA</h1>
      </div>

      <div className="mt-2">
        {sideItem.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex gap-3 px-3 py-2.5  items-center  space-y-2 focus:bg-slate-50 focus:ring focus:ring-blue-300 rounded hover:bg-slate-200 z-60"
          >
            <item.Icon size={20} />
            <span className="text-xl text-center mb-2.5 font-semibold">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
