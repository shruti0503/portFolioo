import React from 'react'
interface Project {
    id: string;
    projectName: string;
    description: string;
    image: string;
    techStackImages: string[];
    gitHubLink?: string;
    projectLink?: string;
}
export const ProjectCard = (project:any) => {
    
  return (
    <div className="w-full bg-white-100 flex flex-col cursor-pointer rounded-lg">
        <p>{project.project.projectName}</p>
        <div className="flex items-center">
            {project.project.techStackImages.map((icon:any, index:any) => (
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
        
    
    </div>
  )
}
