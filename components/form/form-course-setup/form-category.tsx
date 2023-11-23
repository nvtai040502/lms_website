"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, X } from 'lucide-react';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import axios from 'axios';
import { useToast } from '../../ui/use-toast';
import { Category, Course } from '@prisma/client';

interface FormCategoryProps {
  course: Course
  category: Category | null
}
const formScheme = z.object({
  categoryName: z.string().min(2, {
    message: "Category must be at least 2 characters"
  })
})

const FormCategory = ({course, category}: FormCategoryProps) => {
  
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      categoryName: category?.name
    }
  })
 
  const { toast } = useToast()
  const {isSubmitting}  = form.formState
  const [isEditting, setIsEditting] = useState(false)

  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    await axios.patch(`/api/courses/${course.id}`, values)
    toast({
      title: "Updated Category Name Course Success",
    })
  }

  const onClose = () => setIsEditting(false);
  const onClick = () => setIsEditting(true);
  
  return ( 
    <div className='flex gap-2 flex-col'>
      
        <div className='flex justify-between items-center font-medium'>
          Course Category
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
              {category?.name}
          </div>
        ): (
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField 
              disabled={isSubmitting}
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  
                  <FormControl>
                    <Input 
                    placeholder="Enter category name for your course" 
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
 
export default FormCategory