import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaChevronDown } from "react-icons/fa";
import { VscDash } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import SmallLoader from "./Loaders/SmallLoader";
import { useLogout } from "../hooks/useLogout";

const MobileMenu = ({ setMenu }) => {
  const { user } = useAuthContext();

  // const toggleMenu = () => {
  //   document.getElementById("menu").classList.toggle("hidden");
  // };
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(false);
  const [loading, setLoading] = useState(true);

  const { logout } = useLogout();

  const signout = () => {
    logout();
  };

  useEffect(() => {
    fetch(`https://wearworx-server.onrender.com/api/store/categories/`)
      .then((res) => res.json())
      .then((res) => {
        setCategories([...res]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div>
        {user ? (
          <div className="pb-4 px-4">
            <div className=" flex items-center gap-4">
              <span className="uppercase rounded-full aspect-square bg-green-700 text-white w-14 text-xl flex items-center justify-center">
                {user.name.charAt(0)}
              </span>
              <div className=" flex flex-col gap-0 min-w-[10rem] overflow-hidden">
                <span className="text-base truncate">{user.name}</span>
                <span className="text-xs text-gray-500 truncate">
                  {user.email}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 px-4">
            <div className="font-semibold text-base">Welcome</div>
            <div className="text-xs text-gray-800">
              To access account and manage orders
            </div>
            <Link
              to="/login"
              onClick={() => {
                setMenu();
                setOpenCategory(false);
              }}
              className="uppercase py-2 px-4 border w-fit my-4 text-xs font-medium tracking-wide text-green-600"
            >
              login/signup
            </Link>
          </div>
        )}
        <div className="py-2 border-t flex flex-col text-sm">
          <div>
            <div
              onClick={() => setOpenCategory(!openCategory)}
              className=" text-black flex items-center gap-2 py-2 active:bg-slate-200 transition-all px-4"
            >
              Categories
              <FaChevronDown
                size={12}
                className={`${openCategory ? "rotate-180" : ""} transition-all`}
              />
            </div>
            {openCategory &&
              (!loading ? (
                <div className="flex flex-col gap-2 px-4">
                  {categories.map((category) => (
                    <Link
                      to={`/products/${category.name.toLowerCase()}`}
                      onClick={() => {
                        setMenu();
                        setOpenCategory(false);
                      }}
                      className="py-1 text-xs active:text-green-600 flex items-center gap-2"
                    >
                      <VscDash />
                      {category.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <SmallLoader width={20} />
              ))}
          </div>

          <Link
            to="/cart"
            onClick={() => {
              setMenu();
              setOpenCategory(false);
            }}
            className="py-2 active:bg-slate-200 transition-all px-4"
          >
            Cart
          </Link>
          <Link
            to="/stash"
            onClick={() => {
              setMenu();
              setOpenCategory(false);
            }}
            className="py-2 active:bg-slate-200 transition-all px-4"
          >
            Stash
          </Link>
        </div>
        {user && (
          <div className="py-2 border-t">
            <div className="flex flex-col text-sm">
              <span
                className=" text-red-500 flex items-center gap-2 active:text-red-800 active:bg-red-100 py-2 px-4"
                onClick={() => {
                  setMenu();
                  signout();
                  setOpenCategory(false);
                }}
              >
                <CiLogout size={20} />
                Signout
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileMenu;
