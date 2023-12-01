import React from "react";
import { Link } from "react-router-dom";
import { cartLogin } from "../assets";
import { FaArrowRight } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className="py-40 tablets:py-20 flex justify-center tablets:justify-between  items-center mx-auto max-w-5xl w-11/12 relative">
      <div className="flex flex-col gap-12 items-center tablets:items-start justify-center">
        <div className="text-4xl mobile:text-5xl gap-4 capitalize font-titleFont tracking-wider text-center tablets:text-start">
          <span className="font-bold">Unleash your inner </span>
          <span className=" font-extrabold text-green-600">fashionista</span>
        </div>
        <div className="mobile:text-lg flex lg:items-center gap-2 lg:flex-row flex-col">
          <Link
            to="/login"
            className="uppercase font-titleFont font-bold border py-2 px-6 flex  items-center justify-center gap-2 group hover:border-green-600 hover:text-green-600 bg-white rounded transition-all"
          >
            Login
            <FaArrowRight className="text-base group-hover:translate-x-2 transition-all text-black" />
          </Link>
          <span className="mobile:text-start text-center text-sm mobile:text-lg">
            to start curating your dream wardrobe
          </span>
        </div>
      </div>
      <img
        src={cartLogin}
        alt="Login required to access cart"
        className=" h-screen w-auto mobile:h-auto mobile:w-full tablets:w-[400px] tablets:relative absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 tablets:translate-x-0 tablets:translate-y-0 tablets:top-0 tablets:left-0 tablets:z-0 -z-50 tablets:opacity-100 opacity-20"
      />
    </div>
  );
};

export default Unauthorized;
