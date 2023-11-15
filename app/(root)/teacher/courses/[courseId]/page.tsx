import FormTitle from "@/components/form/form-title"
import FormDescription from "@/components/form/form-description"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import FormImage from "@/components/form/form-image"
import FormCategory from "@/components/form/form-category"
import { LayoutDashboard } from "lucide-react"
import FormPrice from "@/components/form/form-price"
import FormAttachment from "@/components/form/form-attachment"
import FormChapter from "@/components/form/form-chapter"


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

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.categoryId,
    course.price
  ]

  const totalFields = requiredFields.length
  const completeFields = requiredFields.filter(Boolean).length

  return (
    <div className="p-6">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">
          Course setup
        </h1>
        <div className="text-sm">
          Complete all fields ({completeFields}/{totalFields})
        </div>
      </div>


      <div className="flex justify-between items-center w-full mt-16">
        <div className="grid md:grid-cols-2 gap-16 grid-cols-1 w-full ">
          
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
                Course chapters
              </h2>
            </div>
              <FormChapter course={course}/>
            <div className="flex items-center gap-x-2">
              <LayoutDashboard />
              <h2 className="text-xl">
                Sell your course
              </h2>
            </div>
            <FormPrice course={course}/>
            <FormAttachment course={course}/>
            

          </div>

        </div>
      </div>
    </div>
    )
}
 
export default CourseIdPage