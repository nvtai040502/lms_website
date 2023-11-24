import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react"
import CourseActions from "@/components/actions/course-actions"
import FormCourseSetup from "@/components/form-setup/form-course-setup"
import { IconBadge } from "@/components/icon-badge"


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
    return redirect("/teacher/courses")
  }
  
  
  const chapters = await db.chapter.findMany({
    where: {
      courseId: course.id
    },
    orderBy: {
      position: "asc"
    }
    
  })

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.categoryId,
    course.price,
    chapters.length > 0 ? [chapters] : []
  ]

  const totalFields = requiredFields.length
  const completeFields = requiredFields.filter(Boolean).length

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">
            Course setup
          </h1>
          <div className="text-sm">
            Complete all fields ({completeFields}/{totalFields})
          </div>
        </div>
        <CourseActions course={course} />
      </div>

      <div className="flex justify-between items-center w-full mt-16">
        <div className="grid md:grid-cols-2 gap-16 grid-cols-1 w-full ">
          
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard}/>
              <h2 className="text-xl">
                Customize your course
              </h2>
            </div>
            <FormCourseSetup course={course} formType="title" />
            <FormCourseSetup course={course} formType="description" />
            <FormCourseSetup course={course} formType="image" />
            <FormCourseSetup course={course} formType="category"/>
          </div>

        
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks}/>
                <h2 className="text-xl">
                  Course chapters
              </h2>
            </div>
              <FormCourseSetup course={course} formType="chapter" />

            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign}/>
                <h2 className="text-xl">
                  Sell your course
                </h2>
            </div>
            <FormCourseSetup course={course} formType="price"/>
            

          </div>

        </div>
      </div>
    </div>
    )
}
 
export default CourseIdPage