import { db } from "./db";

const getCourses = async () => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true
      },
      include: {
        chapters: {
          where: {
            isPublished: true
          },
          orderBy: {
            position: "asc"
          }
        }
      }
    });
    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};
 
export default getCourses;