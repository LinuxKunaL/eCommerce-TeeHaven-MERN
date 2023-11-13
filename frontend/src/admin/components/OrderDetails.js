import React, { useState, useEffect } from "react";
import { RiCalendar2Fill, RiUser3Fill, RiMapPin2Fill } from "react-icons/ri";
import { FaMoneyBillWave } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { MoonLoader } from "react-spinners";
import { GetOrderDetailById, UpdateOrderStatus } from "../api";
import { ToastRed, ToastGreen } from "../../App/toast/index.js";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState(null);
  const [orderUpdated, setOrderUpdated] = useState({});
  const [LoadUseEffect, setLoadUseEffect] = useState(1);

  useEffect(() => {
    const fetching = async () => {
      try {
        const result = await GetOrderDetailById(id);
        setOrderDetail(result);
        if (result.length == 0) {
          navigate("/dashboard");
          return null;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, [id, orderUpdated, LoadUseEffect]);

  const HandleStatusChange = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries([...formData.entries()]);
    setOrderUpdated(formDataObject);
    const result = await UpdateOrderStatus({
      id: id,
      PickupTime: formDataObject.pickupTime,
      ArrivedTime: formDataObject.arrivedTime,
      Status: formDataObject.SelectedStatus,
    });
    if (result.modifiedCount) {
      setLoadUseEffect(LoadUseEffect + 1);
      ToastGreen("Status changed !");
    } else {
      ToastRed("Order already updated !");
    }
  };

  if (orderDetail === null) {
    return (
      <div id="Loader">
        <MoonLoader size={40} color="#00dd6e" />
      </div>
    );
  }

  return (
    <div className="OrderDetails">
      <Toaster position="topRight" />
      <div className="Top">
        <h1>Order detail</h1>
        <p>
          Details for Order ID: <b>{orderDetail.razorpayOrderId}</b>
        </p>
        <p>
          Transaction ID: <b>{orderDetail.razorpayPaymentId}</b>
        </p>
        <p>
          Invoice :{" "}
          <Link
            style={{ color: "#61ce70", textDecoration: "underline" }}
            to={orderDetail.invoiceDownloadLink}
            target="_blank"
          >
            view
          </Link>
        </p>
        <p>
          Delivered:
          {orderDetail.deliveredOrNot ? (
            <span className="confirm">Confirm</span>
          ) : (
            <span className="pending">Pending</span>
          )}
        </p>
      </div>
      <div className="orderBox">
        <div className="head">
          <div className="time">
            <RiCalendar2Fill className="icon" />
            order Date : {orderDetail.orderDate}
          </div>
          <form className="actions" onSubmit={HandleStatusChange}>
            <div className="time">
              <span>set pickup time</span>
              <input
                defaultValue={orderDetail.pickUp}
                name="pickupTime"
                required
                type="date"
              />
            </div>
            <div className="time">
              <span>set arrived time</span>
              <input
                defaultValue={orderDetail.arrived}
                name="arrivedTime"
                required
                type="date"
              />
            </div>
            <select
              defaultValue={orderDetail.deliveredOrNot}
              name="SelectedStatus"
            >
              <option value="false">Pending</option>
              <option value="true">Confirmed</option>
            </select>
            <button className="FillBtn">Save</button>
          </form>
        </div>
        <div className="line"></div>
        <div className="body">
          <div className="head">
            <div className="boxs">
              <RiUser3Fill className="icon" />
              <div className="side">
                <h2>Customer</h2>
                <span>{orderDetail.billingName}</span>
                <span>{orderDetail.userEmail}</span>
                <span>+91 {orderDetail.userContact}</span>
                <Link
                  className="link"
                  to={"/dashboard/users/" + orderDetail.userId}
                >
                  View profile
                </Link>
              </div>
            </div>
            <div className="boxs">
              <FaMoneyBillWave className="icon" />
              <div className="side">
                <h2>Total pay</h2>
                <span>Subtotal: ₹ {orderDetail.orderTotalPrice}.0</span>
                <span>Shipping cost : ₹ 13.0</span>
                <span>
                  Grand total: <b> ₹ {orderDetail.orderTotalPrice}.0</b>
                </span>
              </div>
            </div>
            <div className="boxs">
              <RiMapPin2Fill className="icon" />
              <div className="side">
                <h2>Deliver to</h2>
                <span>{orderDetail.address.StreetAddress}</span>
                <span>
                  {orderDetail.address.State} , {orderDetail.address.TownCity}
                </span>
                <span>{orderDetail.address.PinCode}</span>
              </div>
            </div>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Product id</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Total</th>
                  <th>view</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail.orderedProducts.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="ImgTitle">
                        <img width={40} src={item.image} alt="" />
                        <h3>{item.title}</h3>
                      </div>
                    </td>
                    <td>{item.id}</td>
                    <td>₹ {item.price}.0</td>
                    <td>{item.total}</td>
                    <td>{item.size}</td>
                    <td>₹ {item.price * item.total}.0</td>
                    <td>
                      <Link to={"/product/" + item.id}>View</Link>
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
