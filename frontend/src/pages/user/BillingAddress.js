import React, { useState, useEffect } from "react";
import { SetBillingAddress } from "../../api/user";
import { GetUserDetails } from "../../api/auth";
import { Toaster } from "react-hot-toast";
import { ToastGreen } from "../../App/toast";

function BillingAddress() {
  const [billingAddress, setBillingAddress] = useState({
    streetAddress: "",
    townCity: "",
    state: "",
    pinCode: "",
  });

  useEffect(() => {
    const fetching = async () => {
      const result = await GetUserDetails();
      if (result.length != 0) {
        setBillingAddress(result.billingAddress);
      }
      return null;
    };
    fetching();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const result = await SetBillingAddress(billingAddress);
    if (result.modifiedCount) {
      ToastGreen("Billing Address are added !");
    }
  };

  return (
    <form className="BillingAddress" onSubmit={handleOnSubmit}>
      <Toaster position="topright" />
      <h3>Set Billing Address</h3>
      <div className="center">
        <div className="inputField">
          <span>Street address</span>
          <input
            type="text"
            placeholder="Street address"
            defaultValue={billingAddress["streetAddress"]}
            autoComplete="off"
            required
            title="ex. lonikand (12 va maill)"
            pattern="[A-Za-z0-9 ]{2,30}"
            name="streetAddress"
            onChange={(e) =>
              setBillingAddress({
                ...billingAddress,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="inputField">
          <span>Town / City</span>
          <input
            defaultValue={billingAddress["townCity"]}
            type="text"
            placeholder="Town / City"
            autoComplete="off"
            required
            title="ex. pune"
            name="townCity"
            pattern="[A-Za-z]{2,25}"
            onChange={(e) =>
              setBillingAddress({
                ...billingAddress,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="inputField">
          <span>State</span>
          <input
            type="text"
            placeholder="State"
            defaultValue={billingAddress["state"]}
            autoComplete="off"
            required
            name="state"
            pattern="[A-Za-z]{2,25}"
            title="ex. Maharashtra"
            onChange={(e) =>
              setBillingAddress({
                ...billingAddress,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="inputField">
          <span>Pin code</span>
          <input
            type="text"
            placeholder="pinCode"
            autoComplete="off"
            required
            defaultValue={billingAddress["pinCode"]}
            pattern="[0-9]{6}"
            title="ex. 412213"
            name="pinCode"
            onChange={(e) =>
              setBillingAddress({
                ...billingAddress,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
      </div>
      <button className="FillBtn">Save</button>
    </form>
  );
}

export default BillingAddress;
