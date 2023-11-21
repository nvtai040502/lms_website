import { Course } from "@prisma/client";
import Image from "next/image";

const CourseSidebarHeader = (
  {course}: {course: Course}
) => {
  return ( 
    <div className="h-20">
      <div className="inline-flex gap-2 w-full justify-center items-center h-full">
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
    </div>
   );
}
 
export default CourseSidebarHeader;