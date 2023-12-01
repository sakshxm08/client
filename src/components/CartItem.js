import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { discountCalc } from "../api/List";
import { RxCross1 } from "react-icons/rx";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import {
  removeFromCartRedux,
  updateQtyRedux,
} from "../features/cart/cartSlice";
import { addToStashRedux } from "../features/stash/stashSlice";
import { useNavigate } from "react-router-dom";

export const CartItem = ({ product }) => {
  const [qtyModalOpen, setQtyModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const dispatch = useDispatch();
  let [productQty, setProductQty] = useState(product.qty);

  const removeItem = () => {
    dispatch(removeFromCartRedux(product));
    setRemoveModalOpen(false);
  };

  const addToStash = () => {
    dispatch(addToStashRedux(product));
    dispatch(removeFromCartRedux(product));
  };

  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate(`/products/${product.category}/${product._id}`);
        }}
      >
        <div className="shadow hover:shadow-lg rounded-sm p-3 pr-7 pb-4 flex w-full gap-4 relative cursor-pointer transition-all items-center">
          <div className="object-cover w-24 h-full flex items-center justify-center mobile:w-32 border aspect-square">
            <img
              src={product.url}
              className="w-full h-auto object-cover"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-2 text-sm pt-2 max-w-3/4">
            <div>
              <span className=" flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <h6 className="font-semibold font-titleFont text-base pr-4">
                  {product.name}
                  <span className=" flex items-center justify-center w-fit gap-1  text-green-700  tracking-wider font-medium rounded-sm text-[11px]">
                    (Size: {product.size.toUpperCase()})
                  </span>
                </h6>
              </span>
              <h2 className="text-gray-500 text-xs mobile:text-sm font-light mt-1 mb-3">
                Category:{" "}
                {product.category.slice(0, 1).toUpperCase() +
                  product.category.slice(1)}
              </h2>
            </div>
            <div className="flex flex-col gap-0">
              <div className="flex gap-2 items-center font-medium text-gray-500 text-[12px] ">
                <span className="">
                  &#8377;
                  {product.discountedPrice
                    ? product.discountedPrice
                    : product.originalPrice}
                </span>
                {product.discountedPrice && (
                  <>
                    <span className="font-light text-[10px] text-gray-500 line-through">
                      &#8377;{product.originalPrice}
                    </span>
                  </>
                )}
              </div>
              <div className="flex flex-wrap gap-2 items-center font-medium ">
                <span className="text-base mobile:text-lg">
                  &#8377;
                  {(product.discountedPrice
                    ? product.discountedPrice
                    : product.originalPrice) * product.qty}
                </span>
                {product.discountedPrice && (
                  <>
                    <span className="font-light text-xs mobile:text-sm text-gray-500 line-through">
                      &#8377;{product.originalPrice * product.qty}
                    </span>
                    <span className="text-green-700 text-xs mobile:text-sm font-medium">
                      (
                      {discountCalc(
                        product.originalPrice,
                        product.discountedPrice
                      )}
                      % OFF)
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setQtyModalOpen(true);
                }}
                className="cursor-pointer flex items-center justify-center w-fit gap-1  px-2 py-1 bg-gray-100 font-semibold rounded-sm text-xs"
              >
                Qty: {product.qty}{" "}
                <IoIosArrowDown className="text-xs"></IoIosArrowDown>
              </span>
            </div>
          </div>
          <div
            className="absolute top-2 p-2 border rounded-sm hover:bg-green-50 transition-all right-2 mobile:top-4 mobile:right-4 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setRemoveModalOpen(true);
            }}
          >
            <RxCross1 className="text-lg text-black"></RxCross1>
          </div>
        </div>
      </div>

      <div className="absolute flex justify-center items-center w-fit h-fit">
        <Modal
          isOpen={qtyModalOpen}
          ariaHideApp={false}
          onRequestClose={() => setQtyModalOpen(false)}
          className="absolute rounded w-4/5 max-w-sm h-fit bg-[#f1f1f1] p-6  left-0 right-0 mx-auto top-1/2 -translate-y-1/2"
          overlayClassName="bg-[#0000007c] fixed inset-0 z-50"
        >
          <div className="flex gap-4 border-b pb-5 border-b-gray-300">
            <div className="object-cover w-20">
              <img src={product.url} className="w-full h-auto" alt="" />
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <div className="flex gap-1 flex-col">
                <span className="font-titleFont font-semibold">
                  {product.name}
                </span>
                <span className="font-bodyFont font-light text-gray-600 text-sm">
                  {product.category.charAt(0).toUpperCase() +
                    product.category.slice(1)}
                </span>
              </div>
              <div className="flex mobile:flex-row flex-col gap-1 mobile:gap-2 mobile:items-center font-medium">
                <div className="flex gap-2 items-center">
                  <span>
                    &#8377;
                    {product.discountedPrice
                      ? product.discountedPrice
                      : product.originalPrice}
                  </span>
                  {product.discountedPrice && (
                    <span className="font-light text-xs text-gray-500 line-through">
                      &#8377;{product.originalPrice}
                    </span>
                  )}
                </div>
                {product.discountedPrice && (
                  <span className="text-green-700 text-xs font-medium">
                    (
                    {discountCalc(
                      product.originalPrice,
                      product.discountedPrice
                    )}
                    % OFF)
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="pt-4 flex flex-col gap-4">
            <div className="border px-4 py-1 flex gap-4 items-center justify-center text-sm text-gray-500">
              Quantity
              <div className="flex gap-2 items-center justify-center">
                <span
                  onClick={() => {
                    setProductQty(productQty === 1 ? 1 : productQty - 1);
                  }}
                  className={`${
                    productQty === 1
                      ? "bg-gray-300 text-gray-400 hover:bg-gray-300 hover:text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-600 hover:border-gray-600 hover:text-white cursor-pointer"
                  } px-2 select-none border text-sm    duration-200`}
                >
                  -
                </span>

                <span className="w-6 text-center">{productQty}</span>
                <span
                  onClick={() => {
                    setProductQty(productQty + 1);
                  }}
                  className=" px-2 select-none border text-sm hover:bg-gray-600 hover:border-gray-600 cursor-pointer hover:text-white duration-200"
                >
                  +
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                dispatch(updateQtyRedux({ ...product, productQty }));
                setQtyModalOpen(false);
              }}
              className="w-full bg-green-600 rounded-sm text-white uppercase tracking-widest text-xs py-3 mt-3 font-medium hover:bg-green-700 active:bg-green-900 duration-200"
            >
              Done
            </button>
          </div>
          <div
            onClick={() => {
              setQtyModalOpen(false);
            }}
            className="absolute top-6 right-6 cursor-pointer"
          >
            <RxCross1 className="text-lg text-black"></RxCross1>
          </div>
        </Modal>
      </div>
      <div className="absolute flex justify-center items-center w-fit h-fit">
        <Modal
          isOpen={removeModalOpen}
          ariaHideApp={false}
          onRequestClose={() => setRemoveModalOpen(false)}
          className="absolute rounded w-fit h-fit bg-[#f1f1f1] pt-4 pb-3 px-6  left-0 right-0 mx-auto top-1/2 -translate-y-1/2"
          overlayClassName="bg-[#0000007c] fixed inset-0 z-50"
        >
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <div className="w-12 object-cover flex items-center justify-center">
                <img src={product.url} alt="" />
              </div>
              <div className="text-sm flex flex-col gap-1">
                <h4 className="font-semibold">Move item from Cart?</h4>
                <span className=" w-40 mobile:w-60 text-xs">
                  Are you sure you want to remove this item from cart?
                </span>
              </div>
            </div>
            <div className="pt-3 mobile:border-t border-t-gray-300 text-[10px] grid grid-cols-1 gap-4 mobile:gap-0 mobile:grid-cols-2 text-center">
              <span
                className="font-medium cursor-pointer border-r border-r-gray-300"
                onClick={removeItem}
              >
                REMOVE
              </span>
              <span
                onClick={() => {
                  addToStash(product);
                }}
                className="font-medium cursor-pointer uppercase text-green-600"
              >
                move to stash
              </span>
            </div>
          </div>
          <div
            onClick={() => {
              setRemoveModalOpen(false);
            }}
            className="absolute top-2 right-2 cursor-pointer duration-200 active:scale-95"
          >
            <RxCross1 className="text-sm text-black"></RxCross1>
          </div>
        </Modal>
      </div>
    </>
  );
};
