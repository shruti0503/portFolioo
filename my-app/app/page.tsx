'use client'
import Image from "next/image";
import Hero from "./components/Hero";
import { FloatingNav } from "./components/NavBar";
import { FaHome } from "react-icons/fa";
import Grid from "./components/Grid";
import RecentProjects from "./components/RecentProjects";
import Clients from "./components/Clients";
import { navItems } from "@/data";
import Experience from "./components/Experience";
import Approach from "./components/Approach";
import Footer from "./components/Footer";
import PassKeyModel from "./components/PassKey";

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { getWorkExperience } from "@/app/lib/actions/admin.actions";

export default function Home({searchParams}:any) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname=usePathname();
   
  //const isAdmin=searchParams?.admin==="true";

  useEffect(() => {
    const admin = searchParams?.admin=="true";
    console.log("typeof admin",typeof admin)
    console.log("admin",admin)
    console.log("searchParams?.admin",searchParams?.admin)
    setIsAdmin(admin);
  }, [isAdmin, pathname,searchParams]);



  return (
    <main className="relative bg-black justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-[100vw] w-full">
        <FloatingNav navItems={navItems} />
        {isAdmin && <PassKeyModel  isAdmin={isAdmin}/>}
        <Hero />
      </div>
      <Grid />
      <RecentProjects />
      <Experience />
      <Approach />
      <Footer />
    </main>
  );
}
