import React from "react";
import Sidebar from "./Sidebar";
import OrderList from "./OrderList.jsx";

const Order = () => {
  return (
    <div className="flex">
      <Sidebar className="w-1/5" />
      <OrderList className="w-full" />
    </div>
  );
};

export default Order;
