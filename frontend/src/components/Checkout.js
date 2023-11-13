import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callFalse } from "../App/redux/states/CartView";

import { ToastRed } from "../App/toast";
import { CheckUserLogin, GetUserDetails } from "../api/auth";
import { CreatePayment, LoadScript } from "../App/paymentGateway";

import "../assets/styles/checkout.css";

function Checkout() {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const reloadUseEffect = useSelector((state) => state.counter.value);
  const [CardItem, setCardItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [UserData, setUserData] = useState([0]);

  Dispatch(callFalse());
  CheckUserLogin(Dispatch);

  const [Address, setAddress] = useState({
    StreetAddress: "",
    TownCity: "",
    State: "",
    PinCode: "",
  });

  useEffect(() => {
    const fetch = async () => {
      setUserData(await GetUserDetails());
    };
    fetch();
  }, []);

  useEffect(() => {
    setCardItem(JSON.parse(localStorage.getItem("cartItems")) || 0);
  }, [reloadUseEffect]);

  useEffect(() => {
    if (CardItem) {
      const newTotalPrice = CardItem.reduce(
        (accumulator, item) => accumulator + item.price * item.total,
        0
      );
      setTotalPrice(newTotalPrice);
    }
  }, [reloadUseEffect, CardItem]);

  const handleChange = (e) => {
    setAddress({
      ...Address,
      [e.target.name]: e.target.value,
    });
  };

  const PlaceOrder = (e) => {
    e.preventDefault();

    if (totalPrice == 0) {
      ToastRed("your order is empty !");
    } else {
      LoadScript();
      setTimeout(async () => {
        await CreatePayment({
          UserName: UserData.FullName,
          UserEmail: UserData.Email,
          UserContact: UserData.PhoneNum,
          Amount: totalPrice * 100,
          OrderData: CardItem,
          Address: Address,
          Navigate: Navigate,
          OrderDate: new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
        });
      }, 400);
    }
  };

  const FillAddress = async () => {
    const Address = await GetUserDetails();
    if (Address.billingAddress.pinCode == "") {
      ToastRed("Address is not available !");
      return null;
    }
    setAddress({
      StreetAddress: Address.billingAddress.streetAddress,
      TownCity: Address.billingAddress.townCity,
      State: Address.billingAddress.state,
      PinCode: Address.billingAddress.pinCode,
    });
  };

  return (
    <div id="Checkout">
      <Toaster position="top-right" reverseOrder={true} />
      <div className="section_1">
        <h1>Checkout</h1>
        <div className="Navigate">
          <span>Home</span>-<b>Checkout</b>
        </div>
      </div>
      <div className="section_2">
        <div className="form">
          <div className="top">
            <h1>Billing details</h1>{" "}
            <button className="OutlineBtn" onClick={FillAddress}>
              fill address
            </button>
          </div>
          <form className="center" onSubmit={PlaceOrder}>
            <div className="inputField">
              <span>Street address</span>
              <input
                value={Address.StreetAddress}
                onChange={handleChange}
                name="StreetAddress"
                type="text"
                placeholder="Street address"
                pattern="[A-Za-z0-9 ]{2,30}"
                required
                title="ex. lonikand (12 va maill)"
              />
            </div>
            <div className="inputField">
              <span>Town / City</span>
              <input
                type="text"
                value={Address.TownCity}
                onChange={handleChange}
                name="TownCity"
                pattern="[A-Za-z]{2,25}"
                placeholder="Town / City"
                required
                title="ex. pune"
              />
            </div>
            <div className="inputField">
              <span>State</span>
              <input
                type="text"
                value={Address.State}
                placeholder="State"
                pattern="[A-Za-z]{2,25}"
                onChange={handleChange}
                name="State"
                required
                title="ex. Maharashtra"
              />
            </div>
            <div className="inputField">
              <span>Pin code</span>
              <input
                type="text"
                value={Address.PinCode}
                placeholder="pin code"
                pattern="[0-9]{6}"
                onChange={handleChange}
                name="PinCode"
                required
                title="ex. 412213"
              />
            </div>
            <button className="FillBtn">Place Order</button>
          </form>
        </div>
        <div className="checkout">
          <h1>Your order</h1>
          <div className="subtotal">
            <div className="order">
              <div className="slice">
                <span>Product</span>
                <legend>Subtotal</legend>
              </div>
              <div className="line"></div>
              {CardItem == "" ? (
                <div className="slice">
                  <span>products</span>
                  <legend>None</legend>
                </div>
              ) : (
                CardItem.map((item, index) => (
                  <div className="slice" key={index}>
                    <span>
                      {item.title.slice(0, 28) + " . . ."} x {item.total} -{" "}
                      {item.size}
                    </span>
                    <legend>₹ {item.price}</legend>
                  </div>
                ))
              )}
              <div className="line"></div>
              <div className="slice">
                <span>Total</span>
                <legend>₹{totalPrice}</legend>
              </div>
              <div className="line"></div>
              <div className="slice">
                <span>Online Payment</span>
                <legend>UPI,Banking</legend>
              </div>
              <div className="line"></div>
              <p>
                Your personal data will be used to process your <br /> order,
                support your experience throughout this website, and for other{" "}
                <br /> purposes described in our privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
