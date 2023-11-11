import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";


export default function Home() {

  

  return (
  <div>
      
    <div className="md:pl-72">
      Modal Create New Course Front End
      <ModeToggle />
      <UserButton afterSignOutUrl="/"/>
    </div>
  </div>
  )
}
