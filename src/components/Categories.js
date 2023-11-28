import React, { useEffect, useState } from "react";
import { CategoryCard } from "./CategoryCard";
import Loader from "./Loaders/SmallLoader";
export const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`/api/store/categories`)
      .then((res) => res.json())
      .then((res) => {
        setCategories([...res]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="py-10 px-5 mobile:px-10 lg:px-20 flex flex-col gap-12">
      <h1 className="uppercase text-xl mobile:text-2xl lg:text-3xl tracking-widest font-bold font-titleFont">
        categories to bag
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2  min-[375px]:grid-cols-3 mobile:grid-cols-4  sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-8 ">
          {categories.map((category) => (
            <CategoryCard
              key={categories.indexOf(category)}
              category={category}
            />
          ))}
        </div>
      )}
    </div>
  );
};
