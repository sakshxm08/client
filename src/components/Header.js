import React, { useEffect, useRef, useState } from "react";
import { logoText, userImg } from "../assets";
import { Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import { BsBag } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";
import { BsBox2Heart } from "react-icons/bs";
import { GoSearch } from "react-icons/go";

export const Header = () => {
  const cart_redux = useSelector((state) => state.cart.cart);
  const [menu, setMenu] = useState(true);
  const menuRef = useRef();

  const funcProp = () => {
    setMenu(false);
  };
  let qty = 0;
  if (cart_redux.length !== 0) {
    for (let item of cart_redux) {
      qty += item.qty;
    }
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef?.current?.contains(event.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [menuRef]);
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
              className={`${
                !menu && "hidden"
              } tablets:hidden w-screen h-screen fixed z-10 bg-black/50 top-0 left-0 transition-all duration-500`}
            ></div>

            <div
              className="flex tablets:hidden flex-col gap-[4px] z-50"
              onClick={() => {
                setMenu(!menu);
              }}
              id="menuButton"
            >
              <span className="w-5 h-[1.5px] bg-black duration-200"></span>
              <span className="w-5 h-[1.5px] bg-black  duration-200"></span>
              <span className="w-5 h-[1.5px] bg-black duration-200"></span>
            </div>
          </div>
          <Link to="/" className="h-full">
            <div className="tablets:hidden h-full flex justify-center items-center">
              <img src={logoText} className="h-3/5 " alt="logo" />
            </div>
          </Link>
        </div>
        {/* MOBILE MENU */}
        <div
          className="flex tablets:hidden"
          ref={menuRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`fixed top-0 ${
              menu ? "left-0" : "left-[-100%]"
            } bg-white w-4/5 max-w-xs h-screen z-[10000] py-4  font-titleFont transition-all duration-300 overflow-scroll`}
            id="menu"
          >
            <div
              className="absolute z-50 flex top-8 right-2"
              // onClick={toggleMenu}
              onClick={() => {
                setMenu(!menu);
              }}
            >
              <span className="w-4 h-[2px] bg-black rotate-45 "></span>
              <span className="w-4 h-[2px] bg-black -rotate-45 -translate-x-4"></span>
            </div>
            <div className="mt-10">
              <MobileMenu setMenu={funcProp} />
            </div>
          </div>
        </div>
        {/* LAPTOP MENU */}

        <div className=" w-fit tablets:w-full h-full items-center justify-between gap-8 flex">
          <div className="w-full max-w-xl mx-auto hidden tablets:flex">
            <SearchBar />
          </div>
          <div className="flex gap-4 mobile:gap-8 justify-between h-full items-center ">
            <div className="group h-full hidden tablets:flex relative justify-center items-center group cursor-pointer after:content-[''] after:w-full after:duration-200 after:h-0 hover:after:h-1 after:bg-green-600 after:absolute after:bottom-0 ">
              <div className=" h-full relative flex items-center justify-center text-base gap-0 pl-4 pr-2">
                <img src={userImg} className={"w-6 "} alt="user" />

                <span className="group-hover:rotate-180 text-2xl duration-300">
                  <IoMdArrowDropdown></IoMdArrowDropdown>
                </span>
              </div>
              <div className="group-hover:scale-y-100 origin-top shadow scale-y-0 flex opacity-0 group-hover:opacity-100 ease-in-out duration-500 absolute top-full ">
                <UserMenu />
              </div>
            </div>
            <div className="h-full flex tablets:hidden justify-center items-center group">
              <div className="relative flex items-center w-8 aspect-square justify-center text-base gap-2 cursor-pointer">
                <GoSearch className="text-2xl" />
              </div>
            </div>
            <Link
              to="../cart"
              className="h-full flex justify-center items-center group"
            >
              <div className="relative flex items-center w-8 aspect-square justify-center text-base gap-1 cursor-pointer">
                {/* <img src={cart} className="w-6" alt="cart" /> */}
                <div className="w-8 relative">
                  <BsBag className="text-2xl" />

                  <span className="absolute text-xs -top-2 -right-2 rounded-full aspect-square bg-green-600 text-white w-6 flex items-center justify-center">
                    {qty}
                  </span>
                </div>
                <div
                  className="before:content-[''] 
                before:scale-[0.2] before:aspect-square before:bg-gray-800 before:rotate-45 before:-top-[1.2rem] -before:translate-x-1/2 
                before:right-0 before:left-0 before:absolute  group-hover:scale-100   scale-0 opacity-0 group-hover:opacity-100  hidden tablets:flex duration-200 bg-gray-800 text-white rounded absolute text-[10px] -bottom-10 w-max px-2 py-[1px]"
                >
                  Cart
                </div>
              </div>
            </Link>
            <Link
              to="../stash"
              className="h-full mobile:flex hidden justify-center items-center group"
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
