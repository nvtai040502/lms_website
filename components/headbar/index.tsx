"use client"
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import ModeMobile from "../mode-mobile";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

const Headbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const isTeacherPage = pathname.includes("/teacher")
  return ( 
    <div className="items-center flex flex-row w-full h-14 border-b-2 justify-between p-2 md:justify-end">
      <div className="md:hidden">
      <ModeMobile />
      </div>
      <div className="inline-flex items-center gap-4 ">
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
      
    </div>
   );
}
 
export default Headbar ;