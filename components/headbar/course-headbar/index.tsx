import { UserButton } from "@clerk/nextjs";
import { Button } from "../../ui/button";
import ModeMobile from "../../mode-mobile";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../../mode-toggle";
import { Chapter, Course } from "@prisma/client";
interface CourseIHeadbarProps {
  course: Course & {chapters: Chapter[]}
}
const CourseHeadbar = ({course}: CourseIHeadbarProps) => {
  return ( 
    <div className="items-center  flex  flex-row w-full h-14 border-b-2 justify-between p-2 md:justify-end">
      <div className="md:hidden">
      <ModeMobile modeSidebar="courseSidebar" course={course}/>
      </div>
      <div className="inline-flex items-center gap-4 ">
        <Link href="/">
          <Button size="sm" variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
      
    </div>
   );
}
 
export default CourseHeadbar ;