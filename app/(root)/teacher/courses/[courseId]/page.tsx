import FormTitle from "@/components/form/form-title"

import { db } from "@/lib/db"
import { redirect } from "next/navigation"

const CourseIdPage = async ({
  params
}: {
  params:  {courseId: string}
}) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId
    }
  })

  if (!course) {
    return redirect("/")
  }

  return (
    <div>
    <FormTitle course={course}/>
    
    </div>
    )
}
 
export default CourseIdPage