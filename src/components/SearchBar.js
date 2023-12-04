import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SmallLoader from "./Loaders/SmallLoader";
import { current } from "@reduxjs/toolkit";

const SearchBar = ({ query, setQuery, setSearchMobile, searchMobile }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoader] = useState(false);

  const searchBar = useRef();

  const [searchResults, setSearchResults] = useState(false);

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!query) setSearchResults(false);
  }, [query]);

  const fetchData = async (value) => {
    if (value) {
      setSearchResults(true);
      setLoader(true);
      const product_res = await fetch(
        `https://wearworx-server.onrender.com/api/store/search/product/${value}`
      );
      const product_json = await product_res.json();

      const category_res = await fetch(
        `https://wearworx-server.onrender.com/api/store/search/category/${value}`
      );
      const category_json = await category_res.json();

      setProducts(product_json);
      setCategories(category_json);

      setLoader(false);
    }
  };

  const handleSearch = (value) => {
    setQuery(value);
    searchParams.set("q", value);
    fetchData(value);
  };

  const searchRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!searchRef?.current?.contains(event.target)) {
        setSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [searchRef]);

  useEffect(() => {
    searchBar.current.focus();
  }, [searchMobile]);

  return (
    <div className="bg-gray-100 h-10 rounded w-full flex items-center relative">
      <span className="tablets:flex text-xl text-gray-700 font-bold hidden items-center justify-center pl-3 pr-4">
        <IoIosSearch />
      </span>
      <form
        className="w-full flex items-center"
        onSubmit={(e) => {
          e.preventDefault();
          if (query) {
            navigate("/searchitems");
            searchParams.set("q", query);
            setSearchParams(searchParams);
            setSearchResults(false);
            setSearchMobile();
          }
          document.activeElement.blur();
        }}
      >
        <input
          type="text"
          value={searchParams.get("q") ? searchParams.get("q") : query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for products, brands and more"
          ref={searchBar}
          className="bg-transparent w-full h-full outline-none text-sm font-light px-4 tablets:pl-0"
        />
      </form>
      <span
        onClick={() => {
          if (query) {
            navigate("/searchitems");
            searchParams.set("q", query);
            setSearchParams(searchParams);
            setSearchResults(false);
            setSearchMobile();
          }
          document.activeElement.blur();
        }}
        className="flex text-xl text-gray-700 font-bold tablets:hidden items-center justify-center pl-1 pr-4"
      >
        <IoIosSearch />
      </span>
      {query && searchResults && (
        <div
          ref={searchRef}
          className="absolute shadow bg-white z-50 left-0 top-full mt-2 py-2 rounded overflow-x-hidden overflow-y-scroll w-full h-fit max-h-96"
        >
          {loading && query && <SmallLoader width={30} />}
          {!loading && (
            <div className="flex gap-2 items-center py-2 px-4">
              <div className="text-xs text-slate-600">Products</div>
              <div className="bg-slate-200 h-[1px] w-full"></div>
            </div>
          )}
          {!loading && products.length > 0 && (
            <>
              {products.slice(0, 3).map((product) => (
                <Link
                  key={product._id}
                  onClick={() => {
                    setSearchResults(false);
                    setSearchMobile();
                  }}
                  to={`/products/${product.category}/${product._id}`}
                  className="w-full px-4 py-2 hover:bg-slate-100 transition-all cursor-pointer flex gap-4 items-center"
                >
                  <img
                    src={product.url}
                    alt="Search item"
                    className="aspect-square object-cover rounded w-10 border"
                  />
                  <div className="flex flex-col overflow-hidden w-full">
                    <span className="text-sm truncate">{product.name}</span>
                    <span className="text-slate-500 text-xs">
                      {product.category.charAt(0).toUpperCase() +
                        product.category.slice(1)}
                    </span>
                  </div>
                </Link>
              ))}
              {products.length > 3 && (
                <div
                  onClick={() => {
                    setSearchResults(false);
                    setSearchMobile();
                    navigate("/searchitems");
                    searchParams.set("q", query);
                    setSearchParams(searchParams);
                  }}
                  className="text-xs text-green-600 border py-2 px-4 w-fit mx-auto my-4 hover:border-green-600 transition-all cursor-pointer"
                >
                  See more
                </div>
              )}
            </>
          )}
          {!loading && products.length === 0 && (
            <div className="text-slate-400 text-xs px-4 py-2">
              No such products
            </div>
          )}
          {!loading && (
            <div className="flex gap-2 items-center py-2 px-4">
              <div className="text-xs text-slate-600">Categories</div>
              <div className="bg-slate-200 h-[1px] w-full"></div>
            </div>
          )}
          {!loading && categories.length > 0 && (
            <>
              {categories.slice(0, 3).map((category) => (
                <Link
                  key={category._id}
                  onClick={() => {
                    setSearchResults(false);
                    setSearchMobile();
                  }}
                  to={`/products/${category.name.toLowerCase()}`}
                  className="w-full px-4 py-2 hover:bg-slate-100 transition-all cursor-pointer flex gap-4 items-center"
                >
                  <img
                    src={category.img}
                    alt="Search item"
                    className="aspect-square object-cover rounded w-10"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm">{category.name}</span>
                  </div>
                </Link>
              ))}
              {categories.length > 3 && (
                <div
                  onClick={() => {
                    navigate("/searchitems");
                    setSearchMobile();
                    searchParams.set("q", query);
                    setSearchParams(searchParams);
                    setSearchResults(false);
                  }}
                  className="text-xs text-green-600 border py-2 px-4 w-fit mx-auto my-4 hover:border-green-600 transition-all cursor-pointer"
                >
                  See more
                </div>
              )}
            </>
          )}
          {!loading && categories.length === 0 && (
            <div className="text-slate-400 text-xs px-4 py-2">
              No such category
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
