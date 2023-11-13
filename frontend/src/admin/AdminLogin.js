import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGoogleCircle,
} from "react-icons/ai";

import { AdminLogiN } from "./api/auth";
import { Toaster } from "react-hot-toast";
import { ToastRed, ToastGreen } from "../App/toast/index.js";

import "./assets/styles/login.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [PasswordType, setPasswordType] = useState("password");
  const HideNavFoot = `#NavBar{display:none;}footer {display:none;} #BottomBar{display:none !important;}`;
  const [FormData, setFormData] = useState({
    username: "",
    password: "",
  });

  const HandleSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const response = await AdminLogiN(FormData);
      if (response.Status == 200) {
        ToastGreen(response.massage);
        localStorage.removeItem("token");
        localStorage.setItem("token", response.token);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else if (response.Status == 404) {
        ToastRed(response.massage);
      }
    } catch (error) {
      console.log(error + " HandleSubmitForm (adminLogin)");
    }
  };

  const eyeOfPassword = () => {
    if (PasswordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <div id="AdminLogin">
      <form onSubmit={HandleSubmitForm}>
        <Toaster position="topright" />
        <style>{HideNavFoot}</style>
        <h2>Admin Login</h2>
        <div className="inputField">
          <div className="label">
            <span>user name</span>
          </div>
          <div className="Input">
            <input
              type="text"
              name="username"
              onChange={(e) =>
                setFormData({ ...FormData, [e.target.name]: e.target.value })
              }
              placeholder="username"
              required
            />
          </div>
        </div>
        <div className="inputField">
          <div className="label">
            <span>password </span>
          </div>
          <div className="Input">
            <input
              type={PasswordType}
              name="password"
              onChange={(e) =>
                setFormData({ ...FormData, [e.target.name]: e.target.value })
              }
              required
              placeholder="password"
            />
            {PasswordType === "password" ? (
              <AiOutlineEye className="icon" onClick={eyeOfPassword} />
            ) : (
              <AiOutlineEyeInvisible className="icon" onClick={eyeOfPassword} />
            )}
          </div>
        </div>
        <button className="FillBtn">Log in</button>
      </form>
    </div>
  );
}

export default AdminLogin;
