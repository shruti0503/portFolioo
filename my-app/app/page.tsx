import Image from "next/image";
import Hero from "./components/Hero";
import { FloatingNav } from "./components/NavBar";
import { FaHome } from "react-icons/fa";
import Grid from "./components/Grid";
import RecentProjects from "./components/RecentProjects";
import Clients from "./components/Clients";
import { navItems } from "@/data";

export default function Home() {
  return (
   <main className="relative bg-black  justify-center 
    items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
    <div className="max-w-7xl w-full ">
      <FloatingNav  navItems={navItems} />
      <Hero />
    </div>
    <Grid />
    <RecentProjects />
    <Clients />
   </main>
  );
}
