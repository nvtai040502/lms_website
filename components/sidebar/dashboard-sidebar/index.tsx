"use client"
import DashboardSidebarHeader from "./header"
import DashboardSidebarItem from "./item"
import guestMode from "@/lib/mode/guest-mode";
import { usePathname } from "next/navigation";
import teacherMode from "@/lib/mode/teacher-mode";

const DashboardSidebar = () => {
  const pathname = usePathname()
  const isPageTeacher = pathname.includes("/teacher")
  const mode = isPageTeacher ? teacherMode : guestMode

  return ( 
    <div>
      <div className="">
        <DashboardSidebarHeader />
      </div>
      
      <div className="flex gap-2 flex-col my-4">
        {mode.routes.map((route) => (
          
        <DashboardSidebarItem 
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
        ))}
      </div>
    </div>
   );
}
 
export default DashboardSidebar;