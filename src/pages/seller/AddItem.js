import React, { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdArrowDropDown, MdClose, MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../assets";
import { HiOutlineUpload } from "react-icons/hi";
import Transitions from "../../components/Transition";
import LoaderOverlay from "../../components/Loaders/LoaderOverlay";
import Loader from "../../components/Loaders/Loader";

const AddItem = () => {
  const [categoryLoading, setCategoryLoading] = useState(true);
  const dropdownRef = useRef(null);
  const dropdownMenu = useRef(null);

  const [dropdown, setDropdown] = useState(false);

  document.addEventListener("mousedown", (e) => {
    if (
      dropdownMenu.current &&
      dropdown &&
      !dropdownMenu.current.contains(e.target)
    ) {
      setDropdown(false);
      dropdownRef.current.classList.remove("-rotate-180");
      dropdownMenu.current.classList.add("scale-y-0");
      dropdownMenu.current.classList.remove("scale-y-100");
    }
  });

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`https://wearworx-server.onrender.com/api/store/categories`)
      .then((res) => res.json())
      .then((res) => {
        setCategories([...res]);
        setCategoryLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setCategoryLoading(false);
      });
  }, []);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [onDiscount, setOnDiscount] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [imgBase64, setImgBase64] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    const img = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/svg"];
    if (!allowedTypes.includes(img?.type))
      return alert("Only JPEG, PNG, and SVG images are allowed.");
    if (img) {
      if (img.size / 1048576 > 2)
        return alert("Please upload an image of size < 2MB");
      reader.readAsDataURL(img);
      reader.onload = () => {
        setImgBase64(reader.result);
        setImgURL(reader.result);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      category === "" ||
      originalPrice === "" ||
      (onDiscount && discountedPrice === "") ||
      keywords.length === 0 ||
      imgURL === ""
    ) {
      return alert("Enter all the required details");
    }
    if (onDiscount && discountedPrice >= originalPrice)
      return alert("Discounted Price cannot be greater than Original Price");
    setLoading(true);
    const item = {
      name,
      category: category.toLowerCase(),
      originalPrice,
      discountedPrice,
      url: imgBase64 ? imgBase64 : imgURL,
      keywords,
    };
    const response = await fetch(
      "https://wearworx-server.onrender.com/api/store/products",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setLoading(false);
      alert("Error");
    }
    if (response.ok) {
      setError(null);
      setName("");
      setCategory("");
      setOriginalPrice("");
      setDiscountedPrice("");
      setOnDiscount(false);
      setImgBase64(undefined);
      setImgURL("");
      setKeyword("");
      setKeywords([]);
      setLoading(false);
      navigate("/seller");
    }
  };
  return (
    <Transitions>
      {categoryLoading ? (
        <Loader />
      ) : (
        <>
          {loading && <LoaderOverlay />}
          <div className="flex justify-evenly items-center w-3/4 mx-auto">
            <div className="w-1/2 mx-auto py-16 relative">
              <h1 className="text-3xl font-bold font-titleFont my-4">
                Fill the details to add a Product
              </h1>
              <form className="flex flex-col gap-4 w-11/12">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-500" htmlFor="name">
                    Name*
                  </label>
                  <input
                    className="w-full border p-2 text-sm outline-none focus-visible:outline-green-600 outline-offset-0 focus-visible:border-transparent"
                    type="text"
                    value={name}
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-500" htmlFor="category">
                    Category*
                  </label>
                  <div className="relative">
                    <div
                      className={`${
                        category ? "text-black" : "text-gray-400"
                      } relative w-full border h-[38px] p-2 text-sm outline-none cursor-pointer focus-visible:outline-green-600 outline-offset-0 focus-visible:border-transparent`}
                      type="text"
                      // value={category}
                      id="category"
                      onClick={() => {
                        setDropdown(!dropdown);
                        dropdownRef.current.classList.toggle("-rotate-180");
                        dropdownMenu.current.classList.toggle("scale-y-0");
                        dropdownMenu.current.classList.toggle("scale-y-100");
                        // dropdownMenu.current.classList.toggle("flex");
                        // dropdownMenu.current.classList.toggle("hidden");
                      }}
                    >
                      {category ? category : "Select category"}

                      <div
                        ref={dropdownRef}
                        className="absolute right-1 text-black top-2 transition-all w-fit h-fit duration-300 "
                      >
                        <MdArrowDropDown className="text-xl " />
                      </div>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="dropdown"
                        checked={dropdown}
                        hidden
                        onChange={(e) => {
                          setDropdown(e.target.value);
                        }}
                        // className="[&:checked+div]:animate-[openDropdown_0.4s_ease_1_forwards] rotate-180 [&:checked+div]:flex"
                      />
                      <div
                        className="flex scale-y-0 flex-col shadow-xl absolute top-[38px] w-full bg-white origin-top transition-all duration-300"
                        ref={dropdownMenu}
                      >
                        {categories.map((category) => (
                          <span
                            className="p-2 cursor-pointer hover:bg-slate-200 transition-all text-sm"
                            onClick={() => {
                              setCategory(category.name);
                              dropdownMenu.current.classList.toggle(
                                "scale-y-0"
                              );
                              dropdownMenu.current.classList.toggle(
                                "scale-y-100"
                              );

                              dropdownRef.current.classList.toggle(
                                "-rotate-180"
                              );
                            }}
                            key={category.name}
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* </select> */}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-500" htmlFor="keyword">
                    Keywords for the Product*
                  </label>
                  <div className="flex">
                    <input
                      className="w-full border p-2 text-sm outline-none focus-visible:outline-green-600 outline-offset-0 focus-visible:border-transparent"
                      type="text"
                      value={keyword}
                      id="keyword"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          keywords.find(
                            (key) => key.toLowerCase() === keyword.toLowerCase()
                          ) ||
                          keyword === ""
                        )
                          return alert("Enter unique keywords");
                        keywords.push(keyword);
                        setKeyword("");
                      }}
                      className="text-xs text-slate-600 border py-2 px-4 border-l-0 hover:bg-slate-100 transition-all"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {keywords.length !== 0 &&
                      keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="flex items-center justify-center gap-1 bg-slate-200 pl-3 pr-1 py-2 rounded-md text-xs w-fit"
                        >
                          {keyword}
                          <IoIosClose
                            className="text-lg cursor-pointer"
                            onClick={() => {
                              setKeywords(() =>
                                keywords.filter((key) => key !== keyword)
                              );
                            }}
                          />
                        </span>
                      ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="text-xs text-slate-500"
                    htmlFor="originalPrice"
                  >
                    Price*
                  </label>
                  <div className="flex items-center border">
                    <span className="border-r p-2">
                      <MdCurrencyRupee />
                    </span>
                    <input
                      className="w-full  p-2 text-sm outline-none focus-visible:outline-green-600 outline-offset-0 focus-visible:border-transparent"
                      type="number"
                      value={originalPrice}
                      id="originalPrice"
                      onChange={(e) => setOriginalPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    value={onDiscount}
                    name="discount"
                    id="discount"
                    checked={onDiscount}
                    className=" w-3 rounded-none aspect-square accent-green-600"
                    onChange={() => setOnDiscount(!onDiscount)}
                  />
                  <label htmlFor="discount" className="text-xs text-slate-800 ">
                    Is there a discount on the product?
                  </label>
                </div>
                {onDiscount && (
                  <div className="flex flex-col gap-1">
                    <label
                      className="text-xs text-slate-500"
                      htmlFor="discountedPrice"
                    >
                      Discounted Price
                    </label>
                    <div className="flex items-center border">
                      <span className="border-r p-2">
                        <MdCurrencyRupee />
                      </span>
                      <input
                        className="w-full  p-2 text-sm outline-none focus-visible:outline-green-600 outline-offset-0 focus-visible:border-transparent"
                        type="number"
                        value={discountedPrice}
                        id="discountedPrice"
                        onChange={(e) => setDiscountedPrice(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                <div className="w-full flex flex-col gap-4">
                  {!imgBase64 ? (
                    <label
                      htmlFor="imgUpload"
                      className="border h-40 rounded-md w-full flex flex-col gap-2 items-center justify-center border-dashed border-slate-400 text-sm py-12 px-8 text-slate-500 uppercase cursor-pointer bg-slate-100 hover:bg-slate-200 transition-all"
                    >
                      <span>Upload an image of the product</span>
                      <span className="text-xs font-bodyFont font-light ">
                        (Size &lt; 2MB)
                      </span>
                    </label>
                  ) : (
                    <div className="flex gap-2">
                      <div className="w-1/2 h-40 flex items-center justify-center border">
                        <img src={imgBase64} alt="" className="h-full" />
                      </div>
                      <div className="w-1/2 flex flex-col items-center justify-center gap-4">
                        <label
                          htmlFor="imgUpload"
                          className=" w-full text-center flex rounded gap-2  items-center justify-center text-xs py-2 px-2 text-green-700 border border-green-700 bg-white  cursor-pointer hover:bg-green-100 transition-all"
                        >
                          <HiOutlineUpload className="text-base" />
                          Upload Another Image
                        </label>
                        <button
                          onClick={() => {
                            setImgBase64("");
                            setImgURL("");
                          }}
                          className=" w-full flex rounded gap-2 items-center justify-center border border-red-600 text-xs py-2 px-2 text-red-600 bg-white cursor-pointer hover:bg-red-100 transition-all"
                        >
                          <MdClose className="text-base" />
                          Clear Image
                        </button>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    id="imgUpload"
                    onChange={convertToBase64}
                    accept="image/*"
                  />
                </div>
                <div className="text-center text-xs font-semibold">OR</div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-500" htmlFor="imgURL">
                    Paste the URL of the Image of the Product*
                  </label>
                  <input
                    className=" disabled:text-slate-400 disabled:bg-slate-100 w-full border p-2 text-sm outline-none focus-visible:outline-green-600 outline-offset-0 focus-visible:border-transparent"
                    type="text"
                    disabled={imgBase64 ? true : false}
                    value={imgBase64 ? `${imgBase64.slice(0, 40)}...` : imgURL}
                    id="imgURL"
                    onChange={(e) => setImgURL(e.target.value)}
                  />
                </div>
                {error && <span className="text-red-600">{error}</span>}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-green-600 text-white text-sm px-4 py-2 hover:bg-green-700 active:bg-green-800 transition-all"
                >
                  Add Item
                </button>
              </form>
            </div>
            <div className="w-1/3">
              <img className="w-full h-auto" src={addItem} alt="" />
            </div>
          </div>
        </>
      )}
    </Transitions>
  );
};

export default AddItem;
