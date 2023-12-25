import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PaymentConfirmation = () => {
  const { ref } = useParams();
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-[#00286b] text-3xl font-bold">Order Successful</h1>
        <p className="text-xs">Reference ID: {ref}</p>
        <Link className="text-[#00286b] underline" to={"/user/orders"}>
          {" "}
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
