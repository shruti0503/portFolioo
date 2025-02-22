'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from "next/image";
import Hero from "./components/Hero";
import { FloatingNav } from "./components/NavBar";
import Grid from "./components/Grid";
import RecentProjects from "./components/RecentProjects";
import Experience from "./components/Experience";
import Approach from "./components/Approach";
import Footer from "./components/Footer";
import { socialMedia } from '@/data';
import PassKeyModel from "./components/PassKey";
import { navItems } from "@/data";
import Search from './components/Search';

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
import { Suspense } from 'react'

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname=usePathname();

  //const searchParams = useSearchParams();
 
  // useEffect(() => {
  //   if (typeof window !== 'undefined') { // Ensures this runs only on the client
  //     const admin = pathname.includes('/?admin=true')  == true;
  //     setIsAdmin(admin);
  //     console.log("pathname", pathname)
  //     console.log("searchParams?.admin",pathname.includes('/?admin=true') )
  //     console.log(" loogeing in window", admin)
  //   }
  //   else{
  //     console.log("nopt loogeing in window")
  //   }
  // }, [ pathname]);

  return (
  
    <main className="relative bg-black justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-[100vw] w-full">
        <FloatingNav navItems={navItems} />
        <Suspense fallback={<div>Loading..</div>}>
           <Search setIsAdmin={setIsAdmin} isAdmin={isAdmin} />
        </Suspense>
        
        {isAdmin && <PassKeyModel isAdmin={isAdmin}  />}
        <Hero />
      </div>
      <Grid />
      <Experience />
      <div className='flex w-full justify-center items-center font-bold text-lg gap-1'><a   href={socialMedia[0].link}  className='cursor-pointer'>GitHub</a> <img src={socialMedia[0].img} width={20} height={20} /> </div>
      <img src="https://ghchart.rshah.org/shruti0503" alt="GitHub Contribution Graph" className='flex w-full'  />
      <RecentProjects />
      <Approach />
      <Footer />
    </main>
    
  );
}
