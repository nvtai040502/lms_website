import Image from "next/image";

const SidebarHeader = () => {
  return ( 
    <div className="inline-flex gap-2 w-full justify-center items-center h-full">
      <Image 
        className="rounded-full object-cover"
        height={40}
        width={40}
        alt="logo"
        src="/avatar.png"
      />
      <p className="font-bold dark:text-white text-black">
        Udemy Course
      </p>
    </div>
   );
}
 
export default SidebarHeader;