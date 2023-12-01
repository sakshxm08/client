import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { discountCalc } from "../api/List";
import { HiHeart } from "react-icons/hi";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addToStashRedux } from "../features/stash/stashSlice";
import { useAuthContext } from "../hooks/useAuthContext";
import { stashServer } from "../features/stash/stashServer";
import { toast } from "react-toastify";
import { BiError } from "react-icons/bi";
import { FaUserClock } from "react-icons/fa";

export const ProductCard = ({ product, first }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openProduct = () => {
    navigate(`/products/${product.category}/${product._id}`);
  };

  const addToStash = (e) => {
    e.stopPropagation();
    if (user) {
      dispatch(addToStashRedux(product));
    } else {
      toast.error(<div>Please login to add to Stash</div>, {
        icon: <FaUserClock size={40} />,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        bodyClassName: "text-sm font-titleFont",
      });
    }
  };

  const [error, setError] = useState(false);

  const stash = useSelector((state) => state.stash.stash);
  const { user } = useAuthContext();

  useEffect(() => {
    stashServer(user, stash, error, setError);
  }, [stash, user, error]);

  useEffect(() => {
    toast.error(error.message, {
      icon: <BiError color="red" size={24} />,
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, [error]);

  return (
    <div
      className={`group relative cursor-pointer flex mobile:flex-col w-full shadow h-28 mobile:h-80 ${
        first ? "" : "mt-4"
      } mobile:mt-0`}
      onClick={openProduct}
    >
      <div className="w-1/4  mobile:w-full h-full overflow-hidden border-r mobile:border-r-0 mobile:border-b relative ">
        <img
          className="object-cover w-full h-full group-hover:scale-110 duration-500"
          src={product.url}
          alt=""
        />
      </div>
      <div className="w-3/4 mobile:w-full px-2 py-2 mobile:py-4 relative overflow-hidden">
        <div className="flex justify-between h-full mobile:h-auto mobile:flex-row flex-col  items-center ">
          <div className="w-full mobile:w-1/2 flex flex-col">
            <h2 className="font-titleFont text-base truncate font-semibold">
              {product.name}
            </h2>
            <div className="text-xs font-light mt-1 mobile:hidden">
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </div>
          </div>
          <div className="flex gap-2 text-sm mobile:items-center relative overflow-hidden w-full mobile:w-[130px] mobile:justify-end">
            {product.discountedPrice ? (
              <div className="flex mobile:justify-end gap-2 items-baseline ">
                <span className="text-gray-700 line-through ">
                  &#8377;{product.originalPrice}
                </span>
                <span className="text-lg mobile:text-base">
                  &#8377;{product.discountedPrice}
                </span>
              </div>
            ) : (
              <div className="flex justify-end gap-2 items-baseline ">
                <span className="text-lg mobile:text-base">
                  &#8377;{product.originalPrice}
                </span>
              </div>
            )}
          </div>
        </div>
        <span
          onClick={addToStash}
          className="bottom-2 text-xs hidden tablets:flex border tablets:z-50 text-gray-500 right-2 hover:bg-gray-200 px-[2px] py-[2px] h-fit   hover:text-gray-900 absolute transform cursor-pointer tablets:translate-x-72 w-[120px] gap-1 items-center justify-center transition-transform group-hover:translate-x-0 duration-300"
        >
          add to stash <HiHeart />
        </span>
        <div className="text-xs font-light mt-1 hidden mobile:block">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </div>
      </div>
      {product.discountedPrice && (
        <span className="absolute bottom-4 mobile:bottom-auto mobile:top-4 py-1 pr-2  text-xs mobile:text-lg drop-shadow mobile:pl-4 pl-2 bg-green-700 text-white right-0">
          {discountCalc(product.originalPrice, product.discountedPrice)}% off
        </span>
      )}
    </div>
  );
};
