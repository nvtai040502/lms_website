"use client"

import studentMode from "@/lib/mode/student-mode";
import { usePathname } from "next/navigation";
import teacherMode from "@/lib/mode/teacher-mode";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Chapter, Course } from "@prisma/client";
import CourseSidebarItem from "./item";
import CourseSidebarHeader from "./header";

interface CourseSidebarProps {
  course: Course & {chapters: Chapter[]}
}
const CourseSidebar = ({course}:CourseSidebarProps) => {
 

  return ( 
    <div className="absolute w-72 h-screen flex-col md:border-r-2">
      
      <CourseSidebarHeader course={course} />
      
      <div className="my-2">
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