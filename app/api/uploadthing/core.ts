import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth()
  if (!userId) {
    throw new Error("Unauthorized")
  }
  return {userId: userId}
}

export const ourFileRouter = {
  courseImage: f({image: {maxFileSize: "4MB"}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  courseAttachment: f(["video", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;