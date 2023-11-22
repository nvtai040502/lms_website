"use client"
import { AlignJustify } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Chapter, Course } from "@prisma/client";
import Sidebar from "../sidebar";

interface ModeMobileProbs {
  modeSidebar: "dashboard" | "course"
  course?: Course & {chapters: Chapter[]}
}

const ModeMobile = ({modeSidebar, course}: ModeMobileProbs) => {
  return ( 
    <div className="flex items-center ">
      <Sheet>
        <SheetTrigger>
            <AlignJustify size={30} />
        </SheetTrigger>
        <SheetContent side="left">
          <Sidebar modeSidebar={modeSidebar} course={course} />
        </SheetContent>
      </Sheet>
    </div>
   );
}
 
export default ModeMobile;