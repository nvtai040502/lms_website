"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { LayoutGrid, Pencil, X } from 'lucide-react';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import axios from 'axios';
import { Chapter, Course } from '@prisma/client';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const formScheme = z.object({
  isFree: z.boolean()
})

const ChapterFormAccess = ({course, chapter}: {course:Course ,chapter: Chapter}) => {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      isFree: chapter.isFree 
    }
  })

  const { toast } = useToast()
  const {isSubmitting, isValid}  = form.formState
  const [isEditting, setIsEditting] = useState(false)

  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    await axios.patch(`/api/courses/${course.id}/chapters/${chapter.id}`, values)
    toast({
      title: "Chapter Updated",
    })
  }

  const onClose = () => setIsEditting(false);
  const onClick = () => setIsEditting(true);
  
  

  return ( 
    <div className='flex gap-2 flex-col'>
        <div className='flex justify-between items-center font-medium'>
          Chapter Access
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
          <p className={cn(
            "text-sm mt-2",
            !chapter.isFree && "text-slate-500 italic"
          )}>
            {chapter.isFree ? (
              <>This chapter is free for preview.</>
            ) : (
              <>This chapter is not free.</>
            )}
          </p>
        ): (
        
          <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                   
                  </FormControl>
                  <div className="space-y-1 ">
                    <FormDescription>
                      Check this box if you want to make this chapter free for preview
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div>
              <Button
                disabled={!isValid ||isSubmitting}
                variant="outline"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
)}
        
    </div>
   );
}
 
export default ChapterFormAccess