import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineStar } from "react-icons/md";
import { discountCalc } from "../api/List";
import {
  HiArrowRight,
  HiHeart,
  HiHome,
  HiOutlineShoppingBag,
} from "react-icons/hi";
import { FaUserLock } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "../hooks/useAuthContext";

import { addToCartRedux, incQtyRedux } from "../features/cart/cartSlice";
import { addToStashRedux } from "../features/stash/stashSlice";
import Loader from "../components/Loaders/Loader";
import { NotFound } from "./NotFound";
import Breadcrumb from "../components/Breadcrumb";
import { GiClothes } from "react-icons/gi";
import Transitions from "../components/Transition";
import { cartServer } from "../features/cart/cartServer";
import { stashServer } from "../features/stash/stashServer";

const Product = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
  const stash = useSelector((state) => state.stash.stash);

  const sizes = ["xs", "s", "m", "l", "xl", "xxl"];
  const [size, setSize] = useState(null);
  const onSizeChange = (e) => setSize(e.target.value);

  const { user } = useAuthContext();

  const { category, id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      `https://wearworx-server.onrender.com/api/store/products/${category}/${id}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return setLoading(false);
        setProduct(res);
        setLoading(false);
      });
  }, [category, id]);
  const selected_item = {
    ...product,
    size: size,
    qty: 1,
  };

  const addToCart = async () => {
    if (user) {
      if (size !== null) {
        const repeatProduct = cart.find(
          (prod) => prod._id === product._id && prod.size === size
        );
        repeatProduct
          ? dispatch(incQtyRedux(selected_item))
          : dispatch(addToCartRedux(selected_item));
        setSize(null);
      } else {
        toast.error("Select Size", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          bodyClassName: " text-sm font-titleFont",
        });
      }
    } else {
      toast.error(<div>Please login to add to cart</div>, {
        icon: <FaUserLock size={40} />,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        bodyClassName: "text-sm font-titleFont",
      });
      setSize(null);
    }
  };

  useEffect(() => {
    cartServer(user, cart, error, setError);
  }, [cart, user, error]);

  const addToStash = () => {
    if (user) {
      dispatch(addToStashRedux(product));
    } else {
      toast.error(<div>Please login to add to Stash</div>, {
        icon: <FaUserLock size={40} />,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        bodyClassName: "text-sm font-titleFont",
      });
    }
  };

  useEffect(() => {
    stashServer(user, stash, error, setError);
  }, [stash, user, error]);

  const routes = [
    { path: "/", value: "Home", icon: <HiHome /> },
    {
      path: `/products/${category}`,
      value: category,
      icon: <GiClothes />,
    },
    {
      path: `/products/${category}/${id}`,
      value: product && product.name,
      icon: <GiClothes />,
    },
  ];
  return (
    <>
      <Transitions>
        {loading ? (
          <Loader />
        ) : product ? (
          <div className="mx-auto my-10 w-11/12">
            <div className="mb-12">
              <Breadcrumb routes={routes} />
            </div>
            <div className="flex flex-col md:flex-row gap-10">
              <div className="w-3/4 mx-auto md:mx-0 mobile:w-1/2 tablets:w-2/5 relative">
                <img
                  src={product.url}
                  className="w-auto h-full tablets:h-[450px] lg:h-[550px]s object-cover tablets:object-contain mx-auto"
                  alt=""
                />
                {product.discountedPrice && (
                  <span className="absolute top-4 py-2 pr-4 text-xl drop-shadow pl-6 bg-green-700 text-white right-0">
                    {discountCalc(
                      product.originalPrice,
                      product.discountedPrice
                    )}
                    % off
                  </span>
                )}
              </div>
              <div className="w-full md:w-1/2 tablets:w-3/5 flex flex-col items-start justify-start">
                <div className="flex flex-col gap-2 items-start justify-start pb-6 border-b-[0.5px] border-b-gray-300 w-full">
                  <h1 className="tablets:text-xl text-3xl font-bold font-titleFont">
                    {product.name}
                  </h1>
                  <span className="tablets:text-base text-lg font-light text-gray-700">
                    {product.category.charAt(0).toUpperCase() +
                      product.category.slice(1)}
                  </span>
                  <div className="border py-1 px-3 flex gap-2 items-center">
                    <div className="flex border-r border-r-gray-300 pr-2 ">
                      <MdOutlineStar></MdOutlineStar>
                      <MdOutlineStar></MdOutlineStar>
                      <MdOutlineStar></MdOutlineStar>
                      <MdOutlineStar></MdOutlineStar>
                      <MdOutlineStar></MdOutlineStar>
                    </div>
                    <span className="tablets:text-xs text-sm font-light text-gray-500">
                      25 Ratings
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-4 pt-4">
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="flex flex-wrap gap-4 items-center">
                      <span className="font-medium text-xl ">
                        &#8377;
                        {product.discountedPrice
                          ? product.discountedPrice
                          : product.originalPrice}
                      </span>
                      {product.discountedPrice && (
                        <>
                          <span className="font-extralight text-lg  text-gray-500">
                            MRP{" "}
                            <span className="line-through">
                              &#8377;{product.originalPrice}
                            </span>
                          </span>
                          <span className="text-green-700  text-base font-medium">
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
                    <div className="text-green-700 tablets:text-xs text-sm font-medium">
                      inclusive of all taxes
                    </div>
                  </div>
                  <div className="py-3 flex flex-col gap-6">
                    <span className="uppercase tablets:text-sm text-base font-bold tracking-widest">
                      Select Size
                    </span>
                    <div className="gap-3 flex flex-wrap">
                      {sizes.map((size_param) => (
                        <label htmlFor={size_param} key={size_param}>
                          <input
                            type="radio"
                            name="size"
                            id={size_param}
                            value={size_param}
                            className="hidden peer"
                            checked={size === size_param}
                            onChange={onSizeChange}
                            required
                          />
                          <span className="rounded-full peer-checked:border-green-600 peer-checked:text-green-600 border border-gray-300 hover:border-green-600 cursor-pointer active:border-green-700 h-14 aspect-square flex items-center justify-center  font-semibold uppercase text-sm">
                            {size_param}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="w-full flex flex-row md:flex-col lg:flex-row gap-2 mobile:gap-4">
                    <div className="w-1/2 md:w-fit flex flex-col">
                      <button
                        onClick={addToCart}
                        id={`add-to-cart-${product.name}`}
                        className="w-full mobile:w-80 font-titleFont flex items-center justify-center gap-2 font-medium hover:bg-green-700 duration-200 cursor-pointer tracking-wider text-sm md:text-base bg-green-600 text-white py-3 rounded border border-green-600"
                      >
                        <HiOutlineShoppingBag className="text-lg md:text-xl"></HiOutlineShoppingBag>{" "}
                        Add to Cart
                      </button>
                      <Link to="/cart" className="w-full">
                        <button
                          id={`go-to-cart-${product.name}`}
                          className=" w-full mobile:w-80 hidden font-titleFont  items-center justify-center gap-2 font-medium hover:bg-green-700 duration-200 cursor-pointer tracking-wider text-sm md:text-base bg-green-600 text-white py-3 rounded border border-green-600"
                        >
                          Go to Cart
                          <HiArrowRight className="text-lg md:text-xl" />
                        </button>
                      </Link>
                    </div>

                    <div className="w-1/2 md:w-fit">
                      <button
                        onClick={addToStash}
                        className="w-full mobile:w-80 tablets:w-56 font-titleFont flex items-center justify-center gap-2 font-medium hover:bg-green-100 duration-200 cursor-pointer tracking-wider text-xs md:text-base bg-white text-green-600 border border-green-600 py-3 rounded"
                      >
                        <HiHeart className=" md:text-xl text-lg"></HiHeart>
                        Move to Stash
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NotFound />
        )}
      </Transitions>
    </>
  );
};

export default Product;
