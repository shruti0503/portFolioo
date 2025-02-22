'use client'
import Loader from "@/components/ui/Loader";
import React, { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { getProjects } from "@/app/lib/actions/admin.actions";
import { PinContainer } from "./ui/PinContainer";
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

const RecentProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]=useState(false);
  const [totalProjects, setTotalProjects]=useState(0);
  const [currentPage, setCurrentPage]=useState(0);
  const [totalPages, setTotalPages]=useState(1);

  const PageSize=3;


  const fetchProjects = async () => {
    try {
      setLoading(true);
      const projectData = await getProjects(currentPage, PageSize );
      projects.reverse();
      console.log("projects after rewverisng", projects)
      setProjects(projectData);
      setLoading(false);
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
      <div className="py-20">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map((item) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <PinContainer
              title="Project"
              href={item?.projectLink}
            >
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <img src="/bg.png" alt="bgimg" />
                </div>
                  
                <img
                  src={item.image}
                  alt="cover"
                  className="z-10 absolute bottom-2 h-full lg:rounded-3xl"
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1 ">
                {item.projectName}
              </h1>

              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {item.description}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.techStackImages.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <img src={icon} alt="icon5" className="p-2" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center gap-2">
                  {item.gitHubLink && (
                    <a className="flex lg:text-xl md:text-xs text-sm text-purple" href={item?.gitHubLink}>
                      GitHub
                    </a>
                  )}
                  {item?.projectLink && (
                    <a className="flex lg:text-xl md:text-xs text-sm text-purple" href={item?.projectLink}>
                      Live
                    </a>
                  )}
                  <FaLocationArrow className="ms-1" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
      {/* <ArrowDownWideNarrow /> */}

      <div className="w-full justify-end flex text-purple pe-5 underline ">
        <div>
          <a className="text-purple cursor-pointer" href="https://github.com/shruti0503">
            More
          </a>
        </div>
      </div>
    </div>

    }
    </>
  
  );
};

export default RecentProjects;
