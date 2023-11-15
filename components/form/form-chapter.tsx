"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { LayoutGrid, Pencil, PlusCircle, PlusCircleIcon, X } from 'lucide-react';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import axios from 'axios';
import { useToast } from '../ui/use-toast';
import { Course } from '@prisma/client';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
const formScheme = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters"
  }),
})

const FormChapter = ({course}: {course: Course}) => {
  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    await axios.post(`/api/courses/${course.id}/chapters`, values)
    toast({
      title: "Updated Chapter Course Success",
    })
  }

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      title: ""
    }
  })

  const {isSubmitting, isValid}  = form.formState

  const [isCreating, setIsCreating] = useState(false)
  const onClose = () => {
    setIsCreating(false)
  }
  const onClick = () => {
    setIsCreating(true)
  }
  const { toast } = useToast()
  

  return ( 
    <div className='dark:bg-gray-600 rounded-md bg-gray-200 grid gap-y-2 p-4'>
      
      
      
        <div className='flex justify-between items-center font-medium'>
            Course Chapter
          
          { isCreating ? (
          
          <Button onClick={onClose} variant="secondary" size="sm" disabled={isSubmitting}>
            
          <X className='h-4 w-4 mr-2'/>
          Cancel
        </Button>
        ):
        (
          <Button onClick={onClick} variant="secondary" size="sm">
            
            <PlusCircleIcon className='h-4 w-4 mr-2'/>
            Add a chapter
          </Button>
          
        )}
        </div>
        
        { !isCreating ? (
          <div className=' text-sm'>
              
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
 
export default FormChapter