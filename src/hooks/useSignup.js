import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { cartServer } from "../features/cart/cartServer";
import { stashServer } from "../features/stash/stashServer";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const navigate = useNavigate();
  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://wearworx-server.onrender.com/api/user/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      toast.error(json.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "text-sm",
        progress: undefined,
        theme: "light",
      });
    }
    if (response.ok) {
      // Save the user to LocalStorage
      localStorage.setItem("user", JSON.stringify(json));

      // Update the Auth Context
      dispatch({ type: "LOGIN", payload: json });

      cartServer(json, [], error, setError);
      stashServer(json, [], error, setError);

      setIsLoading(false);
      navigate(-2);

      toast.success(
        <div className="flex flex-col">
          <div className="text-black">Hey {json.name.split(" ")[0]}!</div>
          <div className="text-xs">Welcome to WearWorx</div>
        </div>,
        {
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
    }
  };
  return { signup, isLoading, error };
};
