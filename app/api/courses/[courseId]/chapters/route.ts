import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST (req:Request, {params}: {params: {courseId: string}}) {
  try {
    const { userId } = auth()
    if (!userId) {
      return null
    }
    
    const { title, description, videoUrl, isPublished, isFree } = await req.json()
    
    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: params.courseId
      },
      orderBy: {
        position: "desc"
      }
    })

    const newPosition = lastChapter ? lastChapter.position : 1

    const chapter = await db.chapter.create({
      data: {
        title: title,
        description: description,
        videoUrl: videoUrl,
        position: newPosition,
        isPublished: isPublished,
        isFree: isFree,
        courseId: params.courseId
      }
    })

    

    return NextResponse.json(chapter)
  } catch (error) {
    console.log(["CHAPTER POST"], error)
    return new NextResponse("Internal Error", {status: 500})
  }
}