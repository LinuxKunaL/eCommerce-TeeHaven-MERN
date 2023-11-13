import React from "react";
import Order from "./components/Orders/Order";
import OrderDetails from "./components/Orders/OrderDetails";
import { Routes, Route } from "react-router-dom";

function Orders() {
  return (
    <div className="Orders">
      <Routes>
        <Route index element={<Order />} />
        <Route path="/:id" element={<OrderDetails />} />
      </Routes>
    </div>
  );
}

export default Orders;
