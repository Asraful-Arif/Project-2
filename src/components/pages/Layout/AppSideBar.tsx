import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { FolderKanban, LayoutDashboard, LogOut } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router";

const sideItems = [
  { label: "Dashboard", Icon: LayoutDashboard, path: "/dashboard" },
  { label: "Projects", Icon: FolderKanban, path: "/projects" },
];
const AppSideBar = () => {
  const navigate = useNavigate();
  const handleLogoutButton = () => {
    localStorage.removeItem("taskflow_user");
    navigate("/Login");
  };
  const { pathname } = useLocation();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-2 border-b border-white/20">
        <div className="text-lg p-1.5 bg-linear-to-br from-purple-600 via-blue-500 to-red-600 text-white font-semibold w-9 h-10 rounded-lg mx-auto flex items-center justify-center">
          AA
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2">
              {sideItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={pathname === item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex gap-4 px-3 py-2.5 items-center rounded transition-colors ${
                          isActive
                            ? "bg-white/20 text-white font-bold"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`
                      }
                    >
                      <item.Icon size={20} />
                      <span className="text-xl font-semibold">
                        {item.label}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogoutButton}
                className="flex gap-2 items-center text-white hover:bg-white/10 cursor-pointer"
              >
                <LogOut size={20} />
                <span>LogOut</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
