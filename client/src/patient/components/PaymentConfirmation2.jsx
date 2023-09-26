import React from "react";
import { Link } from "react-router-dom";

const PaymentConfirmation2 = () => {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-[#00286b] text-3xl font-bold">Order Successful</h1>
        <Link className="text-[#00286b] underline">View Bookings</Link>
      </div>
    </div>
  );
};

export default PaymentConfirmation2;
