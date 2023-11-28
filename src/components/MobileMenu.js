import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUser } from "../firebase/Firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState("");
  const toggleMenu = () => {
    document.getElementById("menu").classList.toggle("hidden");
  };

  if (user) {
    getUser(user).then((data) => {
      setName(data.name);
    });
  }
  // Logout
  const logout = () => {
    signOut(auth);
  };
  return (
    <>
      <div className=" px-4">
        {user ? (
          <div>
            <div className=" flex items-center gap-4">
              <span className="uppercase rounded-full aspect-square bg-green-700 text-white w-14 text-xl flex items-center justify-center">
                {name.charAt(0)}
              </span>
              <div className=" flex flex-col gap-0 ">
                <span className="text-base">{name}</span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="font-semibold">Welcome</div>
            <div className="text-sm text-gray-800">
              To access account and manage orders
            </div>
            <Link
              to="/login"
              onClick={toggleMenu}
              className="uppercase py-2 px-3 border w-fit my-4 text-xs font-medium tracking-wide text-green-600"
            >
              login/signup
            </Link>
          </div>
        )}
        <div className="py-4">
          <div className="text-sm font-medium text-gray-400 flex  items-center justify-center gap-2 mb-4">
            Categories<div className="h-[0.5px] w-full bg-gray-400"></div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="py-1 active:text-green-800">Men</span>
            <span className="py-1 active:text-green-800">Women</span>
            <span className="py-1 active:text-green-800">Kids</span>
            <span className="py-1 active:text-green-800">Beauty</span>
          </div>
        </div>
        <div className="py-4">
          <div className="text-sm font-medium text-gray-400 flex  items-center justify-center gap-2 mb-4">
            Account<div className="h-[0.5px] w-full bg-gray-400"></div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="py-1 active:text-green-800">Edit Profile</span>
            <span className="py-1 active:text-green-800">Your orders</span>
            <span
              className="py-1 text-red-500 active:text-red-800"
              onClick={logout}
            >
              Signout
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
