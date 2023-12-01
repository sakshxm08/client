import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SmallLoader from "../components/Loaders/SmallLoader";
import { ProductCard } from "../components/ProductCard";
import { CategoryCard } from "../components/CategoryCard";

export const SearchItems = () => {
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  const query = searchParams.get("q");

  const navigate = useNavigate();

  useEffect(() => {
    if (!query) navigate(-1);
  });

  useEffect(() => {
    try {
      if (query) {
        setProducts([]);
        setCategories([]);
        const fetchData = async () => {
          setLoader(true);
          const product_res = await fetch(
            `https://wearworx-server.onrender.com/api/store/search/product/${query}`
          );
          const product_json = await product_res.json();

          const category_res = await fetch(
            `https://wearworx-server.onrender.com/api/store/search/category/${query}`
          );
          const category_json = await category_res.json();

          setProducts(product_json);
          setCategories(category_json);

          setLoader(false);
        };
        fetchData();
      }
    } catch (err) {
      alert(err.message);
    }
  }, [query]);

  return (
    <div className=" max-w-7xl w-11/12 mx-auto py-16 min-h-[600px]">
      {query ? (
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl mobile:text-4xl font-medium mobile:font-semibold mobile:text-start text-center hyphens-auto">
            <span className="font-bold mobile:font-extrabold">
              "{searchParams.get("q")}"
            </span>{" "}
            - Search Results
          </h1>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-xl font-semibold mobile:text-start text-center">
                Categories
              </h1>
              {loader ? (
                <SmallLoader />
              ) : (
                categories.length === 0 && (
                  <div className="text-slate-400 mobile:text-start text-center">
                    No categories found
                  </div>
                )
              )}
            </div>
            {categories.length > 0 && (
              <div className="grid grid-cols-2  min-[375px]:grid-cols-3 mobile:grid-cols-4  sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-8">
                {categories.map((category) => (
                  <CategoryCard category={category} key={category._id} />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6 border-t pt-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-xl font-semibold mobile:text-start text-center">
                Products
              </h1>
              {loader ? (
                <SmallLoader />
              ) : (
                products.length === 0 && (
                  <div className="text-slate-400 mobile:text-start text-center">
                    No prodcuts found
                  </div>
                )
              )}
            </div>
            {products.length > 0 && (
              <div className="mx-auto mobile:grid mobile:grid-cols-2 tablets:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product, index) => (
                  <ProductCard
                    product={product}
                    key={product._id}
                    first={index === 0}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>No search query</div>
      )}
    </div>
  );
};
