import React from "react";
import { Link } from "react-router-dom";
import { cartLogin } from "../assets";
import { FaArrowRight } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className="py-20 flex justify-center gap-28 items-center">
      <div className="flex flex-col gap-12 items-start justify-center">
        <div className="text-5xl flex flex-col gap-4 capitalize font-titleFont tracking-wider">
          <span className="font-bold">Unleash your inner</span>
          <span className=" font-extrabold text-green-600">fashionista</span>
        </div>
        <div className="text-lg flex items-center gap-2">
          <Link
            to="/login"
            className="uppercase font-titleFont font-bold border py-2 px-6 flex items-center justify-center gap-2 group hover:border-green-600 hover:text-green-600 rounded transition-all"
          >
            Login
            <FaArrowRight className=" text-base group-hover:translate-x-2 transition-all text-black" />
          </Link>
          to start curating your dream wardrobe
        </div>
      </div>
      <img
        src={cartLogin}
        alt="Login required to access cart"
        className="w-[400px]"
      />
    </div>
  );
};

export default Unauthorized;
