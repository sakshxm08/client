import React, { useState } from "react";
import { signupImg } from "../assets";
import { Link } from "react-router-dom";
import Transitions from "../components/Transition";
import { useSignup } from "../hooks/useSignup";
import LoaderOverlay from "../components/Loaders/LoaderOverlay";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isLoading } = useSignup();

  const register = async (e) => {
    e.preventDefault();
    if (!name) return alert("Please enter name");
    if (!email) return alert("Please enter email");
    if (!password) return alert("Please enter password");
    await signup(name, email, password);
  };
  return (
    <Transitions>
      {isLoading && <LoaderOverlay />}
      <div className="relative max-w-5xl mx-auto">
        <div className="px-10 w-full mobile:w-3/4 md:w-fit my-20 flex gap-8 mx-auto items-center ">
          <div className="flex flex-col gap-4 w-full  md:w-1/2">
            <div className="flex flex-col gap-4 lg:items-start items-center w-full">
              <h1 className="text-2xl mobile:text-3xl font-bold font-bodyFont tracking-wider">
                Create Account
              </h1>
              {/* <div className="flex gap-4 items-center">
                <span className="text-gray-500">Login with</span>
                <div className="flex gap-4">
                  <div
                    // onClick={signInWithGoogle}
                    className=" relative group rounded-full flex items-center justify-center bg-gray-100 p-3 w-full hover:bg-gray-200 duration-200 cursor-pointer"
                  >
                    <img src={google} className="w-6" alt="" />
                    <div
                      className="scale-0 opacity-0 group-hover:opacity-100 before:content-[''] 
                before:w-2 before:aspect-square before:bg-gray-200 before:rotate-45 before:-top-1 -before:translate-x-1/2 
                before:right-[21px] before:absolute  group-hover:scale-100 flex duration-200 bg-gray-200 text-gray-900 rounded absolute text-[10px] -bottom-6 px-2   py-[1px]"
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
                before:right-[20px] before:absolute  group-hover:scale-100 flex duration-200 bg-gray-200 text-gray-900 rounded absolute text-[10px] -bottom-6 px-2   py-[1px]"
                    >
                      <span>Github</span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <form onSubmit={register} className="flex flex-col gap-8 w-full">
              <div className="flex flex-col gap-6 lg:items-start justify-center items-center">
                <span className=" font-light text-sm text-gray-500 lg:text-start text-center">
                  Register your email address to continue
                </span>
                <input
                  type="name"
                  name="name"
                  placeholder="Name"
                  className="border p-2 text-sm sm:py-2 w-full focus-visible:border-green-600 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border  p-2 text-sm sm:py-2 w-full focus-visible:border-green-600 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="border  p-2  text-sm sm:py-2 w-full  focus-visible:border-green-600 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col lg:flex-row items-center lg:gap-0 gap-4  justify-center lg:justify-between">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-36 tablets:w-48 text-sm   uppercase text-white tracking-wider font-titleFont font-medium py-3 bg-green-500 hover:bg-green-600 duration-200 rounded-full"
                >
                  Sign up
                </button>
                <div className=" flex tablets:text-base text-sm  gap-2 font-titleFont">
                  <span>Already a user?</span>
                  <Link to="/login">
                    <span
                      className="text-green-600 font-semibold hover:text-green-700 after:content-[''] scale-x after:h-px 
              after:w-full after:scale-x-0 hover:after:scale-x-100 after:duration-300 after:bg-green-700 after:absolute 
              after:bottom-0 after:left-0 cursor-pointer duration-200 relative py-2"
                    >
                      Login here
                    </span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className="md:relative absolute md:opacity-100 opacity-20 left-0 -z-50 md:w-1/2 w-screen ">
            <img src={signupImg} alt="" className="w-full" />
          </div>
        </div>
      </div>
    </Transitions>
  );
};
