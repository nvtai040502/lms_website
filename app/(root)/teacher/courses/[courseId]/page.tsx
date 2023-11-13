import FormTitle from "@/components/form/form-title"
import FormDescription from "@/components/form/form-description"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import FormImage from "@/components/form/form-image"
import FormCategory from "@/components/form/form-category"
import { LayoutDashboard } from "lucide-react"

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
    <div className="p-6">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">
          Course setup
        </h1>
        <div className="text-sm">
          Complete all fields 
        </div>
      </div>


      <div className="flex justify-between items-center w-full mt-16">
        <div className="grid md:grid-cols-2 gap-6 grid-cols-1 w-full ">
          
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center gap-x-2">
            <LayoutDashboard />
            <h2 className="text-xl">
              Customize your course
            </h2>
            </div>
            <FormTitle course={course}/>
            <FormDescription course={course}/>
            
            <FormImage course={course} />
            
            <FormCategory course={course} categoryName={category.name} />
          </div>

        
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center gap-x-2">
            <LayoutDashboard />
            <h2 className="text-xl">
              Customize your course
            </h2>
            </div>
            <FormTitle course={course}/>
            <FormDescription course={course}/>
            
            <FormImage course={course} />
            
            <FormCategory course={course} categoryName={category.name} />
          </div>

        </div>
      </div>
    </div>
    )
}
 
export default CourseIdPage