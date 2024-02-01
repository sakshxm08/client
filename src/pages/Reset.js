import React, { useState } from "react";
import { reset } from "../assets";
import { Link } from "react-router-dom";
import Transitions from "../components/Transition";

export const Reset = () => {
  const [email, setEmail] = useState("");
  // const [user, loading, error] = useAuthState(auth);
  // const [user, loading] = useAuthState(auth);
  // const [loader, setLoader] = useState(false);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (loading) {
  //     // setLoader(true);
  //     return;
  //   }
  //   if (user) {
  //     // setLoader(false);
  //     navigate("/");
  //     // console.log(user);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user, loading]);

  return (
    <Transitions>
      <div className="relative">
        <div className="lg:p-0 px-10 w-fit my-20 flex gap-8 mx-auto items-center">
          <div className="md:relative absolute md:opacity-100 opacity-10 left-0 -z-50 md:w-fit w-screen">
            <img src={reset} alt="" className="w-fit md:w-[30rem]" />
          </div>
          <div className="flex flex-col gap-8 w-fit md:w-[30rem]">
            <div className="flex flex-col gap-1 md:items-start items-center">
              <h1 className="text-3xl text-center md:text-start md:text-2xl tablets:text-3xl font-bold font-bodyFont tracking-wider">
                Forgot your password?
              </h1>
            </div>
            <div className="flex flex-col gap-6 md:items-start items-center">
              <span className="font-light text-center md:text-start text-sm sm:text-base text-black md:text-gray-500">
                Enter your email to reset the password
              </span>
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-400 px-4 py-2 sm:py-1 md:text-base text-sm tablets:py-2 w-full mobile:w-96 sm:w-full focus-visible:outline-green-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row  items-center md:gap-0 gap-4 justify-center md:justify-between">
              <button
                // onClick={() => resetPassword(email)}
                className="tablets:w-64 w-52 text-sm tablets:text-base uppercase text-white tracking-wider font-titleFont font-medium py-3 bg-green-500 hover:bg-green-600 duration-200 rounded-full"
              >
                Reset password
              </button>
              <Link to="/login">
                <span className="uppercase py-2 relative font-titleFont tracking-wider text-xs font-medium text-black md:text-gray-500 hover:text-black after:content-[''] after:h-px after:w-full after:scale-x-0 hover:after:scale-x-100 after:duration-300 duration-300 after:bg-black cursor-pointer after:absolute after:bottom-0 after:left-0">
                  Back to login?
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
