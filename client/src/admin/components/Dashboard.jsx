import React from "react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full"></div>
    </div>
  );
};

export default Dashboard;
