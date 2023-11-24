import ChapterActions from "@/components/actions/chapter-actions";
import FormChapterSetup from "@/components/form-setup/form-chapter-setup";
import { IconBadge } from "@/components/icon-badge";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { AlertTriangle, ArrowLeft, Eye, LayoutDashboard, Trash, Video } from "lucide-react";
import Link from "next/link";
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
 
  
  
  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.isFree,
    chapter.videoUrl,
  ]
  const totalFields = requiredFields.length
  const completeFields = requiredFields.filter(Boolean).length

  
  return ( 
    <>
    {!chapter.isPublished && (
      <div className="dark:bg-yellow-700 bg-yellow-200/80 flex items-center justify-center p-4 gap-2">
        <AlertTriangle />
        <p className="text-center">
          This chapter is unpublished. It will not be visible in the course
        </p>
      </div>
    )}
    <div className="p-6 ">
      <div className=" flex justify-between items-center ">
        <div className="flex flex-col gap-y-2">
          <Link 
            href={`/teacher/courses/${params.courseId}`}
          >
            <Button variant="link" className="flex items-center justify-center p-0">
              <ArrowLeft className="h-4 w-4 mr-2"/>
              Back to course setup
            </Button>
          </Link>
          <h1 className="text-2xl font-medium">
            Chapter setup
          </h1>
          <div className="text-sm">
            Complete all fields ({completeFields}/{totalFields})
          </div>
        </div>

        <ChapterActions course={course} chapter={chapter}/>
      </div>

      <div className="flex justify-between items-center w-full mt-16">
        <div className="grid md:grid-cols-2 gap-16 grid-cols-1 w-full ">
          
          <div className="flex flex-col gap-y-6">
            
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Customize your chapter
              </h2>
            </div>
            
            <FormChapterSetup formType="title" course={course} chapter={chapter} />
            <FormChapterSetup formType="description" course={course} chapter={chapter} />
            
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Eye} />
              <h2 className="text-xl">
                Access Settings
              </h2>
            </div>
            <FormChapterSetup formType="access" course={course} chapter={chapter} />
          </div>

            <div className="flex flex-col gap-y-6">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Video} />
                <h2 className="text-xl">
                  Add a video
                </h2>
              </div>
              <FormChapterSetup formType="video" course={course} chapter={chapter} />
            </div>
          

        </div>
      </div>
    </div>
    </>
   );
}
 
export default ChapterIdPage;