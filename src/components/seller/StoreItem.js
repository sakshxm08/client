import React from "react";
import { discountCalc } from "../../api/List";

const StoreItem = ({ item }) => {
  return (
    <div>
      <div className="group relative cursor-pointer">
        <div className="w-full h-40 overflow-hidden  ">
          <img
            className="object-cover w-full h-full group-hover:scale-110 duration-500"
            src={item.url}
            alt=""
          />
        </div>
        <div className="w-full border px-2 py-4 border-t-0 relative overflow-hidden">
          <div className="flex justify-between items-center ">
            <div className="w-1/2 ">
              <h2 className="font-titleFont text-base truncate font-semibold">
                {item.name}
              </h2>
            </div>
            <div className="flex gap-2 text-sm items-center relative overflow-hidden w-[130px] justify-end">
              {item.discountedPrice ? (
                <div className="flex justify-end gap-2 items-baseline ">
                  <span className="text-gray-700 line-through ">
                    &#8377;{item.originalPrice}
                  </span>
                  <span className="text-base">
                    &#8377;{item.discountedPrice}
                  </span>
                </div>
              ) : (
                <div className="flex justify-end gap-2 items-baseline ">
                  <span className="text-base">&#8377;{item.originalPrice}</span>
                </div>
              )}
            </div>
          </div>

          <div className="text-xs font-light mt-1">
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </div>
        </div>

        {item.discountedPrice && (
          <span className="absolute top-4 py-1 pr-2 text-lg drop-shadow pl-4 bg-green-700 text-white right-0">
            {discountCalc(item.originalPrice, item.discountedPrice)}% off
          </span>
        )}
      </div>
    </div>
  );
};

export default StoreItem;
