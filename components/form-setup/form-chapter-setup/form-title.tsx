"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { LayoutGrid, Pencil, X } from 'lucide-react';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import axios from 'axios';
import { Chapter, Course } from '@prisma/client';
import { useToast } from '@/components/ui/use-toast';

const formScheme = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters"
  })
})

const ChapterFormTitle = ({course, chapter}: {course:Course ,chapter: Chapter}) => {
  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    await axios.patch(`/api/courses/${course.id}/chapters/${chapter.id}`, values)
    toast({
      title: "Updated Title Course Success",
    })
  }

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      title: chapter.title 
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
          Chapter Title
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
          <div className=' text-sm'>
              {chapter.title}
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
            
            <Button variant="outline" disabled={isSubmitting}>Save</Button>
          </form>
        </Form>
)}
        
    </div>
   );
}
 
export default ChapterFormTitle