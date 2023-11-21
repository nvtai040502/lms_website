import { formatPrice } from "@/lib/format-price";
import { Chapter, Course } from "@prisma/client";
import { BookOpenIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  course: Course & {chapters: Chapter[]}
}
const CourseCard = ({
  course
}:CourseCardProps) => {
  return ( 
    <Link href={`/courses/${course.id}`}>
      <div className="group hover:bg-slate-200/90 dark:hover:bg-slate-600 hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
        {course.imageUrl ? (
          <Image
          fill
          src={course.imageUrl} 
          alt={course.title} 
          className="object-cover" />
        ): (
          <Image 
          fill
          src="/favicon.ico" 
          alt={course.title} 
          className="object-cover" />
        )
        }
        </div>

        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 dark:group-hover:text-sky-300 transition line-clamp-2">
            {course.title}
          </div>

          <p className="text-xs text-muted-foreground flex">
          category
          </p>

          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500 dark:text-slate-200">
              <BookOpenIcon />
              <span>
                {course.chapters.length} Chapters
              </span>
            </div>
          
          </div>

          <p className="flex text-md md:text-sm font-medium text-slate-700 dark:text-slate-300">
              {formatPrice(course.price || 0)}
          </p>

      </div>
      </div>
      </Link>
   );
}
 
export default CourseCard;