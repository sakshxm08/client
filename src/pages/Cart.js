import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { stashImg, emptyCart } from "../assets";
import { CartPrice } from "../components/CartPrice";

import { useSelector } from "react-redux";
import { CartItem } from "../components/CartItem";
import Transitions from "../components/Transition";
import { cartServer } from "../features/cart/cartServer";
import { stashServer } from "../features/stash/stashServer";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import { BiError } from "react-icons/bi";
import Unauthorized from "./Unauthorized";
import { FaArrowRight } from "react-icons/fa";
import { BsBox2Heart } from "react-icons/bs";

export const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const stash = useSelector((state) => state.stash.stash);
  const { user } = useAuthContext();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (user) cartServer(user, cart, error, setError);
  }, [cart, user, error]);
  useEffect(() => {
    if (user) stashServer(user, stash, error, setError);
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
    <Transitions>
      {user ? (
        <div>
          {cart.length ? (
            <div className="w-11/12 lg:w-4/5 flex mx-auto lg:flex-row flex-col relative">
              <div className="w-full lg:w-2/3 flex flex-col gap-4 mobile:px-6 lg:border-r lg:border-r-gray-300 py-8 ">
                <h1 className="text-xl font-bold">Cart Items</h1>
                {cart.length ? (
                  cart.map((item) => (
                    <div className="shadow">
                      <CartItem key={item._id + item.size} product={item} />
                    </div>
                  ))
                ) : (
                  <>
                    <div className="mx-auto">No Items in Cart</div>
                    <Link to="/" className="mx-auto mb-4">
                      <button className="active:scale-95 mx-auto border border-green-600 text-green-600 px-3 py-2 uppercase text-xs  hover:bg-green-100 duration-200 cursor-pointer rounded-sm">
                        Add Items to Cart
                      </button>
                    </Link>
                  </>
                )}
                <div className="shadow py-4 px-3 flex bg-gradient-to-br from-green-500 to-green-800 rounded mobile:flex-row flex-col mobile:gap-0 gap-4 justify-between items-center w-full text-[10px] tablets:text-xs font-medium">
                  <span className="flex gap-4 items-center">
                    <img src={stashImg} className="w-16 tablets:w-28" alt="" />
                    <span className="flex flex-col text-base text-white ">
                      Your style awaits, uncover it.
                    </span>
                  </span>
                  <Link
                    to="/stash"
                    className="flex flex-nowrap mr-2 items-center justify-center gap-2 active:scale-95 mobile:w-fit w-2/3 text-center border border-white text-white px-1 tablets:px-3 py-1 tablets:py-2 uppercase text-[10px] tablets:text-sm hover:bg-white hover:text-green-600 duration-200 cursor-pointer rounded"
                  >
                    <BsBox2Heart size={16} />
                    Stash
                  </Link>
                </div>
              </div>
              <div className="h-fit py-8 flex sticky top-20 flex-col gap-4 px-6 w-full lg:w-1/3">
                <CartPrice />
              </div>
            </div>
          ) : (
            <>
              <div className="py-28 flex justify-center gap-28 items-center">
                <div className="flex flex-col gap-12 items-start justify-center">
                  <div className="text-5xl flex gap-4 font-titleFont tracking-wider">
                    <span className="font-bold">Hey, it feels so </span>
                    <span className=" font-extrabold text-green-600">
                      Light!
                    </span>
                  </div>
                  <div className="font-medium flex gap-1 text-gray-700 text-lg">
                    <span>There is nothing in your cart. Let's</span>
                    <span className="text-green-600">add</span>
                    <span>some items.</span>
                  </div>
                  <div className="text-base flex items-center gap-2">
                    <Link
                      to="/"
                      className="uppercase font-titleFont font-bold border py-2 px-8 tracking-wide flex items-center justify-center gap-2 group hover:border-green-600 hover:text-green-600 rounded transition-all"
                    >
                      Add Items to Cart
                      <FaArrowRight className=" text-base group-hover:translate-x-2 transition-all text-black" />
                    </Link>
                  </div>
                </div>
                <img
                  src={emptyCart}
                  alt="Login required to access cart"
                  className="w-[400px]"
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <Unauthorized />
        </>
      )}
    </Transitions>
  );
};
