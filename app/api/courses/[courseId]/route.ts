import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH (req:Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return null
    }
    
    const { title, description } = await req.json()
    
    const course = await db.course.update({
      where: {
        userId: userId
      },
      data: {
        title: title,
        description: description,
      }
    })
    return NextResponse.json(course)
  } catch (error) {
    console.log(["COURSE PATCH"], error)
    return new NextResponse("Internal Error", {status: 500})
  }
}