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
import { useToast } from '../ui/use-toast';
import { Chapter, Course } from '@prisma/client';

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
          Chapter Title
          { isEditting ? (
          
          <Button onClick={onClose} variant="secondary" size="sm" disabled={isSubmitting}>
            
          <X className='h-4 w-4 mr-2'/>
          Cancel
        </Button>
        ):
        (
          <Button onClick={onClick} variant="secondary" size="sm">
            
            <Pencil className='h-4 w-4 mr-2'/>
            Edit title
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
                    
                    className="dark:bg-zinc-700 bg-zinc-300/50"
                    
                    placeholder="Enter title for your course" 
                    {...field} />
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
 
export default ChapterFormTitle