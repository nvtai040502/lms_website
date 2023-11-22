import Image from "next/image";
import Link from "next/link";

const DashboardSidebarHeader = () => {
  return ( 
    <Link href="/" className="flex gap-2 justify-center items-center h-14 p-2 border-b">
      <Image 
        className="rounded-full object-cover"
        height={40}
        width={40}
        alt="logo"
        src="/avatar.png"
      />
      <p className=" font-bold text-xl">
        LMS Platform
      </p>
    </Link>
   );
}
 
export default DashboardSidebarHeader;