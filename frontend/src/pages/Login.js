import React from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Forgotpass from "../components/Forgotpass";
import { Routes, Route } from "react-router-dom";

import "../assets/styles/login.css";

const Login = () => {
  return (
    <div id="Login">
      <div className="section_1">
        <h1>Login</h1>
        <div className="Navigate">
          <span>Home</span>-<b>Login</b>
        </div>
      </div>
      <div className="section_2">
        <h2>Welcome back</h2>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<Forgotpass />} />
        </Routes>
      </div>
    </div>
  );
};
export default Login;
