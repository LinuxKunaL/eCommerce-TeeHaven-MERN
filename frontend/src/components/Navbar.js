import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineStar,
  AiOutlineShopping,
} from "react-icons/ai";
import logo from "../assets/svg/logo.svg";
import { CgMenu } from "react-icons/cg";

import { useSelector, useDispatch } from "react-redux";
import { callTrue } from "../App/redux/states/CartView";
import { logOut } from "../api/auth";

const Navbar = () => {
  const LoadStateSelector = useSelector((state) => state.load) || true;
  const checkUserLogIN = useSelector((state) => state.userLoginStates);
  const cartDataNum = JSON.parse(localStorage.getItem("cartItems")) || [];

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const openCart = () => {
    dispatch(callTrue());
  };
  return (
    <nav id="NavBar">
      <div className="items">
        <li>
          <NavLink className="link" activeclassname="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="link" activeclassname="active" to="/shop">
            Shop
          </NavLink>
        </li>
        <li>
          <Link className="link" to="/shop?category=men">
            Men
          </Link>
        </li>
        <li>
          <Link className="link" to="/shop?category=woman">
            Woman
          </Link>
        </li>
      </div>
      <div onClick={() => Navigate("/")} className="logo">
        <img src={logo} alt="TeeHaven Logo" />
        <h1>TeeHaven</h1>
      </div>
      <div className="items">
        {checkUserLogIN ? (
          <Link to="/profile">
            <li>
              <AiOutlineUser className="icon" />
            </li>
          </Link>
        ) : null}

        {LoadStateSelector ? (
          <li data-cartItemNum={cartDataNum.length} className="cartIcon">
            <AiOutlineShopping onClick={openCart} className="icon" />
          </li>
        ) : null}

        {checkUserLogIN ? (
          <Link onClick={() => logOut(Navigate, dispatch)}>
            <button className="OutlineBtn">Logout</button>
          </Link>
        ) : (
          <Link to="/login/signup">
            <button className="OutlineBtn">Sign Up</button>
          </Link>
        )}
      </div>
      <CgMenu
        onClick={() => {
          document
            .getElementsByClassName("MenuItems")[0]
            .classList.toggle("activeMenu");
        }}
        className="MenuBar"
      />
      <div
        onClick={() => {
          console.log("hii");
          document
            .getElementsByClassName("MenuItems")[0]
            .classList.toggle("activeMenu");
        }}
        className="MenuItems"
      >
        <li>
          <NavLink className="link" activeclassname="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="link" activeclassname="active" to="/shop">
            Shop
          </NavLink>
        </li>
        <li>
          <Link className="link" to="/shop?category=men">
            Men
          </Link>
        </li>
        <li>
          <Link className="link" to="/shop?category=woman">
            Woman
          </Link>
        </li>
        {checkUserLogIN ? (
          <Link to="/profile">
            <li>
              <AiOutlineUser className="icon" />
            </li>
          </Link>
        ) : null}

        {LoadStateSelector ? (
          <li data-cartItemNum={cartDataNum.length} className="cartIcon">
            <AiOutlineShopping onClick={openCart} className="icon" />
          </li>
        ) : null}

        {checkUserLogIN ? (
          <Link onClick={() => logOut(Navigate, dispatch)}>
            <button className="OutlineBtn">Logout</button>
          </Link>
        ) : (
          <Link to="/login/signup">
            <button className="OutlineBtn">Sign Up</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
