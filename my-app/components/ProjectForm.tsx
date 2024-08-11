"use client"
import "@uploadcare/react-uploader/core.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { postProject } from "@/lib/actions/admin.actions"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,

} from "@/components/ui/form"
import { Input } from "./ui/input"
import { useState } from "react";
import { Textarea } from "./ui/textarea";

// Extend schema to include all form fields
const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  projectLink: z.string().optional(), // Apply .optional() after .min()
  gitHubLink: z.string().optional(), // Apply .optional() after .min()
  image: z.any().optional(), // Keep as is
  techStackImages: z.array(z.string()).optional(), 
});



export function ProjectForm() {
  
  const [submitted, setSubmitted]=useState(false);
  const [error, setError]=useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      description: "",
      projectLink: "",
      gitHubLink: "",
      image: null, // Initially, no image URL
      techStackImages: [], // Initially, no images
    },
  });

  const [file, setFile]=useState('');
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log("values",values)
    try {
      const newProj = await postProject(values).then(()=>{
        setSubmitted(true);

      });
      form.reset();
      console.log("newProj", newProj);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      console.log("err while uploading projects", err)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Deployed Link</FormLabel>
              <FormControl>
                <Input placeholder="Link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gitHubLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter GitHub Link</FormLabel>
              <FormControl>
                <Input placeholder="Link" {...field} />
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

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insert Image</FormLabel>
              <FormControl>
                <FileUploaderRegular
                  pubkey={`${process.env.NEXT_PUBLIC_UPLOAD}`}
                  maxLocalFileSizeBytes={10000000}
                  multiple={false}
                  imgOnly={true}
                  // {...field}
                  sourceList="local, url, camera, dropbox"
                  classNameUploader="my-config uc-dark"
                  onFileUploadSuccess={(fileInfo: any) => {
                    // Extract the cdnUrl from the fileInfo object
                    const { cdnUrl } = fileInfo;
                    console.log("cdnUrl",cdnUrl);

                    if (cdnUrl) {
                      // Pass the cdnUrl string to the form field
                      console.log("cdnUrl",cdnUrl);
                      field.onChange(cdnUrl);
                    } else {
                      
                      console.log("CDN URL is not available yet.");
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>


          )}
        />

<FormField
  control={form.control}
  name="techStackImages"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Insert Tech Stack Images</FormLabel>
      <FormControl>
        <FileUploaderRegular
          pubkey={`${process.env.NEXT_PUBLIC_UPLOAD}`}
          maxLocalFileSizeBytes={10000000}
          multiple={true}
          imgOnly={true}
          sourceList="local, url, camera, dropbox"
          classNameUploader="my-config uc-dark"
          onFileUploadSuccess={(fileInfo: any) => {
            const { cdnUrl } = fileInfo;
            if (cdnUrl) {
              // Ensure field.value is an array before using it
              const updatedValue = Array.isArray(field.value) ? [...field.value, cdnUrl] : [cdnUrl];
              field.onChange(updatedValue);
            } else {
              console.log("CDN URL is not available yet.");
            }
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


     <div className="flex gap-10">
     <Button type="submit">Submit</Button>
        {submitted && (
          <p className="text-green-400 text-xl font-semibold">Project Submitted!</p>
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
