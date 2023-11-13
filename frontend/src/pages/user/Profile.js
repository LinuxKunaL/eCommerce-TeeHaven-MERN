import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Orders from "./Orders";
import PreviousOrders from "./PreviousOrders";
import BillingAddress from "./BillingAddress";
import ProfileEdit from "./ProfileEdit";


import { Routes, Route } from "react-router-dom";
import { CheckUserLogin } from "../../api/auth";
import { useDispatch } from "react-redux";
import { GetUserDetails } from "../../api/auth";

import "../../assets/styles/profile.css";

function Profile() {
  const [ProfileData, setProfileData] = useState([]);

  const dispatch = useDispatch();
  CheckUserLogin(dispatch);

  useEffect(() => {
    async function fetch() {
      const result = await GetUserDetails();
      setProfileData(result);
    }
    fetch();
  }, []);

  return (
    <div id="Profile">
      <div className="section_1">
        <h1>Profile</h1>
        <div className="Navigate">
          <span>Home</span>-<b>Profile</b>
        </div>
      </div>
      <div className="section_2">
        <h1>
          Welcome <b>{ProfileData.FullName}</b> !
        </h1>
        <Nav />
        <div className="Main">
          <Routes>
            <Route path="/" element={<ProfileEdit />} />
            <Route path="/orders" element={<Orders />}>
              <Route path="/orders/:id" />
            </Route>
            <Route path="/billingaddress" element={<BillingAddress />} />
            <Route path="/previousorders" element={<PreviousOrders />}>
              <Route path="/previousorders/:id" />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Profile;
