import React from "react";
import { useNavigate } from "react-router-dom";

export const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const categoryParam = category.name.toLowerCase();

  const openCategory = () => {
    navigate(`/products/${categoryParam}`);
  };
  return (
    <div
      className="flex flex-col mx-auto justify-between items-center gap-4 group w-fit cursor-pointer "
      onClick={openCategory}
    >
      <div className="rounded-full aspect-square w-24 md:w-32 overflow-hidden isolate">
        <img
          src={category.img}
          className=" group-hover:scale-[1.2] duration-300 "
          alt=""
        />
      </div>
      <span className="font-light sm:font-normal">{category.name}</span>
    </div>
  );
};
