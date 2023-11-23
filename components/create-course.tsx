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
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const formScheme = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters"
  }),
})

interface CreateCourseModalProps {
  children: React.ReactNode
}

const CreateCourseModal = ({children}:CreateCourseModalProps) => {
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      title: "",
    }
  })

  const { isSubmitting } = form.formState;
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    try {
      
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);

      toast({
        title: "Create Course Success"
      })

    } catch (error) {
      console.error("Failed to create course:", error);
      toast({
        title: "Some thing went wrong",
        description: "Can't create a course"
      })
    } 
  };
  
  return ( 
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Name Your Course</DialogTitle>
          <DialogDescription>
            What would you like to name your course? Don't worry, you can change this later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              disabled={isSubmitting}
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input 
                    placeholder="Enter title for your course" 
                    {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} variant="outline">Continue</Button>
          </form>
        </Form>
        
      </DialogContent>
    </Dialog>
   );
}
 
export default CreateCourseModal;