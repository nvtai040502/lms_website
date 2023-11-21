
import Image from "next/image";
import { BookOpenIcon } from "lucide-react";
import { formatPrice } from "@/lib/format-price";
import Link from "next/link";
import getCourses from "@/lib/get-courses";
import CourseCard from "@/components/course-card";

export default async function Home() {
  const courses = await getCourses()
  return (
    
  <div className="md:pl-72 " >
      
    <div  className="grid grid-cols-4 gap-4 ">
      {courses.map((course) => (
        <div key={course.id}>
          <CourseCard course={course} />

          


          </div>

        
      ))}
    </div>
  </div>
  )
}
