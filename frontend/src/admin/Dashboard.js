import React, { useState } from "react";
import {
  RiDashboardFill,
  RiShoppingCart2Fill,
  RiShoppingBagFill,
  RiUser3Fill,
  RiAppsLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { BiSolidArrowToLeft } from "react-icons/bi";
import { AiTwotoneSetting } from "react-icons/ai";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";

import { RxDashboard } from "react-icons/rx";

import logo from "../assets/svg/logo.svg";
import Main from "./components/Main";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";
import OrderDetails from "./components/OrderDetails";
import ProductEdit from "./components/ProductEdit";
import ProductAdd from "./components/ProductAdd";
import UpdateCredential from "./components/UpdateCredential";
import { AdminLogout } from "./api/auth";

import "./assets/styles/dashboard.css";

function Dashboard() {
  const Navigate = useNavigate();
  const HideNavFoot = `#NavBar{display:none;}footer {display:none;} #BottomBar{display:none !important;}`;
  const [PasswordChangeForm, setPasswordChangeForm] = useState(false);
  const closePopUpForm = () => {
    setPasswordChangeForm(false);
  };
  const HandlePopUpForm = () => {
    setPasswordChangeForm(!PasswordChangeForm ? true : false);
  };

  return (
    <>
      <style>{HideNavFoot}</style>
      <div id="Dashboard">
        <div className="Menu">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="MenuBody">
            <NavLink className="li" to="/dashboard/">
              <RiDashboardFill className="icon" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink className="li" to="/dashboard/products">
              <RiShoppingBagFill className="icon" />
              <span>Products</span>
            </NavLink>
            <NavLink className="li" to="/dashboard/orders">
              <RiShoppingCart2Fill className="icon" />
              <span>Orders</span>
            </NavLink>
            <NavLink className="li" to="/dashboard/users">
              <RiUser3Fill className="icon" />
              <span>User</span>
            </NavLink>
            <BiSolidArrowToLeft
              onClick={() => {
                document
                  .getElementsByClassName("Menu")[0]
                  .classList.toggle("activeMenu");
              }}
              className="CloseDashboardIcon"
            />
          </div>
        </div>
        <div className="Container">
          <div className="top">
            <RxDashboard
              onClick={() => {
                document
                  .getElementsByClassName("Menu")[0]
                  .classList.toggle("activeMenu");
              }}
              className="dashboardIcon"
            />
            <div className="icons">
              <AiTwotoneSetting className="icon" onClick={HandlePopUpForm} />
              <Link to="/">
                <RiAppsLine title="Go to Home" className="icon" />
              </Link>
              <RiLogoutCircleLine
                className="icon"
                title="logout"
                onClick={(e) => AdminLogout(Navigate)}
              />
            </div>
          </div>
          {PasswordChangeForm ? (
            <UpdateCredential cancelPopUp={closePopUpForm} />
          ) : null}
          <main>
            <Routes>
              <Route index element={<Main />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductEdit />} />
              <Route path="/products/add" element={<ProductAdd />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
