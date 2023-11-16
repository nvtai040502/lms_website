"use client"
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Chapter, Course } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import DeleteChapter from "./delete-chapter/intex";


interface ChapterActionsProps {
  chapter: Chapter
  course: Course
}
const ChapterActions = ({course, chapter}: ChapterActionsProps) => {
  const [isPublished, setIsPublished] = useState(chapter.isPublished)
  const [isLoading, setIsLoading] = useState(false)
  
  const onPublish = async () => {
    
    try {
      setIsLoading(true)
      await axios.patch(`/api/courses/${course.id}/chapters/${chapter.id}/is-publish`, { isPublished: !isPublished });
      setIsPublished(prevIsPublished => !prevIsPublished); 
      !isPublished ? (
        toast({
          title: "Publish Chappter Success",
        })
      ): (
        toast({
          title: "UnPublish Chappter Success",
        })
      )
        
    } catch (error) {
      console.error("Error publishing chapter:", error);
      toast({
        title: "Something went wrong",
        description: "Perhaps you haven't completed all the fields yet"
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  
  return ( 
    <div className="flex items-center justify-center gap-4">
      {
        !isPublished ? (
          <div> 
          <Button onClick={onPublish} disabled={isLoading} variant="secondary" size="sm">Publish</Button>
          </div>
        ): (
          <Button onClick={onPublish} disabled={isLoading} variant="secondary" size="sm">UnPublish</Button>
        )
      }

      <DeleteChapter course={course} chapter={chapter} />

    </div>
   );
}
 
export default ChapterActions