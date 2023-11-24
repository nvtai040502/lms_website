"use client"

import MuxPlayer from "@mux/mux-player-react";
import { Chapter, MuxData } from "@prisma/client";
import { Loader2, Lock } from "lucide-react";

interface VideoPlayerProps {
  chapter: Chapter
  muxData: MuxData | null
  isLocked: boolean
}
const VideoPlayer = ({chapter, muxData, isLocked}:VideoPlayerProps) => {
  return ( 
    
    <div className="aspect-video">
    
    {isLocked && (
      <div className="flex items-center justify-center flex-col gap-y-2 p-20">
        <Lock className="h-8 w-8" />
        <p className="text-sm">
          This chapter is locked
        </p>
      </div>
    )}
    {!isLocked && (
      <MuxPlayer
        title={chapter.title}
        playbackId={muxData?.playbackId || undefined}
      />
    )}
  </div>
   );
}
 
export default VideoPlayer;