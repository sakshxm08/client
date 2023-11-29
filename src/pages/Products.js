import React, { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Link, useParams } from "react-router-dom";

import { HiArrowLeft, HiHome } from "react-icons/hi";
import Loader from "../components/Loaders/Loader";
import Breadcrumb from "../components/Breadcrumb";
import { GiClothes } from "react-icons/gi";
import Transitions from "../components/Transition";

export const Products = () => {
  const { category } = useParams();

  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(null);

  useEffect(() => {
    fetch(`https://wearworx-server.onrender.com/api/store/products/${category}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return setLoading(false);
        setStore([...res]);
        setLoading(false);
      });
  }, [category]);

  const routes = [
    { path: "/", value: "Home", icon: <HiHome /> },
    {
      path: `/products/${category}`,
      value: category.charAt(0).toUpperCase() + category.slice(1),
      icon: <GiClothes />,
    },
  ];
  return (
    <Transitions>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="py-10 px-5 min-w-[400px] ">
            <div className=" mx-14 mb-12">
              <Breadcrumb routes={routes} />
            </div>
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-base lg:text-xl bg-black text-white py-2 w-4/5 sm:w-80 text-center">
                {category.toUpperCase()}
              </h1>
              <span className="w-20 h-[3px] bg-black"></span>
            </div>
            {store && store.length !== 0 ? (
              <div className="max-w-screen-xl mx-auto grid mobile:grid-cols-2 tablets:grid-cols-3 xl:grid-cols-4 gap-10 py-10 lg:py-20">
                {store.map((item) => {
                  return <ProductCard key={item._id} product={item} />;
                })}
              </div>
            ) : (
              <>
                <div className="text-4xl font-titleFont text-center mt-12 px-12 pt-6 border-t border-t-gray-400 w-fit mx-auto">
                  No Products Found
                </div>
                <Link className="w-fit flex mx-auto" to="/">
                  <span className="flex gap-4 text-base border  border-green-700 w-fit items-center justify-center px-4 py-2 mt-8 hover:bg-green-700 hover:text-white transition-all duration-200">
                    <HiArrowLeft></HiArrowLeft>Return to Home
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </Transitions>
  );
};
