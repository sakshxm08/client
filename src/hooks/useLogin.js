import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://wearworx-server.onrender.com/api/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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

      setIsLoading(false);

      navigate(-1);

      toast.success(
        <div className="flex flex-col">
          <div className="text-black">
            Welcome back, {json.name.split(" ")[0]}!
          </div>
          <div className="text-xs">Enjoy fashioning</div>
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
  return { login, isLoading, error };
};
