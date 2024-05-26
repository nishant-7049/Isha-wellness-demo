import React, { useState, useEffect } from "react";
import { BiError } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";

const ErrorAlert = ({ message, alert, clearError, duration }) => {
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(
      () => {
        dispatch(clearError());
        setToggle(false);
      },
      duration ? duration : 3000
    );
  }, [message]);

  return (
    message && (
      <div className="flex justify-center fixed bottom-8 w-full z-20">
        <div className="flex flex-col">
          <div className="w-fit mx-auto bg-white shadow-lg flex justify-center items-center p-2 gap-4 text-lg uppercase">
            {!alert ? (
              <AiOutlineCheckCircle className="text-green-400 text-2xl" />
            ) : (
              <BiError className="text-red-400 text-2xl" />
            )}
            <p className="text-sm font-semibold">{message}</p>
          </div>
          <div
            className={`animate-loading h-1 ${
              !alert ? "bg-green-400" : "bg-red-400"
            }`}
          />
        </div>
      </div>
    )
  );
};

export default ErrorAlert;
