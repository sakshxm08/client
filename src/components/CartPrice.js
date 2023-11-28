import React from "react";
import { useSelector } from "react-redux";

export const CartPrice = () => {
  const cart = useSelector((state) => state.cart.cart);

  let totalOriginalPrice = 0;
  let totalDiscountedPrice = 0;
  let totalDiscount = 0;
  let quantity = 0;
  for (let item of cart) {
    if (item.discountedPrice)
      totalDiscountedPrice += item.discountedPrice * item.qty;
    else totalDiscountedPrice += item.originalPrice * item.qty;
    quantity += item.qty;
    totalOriginalPrice += item.originalPrice * item.qty;
  }

  totalDiscount = totalOriginalPrice - totalDiscountedPrice;
  return (
    <>
      <h6 className="uppercase text-sm font-bold font-titleFont tracking-wider">
        Price Details
        <span className="lowercase font-bodyFont font-medium text-xs pl-2 text-gray-700">
          ({quantity} {quantity > 1 ? "items" : "item"})
        </span>
      </h6>
      <div className="flex flex-col gap-2 text-sm font-light font-bodyFont border-b pb-4">
        <div className="flex justify-between items-center">
          <span>Total MRP</span>
          <span>&#8377;{totalOriginalPrice}</span>
        </div>
        {totalDiscount !== 0 ? (
          <div className="flex justify-between items-center ">
            <span>Discount on MRP</span>
            <span className="text-green-600">-&#8377;{totalDiscount}</span>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex justify-between items-center font-semibold text-sm">
        <span>Total Amount</span>
        <span>&#8377;{totalDiscountedPrice}</span>
      </div>
      <button className="w-full bg-green-600 rounded-sm text-white uppercase tracking-widest text-xs py-3 mt-3 font-medium hover:bg-green-700 active:bg-green-900 duration-200">
        Place Order
      </button>
    </>
  );
};
