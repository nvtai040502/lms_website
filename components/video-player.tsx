"use client"
import MuxPlayer from "@mux/mux-player-react";
import { Chapter, MuxData } from "@prisma/client";
interface VideoPlayerProps {
  chapter: Chapter
  muxData: MuxData | null
}
const VideoPlayer = ({chapter, muxData}:VideoPlayerProps) => {
  return ( 
    <div className="aspect-video ">
        <MuxPlayer
          title={chapter.title}
          playbackId={muxData?.playbackId || undefined}
        />
      
    </div>
   );
}
 
export default VideoPlayer;