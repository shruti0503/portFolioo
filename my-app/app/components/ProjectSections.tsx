'use client'
import Loader from "@/components/ui/Loader";
import React, { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { getProjects } from "@/app/lib/actions/admin.actions";
import { PinContainer } from "./ui/PinContainer";
import { ProjectCard } from "./ui/ProjectCard";
import { ArrowDownWideNarrow } from "lucide-react";

interface Project {
    id: string;
    projectName: string;
    description: string;
    image: string;
    techStackImages: string[];
    gitHubLink?: string;
    projectLink?: string;
}


const ProjectSections = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject]=useState({});
    const [loading, setLoading]=useState(false);
    const [totalProjects, setTotalProjects]=useState(0);
    const [currentPage, setCurrentPage]=useState(0);
    const [totalPages, setTotalPages]=useState(1);

    console.log("pop", selectedProject)

    const PageSize=3;
     const fetchProjects = async () => {
        try {
          setLoading(true);
          const projectData = await getProjects(currentPage, PageSize );
          projects.reverse();
          console.log("projects after rewverisng", projects)
          setProjects(projectData);
          setLoading(false);
          setSelectedProject(projectData[0]);
        } catch (err) {
          console.error("Failed to fetch projects:", err);
        }
      };
    
      useEffect(() => {
        fetchProjects();
      }, []);

  return (
    <>
     {
        loading ?
        <Loader />
        :
        <div className="py-20 gap-10 flex flex-col">
            <h1 className="heading">
               A small selection of{" "}
              <span className="text-purple">recent projects</span>
            </h1>

            <div className="h-[100vh] overflow-y-auto overflow-x-hidden">
                  <div className="flex gap-10 w-full h-[100vh]">
                    <div className="flex flex-wrap w-[40%] items-center justify-start p-4 gap-16 mt-10">
                        {
                            projects.map((item)=>(
                                <div className="w-full" onClick={()=>setSelectedProject(item)}>
                                 <ProjectCard project={item} />
                                </div>
                            ))
                        }
                    </div>

                    <div className="w-full h-full flex rounded-lg border-2 border-white-100">
                        {
                            selectedProject!==null && 
                            <img
                                src={selectedProject?.image}
                                alt="cover"
                                className="z-10  bottom-2 h-full rounded-lg"
                            />
                        }
                        

                    </div>

                  </div>
            
                  <div className="w-full justify-end flex text-purple pe-5 underline ">
                    <div>
                      <a className="text-purple cursor-pointer" href="https://github.com/shruti0503">
                        More
                      </a>
                    </div>
                  </div>

            </div>
            

        </div>
     }
    
    </>
    
  )
}

export default ProjectSections