import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server"

const { Video } = new Mux(
  process.env.MUX_ACCESS_TOKEN!,
  process.env.MUX_SECRET_KEY!,
);

export async function DELETE (req:Request, {params}: {params: {courseId: string}}) {
  try {
    const { userId } = auth()
    if (!userId) {
      return null
    }
    
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
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
      return new NextResponse("Not found", { status: 404 });
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await Video.Assets.del(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH (req:Request, {params}: {params: {courseId: string}}) {
  try {
    const { userId } = auth()
    if (!userId) {
      return null
    }
    
    const values = await req.json()
    
    const course = await db.course.update({
      where: {
        userId: userId,
        id: params.courseId
      },
      data: {
        ...values,
      }
    })

    if (values.category) {
      const categoryDB = await db.category.update({
        where: {
          id: course.categoryId
        },
        data: {
          name: values.category
        }
      })
      return NextResponse.json(categoryDB)
    }

    return NextResponse.json(course)
  } catch (error) {
    console.log(["COURSE PATCH"], error)
    return new NextResponse("Internal Error", {status: 500})
  }
}