import React from "react";
import OrderDetail from "./OrderDetail";
import Sidebar from "./Sidebar";

const AdminOrderDetail = () => {
  return (
    <div className="flex">
      <Sidebar />
      <OrderDetail className="w-full" />
    </div>
  );
};

export default AdminOrderDetail;
