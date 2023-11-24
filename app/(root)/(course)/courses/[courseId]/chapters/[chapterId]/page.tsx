import CourseEnrollButton from "@/components/course-enroll-button";
import { Preview } from "@/components/preivew";

import { Separator } from "@/components/ui/separator";
import VideoPlayer from "@/components/video-player";
import { getChapter } from "@/lib/get-chapter";
import { auth } from "@clerk/nextjs";

import { Github } from "lucide-react";
import { redirect } from "next/navigation";

const ChapterIdPage = async ({params}: {params: {chapterId:string, courseId:string}}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
     
  const {
    chapter,
    course,
    muxData,
    nextChapter,
    purchase
  } = await getChapter({
    chapterId: params.chapterId,
    courseId: params.courseId,
    userId: userId
  });

  if (!chapter || !course) {
    return redirect("/")
  }

  const isLocked = !chapter.isFree && !purchase;

  return ( 
    <div>
      {isLocked && (
        <div>
          You need to purchase this course to watch this chapter.
        </div>
      )}
      <div className="flex flex-col p-8 mx-auto gap-8">
        <div className="p-4 flex justify-center items-center h-full bg-secondary">

          <VideoPlayer chapter={chapter} muxData={muxData} isLocked={isLocked} />

        </div>
        <div className="p-6 flex  flex-col gap-2">
          <div className="flex justify-between">
          
            <h2 className=" font-bold text-primary">
              {chapter.title}
            </h2>
            {purchase ? (
              <div>
                Purchase
              </div>
            ): (
              <CourseEnrollButton price={course.price} courseId={params.courseId} />
            )}

          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          
        </div>
        
          

      </div>
          

    </div>
   );
}
 
export default ChapterIdPage;