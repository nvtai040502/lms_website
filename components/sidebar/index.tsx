import { Chapter, Course } from "@prisma/client";
import DashboardSidebar from "./dashboard-sidebar";
import CourseSidebar from "./course-sidebar";

interface SidebarProps {
  modeSidebar: "dashboard" | "course"
  course?: Course & {chapters: Chapter[]}
}
const Sidebar = ({modeSidebar, course}:SidebarProps) => {
  return ( 
    <div className="fixed top-0 left-0 w-72 h-screen flex-col md:border-r">

      {modeSidebar === "dashboard" && <DashboardSidebar />}

      {modeSidebar === "course" && course && (
        <CourseSidebar course={course} />
      )}

    </div>
   );
}
 

export default Sidebar;