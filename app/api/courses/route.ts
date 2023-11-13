import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST (req:Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return null
    }
    
    const { title, category } = await req.json()
    
    

    const categoryDB = await db.category.create({
      data: {
        name: category,
        
      },
    });

    const course = await db.course.create({
      data: {
        title: title,
        description: "test",
        imageUrl: "test", 
        userId: userId,
        categoryId: categoryDB.id
      }
    })
    return NextResponse.json(course)
  } catch (error) {
    console.log(["COURSE POST"], error)
    return new NextResponse("Internal Error", {status: 500})
  }
}