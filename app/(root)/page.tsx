import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
  <div>
    Signin/Signup with Clerk
    <UserButton afterSignOutUrl="/" />
  </div>
  )
}
