import { Course } from "@prisma/client";
import Image from "next/image";

const CourseSidebarHeader = (
  {course}: {course: Course}
) => {
  return ( 
    <div className="flex gap-2 justify-center items-center p-2 border-b h-36 ">
      {
        course.imageUrl && (
          <Image
            className="rounded-full object-cover"
            height={40}
            width={40}
            alt="logo"
            src={course.imageUrl}
          />
        )
      }
      
      <p className="font-bold text-primary">
        {course.title}
        
      </p>
    </div>
   );
}
 
export default CourseSidebarHeader;