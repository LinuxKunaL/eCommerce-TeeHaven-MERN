import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGoogleCircle,
} from "react-icons/ai";

import {
  createAccount,
  GenerateOtpForEmail,
  VerifyGeneratedOtpForEmail,
} from "../api/auth";

import { Toaster } from "react-hot-toast";
import { ToastRed, ToastGreen } from "../App/toast";

function Signup() {
  const [PasswordType, setPasswordType] = useState("password");
  const [PasswordTypeConfirm, setPasswordTypeConfirm] = useState("password");
  const [emailVerification, setEmailVerification] = useState({
    Email: "",
    Otp: 0,
  });
  const [visibleOtpField, setVisibleOtpField] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);
  const [FormData, setFormData] = useState({
    FullName: "",
    PhoneNum: 0,
    Email: "",
    Password: "",
    PasswordConfirm: "",
  });

  const eyeOfPassword = () => {
    PasswordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };
  const eyeOfPasswordConfirm = () => {
    PasswordTypeConfirm === "password"
      ? setPasswordTypeConfirm("text")
      : setPasswordTypeConfirm("password");
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (FormData.Password !== FormData.PasswordConfirm) {
      ToastRed("Password doesn't match !");
      return null;
    }
    try {
      const response = await createAccount({
        ...FormData,
        Email: emailVerification.Email,
      });
      ToastGreen(response);
      setTimeout(() => {
        navigate("/login/signin");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleGenerateOtpForEmail = async (e) => {
    e.preventDefault();
    if (visibleOtpField) {
      const result = await VerifyGeneratedOtpForEmail(
        emailVerification.Email,
        emailVerification.Otp
      );
      if (result.status) {
        setVisibleForm(true);
        ToastGreen(result.message);
      } else {
        setVisibleForm(false);
        ToastRed(result.message);
      }
    } else {
      const result = await GenerateOtpForEmail(emailVerification.Email);
      if (result.error) {
        ToastRed(result.error);
        return null;
      }
      if (result) {
        ToastGreen(result);
        setVisibleOtpField(true);
      }
    }
  };

  return (
    <div className="signin">
      <Toaster position="topright" />
      <h1>sign up</h1>

      {!visibleForm ? (
        <form onSubmit={HandleGenerateOtpForEmail}>
          <div className="inputField">
            <div className="label">
              <span>email</span>
            </div>
            <div className="Input">
              <input
                placeholder="Email Address"
                // autoComplete="off"
                required
                type="email"
                title="ex. kunal123@gmail.com"
                name="Email"
                onChange={(e) =>
                  setEmailVerification({
                    ...emailVerification,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>
          {visibleOtpField ? (
            <div className="inputField">
              <div className="label">
                <span>Otp</span>
              </div>
              <div className="Input">
                <input
                  placeholder="Enter otp here"
                  // autoComplete="off"
                  required
                  type="number"
                  title="ex. 344556"
                  name="Otp"
                  onChange={(e) =>
                    setEmailVerification({
                      ...emailVerification,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          ) : null}
          <button className="FillBtn">send otp</button>
        </form>
      ) : (
        ""
      )}

      {visibleForm ? (
        <form onSubmit={HandleSubmit}>
          <div className="inputField">
            <div className="label">
              <span>full name</span>
            </div>
            <div className="Input">
              <input
                type="text"
                placeholder="Your full name"
                required
                pattern="[A-Za-z ]+"
                title="Please enter only alphabetical characters"
                name="FullName"
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
              <span>Phone no</span>
            </div>
            <div className="Input">
              <input
                placeholder="Your phone number"
                required
                pattern="\d{10}"
                type="tel"
                title="ex. 9987654321"
                name="PhoneNum"
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
            </div>
            <div className="Input">
              <input
                type={PasswordType}
                placeholder="password"
                required
                title="ex. Kunal13@$$"
                // autoComplete="off"
                name="Password"
                onChange={(e) =>
                  setFormData({
                    ...FormData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              {PasswordType === "password" ? (
                <AiOutlineEye className="icon" onClick={eyeOfPassword} />
              ) : (
                <AiOutlineEyeInvisible
                  className="icon"
                  onClick={eyeOfPassword}
                />
              )}
            </div>
          </div>

          <div className="inputField">
            <div className="label">
              <span>confirm password</span>
            </div>
            <div className="Input">
              <input
                type={PasswordTypeConfirm}
                placeholder="confirm password"
                required
                title="ex. Kunal13@$$"
                // autoComplete="off"
                name="PasswordConfirm"
                onChange={(e) =>
                  setFormData({
                    ...FormData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              {PasswordTypeConfirm === "password" ? (
                <AiOutlineEye className="icon" onClick={eyeOfPasswordConfirm} />
              ) : (
                <AiOutlineEyeInvisible
                  className="icon"
                  onClick={eyeOfPasswordConfirm}
                />
              )}
            </div>
          </div>

          <button className="FillBtn">Log up</button>
        </form>
      ) : (
        ""
      )}

      {/* <div className="googleLogin">
        <button className="OutlineBtn">
          <AiFillGoogleCircle className="icon" />
          Create with Google
        </button>
      </div> */}
      <div className="createAccount">
        <p>login account</p>{" "}
        <Link to="/login/signin" className="link">
          sign in
        </Link>
      </div>
    </div>
  );
}

export default Signup;
