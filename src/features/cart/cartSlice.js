import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  incQty,
  removeFromCart,
  setCart,
  updateQty,
} from "./cartFunc";
const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartRedux: setCart,
    addToCartRedux: addToCart,
    incQtyRedux: incQty,
    removeFromCartRedux: removeFromCart,
    updateQtyRedux: updateQty,
  },
});

export const {
  setCartRedux,
  addToCartRedux,
  incQtyRedux,
  removeFromCartRedux,
  updateQtyRedux,
} = cartSlice.actions;

export default cartSlice.reducer;
