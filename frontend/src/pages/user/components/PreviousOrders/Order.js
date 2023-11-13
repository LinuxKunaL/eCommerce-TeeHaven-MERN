import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FetchOrderDataForUser } from "../../../../api/user";
import { BsInboxFill } from "react-icons/bs";

function Order() {
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      const result = await FetchOrderDataForUser(true);
      setOrdersData(result);
      console.log(result);
    };
    fetching();
    
  }, []);

  return (
    <>
      {ordersData.length != 0 ? (
        ordersData.map((item) => (
          <Link to={`/profile/previousorders/${item._id}`}>
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
                <b> {item.deliveredOrNot == true ? "Completed" : ""}</b>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="OrderNotYet">
          <BsInboxFill style={{ color: "#61ce70" }} />
          <h2>Empty previous order</h2>
          <Link to="/shop">
            <button className="FillBtn">Shop now</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default Order;
