import React, { useState, useEffect } from "react";
import { RiCalendar2Fill } from "react-icons/ri";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { FetchOrderDataById } from "../../../../api/user";

function OrderDetails() {
  const [orderData, setOrderData] = useState([0]);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();
  const Param = useParams();
  useEffect(() => {
    const fetch = async () => {
      const result = await FetchOrderDataById(Param.id);
      if (result.length == 0) {
        Navigate("/profile");
        return null;
      }
      setOrderData(result);
      setLoading(false);
    };
    fetch();
  }, [Param]);

  return (
    <div className="OrderDetails">
      {loading ? (
        <div id="Loader">
          <MoonLoader size={40} color="#00dd6e" />
        </div>
      ) : (
        ""
      )}
      <div className="Top">
        <h1>Order detail - ₹{orderData.orderTotalPrice}.0</h1>
        <p>
          Details for Order ID: <b>{orderData.razorpayOrderId}</b>{" "}
        </p>
        <p>
          Transaction ID: <b>{orderData.razorpayPaymentId}</b>
        </p>
        <p>
          Download Invoice :
          <b>
            <Link to={orderData.invoiceDownloadLink} target="_blank">
              Download
            </Link>
          </b>
        </p>
        <p>
          Delivered:
          {orderData.deliveredOrNot ? (
            <span className="confirm">Confirm</span>
          ) : (
            <span className="pending">Pending</span>
          )}
        </p>
      </div>
      <div className="orderBox">
        <div className="head">
          <div className="time">
            <span>order pick up:</span>
            <b>
              <RiCalendar2Fill className="icon" />
              {orderData.pickUp ? orderData.pickUp : "waiting"}
            </b>
          </div>
          <div className="time">
            <span>order arrived :</span>
            <b>
              <RiCalendar2Fill className="icon" />
              {orderData.arrived ? orderData.arrived : "waiting"}
            </b>
          </div>
        </div>
        <div className="body">
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Unit Price</th>
                  <th> Quantity</th>
                  <th>Total</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {orderData.orderedProducts &&
                  orderData.orderedProducts.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <div className="ImgTitle">
                          <img
                            width={40}
                            src={product.image}
                            alt="image not found"
                          />
                          <h3>{product.title}</h3>
                        </div>
                      </td>
                      <td>₹{product.price}</td>
                      <td>{product.total}</td>
                      <td>₹{product.price * product.total}</td>
                      <td>
                        <Link to={"/product/" + product.id}>
                          <button className="FillBtn">view</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
