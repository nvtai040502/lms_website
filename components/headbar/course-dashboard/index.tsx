"use client"
import { UserButton } from "@clerk/nextjs";
import { Button } from "../../ui/button";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../../mode/mode-toggle";

const DashboardHeadbar = () => {
  const pathname = usePathname()
  const isTeacherPage = pathname.includes("/teacher")
  return ( 
      <div className="flex flex-row items-center gap-4">
        
        {isTeacherPage ? (
          <Link href="/">
            <Button size="sm" variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href="/teacher/courses">
            <Button size="sm" variant="outline">Teacher Mode</Button>
          </Link>
        )}
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
      
   );
}
 
export default DashboardHeadbar ;