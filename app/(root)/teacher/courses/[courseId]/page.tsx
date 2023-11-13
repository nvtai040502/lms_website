import FormTitle from "@/components/form/form-title"
import FormDescription from "@/components/form/form-description"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import FormImage from "@/components/form/form-image"
import FormCategory from "@/components/form/form-category"

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

  const category = await db.category.findFirst({
    where: {
      id: course.categoryId
    }
  })

  if (!category) {
    return null
  }

  return (
    <div>
      <FormTitle course={course}/>
      <FormDescription course={course}/>
      <FormImage course={course} />
      <FormCategory course={course} categoryName={category.name} />
    </div>
    )
}
 
export default CourseIdPage