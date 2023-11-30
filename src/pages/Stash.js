import React, { useEffect, useState } from "react";
import { StashItem } from "../components/StashItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Transitions from "../components/Transition";
import Unauthorized from "./Unauthorized";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaArrowRight } from "react-icons/fa";
import { emptyStash } from "../assets";
import Modal from "react-modal";
import { stashServer } from "../features/stash/stashServer";
import { setStashRedux } from "../features/stash/stashSlice";
import { toast } from "react-toastify";
import { TfiDropbox } from "react-icons/tfi";
export const Stash = () => {
  const stash = useSelector((state) => state.stash.stash);
  const [clearStashModal, setClearStashModal] = useState(false);

  const dispatch = useDispatch();

  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      stashServer(user, stash);
    }
  }, [stash, user]);

  const clearCart = () => {
    dispatch(setStashRedux([]));
    toast.error(
      <div className="flex flex-col">
        <div className="text-red-600">Cleared the Stash</div>
        <div className="text-xs">Unleash your inner fashionista!</div>
      </div>,
      {
        icon: <TfiDropbox size={24} color="red" />,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "text-sm",
        progress: undefined,
        theme: "light",
      }
    );
  };
  return (
    <>
      <Transitions>
        {user ? (
          <>
            {stash.length ? (
              <>
                <div className="mx-auto w-11/12 flex flex-col gap-3 py-8">
                  <div className="flex justify-between">
                    <h1 className="text-xl font-semibold font-titleFont">
                      My Stash{" "}
                      <span className="font-normal text-gray-700 text-base font-bodyFont">
                        ({stash.length}{" "}
                        {stash.length === 1 ? (
                          <span>item</span>
                        ) : (
                          <span>items</span>
                        )}
                        )
                      </span>
                    </h1>
                    <button
                      onClick={() => {
                        setClearStashModal(true);
                      }}
                      className="border transition-all hover:border-red-600 rounded-sm hover:text-red-600 text-xs py-2 px-4 flex items-center justify-center gap-2"
                    >
                      <TfiDropbox size={16} /> Clear Stash
                    </button>
                  </div>
                  <div className="w-full  mx-auto grid mobile:grid-cols-2 tablets:grid-cols-3 xl:grid-cols-5 gap-4 py-4">
                    {stash.map((item) => (
                      <StashItem key={item._id} product={item} />
                    ))}
                  </div>
                </div>
                <div className="absolute flex justify-center items-center w-fit h-fit">
                  <Modal
                    isOpen={clearStashModal}
                    ariaHideApp={false}
                    onRequestClose={() => setClearStashModal(false)}
                    className="absolute rounded w-1/3 h-fit bg-[#f1f1f1] px-4 py-8 left-0 right-0 mx-auto top-1/2 -translate-y-1/2"
                    overlayClassName="bg-[#0000007c] fixed inset-0 z-50"
                  >
                    <div className="flex flex-col gap-6 ">
                      <span className="text-base text-gray-800">
                        Are you sure you want to clear the cart?
                      </span>
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <button
                          onClick={() => {
                            clearCart();
                            setClearStashModal(false);
                          }}
                          className="w-full p-1 border rounded border-green-600 hover:bg-green-200 transition-all"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => {
                            setClearStashModal(false);
                          }}
                          className="w-full p-1 bg-green-600 border border-green-600 hover:bg-green-700 transition-all hover:border-green-700 text-white rounded"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </Modal>
                </div>
              </>
            ) : (
              <>
                <div className="py-20 flex justify-center gap-20 items-center">
                  <div className="flex flex-col gap-12 items-start justify-center">
                    <div className="text-4xl font-bold flex flex-col gap-4 font-titleFont tracking-wider">
                      <div className="flex gap-2 items-end">
                        Build your dream
                        <span className="text-green-600 font-extrabold">
                          wardrobe
                        </span>
                        with
                      </div>
                      <div className="flex gap-2 items-end">
                        your own
                        <span className="text-5xl font-extrabold text-green-600 uppercase">
                          Stash
                        </span>
                        collection
                      </div>
                    </div>

                    <div className="text-base flex items-center gap-2">
                      <Link
                        to="/"
                        className="uppercase font-titleFont font-bold border py-2 px-8 tracking-wide flex items-center justify-center gap-2 group hover:border-green-600 hover:text-green-600 rounded transition-all"
                      >
                        Add Items to Stash
                        <FaArrowRight className=" text-base group-hover:translate-x-2 transition-all text-black" />
                      </Link>
                    </div>
                  </div>
                  <img
                    src={emptyStash}
                    alt="Login required to access cart"
                    className="w-[480px]"
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <Unauthorized />
        )}
      </Transitions>
    </>
  );
};
