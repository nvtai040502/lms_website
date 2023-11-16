"use client"
import { ActionTooltip } from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Chapter, Course } from "@prisma/client";
import axios from "axios";
import { Terminal, Trash } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


interface ChapterActionsProps {
  chapter: Chapter
  course: Course
}
const ChapterActions = ({course, chapter}: ChapterActionsProps) => {
  const [isPublished, setIsPublished] = useState(chapter.isPublished)
  const [isLoading, setIsLoading] = useState(false)
  
  const onPublish = async () => {
    setIsPublished(prevIsPublished => !prevIsPublished); 
    try {
      setIsLoading(true)
      await axios.patch(`/api/courses/${course.id}/chapters/${chapter.id}/is-publish`, { isPublished: !isPublished });
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

      <ActionTooltip label="Delete Chapter" side="top" delayDuration={50}>
        <Button variant="destructive" size="sm"><Trash/></Button>
      </ActionTooltip>
    </div>
   );
}
 
export default ChapterActions