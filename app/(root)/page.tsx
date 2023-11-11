import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";


export default function Home() {

  

  return (
  <div>
      
    <div className="md:pl-72">
      Database Setup with Prisma & Plannet Scale
      <ModeToggle />
      <UserButton afterSignOutUrl="/"/>
    </div>
  </div>
  )
}
