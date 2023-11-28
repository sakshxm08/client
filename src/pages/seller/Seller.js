import React from "react";
import SellerStore from "../../components/seller/SellerStore";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import Transitions from "../../components/Transition";

const Seller = () => {
  return (
    <Transitions>
      <div>
        <div className="px-10 py-10 mx-auto">
          <div className=" py-10 flex justify-between items-center">
            <h1 className="text-4xl font-extrabold font-titleFont">
              Store Items
            </h1>
            <Link
              to="./additem"
              className="text-sm border font-light hover:bg-slate-100 active:bg-slate-200 transition-all px-4 py-2 font-bodyFont flex items-center justify-center gap-1"
            >
              <IoMdAdd className="aspect-square h-full" />
              Add new item
            </Link>
          </div>
          <SellerStore />
        </div>
      </div>
    </Transitions>
  );
};

export default Seller;
