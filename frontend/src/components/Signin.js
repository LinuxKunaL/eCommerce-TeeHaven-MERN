import React, { useState } from "react";
import { GetUserDetails, LoginAccount } from "../api/auth";
import { Toaster } from "react-hot-toast";
import { ToastRed, ToastGreen } from "../App/toast";
import { Link, useNavigate } from "react-router-dom";
import { CheckUserLogin } from "../api/auth";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGoogleCircle,
} from "react-icons/ai";

import { useDispatch } from "react-redux";

function Signin() {
  const Navigate = useNavigate();

  const [PasswordType, setPasswordType] = useState("password");

  const [FormData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const dispatch = useDispatch();

  const eyeOfPassword = () => {
    if (PasswordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const result = await LoginAccount(FormData);
    localStorage.setItem("token", result.data.Token);
    if (result.data.Status === 200) {
      ToastGreen(result.data.Result);
      await CheckUserLogin(dispatch);
      const userData = await GetUserDetails();
      localStorage.setItem("userId", userData._id);
      // setTimeout(() => {
      //   Navigate("/profile")
      // }, 1700);
      return null;
    }

    if (result.data.Status === 404) {
      ToastRed(result.data.Result);
      return null;
    }
  };

  return (
    <div className="signin">
      <Toaster position="topright" />
      <h1>sign in</h1>
      <form onSubmit={HandleSubmit}>
        <div className="inputField">
          <div className="label">
            <span>email</span>
          </div>
          <div className="Input">
            <input
              type="email"
              placeholder="Email Address"
              // autoComplete="off"
              required
              name="Email"
              title="ex. kunal123@gmail.com"
              onChange={(e) =>
                setFormData({
                  ...FormData,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="inputField">
          <div className="label">
            <span>password </span>
            <Link to="/login/forgotpassword" className="link">
              Forgot Password ?
            </Link>
          </div>
          <div className="Input">
            <input
              type={PasswordType}
              placeholder="password"
              // maxLength="6"
              required
              title="ex. Kunal13@$$"
              name="Password"
              // autoComplete="off"
              onChange={(e) =>
                setFormData({ ...FormData, [e.target.name]: e.target.value })
              }
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
      <div className="googleLogin">
        <button className="OutlineBtn">
          <AiFillGoogleCircle className="icon" />
          Login with Google
        </button>
      </div>
      <div className="createAccount">
        <p>create account</p>{" "}
        <Link to="/login/signup" className="link">
          sign up
        </Link>
      </div>
    </div>
  );
}

export default Signin;
