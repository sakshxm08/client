import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
export const UserMenu = () => {
  const { user } = useAuthContext();

  const { logout } = useLogout();

  const signout = () => {
    logout();
  };
  return (
    <div className=" p-2 drop-shadow-lg bg-white w-max flex flex-col gap-1 cursor-default">
      <div className="px-4">
        {user ? (
          <div className="py-3">
            <div className=" flex items-center gap-4">
              <span className="uppercase rounded-full aspect-square bg-green-700 text-white w-14 text-xl flex items-center justify-center">
                {user.name.charAt(0)}
              </span>
              <div className=" flex flex-col gap-0 ">
                <span className="font-titleFont font-light text-base whitespace-nowrap">
                  Hello,{" "}
                  <span className="font-medium">{user.name.split(" ")[0]}</span>
                </span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="font-semibold">Welcome</div>
            <div className="text-xs text-gray-800">
              To access account and manage orders
            </div>

            <Link
              to="/login"
              className=" uppercase py-2 px-3 border w-fit my-4 text-xs font-medium tracking-wide text-green-600 hover:border-green-600"
            >
              login/signup
            </Link>
          </div>
        )}
        {/* <div>
          <div className="h-[0.5px] w-full bg-gray-400"></div>
          <div className="flex flex-col gap-0 text-sm py-2">
            <span className="py-1 active:text-green-800 hover:font-semibold font-light cursor-pointer">
              Orders
            </span>
            <Link
              to="/stash"
              className="py-1 active:text-green-800 hover:font-semibold font-light cursor-pointer"
            >
              Stash
            </Link>
            <span className="py-1 active:text-green-800 hover:font-semibold font-light cursor-pointer">
              Contact Us
            </span>
          </div>
        </div> */}

        {user && (
          <div>
            <div className="h-[0.5px] w-full bg-gray-400"></div>

            <div className="flex flex-col text-sm py-2">
              <Link
                to="/cart"
                className="py-1 active:text-green-800 hover:font-semibold font-light cursor-pointer"
              >
                Cart
              </Link>
              <Link
                to="/stash"
                className="py-1 active:text-green-800 hover:font-semibold font-light cursor-pointer"
              >
                Stash
              </Link>
              <div className="h-[0.5px] w-full bg-gray-400 my-2"></div>

              <span
                className="py-1 text-red-500 active:text-red-800 hover:font-semibold font-light cursor-pointer"
                onClick={signout}
              >
                Signout
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
