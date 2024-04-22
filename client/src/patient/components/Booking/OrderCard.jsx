import React from "react";

const OrderCard = ({ pac }) => {
  return (
    <div className="flex flex-col gap-2 p-8 rounded-md bg-gradient-to-br w-3/5 mg-auto  from-[#00286b] to-[#b7becb] sm:w-full ">
      <div className="flex justify-between text-white gap-4 ">
        <p>Package Name:</p> <p>{pac && pac.name}</p>
      </div>
      <div className="flex justify-between text-white gap-4  ">
        <p>Package Description:</p> <p>{pac && pac.description}</p>
      </div>
      <div className="flex justify-between text-white gap-4 ">
        <p>Payment Type:</p> <p>{pac && pac.paymentType}</p>
      </div>
      <div className="flex justify-between text-white gap-4 ">
        <p>Package Sessions:</p> <p>{pac && pac.sessions}</p>
      </div>
      <div className="flex justify-between text-white gap-4 ">
        <p>Package Days:</p> <p>{pac && pac.days}</p>
      </div>
      <div className="flex justify-between text-white gap-4 ">
        <p>Package Price:</p> <p>₹{pac && pac.price}</p>
      </div>
    </div>
  );
};

export default OrderCard;
