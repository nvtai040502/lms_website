import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH (
  req: Request,
  { params }: {params: {courseId: string, chapterId: string}}
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          }
        }
      }
    });

    if (!course) {
      return new NextResponse("Course Not found", { status: 404 });
    }

    const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);

    if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const { isPublished } = await req.json()

    const isPublishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId
      },
      data: {
        isPublished: isPublished,
      }
    });

    
    
    return NextResponse.json(isPublishedCourse)

  } catch (error) {
    console.log("[COURSE_IS_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}
