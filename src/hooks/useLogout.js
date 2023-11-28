import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";
import { useDispatch } from "react-redux";
import { setCartRedux } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { setStashRedux } from "../features/stash/stashSlice";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();
  const logout = () => {
    // Remove user from storage
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    dispatchRedux(setCartRedux([]));
    dispatchRedux(setStashRedux([]));
    navigate("/");
    toast.success(
      <div className="flex flex-col">
        <div className="text-gray-800">Signed out successfully</div>
        <div className="text-xs">Come back soon!</div>
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
  };
  return { logout };
};
