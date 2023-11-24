"use client"
import { ActionTooltip } from "@/components/action-tooltip";
import ConfirmDelete from "./confirm-delete";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Course } from "@prisma/client";

const DeleteCourse = ({course}: {course:Course}) => {
  const [isLoading, setIsLoading] = useState(false)
  const onDelete = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/courses/${course.id}`);
      toast({
        title: "Delete Course Success",
      })
        
    } catch (error) {
      console.error("Error deleting course:", error);
      toast({
        title: "Something went wrong",
      })
    } finally {
      setIsLoading(false)
    }
  }
  return ( 
    <ConfirmDelete onConfirm={onDelete}>
      <ActionTooltip label="Delete Course" side="top" delayDuration={50}>
        <Button disabled={isLoading} variant="destructive" size="sm"><Trash/></Button>
      </ActionTooltip>
    </ConfirmDelete>
   );
}
 
export default DeleteCourse;