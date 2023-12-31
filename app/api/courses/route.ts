import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST (req:Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return null
    }
    
    const { title } = await req.json()    

    const course = await db.course.create({
      data: {
        title: title,
        userId: userId,
      }
    })
    return NextResponse.json(course)
  } catch (error) {
    console.log(["COURSE POST"], error)
    return new NextResponse("Internal Error", {status: 500})
  }
}