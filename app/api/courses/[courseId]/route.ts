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

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    // Destructuring request body
    const { title, description, price, categoryName } = await req.json();
    
    let categoryId = null;

    if (categoryName) {
      // Check if category exists in the database
      const foundCategory = await db.category.findUnique({
        where: {
          name: categoryName,
        },
      });

      // If category exists, assign its ID
      if (foundCategory) {
        categoryId = foundCategory.id;
      } else {
        // If category doesn't exist, create a new one
        const newCategory = await db.category.create({
          data: {
            name: categoryName,
          },
        });
        categoryId = newCategory.id;
      }
    }

    // Update the course with the provided courseId and userId
    const course = await db.course.update({
      where: {
        userId,
        id: params.courseId,
      },
      data: {
        price,
        categoryId,
        title,
        description,
      },
    });

    // Return the updated course information
    return NextResponse.json(course);
  } catch (error) {
    console.log(["COURSE PATCH"], error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
