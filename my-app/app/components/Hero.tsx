import { FaLocationArrow } from "react-icons/fa6";

import MagicButton from "./ui/MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import Grid from "./Grid";
import { WavyBackground } from "./ui/wavy-background";

const Hero = () => {
  return (
    <WavyBackground>
       <div className="pb-20 pt-36">
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       */}
      <div>
        {/* <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" /> */}
      </div>

      <div className="flex justify-center items-center w-[100vw] relative my-20 z-10">
        <div className="max-w-[100vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-lg text-center text-blue-100 max-w-80">
            Hi! I&apos;m Shruti Vishwakarma!
          </p>

          {/**
           *  Link: https://ui.aceternity.com/components/text-generate-effect
           *
           *  change md:text-6xl, add more responsive code
           */}
          <TextGenerateEffect
            words="Unlocking the Potential of Ideas, Crafting Seamless Experiences"
            className="text-center text-[50px] md:text-5xl lg:text-6xl mb-2"
          />

          {/* <p className="text-center md:tracking-wider mb-4 text-sm md:text-sm">
            MERN | Next.js | C++ 
          </p> */}

          <a href="#about">
            <MagicButton
              title="Show my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>

    </WavyBackground>
   
  );
};

export default Hero;