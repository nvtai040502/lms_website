import { Chapter, Course } from "@prisma/client";
import CourseHeadbar from "./course-headbar";
import DashboardHeadbar from "./course-dashboard";
import ModeMobile from "../mode/mode-mobile";

interface HeadbarProps {
  modeHeadbar: "dashboard" | "course"
  course?: Course & {chapters: Chapter[]}
}
const Headbar = ({modeHeadbar, course}:HeadbarProps) => {
  const isDashboardMode = modeHeadbar === "dashboard";
  const isCourseMode = modeHeadbar === "course" && course;

  return (
    <div className="fixed top-0 left-72 right-0 items-center flex flex-row h-14 border-b justify-between p-2 md:justify-end">

      <div className="md:hidden">
        <ModeMobile modeSidebar={isDashboardMode ? "dashboard" : "course"} course={isCourseMode ? course : undefined} />
      </div>
      
      {isDashboardMode && <DashboardHeadbar />}
      {isCourseMode && <CourseHeadbar course={course!} />}
    </div>
  );
}
 
export default Headbar;