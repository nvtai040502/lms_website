"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, X } from 'lucide-react';
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import axios from 'axios';
import { useToast } from '../../ui/use-toast';
import { Course } from '@prisma/client';
import { formatPrice } from '@/lib/format-price';

const formScheme = z.object({
  price: z.coerce.number()
})

const FormPrice = ({course}: {course: Course}) => {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      price: course.price || 0
    }
  })

  const { toast } = useToast()
  const {isSubmitting}  = form.formState
  const [isEditting, setIsEditting] = useState(false)

  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    await axios.patch(`/api/courses/${course.id}`, values)
    toast({
      title: "Updated Price Course Success",
    })
  }

  const onClose = () => setIsEditting(false);
  const onClick = () => setIsEditting(true);
  

  return ( 
    <div className='flex gap-2 flex-col'>
        <div className='flex justify-between items-center font-medium'>
            Course Price
          
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
              {formatPrice(course.price)}
          </div>
        ): (
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField 
              disabled={isSubmitting}
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  
                  <FormControl>
                    <Input 
                    type="number"
                    step="1000"
                    placeholder="Set a price for your course"
                  
                    {...field} />
                  </FormControl>
                  
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
 
export default FormPrice