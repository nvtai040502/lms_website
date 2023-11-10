import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
  <div>
    Dark Theme
    <UserButton afterSignOutUrl="/" />
    <ModeToggle />
  </div>
  )
}
