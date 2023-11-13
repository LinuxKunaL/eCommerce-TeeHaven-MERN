import React, { useState } from "react";
import {
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineHome,
} from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import CartView from "./CartView";
import { useSelector, useDispatch } from "react-redux";
import { callTrue } from "../App/redux/states/CartView";
import { Link } from "react-router-dom";

function BottomBar() {
  const cartDataNum = JSON.parse(localStorage.getItem("cartItems")) || [];
  const LoadStateSelector = useSelector((state) => state.load) || true;
  const dispatch = useDispatch();

  const openCart = () => {
    dispatch(callTrue());
  };

  return (
    <div id="BottomBar">
      <Link to="/">
        <AiOutlineHome className="icon" />
      </Link>
      {LoadStateSelector ? (
        <li data-cartItemNum={cartDataNum.length} className="cartIcon">
          <AiOutlineShopping onClick={openCart} className="icon cartIcon" />
        </li>
      ) : null}
      <Link to="/profile">
        <AiOutlineUser className="icon" />
      </Link>
      <Link to="/profile/orders">
        <HiOutlineShoppingCart className="icon" />
      </Link>
    </div>
  );
}

export default BottomBar;
