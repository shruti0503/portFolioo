'use client'

import React, { useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'
import { decryptKey } from '@/app/lib/utils'
import { getPassKey } from '@/app/lib/actions/admin.actions'
import { ProjectForm } from '@/components/ProjectForm'
import { Separator } from "@/components/ui/separator"
import { WorkExperienceForm } from '@/components/WorkExperienceForm'
import Link from 'next/link'

const Admin = () => {
  const encryptedKey = typeof window !== "undefined" ? window.localStorage.getItem("accessKey") : null;
  const router = useRouter();

  useLayoutEffect(() => {
    const checkAccessKey = async () => {
      const decryptedKey = encryptedKey && decryptKey(encryptedKey);
      const adminPassKey = await getPassKey();

      if (decryptedKey === adminPassKey) {
        console.log("accessKey");
      } else {
        console.log("accessKey not logged",);
        router.push("/");
      }
    };

    checkAccessKey();
  }, [encryptedKey, router]);

  return (
    <main className='px-20 w-full bg-[rgb(203 172 249)] h-screen gap-10 flex flex-col'>
      <Link className='text-3xl font-extrabold mt-10 cursor-pointer' href='/'>Portfolio</Link>
      <Separator />
      <h1 className='text-2xl font-extrabold'>Projects</h1>
      <ProjectForm />
      <Separator />
      <h1 className='text-2xl font-extrabold'>Work Experience</h1>
      <WorkExperienceForm />
    </main>
  )
}

export default Admin
