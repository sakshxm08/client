import React from "react";
import { fashionRunway } from "../assets";
import { Link } from "react-router-dom";
import Transitions from "../components/Transition";

export const NotFound = () => {
  return (
    <Transitions>
      <div className="relative">
        <div className=" absolute object-cover h-full w-screen -z-50">
          <img
            src={fashionRunway}
            className="relative w-screen h-screen object-cover -z-50"
            alt=""
          />
        </div>

        <div className="flex flex-col justify-between items-center w-fit gap-10 mx-auto relative px-4 mobile:px-10 tablets:px-20 py-20 ">
          <div className="flex flex-col  justify-center items-center w-fit relative">
            <span className="text-4xl min-[320px]:text-6xl mobile:text-8xl md:text-9xl relative flex flex-col justify-center items-center sm:flex-row font-bodyFont font-extrabold text-transparent bg-contain bg-404 bg-clip-text before:bg-white before:content-[''] before:absolute  before:bottom-0 before:-left-1 before:w-full before:h-5/6  before:-z-20  before:-rotate-2">
              404 <span>Error !</span>
            </span>
          </div>
          <div className=" stroke-white stroke-1 relative w-fit text-3xl min-[320px]:text-5xl mobile:text-7xl md:text-8xl bg-contain text-center font-extrabold text-transparent bg-404 bg-clip-text before:bg-white before:content-[''] before:absolute  before:bottom-0 before:-left-1 before:w-full before:h-full  before:-z-20 before:top-2  before:-rotate-2">
            Fashion Emergency
          </div>
          <div className="mt-10 w-fit text-xl min-[320px]:text-2xl mobile:text-3xl sm:text-4xl md:text-5xl text-center font-extrabold text-white text-shadow-lg">
            You've entered the realm of style mysteries !
          </div>
          <Link to="/">
            <button className="relative z-0 py-2  font-light font-titleFont px-6 border text-xs min-[320px]:text-sm mobile:text-base sm:text-lg md:text-xl bg-white cursor-pointer duration-200 hover:bg-gray-300 hover:border-gray-400 active:bg-gray-400 active:scale-[0.98] text-black">
              Go back to the fabulous homepage?
            </button>
          </Link>
        </div>
      </div>
    </Transitions>
  );
};
