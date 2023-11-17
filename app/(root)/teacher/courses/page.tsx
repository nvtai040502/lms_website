import { Button } from "@/components/ui/button"
import CreateCourseModal from "@/components/create-course"

const CoursePage = async () => {
  
  return (
    <div>
      <CreateCourseModal >
       <Button variant="secondary">New Course</Button>
       </CreateCourseModal>
    </div>
  )
}
export default CoursePage;