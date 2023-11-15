import React from "react";
import {
  FaLuggageCart,
  FaHome,
  FaShoppingBasket,
  FaAngleLeft,
  FaHouseUser,
} from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";

import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <div className="Nav">
      <div className="side">
        <NavLink to="/profile/">
          <FaHouseUser className="icon" />
          Home
        </NavLink>
        <NavLink to="/profile/orders">
          <FaLuggageCart className="icon" />
          Orders
        </NavLink>
        <NavLink to="/profile/billingaddress">
          <FaHome className="icon" />
          Billing Address
        </NavLink>
        <NavLink to="/profile/previousorders">
          <FaShoppingBasket className="icon" />
          Previous Orders
        </NavLink>
      </div>
      <NavLink to="/">
        <FaAngleLeft className="icon" />
        Back
      </NavLink>
<div> 
Menu
      <CgMenuGridR
        onClick={() => {
          document
            .getElementsByClassName("side")[0]
            .classList.toggle("activeMenu");
        }}
        className="menu"
      />
</div>
    </div>
  );
}

export default Nav;
