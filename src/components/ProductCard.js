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

export const ProductCard = ({ product }) => {
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
    <div className="group relative cursor-pointer" onClick={openProduct}>
      <div className="w-full h-80 overflow-hidden border ">
        <img
          className="object-cover w-full h-full group-hover:scale-110 duration-500"
          src={product.url}
          alt=""
        />
      </div>
      <div className="w-full border px-2 py-4 border-t-0 relative overflow-hidden">
        <div className="flex justify-between items-center ">
          <div className="w-1/2 ">
            <h2 className="font-titleFont text-base truncate font-semibold">
              {product.name}
            </h2>
          </div>
          <div className="flex gap-2 text-sm items-center relative overflow-hidden w-[130px] justify-end">
            {product.discountedPrice ? (
              <div className="flex justify-end gap-2 items-baseline ">
                <span className="text-gray-700 line-through ">
                  &#8377;{product.originalPrice}
                </span>
                <span className="text-base">
                  &#8377;{product.discountedPrice}
                </span>
              </div>
            ) : (
              <div className="flex justify-end gap-2 items-baseline ">
                <span className="text-base">
                  &#8377;{product.originalPrice}
                </span>
              </div>
            )}
          </div>
        </div>
        <span
          onClick={addToStash}
          className="bottom-2 text-xs border tablets:z-50 text-gray-500 right-2 hover:bg-gray-200 px-[2px] py-[2px] h-fit   hover:text-gray-900 absolute transform cursor-pointer tablets:translate-x-72 w-[120px] flex gap-1 items-center justify-center transition-transform group-hover:translate-x-0 duration-300"
        >
          add to stash <HiHeart />
        </span>

        <div className="text-xs font-light mt-1">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </div>
      </div>

      {product.discountedPrice && (
        <span className="absolute top-4 py-1 pr-2 text-lg drop-shadow pl-4 bg-green-700 text-white right-0">
          {discountCalc(product.originalPrice, product.discountedPrice)}% off
        </span>
      )}
    </div>
  );
};
