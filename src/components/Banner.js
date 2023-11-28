import React, { useState } from "react";
import { banner1, banner2, banner3, banner4 } from "../assets";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

export const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [color, setColor] = useState("green");

  const banners = [banner1, banner2, banner3, banner4];
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 3 : (prev) => prev - 1);
    if (currentSlide === 1) setColor("green");
    if (currentSlide === 2) setColor("amber");
    if (currentSlide === 3) setColor("fuchsia");
    if (currentSlide === 0) setColor("sky");
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 3 ? 0 : (next) => next + 1);
    if (currentSlide === 3) setColor("green");
    if (currentSlide === 0) setColor("amber");
    if (currentSlide === 1) setColor("fuchsia");
    if (currentSlide === 2) setColor("sky");
  };
  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div className="w-screen relative">
        <div
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
          className="w-[400vw] h-full flex transition-transform ease-out duration-700"
        >
          <img
            className="w-screen h-full object-cover"
            src={banners[0]}
            alt="imgOne"
            loading="priority"
          />
          <img
            className="w-screen h-full object-cover"
            src={banners[1]}
            alt="imgTwo"
          />
          <img
            className="w-screen h-full object-cover"
            src={banners[2]}
            alt="imgThree"
          />
          <img
            className="w-screen h-full object-cover"
            src={banners[3]}
            alt="imgFour"
          />
        </div>
        <div className="absolute sm:w-fit left-0 right-0 mx-auto flex gap-8 sm:bottom-5 sm:translate-y-0 bottom-[50%] translate-y-1/2 w-full justify-between px-2">
          <div
            onClick={prevSlide}
            className={`sm:text-base text-sm  border-[1px] border-${color}-700 flex items-center justify-center hover:cursor-pointer hover-bg-${color}-700 hover:text-white active-bg-${color}-900 duration-200 lg:h-12 h-8 w-8 sm:w-14`}
          >
            <HiArrowLeft />
          </div>
          <div
            onClick={nextSlide}
            className={` sm:text-base text-sm border-[1px] border-${color}-700 flex items-center justify-center hover:cursor-pointer hover-bg-${color}-700 hover:text-white active-bg-${color}-900 duration-200 lg:h-12 h-8 w-8 sm:w-14`}
          >
            <HiArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};
