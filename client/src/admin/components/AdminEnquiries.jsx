import React from "react";
import Sidebar from "./Sidebar";
import Enquiries from "./Enquiries";

const AdminEnquiries = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Enquiries />
    </div>
  );
};

export default AdminEnquiries;
