import { createSlice } from "@reduxjs/toolkit";

const load = createSlice({
  name: "load",
  initialState: false,
  reducers: {
    setTrue: (state) => true,
    setFalse: (state) => false,
  },
});

export const { setTrue, setFalse } = load.actions;
export default load.reducer;
