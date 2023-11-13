import { createSlice } from "@reduxjs/toolkit";

const userLoginStates = createSlice({
  name: "userLoginState",
  initialState: false,
  reducers: {
    setTrue: state => true,
    setFalse: state => false,
  },
});

export const { setTrue, setFalse } = userLoginStates.actions;
export default userLoginStates.reducer;
