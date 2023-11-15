import ChapterFormTitle from "@/components/chapters-form/form-title";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ChapterIdPage = async ({params}: {params: {chapterId:string, courseId: string}}) => {
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId
    }
  })
  const course = await db.course.findUnique({
    where: {
      id: params.courseId
    }
  })
  if (!course) {
    return redirect("/")
  }

  if (!chapter) {
    return redirect(`/teacher/courses/${course.id}`)
  }
 

  return ( 
    
    <div>
      <ChapterFormTitle course={course} chapter={chapter}/>
    </div>
   );
}
 
export default ChapterIdPage;