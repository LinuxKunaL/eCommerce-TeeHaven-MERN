import React, { useState } from "react";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Toaster } from "react-hot-toast";

import { ToastGreen, ToastRed } from "../../App/toast";
import { AdminChangeCredential } from "../api/auth";
import { useNavigate } from "react-router-dom";

function UpdateCredential(props) {
  const Navigate = useNavigate();
  const [PasswordType, setPasswordType] = useState("password");
  const [PasswordTypeConfirm, setPasswordTypeConfirm] = useState("password");
  const [newCredential, setNewCredential] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
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

  const HandleSubmitNewCredential = async (event) => {
    event.preventDefault();
    if (newCredential.password == newCredential.confirmPassword) {
      const result = await AdminChangeCredential(newCredential);
      if (result.modifiedCount) {
        ToastGreen("Credential updated");
        props.cancelPopUp();
        setTimeout(() => {
          localStorage.removeItem("token");
          Navigate("/adminLogin");
        }, 2000);
      }
    } else {
      ToastRed("Password not match !");
    }
  };

  return (
    <form onSubmit={HandleSubmitNewCredential} className="PasswordChangeForm">
      <Toaster position="topRight" />

      <h2>Change Admin credential</h2>
      <div className="inputField">
        <div className="label">
          <span>new username</span>
        </div>
        <div className="Input">
          <input
            placeholder="user name"
            required
            title="user name"
            name="userName"
            pattern="[A-Za-z ]+"
            onChange={(event) =>
              setNewCredential({
                ...newCredential,
                [event.target.name]: event.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="inputField">
        <div className="label">
          <span>new password</span>
        </div>
        <div className="Input">
          <input
            type={PasswordType}
            placeholder="new password"
            required
            title="ex. Kunal13@$$"
            name="password"
            onChange={(event) =>
              setNewCredential({
                ...newCredential,
                [event.target.name]: event.target.value,
              })
            }
          />
          {PasswordType === "password" ? (
            <AiOutlineEye className="icon" onClick={eyeOfPassword} />
          ) : (
            <AiOutlineEyeInvisible className="icon" onClick={eyeOfPassword} />
          )}
        </div>
      </div>
      <div className="inputField">
        <div className="label">
          <span>confirm new password</span>
        </div>
        <div className="Input">
          <input
            type={PasswordTypeConfirm}
            placeholder="confirm new password"
            required
            title="ex. Kunal13@$$"
            name="confirmPassword"
            onChange={(event) =>
              setNewCredential({
                ...newCredential,
                [event.target.name]: event.target.value,
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
      <div className="buttons">
        <button className="OutlineBtn">submit</button>
        <input
          type="reset"
          value="cancel"
          onClick={() => props.cancelPopUp()}
          className="FillBtn"
        />
      </div>
    </form>
  );
}

export default UpdateCredential;
