import React, { useEffect, useState } from "react";
import StoreItem from "./StoreItem";
import Loader from "../Loaders/Loader";

const SellerStore = () => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/store/products")
      .then((res) => res.json())
      .then((res) => {
        if (res.error) return setLoading(false);
        setStore(res);
        setLoading(false);
      });
  }, []);
  return loading ? (
    <Loader />
  ) : store && store.length !== 0 ? (
    <div className="grid grid-cols-5 gap-8 mx-auto">
      {store.map((item) => (
        <StoreItem item={item} key={item._id} />
      ))}
    </div>
  ) : (
    <div>No Items in Store</div>
  );
};

export default SellerStore;
