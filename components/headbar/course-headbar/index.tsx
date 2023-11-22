import { UserButton } from "@clerk/nextjs";
import { Button } from "../../ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../../mode/mode-toggle";
import { Chapter, Course } from "@prisma/client";
interface CourseIHeadbarProps {
  course: Course & {chapters: Chapter[]}
}
const CourseHeadbar = ({course}: CourseIHeadbarProps) => {
  return ( 
    <div className="flex flex-row items-center gap-4 ">
      <Link href="/">
        <Button size="sm" variant="outline">
          <LogOut className="h-4 w-4 mr-2" />
          Exit
        </Button>
      </Link>
      <ModeToggle />
      <UserButton afterSignOutUrl="/" />
    </div>
   );
}
 
export default CourseHeadbar ;