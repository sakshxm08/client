import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const setStash = (state, action) => {
  state.stash = action.payload;
};
const addToStash = (state, action) => {
  const stash = action.payload;
  if (state.stash.find((prod) => prod._id === stash._id)) {
    toast.info("Already in Stash", {
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
  } else {
    state.stash.push(stash);
    toast.success("Added to Stash", {
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
  }
};
const removeFromStash = (state, action) => {
  state.stash = state.stash.filter((prod) => prod._id !== action.payload._id);

  toast.error(
    <div className="flex flex-col">
      <div className="font-bold text-sm font-titleFont flex gap-1 items-center">
        {action.payload.name}
      </div>
      <div className="text-xs font-bodyFont">removed from stash</div>
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

export { setStash, addToStash, removeFromStash };
