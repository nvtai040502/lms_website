"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Video, X } from 'lucide-react';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import axios from 'axios';

import { Chapter, Course, MuxData } from '@prisma/client';

import MuxPlayer from "@mux/mux-player-react";
import { useToast } from '@/components/ui/use-toast';
import { FileUpload } from '@/components/file-upload';

const formScheme = z.object({
  videoUrl: z.string().min(2, {
    message: "VideoUrl must be at least 2 characters"
  })
})

interface ChapterFormVideoProps {
  course: Course,
  chapter: Chapter,
  muxData: MuxData | null
}

const ChapterFormVideo = ({course, chapter, muxData}: ChapterFormVideoProps) => {
  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    await axios.patch(`/api/courses/${course.id}/chapters/${chapter.id}`, values)
    toast({
      title: "Updated VideoUrl Course Success",
    })
  }

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      videoUrl: ""
    }
  })

  const {isSubmitting}  = form.formState

  const [isEditting, setIsEditting] = useState(false)
  const onClose = () => setIsEditting(false);
  const onClick = () => setIsEditting(true);
  const { toast } = useToast()
  

  return ( 
    <div className='flex gap-2 flex-col'>
        <div className='flex justify-between items-center font-medium'>
          Chapter Video
          { isEditting ? (
          
          <Button onClick={onClose} variant="outline" size="sm" disabled={isSubmitting}>
            
          <X className='h-4 w-4 mr-2'/>
          Cancel
        </Button>
        ):
        (
          <Button onClick={onClick} variant="outline" size="sm">
            
            <Pencil className='h-4 w-4 mr-2'/>
            Edit
          </Button>
          
        )}
        </div>
        
        { !isEditting ? (

          !chapter.videoUrl ? (
            <div className="flex items-center justify-center h-60 bg-accent rounded-md">
              <Video className="h-10 w-10 " />
            </div>
          ) : (
            <div className="flex aspect-video ">
              <MuxPlayer
                streamType="on-demand"
                playbackId={muxData?.playbackId || ""}
              />
              
            </div>
          )

        ): (
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField 
              disabled={isSubmitting}
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  
                  <FormControl>
                  <div className="bg-accent">
                    <FileUpload
                      endpoint="chapterVideo"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    </div>
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button variant="outline" disabled={isSubmitting}>Save</Button>
          </form>
        </Form>
)}
        
    </div>
   );
}
 
export default ChapterFormVideo