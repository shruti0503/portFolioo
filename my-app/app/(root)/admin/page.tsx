'use client'

import React, { useEffect } from 'react'
import Header from '@/app/components/admin/Header'
import { encryptKey } from '@/app/lib/utils'
import { ProjectForm } from '@/components/ProjectForm'
import { useRouter } from 'next/navigation'
import { Separator } from "@/components/ui/separator"
import { useLayoutEffect } from 'react'
import { getPassKey } from '@/app/lib/actions/admin.actions'
// import { ADMIN_PASSKEY } from '@/app/lib/actions/admin.actions'
import { decryptKey } from '@/app/lib/utils'
import { WorkExperienceForm } from '@/components/WorkExperienceForm'
import Link from 'next/link'
const Admin = () => {
    const encryptedKey= typeof window !=="undefined" ? 
    window.localStorage.getItem("accessKey"):
    null;
 const router=useRouter();

    useLayoutEffect(()=>{
        const accessKey=encryptedKey && decryptKey(encryptedKey);

        const ADMIN_PASSKEY=getPassKey();
        if(accessKey===ADMIN_PASSKEY!.toString()){     
            //router.push("/admin")
            console.log("accessKey",accessKey)
        }
          else{
            console.log("accessKey not",accessKey)
            router.push("/")   
        }

      },[])


  return (
    <main className=' px-20 w-full bg-[rgb(203 172 249)] h-screen gap-10 flex flex-col' >
        {/* <Header /> */}
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
