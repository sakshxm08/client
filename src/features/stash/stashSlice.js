import { createSlice } from "@reduxjs/toolkit";
import { addToStash, removeFromStash, setStash } from "./stashFunc";

const initialState = {
  stash: [],
};

export const stashSlice = createSlice({
  name: "stash",
  initialState,
  reducers: {
    setStashRedux: setStash,
    addToStashRedux: addToStash,
    removeFromStashRedux: removeFromStash,
  },
});

export const { setStashRedux, addToStashRedux, removeFromStashRedux } =
  stashSlice.actions;

export default stashSlice.reducer;
