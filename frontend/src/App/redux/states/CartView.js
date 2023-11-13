import { createSlice } from "@reduxjs/toolkit";

const CartView = createSlice({
  name: "CartView",
  initialState: false,
  reducers: {
    callTrue: (state) => true,
    callFalse: (state) => false,
  },
});

export const { callFalse, callTrue } = CartView.actions;
export default CartView.reducer;
