import { Category, Course } from "@prisma/client";
import FormTitle from "./form-title";
import FormDescription from "./form-description";
import FormImage from "./form-image";
import FormCategory from "./form-category";
import { db } from "@/lib/db";
import FormPrice from "./form-price";
import FormChapter from "./form-chapter";


interface FormCourseSetupProps {
  course: Course
  formType: "title" | "description" | "category" | "image" | "price" | "chapter"
}
const FormCourseSetup = async ({
  course, 
  formType,
}:FormCourseSetupProps
  ) => {
    
  let category = null
  if (course.categoryId) {
    category = await db.category.findUnique({
      where: {
        id: course.categoryId
      }
    })
  }

  const chapters = await db.chapter.findMany({
    where: {
      courseId: course.id
    },
    orderBy: {
      position: "asc"
    }
    
  })

  return ( 
    <div className='border rounded-md p-4'>
      {formType === "title" && <FormTitle course={course}/>}
      {formType === "description" && <FormDescription course={course} />}
      {formType === "image" && <FormImage course={course} />}
      {formType === "category" && <FormCategory course={course} category={category} />}
      {formType === "price" && <FormPrice course={course} />}
      {formType === "chapter" && <FormChapter course={course} chapters={chapters}/>}
    </div>
   );
}
 
export default FormCourseSetup;