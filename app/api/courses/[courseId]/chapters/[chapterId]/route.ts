import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import Mux from "@mux/mux-node";

const { Video } = new Mux(
  process.env.MUX_ACCESS_TOKEN!,
  process.env.MUX_SECRET_KEY!  
)
export async function DELETE (req:Request, {params}: {params: {courseId: string, chapterId: string}}) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      }
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      }
    });

    if (!chapter) {
      return new NextResponse("Chappter Not Found", { status: 404 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        }
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          }
        });
      }
    }

    const deletedChapter = await db.chapter.delete({
      where: {
        id: params.chapterId
      }
    });


    return NextResponse.json(deletedChapter)
  } catch (error) {
    console.log(["CHAPTER DELETE"], error)
    return new NextResponse("Internal Error", {status: 500})
  }
}

export async function PATCH (req:Request, {params}: {params: {courseId: string, chapterId: string}}) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      }
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const { title, description, videoUrl, isFree} = await req.json()
    
    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId
      },
      data: {
        title: title,
        description: description,
        videoUrl: videoUrl,
        isFree: isFree
      }
    })

    if (videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId
        }
      })

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId)
        await db.muxData.delete({
          where: {
            id: existingMuxData.id
          }
        })
      }

      const asset = await Video.Assets.create({
        input: videoUrl,
        playback_policy: "public",
      });

      await db.muxData.create({
        data: {
          chapterId: params.chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        }
      });

    }



    return NextResponse.json(chapter)
  } catch (error) {
    console.log(["CHAPTER PATCH"], error)
    return new NextResponse("Internal Error", {status: 500})
  }
}