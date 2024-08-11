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
import PassKeyModel from "./components/PassKey";
import { navItems } from "@/data";

export default function Home({ searchParams }: any) {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensures this runs only on the client
      const admin = searchParams?.admin === "true";
      setIsAdmin(admin);
    }
  }, [searchParams, pathname]);

  return (
    <main className="relative bg-black justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-[100vw] w-full">
        <FloatingNav navItems={navItems} />
        {isAdmin && <PassKeyModel isAdmin={isAdmin} />}
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
