import Headbar from "@/components/headbar";
import Sidebar from "@/components/sidebar";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface CourseIdLayoutProps {
  children: React.ReactNode,
  params: {courseId: string}
}
const CourseIdLayout = async ({
  children, 
  params}: CourseIdLayoutProps
  ) => {
    const { userId } = auth();

    if (!userId) {
      return redirect("/")
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          
          orderBy: {
            position: "asc"
          }
        },
      },
    });
  
    if (!course) {
      return redirect("/");
    }
  return ( 
    <div className="">
      <div className="hidden md:flex">
        <Sidebar modeSidebar="course" course={course} />
        
      </div>

      <div className="md:pl-72 pt-14">
        <Headbar modeHeadbar="course" course={course} />
        {children}
      </div>
    </div>
   );
}
 
export default CourseIdLayout;