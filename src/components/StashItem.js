import React, { useEffect, useState } from "react";
import { discountCalc } from "../api/List";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromStashRedux } from "../features/stash/stashSlice";
import { stashServer } from "../features/stash/stashServer";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import { BiError } from "react-icons/bi";

export const StashItem = ({ product }) => {
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stash = useSelector((state) => state.stash.stash);
  const { user } = useAuthContext();
  const openProduct = () => {
    navigate(`/products/${[product.category]}/${product._id}`);
  };

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
    <div className="group relative cursor-pointer border">
      <div className="w-full h-60 overflow-hidden  " onClick={openProduct}>
        <img
          className="object-contain w-full h-full group-hover:scale-110 duration-500"
          src={product.url}
          alt=""
        />
      </div>
      <div className="w-full  px-2 py-4 border-t relative overflow-hidden">
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

        <div className="text-xs font-light mt-1">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </div>
      </div>
      {product.discountedPrice && (
        <span className="absolute top-4 py-1 pr-2 text-lg drop-shadow pl-4 bg-green-700 text-white left-0">
          {discountCalc(product.originalPrice, product.discountedPrice)}% off
        </span>
      )}
      <span
        onClick={() => {
          dispatch(removeFromStashRedux(product));
        }}
        className="absolute border cursor-pointer hover:bg-[#eee] top-2 right-2 rounded-full bg-[#fff] p-1 transition-all"
      >
        <RxCross1 className="text-xs"></RxCross1>
      </span>
    </div>
  );
};
