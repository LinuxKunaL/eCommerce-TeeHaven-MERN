import React from "react";
import Order from "./components/PreviousOrders/Order";
import OrderDetails from "./components/PreviousOrders/OrderDetails";
import { Routes, Route } from "react-router-dom";

function PreviousOrders() {
  return (
    <div className="PreviousOrders Orders">
      <Routes>
        <Route index element={<Order />} />
        <Route path="/:id" element={<OrderDetails />} />
      </Routes>
    </div>
  );
}

export default PreviousOrders;
