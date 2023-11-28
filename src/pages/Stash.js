import React, { useEffect } from "react";
import { StashItem } from "../components/StashItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Transitions from "../components/Transition";
import Unauthorized from "./Unauthorized";
import { useAuthContext } from "../hooks/useAuthContext";
import { FaArrowRight } from "react-icons/fa";
import { emptyStash } from "../assets";
import { stashServer } from "../features/stash/stashServer";

export const Stash = () => {
  const stash = useSelector((state) => state.stash.stash);

  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      stashServer(user, stash);
    }
  }, [stash, user]);

  return (
    <>
      <Transitions>
        {user ? (
          <>
            {stash.length ? (
              <div className="mx-auto w-11/12 flex flex-col gap-3 py-8">
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

                <div className="w-full  mx-auto grid mobile:grid-cols-2 tablets:grid-cols-3 xl:grid-cols-5 gap-4 py-4">
                  {stash.map((item) => (
                    <StashItem key={item._id} product={item} />
                  ))}
                </div>
              </div>
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
