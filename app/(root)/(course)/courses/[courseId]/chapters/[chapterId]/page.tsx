import CourseEnrollButton from "@/components/course-enroll-button";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/video-player";
import { formatPrice } from "@/lib/format-price";
import { getChapter } from "@/lib/get-chapter";
import { auth } from "@clerk/nextjs";
import MuxPlayer from "@mux/mux-player-react";
import { Github, GithubIcon } from "lucide-react";
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
    attachments,
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

  return ( 
    <div>

      <div className="flex flex-col p-8 mx-auto gap-8">
        <div className="p-4 flex justify-center items-center h-full bg-secondary">

          <VideoPlayer chapter={chapter} muxData={muxData} />

        </div>
        <div className="border rounded-lg p-6">
          <div className="flex justify-between">
          
            <h2 className=" font-bold text-primary">
              {chapter.title}
            </h2>
            {purchase ? (
              <div>
                Purchase
              </div>
            ): (
              <CourseEnrollButton price={course.price||0} courseId={params.courseId} />
            )}

          </div>
        </div>
          <div className="grid grid-cols-3 gap-x-2">
            <div className="border rounded-lg flex flex-col justify-center items-center p-6 gap-1">
              <Github size={30} />
              Github
            </div>
            <div className="border flex rounded-lg flex-col justify-center items-center  gap-1">
              <Github size={30} />
              Github
            </div>
            <div className="border rounded-lg flex flex-col justify-center items-center gap-1">
              <Github size={30} />
              Github
            </div>
          
        </div>

      </div>
          

    </div>
   );
}
 
export default ChapterIdPage;