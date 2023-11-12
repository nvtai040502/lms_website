"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
const formScheme = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters"
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters"
  })
})
const CoursePage = () => {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      title: "",
      category: ""
    }
  })

  const router = useRouter()
  const onSubmit = (values: z.infer<typeof formScheme>) => {
    axios.post("../api/courses", values)
    
    
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">New Course</Button>
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
  )
}
export default CoursePage;