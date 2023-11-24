import { Chapter, Course } from "@prisma/client";
import ChapterFormTitle from "./form-title";
import ChapterFormDescription from "./chapter-description.tsx";
import ChapterFormVideo from "./form-video";
import { db } from "@/lib/db";
import ChapterFormAccess from "./chapter-access";

interface FormChapterSetupProps {
  formType: "title" | "description" | "video" | "access"
  course: Course
  chapter: Chapter
}
const FormChapterSetup = async ({formType, course, chapter}:FormChapterSetupProps) => {
  const muxData = await db.muxData.findUnique({
    where: {
      chapterId: chapter.id
    }
  })
  return ( 
    <div className='border rounded-md p-4'>
      {formType === "title" && <ChapterFormTitle course={course} chapter={chapter}/>}
      {formType === "description" && <ChapterFormDescription course={course} chapter={chapter}/>}
      {formType === "video" && <ChapterFormVideo course={course} chapter={chapter} muxData={muxData}/>}
      {formType === "access" && <ChapterFormAccess course={course} chapter={chapter} />}
    </div>
   );
}
 
export default FormChapterSetup;