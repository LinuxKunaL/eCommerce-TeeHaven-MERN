import React, { useEffect, useState } from "react";
import { GetUserDetails } from "../../api/auth";
import { EditAccountDetails, EditAccountPassword } from "../../api/user";
import { ToastRed, ToastGreen } from "../../App/toast";
import { Toaster } from "react-hot-toast";

function ProfileEdit() {
  const [userDetails, setUserDetails] = useState({
    FullName: "",
    PhoneNumber: "",
  });
  const [editPassword, setEditPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [disableInput, setDisableInput] = useState(true);
  useEffect(() => {
    const fetching = async () => {
      const result = await GetUserDetails();
      if (result.length != 0) {
        setUserDetails({
          FullName: result.FullName,
          PhoneNumber: result.PhoneNum,
        });
      }
      return null;
    };
    fetching();
  }, []);

  const HandleEdit = () => {
    setDisableInput(false);
  };

  const HandleOnSubmitForm = async (event) => {
    event.preventDefault();
    const result = await EditAccountDetails(userDetails);
    if (result.modifiedCount) {
      ToastGreen("details updated !");
    } else if (result.error) {
      ToastRed(result.error);
    }
  };

  const HandlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (editPassword.password === editPassword.confirmPassword) {
      const result = await EditAccountPassword(editPassword.password);
      if (result.modifiedCount) {
        ToastGreen("Password is changed !");
      }
      setDisableInput(true);
      setEditPassword({
        password: "",
        confirmPassword: "",
      });
    } else {
      ToastRed("password is not match !");
    }
  };
  return (
    <div className="ProfileEdit">
      <Toaster position="topright" />
      <div className="top">
        <h3>Edit you personal details</h3>
        <div className="buttons">
          <button onClick={HandleEdit} className="FillBtn">
            Edit
          </button>
        </div>
      </div>
      <div className="center">
        <form onSubmit={HandleOnSubmitForm}>
          <div className="textField">
            <span>Full name</span>
            <input
              type="text"
              disabled={disableInput}
              defaultValue={userDetails.FullName}
              style={
                !disableInput ? { color: "#252227" } : { cursor: "not-allowed" }
              }
              placeholder="edit your fullName"
              pattern="[A-Za-z ]+"
              title="Please enter only alphabetical characters"
              name="FullName"
              onChange={(event) =>
                setUserDetails({ ...userDetails, FullName: event.target.value })
              }
              required
            />
          </div>
          {/* <div className="textField">
            <span>Email</span>
            <input
              type="email"
              style={
                !disableInput ? { color: "#252227" } : { cursor: "not-allowed" }
              }
              disabled={disableInput}
              placeholder="edit your Email"
              defaultValue={userDetails.Email}
              name="Email"
              onChange={(event) =>
                setUserDetails({ ...userDetails, Email: event.target.value })
              }
              required
            />
          </div> */}
          <div className="textField">
            <span>Phone number</span>
            <input
              pattern="\d{10}"
              type="tel"
              title="ex. 9987654321"
              disabled={disableInput}
              defaultValue={userDetails.PhoneNumber}
              name="Phone"
              style={
                !disableInput ? { color: "#252227" } : { cursor: "not-allowed" }
              }
              placeholder="edit your PhoneNumber"
              onChange={(event) =>
                setUserDetails({
                  ...userDetails,
                  PhoneNumber: event.target.value,
                })
              }
              required
            />
          </div>
          {!disableInput ? <input type="submit" className="OutlineBtn" /> : ""}
        </form>
        <form onSubmit={HandlePasswordSubmit} className="password">
          <div className="textField">
            <span>Password</span>
            <input
              placeholder="new password"
              disabled={disableInput}
              value={editPassword.password}
              style={
                !disableInput ? { color: "#252227" } : { cursor: "not-allowed" }
              }
              type="text"
              onChange={(event) =>
                setEditPassword({
                  ...editPassword,
                  password: event.target.value,
                })
              }
              required
            />
          </div>
          <div className="textField">
            <span>Confirm password</span>
            <input
              disabled={disableInput}
              value={editPassword.confirmPassword}
              style={
                !disableInput ? { color: "#252227" } : { cursor: "not-allowed" }
              }
              onChange={(event) =>
                setEditPassword({
                  ...editPassword,
                  confirmPassword: event.target.value,
                })
              }
              type="text"
              placeholder="confirm new password"
              required
            />
          </div>
          {!disableInput ? <input type="submit" className="OutlineBtn" /> : ""}
        </form>
      </div>
    </div>
  );
}

export default ProfileEdit;
