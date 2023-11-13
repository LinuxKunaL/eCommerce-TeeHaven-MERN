import { configureStore } from "@reduxjs/toolkit";
import load from "./states/componentsload";
import counter from "./states/counter";
import userLoginStates from "./states/userLoginState";
import CartView from "./states/CartView";
const store = configureStore({
  reducer: {
    load: load,
    counter: counter,
    userLoginStates: userLoginStates,
    CartView: CartView,
  },
});

export default store;
