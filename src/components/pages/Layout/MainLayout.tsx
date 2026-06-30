import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "./Navbar";

import { type ReactNode } from "react";
import AppSideBar from "./AppSideBar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSideBar />

      <div className="flex flex-col flex-1 h-full overflow-hidden z-50">
        
        <Navbar />
        <main className="flex-1 bg-[#adc0e9] overflow-y-auto p-3 min-h-screen"> <div className="max-w-7xl mx-auto">
    {children}
  </div></main>
      </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
