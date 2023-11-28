import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const setCart = (state, action) => {
  state.cart = action.payload;
};

const addToCart = (state, action) => {
  const cart = action.payload;
  state.cart = [...state.cart, cart];
  toast.success("Added to cart", {
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
};

const incQty = (state, action) => {
  const index = state.cart.findIndex(
    (prod) =>
      prod._id === action.payload._id && prod.size === action.payload.size
  );
  state.cart[index].qty++;
  toast.info("Already in cart. Quantity increased by 1", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    bodyClassName: "text-xs font-titleFont",
  });
};

const updateQty = (state, action) => {
  const index = state.cart.findIndex(
    (prod) =>
      prod._id === action.payload._id && prod.size === action.payload.size
  );
  state.cart[index].qty = action.payload.productQty;
};

const removeFromCart = (state, action) => {
  state.cart = state.cart.filter(
    (prod) =>
      prod._id !== action.payload._id || prod.size !== action.payload.size
  );
  toast.error(
    <div className="flex flex-col">
      <div className="font-bold text-sm font-titleFont flex gap-1 items-center">
        {action.payload.name}{" "}
        <span className="text-xs font-normal">
          (Size: {action.payload.size.toUpperCase()})
        </span>
      </div>
      <div className="text-xs font-bodyFont">removed from cart</div>
    </div>,
    {
      icon: <MdDelete color="red" size={24} />,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
  );
};

export { setCart, addToCart, incQty, updateQty, removeFromCart };
