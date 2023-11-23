"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, PlusCircleIcon, X } from 'lucide-react';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import axios from 'axios';
import { useToast } from '../../../ui/use-toast';
import { Chapter, Course } from '@prisma/client';
import { ChaptersList } from './chapters-list';
import { useRouter } from 'next/navigation';

const formScheme = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters"
  }),
})

interface FormChapterProps {
  course: Course,
  chapters: Chapter[]
}

const FormChapter = ({course, chapters}: FormChapterProps) => {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      title: ""
    }
  })

  const {isSubmitting}  = form.formState
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false);

  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    await axios.post(`/api/courses/${course.id}/chapters`, values)
    toast({
      title: "Updated Chapter Course Success",
    })
  }

  const onClose = () => setIsCreating(false);
  const onClick = () => setIsCreating(true);


  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.patch(`/api/courses/${course.id}/chapters/reorder`, {
        list: updateData
      });
      toast({
        title: "Updated Chapter Course Success",
      })
    } catch {
      toast({
        title: "Something went wrong",
      })
    } finally {
      setIsUpdating(false);
    }
  }
  
  const onEdit = (id:string) => {
    router.push(`/teacher/courses/${course.id}/chapters/${id}`)
  }

  return ( 
    <div className='relative p-2 flex gap-2 flex-col'>
      
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 dark:bg-slate-500/40 top-0 right-0 rounded-m flex items-center justify-center">
        <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
      </div>
      )}
        <div className='flex justify-between items-center font-medium'>
            Course Chapter
          
          { isCreating ? (
          
          <Button onClick={onClose} variant="outline" size="sm" disabled={isSubmitting}>
            
          <X className='h-4 w-4 mr-2'/>
          Cancel
        </Button>
        ):
        (
          <Button onClick={onClick} variant="outline" size="sm" disabled={isUpdating}>
            
            <PlusCircleIcon className='h-4 w-4 mr-2'/>
            Add
          </Button>
          
        )}
        </div>
        
        { !isCreating ? (
          <div className=''>
            <ChaptersList
            onReorder={onReorder}
            items={chapters || []}
            onEdit={onEdit}
          />
          </div>
        ): (
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField 
              disabled={isSubmitting}
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  
                  <FormControl>
                    <Input 
                    placeholder="Enter title for your chapter" 
                    {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button variant="outline" disabled={isSubmitting}>Add</Button>
          </form>
        </Form>
)}
        
    </div>
   );
}
 
export default FormChapter