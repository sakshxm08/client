import React, { useState } from "react";
import { loginImg } from "../assets";

import { Link } from "react-router-dom";

import Transitions from "../components/Transition";
import { useLogin } from "../hooks/useLogin";
import LoaderOverlay from "../components/Loaders/LoaderOverlay";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter email");
    if (!password) return alert("Please enter password");
    await login(email, password);
  };
  return (
    <Transitions>
      {isLoading && <LoaderOverlay />}

      <div className="relative">
        <div className="lg:p-0 p-0 sm:px-10 w-fit my-20 flex gap-8 mx-auto items-center">
          <div className="sm:relative absolute sm:opacity-100 opacity-20 left-0 -z-50 sm:w-fit w-screen ">
            <img src={loginImg} alt="" className="w-fit sm:w-[30rem]" />
          </div>
          <div className="flex flex-col gap-8 w-fit sm:w-[30rem]">
            <div className="flex flex-col gap-1 md:items-start items-center">
              <div className="flex justify-between items-center w-fit lg:w-full">
                <h1 className="text-3xl sm:text-2xl tablets:text-3xl  font-bold font-bodyFont tracking-wider">
                  Welcome Back!
                </h1>
                <div className="hidden lg:flex gap-2 font-titleFont">
                  <span>New User?</span>
                  <Link to="/signup">
                    <span className="text-green-600 py-2 font-semibold hover:text-green-700 after:content-[''] scale-x after:h-px after:w-full after:scale-x-0 hover:after:scale-x-100 after:duration-300 after:bg-green-700 after:absolute after:bottom-0 after:left-0 cursor-pointer duration-200 relative">
                      Sign Up
                    </span>
                  </Link>
                </div>
              </div>
              <span className="font-light tablets:text-base text-sm text-gray-500">
                Login to continue
              </span>
            </div>
            <form
              className="flex flex-col gap-8 w-fit sm:w-[30rem]"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-6 md:items-start items-center">
                <input
                  type="text"
                  placeholder="Email"
                  className="border  p-2 sm:py-1  text-sm tablets:py-2 w-full mobile:w-96 sm:w-full focus-visible:border-green-600 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border  p-2 sm:py-1  text-sm tablets:py-2 w-full mobile:w-96 sm:w-full focus-visible:border-green-600 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col md:flex-row  items-center md:gap-0 gap-4 justify-center md:justify-between">
                <button
                  disabled={isLoading}
                  className="w-36 tablets:w-48 text-sm   uppercase text-white tracking-wider font-titleFont font-medium py-3 bg-green-500 hover:bg-green-600 duration-200 rounded-full"
                >
                  Login
                </button>
                {/* <Link to="/reset">
                  <span className="uppercase py-2 relative font-titleFont tracking-wider text-xs font-medium text-gray-500 hover:text-black after:content-[''] after:h-px after:w-full after:scale-x-0 hover:after:scale-x-100 after:duration-300 duration-300 after:bg-black cursor-pointer after:absolute after:bottom-0 after:left-0">
                    forgot password?
                  </span>
                </Link> */}
              </div>
            </form>
            {/* <div className="flex md:mx-0 mx-auto gap-5 items-center">
              <span className=" tracking-wider text-gray-500 font-titleFont font-medium text-sm">
                Login with
              </span>
              <div className="flex gap-4">
                <div
                  // onClick={signInWithGoogle}
                  className=" relative group rounded-full flex items-center justify-center bg-gray-100 p-3 w-full hover:bg-gray-200 duration-200 cursor-pointer"
                >
                  <img src={google} className="w-6" alt="" />
                  <div
                    className="scale-0 opacity-0 group-hover:opacity-100 before:content-[''] 
                before:w-2 before:aspect-square before:bg-gray-200 before:rotate-45 before:-top-1 -before:translate-x-1/2 
                before:right-[21px] before:absolute  group-hover:scale-100 flex duration-200 bg-gray-200 text-gray-500 rounded absolute text-[10px] -bottom-6 px-2   py-[1px]"
                  >
                    <span>Google</span>
                  </div>
                </div>
                <div
                  // onClick={signInWithGithub}
                  className="group relative rounded-full bg-gray-100 flex items-center justify-center p-3 w-full hover:bg-gray-200 duration-200 cursor-pointer"
                >
                  <img src={github} className="w-6" alt="" />
                  <div
                    className="scale-0 opacity-0 group-hover:opacity-100 before:content-[''] 
                before:w-2 before:aspect-square before:bg-gray-200 before:rotate-45 before:-top-1 -before:translate-x-1/2 
                before:right-[20px] before:absolute  group-hover:scale-100 flex duration-200 bg-gray-200 text-gray-500 rounded absolute text-[10px] -bottom-6 px-2   py-[1px]"
                  >
                    <span>Github</span>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="lg:hidden tablets:text-base text-sm mx-auto flex gap-2 font-titleFont">
              <span>New User?</span>
              <Link to="/signup">
                <span className="text-green-600 py-2 font-semibold hover:text-green-700 after:content-[''] scale-x after:h-px after:w-full after:scale-x-0 hover:after:scale-x-100 after:duration-300 after:bg-green-700 after:absolute after:bottom-0 after:left-0 cursor-pointer duration-200 relative">
                  Sign Up
                </span>
              </Link>
            </div>
            {/* <div onClick={logout}>SIGNOUT</div> */}
          </div>
        </div>
      </div>
    </Transitions>
  );
};
