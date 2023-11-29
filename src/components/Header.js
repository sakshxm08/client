import React from "react";
import { cart, logoText, userImg } from "../assets";
import { Link, NavLink } from "react-router-dom";
import { UserMenu } from "./UserMenu";

import { IoMdArrowDropdown } from "react-icons/io";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";
import { BsBox2Heart } from "react-icons/bs";

export const Header = () => {
  const cart_redux = useSelector((state) => state.cart.cart);

  let qty = 0;

  if (cart_redux.length !== 0) {
    for (let item of cart_redux) {
      qty += item.qty;
    }
  }

  const toggleMenu = () => {
    document.getElementById("menu").classList.toggle("hidden");
  };

  return (
    <div className="w-full bg-white drop-shadow h-20 sticky top-0 z-10">
      <div className="w-11/12 h-full mx-auto flex items-center gap-2 tablets:gap-8 justify-between">
        <div className="flex gap-4 h-full items-center justify-center">
          <div>
            <Link to="/">
              <div className="hidden tablets:block pr-4 border-r">
                <img src={logoText} className="w-56" alt="logo" />
              </div>
            </Link>
            <div
              className="flex tablets:hidden flex-col gap-[6px] z-50"
              onClick={toggleMenu}
              id="menuButton"
            >
              <span className="w-6 h-[2px] bg-black duration-200"></span>
              <span className="w-6 h-[2px] bg-black  duration-200"></span>
              <span className="w-6 h-[2px] bg-black duration-200"></span>
            </div>
          </div>
          <Link to="/" className="h-full">
            <div className="tablets:hidden h-full flex justify-center items-center">
              <img src={logoText} className="h-3/5 " alt="logo" />
            </div>
          </Link>
        </div>
        {/* MOBILE MENU */}
        <div className="flex tablets:hidden">
          <div
            className="fixed top-0 hidden bg-white w-screen h-screen z-50 p-4 left-0 font-titleFont"
            id="menu"
          >
            <div
              className="absolute z-50 flex top-10 left-7"
              onClick={toggleMenu}
            >
              <span className="w-6 h-[2px] bg-black rotate-45 "></span>
              <span className="w-6 h-[2px] bg-black -rotate-45 -translate-x-6"></span>
            </div>
            <div className="mt-20">
              <MobileMenu />
            </div>
          </div>
        </div>
        {/* LAPTOP MENU */}

        <div className=" w-fit tablets:w-full h-full items-center justify-between gap-8 flex">
          <ul className=" h-full items-center justify-between gap-10 font-titleFont hidden tablets:flex">
            <NavLink
              to="/men"
              className={({ isActive, isPending }) =>
                isPending
                  ? "text-black"
                  : isActive
                  ? "text-green-600 font-medium text-sm"
                  : "font-medium h-full flex items-center justify-center text-black text-sm hover:text-green-700 cursor-pointer transition-all duration-200 relative after:absolute hover:after:w-full after:w-0 after:transition-all after:duration-300 after:content-[''] after:h-[2px] after:bg-green-700 after:left-0 after:bottom-5"
              }
            >
              <li>MEN</li>
            </NavLink>
            <NavLink
              to="/women"
              className={({ isActive, isPending }) =>
                isPending
                  ? "text-black"
                  : isActive
                  ? "text-green-600 font-medium text-sm"
                  : "font-medium h-full flex items-center justify-center text-black text-sm hover:text-green-700 cursor-pointer transition-all duration-200 relative after:absolute hover:after:w-full after:w-0 after:transition-all after:duration-300 after:content-[''] after:h-[2px] after:bg-green-700 after:left-0 after:bottom-5"
              }
            >
              <li>WOMEN</li>
            </NavLink>
            <NavLink
              to="/kids"
              className={({ isActive, isPending }) =>
                isPending
                  ? "text-black"
                  : isActive
                  ? "text-green-600 font-medium text-sm"
                  : "font-medium h-full flex items-center justify-center text-black text-sm hover:text-green-700 cursor-pointer transition-all duration-200 relative after:absolute hover:after:w-full after:w-0 after:transition-all after:duration-300 after:content-[''] after:h-[2px] after:bg-green-700 after:left-0 after:bottom-5"
              }
            >
              <li>KIDS</li>
            </NavLink>
            <NavLink
              to="/beauty"
              className={({ isActive, isPending }) =>
                isPending
                  ? "text-black"
                  : isActive
                  ? "text-green-600 font-medium text-sm"
                  : "font-medium h-full flex items-center justify-center text-black text-sm hover:text-green-700 cursor-pointer transition-all duration-200 relative after:absolute hover:after:w-full after:w-0 after:transition-all after:duration-300 after:content-[''] after:h-[2px] after:bg-green-700 after:left-0 after:bottom-5"
              }
            >
              <li>BEAUTY</li>
            </NavLink>
          </ul>
          <div className="w-1/2  hidden tablets:flex">
            <SearchBar />
          </div>
          <div className="flex gap-3 tablets:gap-6 h-full items-center justify-center">
            <div className="group h-full hidden tablets:flex relative justify-center items-center group cursor-pointer  after:content-[''] after:w-full after:duration-200 after:h-0 hover:after:h-1 after:bg-green-600 after:absolute after:bottom-0 ">
              <div className=" h-full relative flex items-center justify-center text-base gap-0 ">
                <img src={userImg} className={"w-6 "} alt="user" />

                <span className="group-hover:rotate-180 text-2xl duration-300">
                  <IoMdArrowDropdown></IoMdArrowDropdown>
                </span>
              </div>
              <div className="group-hover:scale-y-100 origin-top shadow scale-y-0 flex opacity-0 group-hover:opacity-100 ease-in-out duration-500 absolute top-full ">
                <UserMenu />
              </div>
            </div>
            <Link
              to="../cart"
              className="h-full flex justify-center items-center group"
            >
              <div className="relative flex items-center w-8 aspect-square justify-center text-base gap-1 cursor-pointer">
                <img src={cart} className="w-6" alt="cart" />
                <span>{qty}</span>
                <div
                  className="before:content-[''] 
                before:scale-[0.2] before:aspect-square before:bg-gray-800 before:rotate-45 before:-top-[1.2rem] -before:translate-x-1/2 
                before:right-0 before:left-0 before:absolute  group-hover:scale-100   scale-0 opacity-0 group-hover:opacity-100  flex duration-200 bg-gray-800 text-white rounded absolute text-[10px] -bottom-10 w-max px-2 py-[1px]"
                >
                  Cart
                </div>
              </div>
            </Link>
            <Link
              to="../stash"
              className="h-full flex justify-center items-center group"
            >
              <div className="relative flex items-center w-8 aspect-square justify-center text-base gap-2 cursor-pointer">
                <BsBox2Heart size={22} />
                <div
                  className="before:content-[''] 
                  before:scale-[0.2] before:aspect-square before:bg-gray-800 before:rotate-45 before:-top-[1.3rem] -before:translate-x-1/2 
                  before:right-0 before:left-0 before:absolute  group-hover:scale-100   scale-0 opacity-0 group-hover:opacity-100  flex duration-200 bg-gray-800 text-white rounded absolute text-[10px] -bottom-10 w-max px-2 py-[1px]"
                >
                  Stash
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
