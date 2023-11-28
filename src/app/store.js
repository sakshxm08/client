import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import stashReducer from "../features/stash/stashSlice";
const rootReducer = combineReducers({
  cart: cartReducer,
  stash: stashReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
