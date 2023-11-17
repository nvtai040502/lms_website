"use client"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formScheme = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters"
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters"
  })
})

interface CreateCourseModalProps {
  children: React.ReactNode
}
const CreateCourseModal = ({children}:CreateCourseModalProps) => {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      title: "",
      category: ""
    }
  })

  const onSubmit = (values: z.infer<typeof formScheme>) => {
    axios.post("../api/courses", values)
    
    
  }
  return ( 
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="grid gap-6 w-[1000px]">
        <DialogHeader>
          <DialogTitle>Name Your Course</DialogTitle>
          <DialogDescription>
            What would you like to name your course? Don't worry, you can change this later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
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
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Category</FormLabel>
                  <FormControl>
                    <Input 
                    className="dark:bg-zinc-700 bg-zinc-300/50 "
                    placeholder="Enter category of your course" 
                    {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="secondary">Create</Button>
          </form>
        </Form>
        
      </DialogContent>
    </Dialog>
   );
}
 
export default CreateCourseModal;