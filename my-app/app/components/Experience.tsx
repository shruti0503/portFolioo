'use client'
import React, { useEffect, useState } from "react";
import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";
import Loader from "@/components/ui/Loader";
import { getWorkExperience } from "@/app/lib/actions/admin.actions";


interface WorkExperience {
  id: string;
  position: string;
  duration: string;
  description: string;
}

const Experience = () => {
 
  const [workExp, setWorkExp] = useState<WorkExperience[]>([]);
  const [loading, setLoading]=useState(false);

  const getWork = async () => {
    try{
      setLoading(true);
      const work = await getWorkExperience();
      console.log("workep", work);
      setWorkExp(work); 
      setLoading(false);

    }
    catch(err){
      console.log("err occured while fetching exp", err);
      //setWorkExp(workExperience)
    }
   
  };

  useEffect(() => {
    getWork(); // Fetch work experience on component mount
  }, []);

  return (
    <>
     {
      loading ? 
      <Loader />
      :
      <div className="py-20 w-full">
      <h1 className="heading">
        My <span className="text-purple">work experience</span>
      </h1>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExp.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <img
                src='/exp1.svg'
                alt='card.position'
                className="lg:w-32 md:w-20 w-16"
              />
              <div className="lg:ms-5 flex flex-col  items-start">
                <h1 className="text-start text-xl md:text-2xl font-bold">
                  {/* ts-ignore */}
                  {card?.position}
                </h1>
                <p className="text-white-100">{card?.duration}</p>
                <p className="text-start text-white-100 mt-3 font-semibold">
                  {card.description}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
      </div>

    }
    </>

   
  );
};

export default Experience;
