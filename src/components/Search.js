import React from "react";
import { IoIosSearch } from "react-icons/io";

const Search = () => {
  return (
    <div className="bg-gray-100 h-10 rounded w-full flex items-center ">
      <span className="text-xl text-gray-700 font-bold flex items-center justify-center pl-3 pr-4">
        <IoIosSearch />
      </span>
      <input
        type="text"
        placeholder="Search for products, brands and more"
        className="bg-transparent w-full h-full outline-none text-sm font-light pr-4"
      />
    </div>
  );
};

export default Search;
