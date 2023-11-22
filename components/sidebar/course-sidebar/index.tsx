"use client"

import studentMode from "@/lib/mode/guest-mode";
import { usePathname } from "next/navigation";
import teacherMode from "@/lib/mode/teacher-mode";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import CourseSidebarItem from "./item";
import CourseSidebarHeader from "./header";

interface CourseSidebarProps {
  course: Course & {chapters: Chapter[]}
}
const CourseSidebar = ({course}:CourseSidebarProps) => {
 

  return ( 
    <div>
      <div className="">
        <CourseSidebarHeader course={course} />
      </div>
      
      <div className="flex gap-2 flex-col my-4">
        {course.chapters.map((chapter) => (
          
          <div key={chapter.id} >
            <CourseSidebarItem chapter={chapter} courseId={course.id} />
          </div>
        
        ))}
      </div>
    </div>
   );
}
 
export default CourseSidebar;