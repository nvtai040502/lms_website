"use client"
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import ModeMobile from "../mode-mobile";
import { LogOut } from "lucide-react";
import Link from "next/link";

const Headbar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const isTeacherPage = pathname.includes("/teacher")
  return ( 
    <div className="items-center flex flex-row w-screen h-14 border-b-2 justify-between p-2 md:justify-end">
      <div className="md:hidden">
      <ModeMobile />
      </div>
      <div className="inline-flex items-center gap-2 ">
        {isTeacherPage ? (
          <Link href="/">
            <Button size="sm" variant="default"><LogOut/></Button>
          </Link>
        ) : (
          <Link href="/teacher">
            <Button size="sm" variant="default">Teacher Mode</Button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
      
    </div>
   );
}
 
export default Headbar ;