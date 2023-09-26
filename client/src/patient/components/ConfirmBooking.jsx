import React, { useEffect, useState } from "react";
import {
  checkout,
  clearError,
  createBooking,
  getKey,
  resetPaymentVerified,
  verifyPayment,
} from "../../store/slices/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPackageDetail } from "../../store/slices/packageSlice";
import { useNavigate } from "react-router-dom";

const ConfirmBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));

  const date = new Date(bookingDetails.date);
  const { error, key, order, booking, paymentVerified } = useSelector(
    (state) => state.booking
  );
  const { name, email } = useSelector((state) => state.user);
  const { pac } = useSelector((state) => state.package);

  const [isToggleDisabled, setIsToggleDisabled] = useState(false);
  const [paymentID, setPaymentID] = useState("");

  const submitBooking = () => {
    const options = {};
    for (let i in bookingDetails) {
      if (i == "know") {
        options.gettoknow = bookingDetails[i];
      } else if (i == "packages") {
        options.package = pac && pac.name;
      } else {
        options[i] = bookingDetails[i];
      }
    }
    dispatch(createBooking(options));
  };
  const checkoutHandler = () => {
    pac && dispatch(checkout(pac.price));

    if (order) {
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "ISHA Wellness Centre",
        description: "Order Placed",
        image: "/images/nav-logo.png",
        order_id: order.id,
        prefill: {
          name,
          email,
          contact: bookingDetails.mobile,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#00286b",
        },
        handler: function (res) {
          setPaymentID(res.razorpay_payment_id);
          const options = {
            razorpay_order_id: res.razorpay_order_id,
            razorpay_payment_id: res.razorpay_payment_id,
            razorpay_signature: res.razorpay_signature,
            bookingID: booking._id,
          };
          dispatch(verifyPayment(options));
        },
      };
      const razor = new window.Razorpay(options);

      razor.open();
    }
  };
  useEffect(() => {
    dispatch(getPackageDetail(bookingDetails.packages));
    dispatch(getKey());

    if (paymentVerified) {
      dispatch(resetPaymentVerified());
      navigate(`/paymentConfirmation/${paymentID}`);
    }
    if (error) {
      dispatch(clearError());
    }
  }, [error, paymentVerified]);
  return (
    <div className="p-[5vmax] pt-[7vmax] ">
      <h1 className="text-3xl border-b-[#00286b] border-b-4 w-1/3 mx-auto mb-[4vmax]  text-center  pb-4  font-bold text-[#00286b]">
        Confirm Booking Details
      </h1>
      <div className="flex justify-between">
        <div className="w-full flex flex-col gap-2 border-r-2">
          <h1 className="text-2xl text-[#00286b] font-semibold ">
            Personal Details
          </h1>
          <div className="flex gap-2">
            <h3 className="font-semibold">Name :</h3>
            <p>{bookingDetails.name}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold">Mobile No. :</h3>
            <p>{bookingDetails.mobile}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold">Whatsapp No. :</h3>
            <p>{bookingDetails.whatsapp}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold">Age :</h3>
            <p>{bookingDetails.age}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold">Gender :</h3>
            <p>{bookingDetails.gender}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold">Address :</h3>
            <p>{bookingDetails.address}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold">Martial Status :</h3>
            <p>{bookingDetails.martial}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold">Education :</h3>
            <p>{bookingDetails.education}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold">Problem :</h3>
            <p>{bookingDetails.problem}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold">Affected part of Body :</h3>
            <p>{bookingDetails.part}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold">Type of Work :</h3>
            <p>{bookingDetails.work}</p>
          </div>
          <div className="flex gap-2">
            <h3 className="font-semibold">Occupation :</h3>
            <p>{bookingDetails.occupation}</p>
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-4 items-center px-12">
          <h1 className="text-2xl text-[#00286b] font-semibold ">
            Order Details
          </h1>
          <div className="w-full flex gap-2 justify-between">
            <h3 className="font-semibold">Package</h3>
            <p>:</p>
            <p>{pac && pac.name}</p>
          </div>
          <div className="w-full flex gap-2 justify-between">
            <h3 className="font-semibold">Date of Treatment :</h3>
            <p>{`${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`}</p>
          </div>
          <div className="w-full flex gap-2 justify-between">
            <h3 className="font-semibold">Time of Treatment :</h3>
            <p>{bookingDetails.batch}</p>
          </div>
          <div className="w-full flex gap-2 justify-between">
            <h3 className="font-semibold">Package payment :</h3>
            <p>₹{pac && pac.price}</p>
          </div>
          {pac && pac.paymentType == "Online" ? (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setIsToggleDisabled(true);
                  submitBooking();
                }}
                className="border-2 border-[#00286b] bg-[#00286b] text-white font-semibold hover:bg-white hover:text-[#00286b] px-[1vmax] py-[0.7vmax]"
                disabled={isToggleDisabled ? true : false}
              >
                Confirm Booking
              </button>
              {booking && (
                <button
                  onClick={checkoutHandler}
                  className="border-2 border-[#00286b] bg-[#00286b] text-white font-semibold hover:bg-white hover:text-[#00286b] px-[1vmax] py-[0.7vmax]"
                >
                  Pay ₹{pac.price} and Confirm Booking
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setIsToggleDisabled(true);
                submitBooking();
                navigate("/paymentConfirmation");
              }}
              className="border-2 border-[#00286b] bg-[#00286b] text-white font-semibold hover:bg-white hover:text-[#00286b] px-[1vmax] py-[0.7vmax]"
              disabled={isToggleDisabled ? true : false}
            >
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
