"use client"
import { AlignJustify } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import Sidebar from "./sidebar";
import CourseSidebar from "./sidebar/course-sidebar";
import { Chapter, Course } from "@prisma/client";

interface ModeMobileProbs {
  modeSidebar?: "dashboardSidebar" | "courseSidebar"
  course: Course & {chapters: Chapter[]}
}

const ModeMobile = ({modeSidebar="dashboardSidebar", course}: ModeMobileProbs) => {
  return ( 
    <div className="flex items-center ">
      <Sheet>
        <SheetTrigger>
            <AlignJustify size={30} />
        </SheetTrigger>
        <SheetContent side="left">
        {modeSidebar === "dashboardSidebar" && <Sidebar />}
        {modeSidebar === "courseSidebar" && <CourseSidebar course={course}/>}
        </SheetContent>
      </Sheet>
    </div>
   );
}
 
export default ModeMobile;