import React from "react";
import { Link } from "react-router-dom";

const SessionCompleted = () => {
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <h1 className="text-[#00286b] text-2xl font-bold">Session Completed</h1>
      <Link
        to="/facilitator/orders"
        className="text-[#00286b] border-b-2 border-[#00286b]"
      >
        View orders
      </Link>
    </div>
  );
};

export default SessionCompleted;
