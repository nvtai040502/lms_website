"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { LayoutGrid, Pencil, Video, X } from 'lucide-react';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import axios from 'axios';
import { useToast } from '../ui/use-toast';
import { Chapter, Course, MuxData } from '@prisma/client';
import { FileUpload } from '../file-upload';
import MuxPlayer from "@mux/mux-player-react";

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

  const {isSubmitting, isValid}  = form.formState

  const [isEditting, setIsEditting] = useState(false)
  const onClose = () => {
    setIsEditting(false)
  }
  const onClick = () => {
    
    setIsEditting(true)
    
    
  }
  const { toast } = useToast()
  

  return ( 
    <div className='dark:bg-gray-600 rounded-md bg-gray-200 grid gap-y-2 p-4'>
        <div className='flex justify-between items-center font-medium'>
          Chapter Video
          { isEditting ? (
          
          <Button onClick={onClose} variant="secondary" size="sm" disabled={isSubmitting}>
            
          <X className='h-4 w-4 mr-2'/>
          Cancel
        </Button>
        ):
        (
          <Button onClick={onClick} variant="secondary" size="sm">
            
            <Pencil className='h-4 w-4 mr-2'/>
            Edit video
          </Button>
          
        )}
        </div>
        
        { !isEditting ? (

          !chapter.videoUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
              <Video className="h-10 w-10 text-slate-500" />
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
                  <div className="dark:bg-gray-300 bg-white">
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
            
            <Button variant="secondary" disabled={!isValid || isSubmitting}>Save</Button>
          </form>
        </Form>
)}
        
    </div>
   );
}
 
export default ChapterFormVideo