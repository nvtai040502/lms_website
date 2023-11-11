"use client"
import SidebarHeader from "./header"
import SidebarItem from "./item"
import studentMode from "@/lib/mode/student-mode";
import { usePathname } from "next/navigation";
import teacherMode from "@/lib/mode/teacher-mode";

const Sidebar = () => {
  const pathname = usePathname()
  const isPageTeacher = pathname.includes("/teacher")
  const mode = isPageTeacher ? teacherMode : studentMode

  return ( 
    <div className="absolute w-72 h-screen flex-col md:border-r-2">
      <div className="h-14">
        <SidebarHeader />
      </div>
      
      <div className="my-2">
        {mode.routes.map((route) => (
          
        <SidebarItem 
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
        ))}
      </div>
    </div>
   );
}
 
export default Sidebar;