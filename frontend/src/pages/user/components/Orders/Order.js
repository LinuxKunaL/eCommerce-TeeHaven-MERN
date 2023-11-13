import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsInboxFill } from "react-icons/bs";

import { FetchOrderDataForUser } from "../../../../api/user";

function Order() {
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await FetchOrderDataForUser(false);
      setOrdersData(result);
    };
    fetch();
  }, []);

  return (
    <>
      {ordersData.length != 0 ? (
        ordersData.map((item) => (
          <Link to={"/profile/orders/" + item._id}>
            <div className="order">
              <img src={item.orderedProducts[0].image} alt="" />
              <div className="info">
                <span>
                  {item.orderedProducts.length}
                  {item.orderedProducts.length > 1
                    ? " products are ordered ."
                    : " product are ordered ."}
                </span>
                <b>total : ₹ {item.orderTotalPrice}</b>
                <legend>
                  order pick up : <b>{item.pickUp}</b>
                </legend>
                <legend>
                  order arrived : <b>{item.arrived}</b>
                </legend>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="OrderNotYet">
          <BsInboxFill style={{ color: "#61ce70" }} />
          <h2>order not yet</h2>
          <Link to="/shop">
            <button className="FillBtn">Shop now</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default Order;
