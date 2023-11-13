import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH (req:Request, {params}: {params: {courseId: string}}) {
  try {
    const { userId } = auth()
    if (!userId) {
      return null
    }
    
    const { title, description, imageUrl, category } = await req.json()
    
    const course = await db.course.update({
      where: {
        userId: userId,
        id: params.courseId
      },
      data: {
        title: title,
        description: description,
        imageUrl: imageUrl,
      }
    })

    if (category) {
      const categoryDB = await db.category.update({
        where: {
          id: course.categoryId
        },
        data: {
          name: category
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