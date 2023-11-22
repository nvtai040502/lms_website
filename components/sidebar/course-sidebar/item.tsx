"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Chapter } from "@prisma/client";
import { PlayCircle, Lock } from "lucide-react"
import { usePathname, useRouter } from "next/navigation";

const CourseSidebarItem = ({ chapter, courseId }: {chapter: Chapter, courseId: string}) => {
  const pathname = usePathname()
  const isActive = pathname?.includes(chapter.id)
  
  const router = useRouter()
  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${chapter.id}`)
  }

  const isLocked = !chapter.isFree
  const Icon = isLocked ? Lock : PlayCircle
  return ( 
    
      <Button
        onClick={onClick}
        size="lg" 
        variant="outline" 
        className={cn(
          "flex items-center justify-normal w-full rounded-none border-none p-6",
          isActive && " bg-accent  text-accent-foreground "
        )}
      >
        <Icon
          size={22}
          className=
            "mr-2"
        />
        {chapter.title} 
      </Button>
    
   );
}
 
export default CourseSidebarItem;