import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH (req:Request, {params}: {params: {chapterId: string}}) {
  try {
    const { userId } = auth()
    if (!userId) {
      return null
    }
    
    const { title, description} = await req.json()
    
    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId
      },
      data: {
        title: title,
        description: description,
      }
    })


    return NextResponse.json(chapter)
  } catch (error) {
    console.log(["CHAPTER PATCH"], error)
    return new NextResponse("Internal Error", {status: 500})
  }
}