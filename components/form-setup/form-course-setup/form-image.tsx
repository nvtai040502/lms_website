"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, X } from 'lucide-react';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import axios from 'axios';
import { useToast } from '../../ui/use-toast';
import { Course } from '@prisma/client';
import { FileUpload } from '../../file-upload';
import Image from 'next/image';

const formScheme = z.object({
  imageUrl: z.string().min(2, {
    message: "ImageUrl must be at least 2 characters"
  })
})

const FormImage = ({course}: {course: Course}) => {
  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    await axios.patch(`/api/courses/${course.id}`, values)
    toast({
      title: "Updated Image Course Success",
    })
  }

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      imageUrl: ""
    }
  })

  const {isSubmitting}  = form.formState
  const { toast } = useToast()
  const [isEditting, setIsEditting] = useState(false)
  const onClose = () => setIsEditting(false);
  const onClick = () => setIsEditting(true);
  
  

  return ( 
    <div className='flex gap-2 flex-col'>
      
        <div className='flex justify-between items-center font-medium'>
          Course Image
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
          course.imageUrl && (
            <div className="relative h-40 w-full object-cover">
              <Image
                fill
                src={course.imageUrl}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="Upload"
              />
            </div>
          )
        ): (
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField 
              
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  
                  <FormControl>
                  <div className=" bg-secondary">
                    <FileUpload
                      endpoint="courseImage"
                      value={field.value}
                      onChange={field.onChange} 
                      isSubmitting = {isSubmitting}
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
 
export default FormImage