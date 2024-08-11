"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FileUploader } from "./ui/file-upload"
import { Textarea } from "./ui/textarea"
import { Button } from "@/components/ui/button"
import { postWorkExperience } from "@/app/lib/actions/admin.actions"
import { DatePickerWithRange } from "./ui/RangeDatePicker"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "./ui/input"
import { useState } from "react"

// Extend schema to include all form fields
const formSchema = z.object({
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  duration: z.string().optional(),
  description: z.string().optional(),
})

export function WorkExperienceForm() {

  const [submitted, setSubmitted]=useState(false);
  const [error, setError]=useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: "",
      company: "",
      duration: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      //@ts-ignore
      const newWork = await postWorkExperience(values).then(()=>{
        setSubmitted(true);

      });
      console.log("new ", newWork);
  
      // Set submitted to true and reset the form
      
      form.reset(); // This should reset the form fields
  
      // Set a timeout to clear the success message after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);

      console.log("err while submitting", err);
    }
  }
  console.log("subvmitedd", submitted)
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Position" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Company" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                {/* Pass field value explicitly */}
                
                <Input placeholder="duration" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
     <div className="flex gap-10">
     <Button type="submit">Submit</Button>
        {submitted && (
          <p className="text-green-400 text-xl font-semibold">Work Experience Submitted!</p>
        )}
        {
          error && (
            <p className="text-red-400 text-xl font-semibold">Oops! An Error Occured!</p>
          )
        }

     </div>
       
      </form>
    </Form>
  )
}
