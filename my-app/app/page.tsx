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
import { NavbarDemo } from "./components/NavbarNew";

export default function Home() {
  return (
   <main className="relative bg-black  justify-center 
    items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
    <div className="max-w-[100vw] w-full ">
      {/* <NavbarDemo /> */}
      <FloatingNav  navItems={navItems} />
      <Hero />
    </div>
    <Grid />
    <RecentProjects />
    {/* <Clients /> */}
    <Experience />
    <Approach />
    <Footer />
   </main>
  );
}
