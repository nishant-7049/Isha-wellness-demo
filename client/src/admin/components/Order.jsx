import React from "react";
import Sidebar from "./Sidebar";
import OrderList from "./OrderList.jsx";

const Order = () => {
  return (
    <div className="flex">
      <Sidebar />
      <OrderList />
    </div>
  );
};

export default Order;
