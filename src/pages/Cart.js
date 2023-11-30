import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { stashImg, emptyCart } from "../assets";
import { CartPrice } from "../components/CartPrice";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
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
import { MdRemoveShoppingCart } from "react-icons/md";
import { setCartRedux } from "../features/cart/cartSlice";

export const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const stash = useSelector((state) => state.stash.stash);

  const [clearCartModal, setClearCartModal] = useState(false);
  const { user } = useAuthContext();
  const dispatch = useDispatch();

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

  const clearCart = () => {
    dispatch(setCartRedux([]));
    toast.error(
      <div className="flex flex-col">
        <div className="text-red-600">Cleared the cart</div>
        <div className="text-xs">Curate your dream wardrobe!</div>
      </div>,
      {
        icon: <MdRemoveShoppingCart size={24} color="red" />,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "text-sm",
        progress: undefined,
        theme: "light",
      }
    );
  };
  return (
    <Transitions>
      {user ? (
        <div>
          {cart.length ? (
            <>
              <div className="w-11/12 lg:w-4/5 flex mx-auto lg:flex-row flex-col relative">
                <div className="w-full lg:w-2/3 flex flex-col gap-4 mobile:px-6 lg:border-r lg:border-r-gray-300 py-8 ">
                  <div className="flex justify-between">
                    <h1 className="text-xl font-bold">Cart Items</h1>
                    <button
                      onClick={() => {
                        setClearCartModal(true);
                      }}
                      className="border transition-all hover:border-red-600 rounded-sm hover:text-red-600 text-xs py-2 px-4 flex items-center justify-center gap-2"
                    >
                      <MdRemoveShoppingCart size={16} /> Clear Cart
                    </button>
                  </div>
                  {cart.length ? (
                    cart.map((item) => (
                      <div className="shadow" key={item._id + item.size}>
                        <CartItem product={item} />
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
                      <img
                        src={stashImg}
                        className="w-16 tablets:w-28"
                        alt=""
                      />
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
              <div className="absolute flex justify-center items-center w-fit h-fit">
                <Modal
                  isOpen={clearCartModal}
                  ariaHideApp={false}
                  onRequestClose={() => setClearCartModal(false)}
                  className="absolute rounded w-1/3 h-fit bg-[#f1f1f1] px-4 py-8 left-0 right-0 mx-auto top-1/2 -translate-y-1/2"
                  overlayClassName="bg-[#0000007c] fixed inset-0 z-50"
                >
                  <div className="flex flex-col gap-6 ">
                    <span className="text-base text-gray-800">
                      Are you sure you want to clear the cart?
                    </span>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <button
                        onClick={() => {
                          clearCart();
                          setClearCartModal(false);
                        }}
                        className="w-full p-1 border rounded border-green-600 hover:bg-green-200 transition-all"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => {
                          setClearCartModal(false);
                        }}
                        className="w-full p-1 bg-green-600 border border-green-600 hover:bg-green-700 transition-all hover:border-green-700 text-white rounded"
                      >
                        No
                      </button>
                    </div>
                  </div>
                  {/* <div
                    onClick={() => {
                      setClearCartModal(false);
                    }}
                    className="absolute top-6 right-6 cursor-pointer"
                  >
                    <RxCross1 className="text-sm text-black" />
                  </div> */}
                </Modal>
              </div>
            </>
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
