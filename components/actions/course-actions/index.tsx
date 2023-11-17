"use client"
import { ActionTooltip } from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Course } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";


interface CourseActionsProps {
  course: Course
}
const CourseActions = ({course}: CourseActionsProps) => {
  const [isPublished, setIsPublished] = useState(course.isPublished)
  const [isLoading, setIsLoading] = useState(false)
  
  const onPublish = async () => {
    
    try {
      setIsLoading(true)
      await axios.patch(`/api/courses/${course.id}/is-publish`, { isPublished: !isPublished });
      setIsPublished(prevIsPublished => !prevIsPublished); 
      !isPublished ? (
        toast({
          title: "Publish Course Success",
        })
      ): (
        toast({
          title: "UnPublish Course Success",
        })
      )
        
    } catch (error) {
      console.error("Error publishing course:", error);
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

      <ActionTooltip label="Delete Course" side="top" delayDuration={50}>
        <Button disabled={isLoading} variant="destructive" size="sm"><Trash/></Button>
      </ActionTooltip>
    </div>
   );
}
 
export default CourseActions