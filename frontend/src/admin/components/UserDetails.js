import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  GetRegisterUsersDetailsById,
  GetDashboardRegisterUsersOrders,
} from "../api";
import { BsInboxFill } from "react-icons/bs";
import { MoonLoader } from "react-spinners";
import "../assets/styles/user.css";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [userBillingAddress, setUserBillingAddress] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      try {
        const result = await GetRegisterUsersDetailsById(id);
        const Orders = await GetDashboardRegisterUsersOrders(id);
        if (result.length == 0) {
          navigate("/dashboard");
          return null;
        }
        setUserOrders(Orders);
        setUserDetails(result);
        setUserBillingAddress(result.billingAddress);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, []);

  return (
    <div className="UserDetails">
      <h2>User account details </h2>
      <div className="center">
        {loading && (
          <div id="Loader">
            <MoonLoader size={40} color="#00dd6e" />
          </div>
        )}
        <div className="mainInfo">
          <img
            src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=826&t=st=1698649643~exp=1698650243~hmac=830658a7c29800477ace802a1430db66761d073a6829943b365c9b6b6776a9a9"
            alt=""
          />
          <div className="textField">
            <span>Name</span>
            <b>{userDetails.FullName}</b>
          </div>
          <div className="textField">
            <span>Contact</span>
            <b>+91 {userDetails.PhoneNum}</b>
          </div>
          <div className="textField">
            <span>Gmail</span>
            <b>{userDetails.Email}</b>
          </div>
          <div className="textField">
            <span>address</span>
            {userBillingAddress.state ? (
              <b>
                {userBillingAddress.state} , {userBillingAddress.townCity}{" "}
                <br />
                {userBillingAddress.streetAddress} ,{userBillingAddress.pinCode}
              </b>
            ) : (
              <b>Address not set by user</b>
            )}{" "}
          </div>
        </div>
        {/* <h3>user orders</h3> */}
        <div className="ordersInfo">
          {userOrders.length != 0 ? (
            userOrders.map((item) => (
              <Link to={"/dashboard/orders/" + item._id} key={item._id}>
                <li>
                  <img src={item.orderedProducts[0].image} alt="" />
                  <div className="info">
                    <span>
                      {item.orderedProducts.length > 1
                        ? ` ${item.orderedProducts.length} products are ordered .`
                        : ` ${item.orderedProducts.length}  product are ordered .`}
                    </span>
                    <b>total : ₹ {item.orderTotalPrice}</b>
                    {item.deliveredOrNot != false ? (
                      <legend className="done">order is complete</legend>
                    ) : (
                      <legend className="pending">order is pending</legend>
                    )}
                  </div>
                </li>
              </Link>
            ))
          ) : (
            <div className="OrderIsEmpty">
              <BsInboxFill className="Icon" /> Order is empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
