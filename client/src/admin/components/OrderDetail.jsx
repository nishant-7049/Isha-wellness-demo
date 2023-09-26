import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearPayment,
  getBookingDetail,
  getBookingDetailForUser,
  getPaymentDetail,
  getPaymentDetailForUser,
  resetBookingUpdated,
  resetIsStatusUpdated,
  setBookingStatus as setStatus,
} from "../../store/slices/bookingSlice";
import {
  clearError,
  getBooker,
  getFac,
  getTher,
} from "../../store/slices/allUserSlice";
import { getPackageByName } from "../../store/slices/packageSlice";
import AssignTher from "./AssignTher.jsx";
import AssignFac from "./AssignFac";
import Loader from "../../auth/Loader";
import TherapistTreatment from "../../therapist/components/TherapistTreatment";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    booking,
    payment,
    isUpdated,
    isStatusUpdated,
    bookingUpdated,
  } = useSelector((state) => state.booking);
  const { loading: userLoading, booker } = useSelector(
    (state) => state.allUsers
  );
  const { loading: packageLoading, pac } = useSelector(
    (state) => state.package
  );
  const { user: me } = useSelector((state) => state.user);
  const [BookedBy, setBookedBy] = useState();
  const [bookingDetails, setBookingDetails] = useState([]);
  const [pay, setPay] = useState();
  const [set, setSet] = useState(false);
  const [t, setT] = useState();
  const [f, setF] = useState();
  const [bookingStatus, setBookingStatus] = useState("");

  const { id } = useParams();

  const submitStatus = (e) => {
    e.preventDefault();
    const options = {
      id,
      status: bookingStatus,
    };
    dispatch(setStatus(options));
  };
  useEffect(() => {
    if (!booking || (booking._id != id && me && me.role == "user")) {
      dispatch(getBookingDetailForUser(id));
    }
  }, [booking]);
  useEffect(() => {
    if (booking && me && me.role == "user") {
      dispatch(getPaymentDetailForUser(id));
    }
  }, [me, booking]);

  useEffect(() => {
    if (booking && me && me.role !== "user" && booking._id != id) {
      dispatch(getBookingDetail(id));
    }
    if (booking) {
      const details = [];
      for (let i in booking) {
        if (i == "payment" && me.role != "user") {
          dispatch(getPaymentDetail(booking[i]));
        } else if (i == "status") {
          setBookingStatus(booking[i]);
        } else if (i == "_id" || i == "__v") {
        } else {
          const bd = [i, booking[i]];
          details.push(bd);
        }
        if (i == "assignTherapist") {
          setT(booking[i]);
        }
        if (i == "assignFacilitator") {
          setF(booking[i]);
        }
      }
      dispatch(getPackageByName(booking.package));
      setBookingDetails(details);
    }
    if (error) {
      dispatch(clearError());
    }
  }, [dispatch, booking, isUpdated, error]);
  useEffect(() => {
    if (booking && booker && booking.bookedBy == booker._id) {
      setBookedBy(booker);
    }
  }, [booker]);
  useEffect(() => {
    if (booking && me && me.role !== "user") {
      dispatch(getBooker(booking.bookedBy));
    }
    if (booking && me && me.role == "user") {
      setBookedBy(me);
    }
  }, [booking]);
  useEffect(() => {
    if (payment) {
      setPay(payment);
      dispatch(clearPayment());
    }
  }, [payment]);
  useEffect(() => {
    if (bookingUpdated) {
      dispatch(resetBookingUpdated());
      dispatch(getBookingDetail(id));
      setSet(false);
    }
  }, [bookingUpdated]);
  useEffect(() => {
    if (isStatusUpdated) {
      dispatch(resetIsStatusUpdated());
      dispatch(getBookingDetail(id));
    }
  }, [isStatusUpdated]);
  return (
    <>
      {loading || packageLoading || userLoading ? (
        <Loader />
      ) : (
        <>
          <div className="mt-[6vmax] w-4/5 mx-auto">
            <h1 className="text-2xl text-[#00286b] font-bold">Order Details</h1>
            <p className="text-sm">ID: {id}</p>
            <div className="flex gap-2">
              <h2 className="font-semibold ">Status: </h2>
              <p
                className={`${
                  bookingStatus == "Completed"
                    ? " text-green-500"
                    : "text-red-800"
                } font-bold`}
              >
                {bookingStatus}
              </p>
            </div>
            <div className="my-[2vmax]  flex justify-between">
              <div className="my-[1vmax] flex-1">
                <h2 className="text-lg text-[#00286b] font-semibold">
                  Booking Details:
                </h2>
                <div className="flex flex-col gap-1">
                  {bookingDetails &&
                    bookingDetails.map((book) => {
                      if (book[0] == "date") {
                        const date = new Date(book[1]);
                        return (
                          <div key={book._id} className="flex gap-2">
                            <p className="font-semibold capitalize">
                              Date of Treatment
                            </p>
                            <p>:</p>
                            <p>{`${date.getDate()}-${
                              date.getMonth() + 1
                            }-${date.getFullYear()}`}</p>
                          </div>
                        );
                      } else if (book[0] == "createdAt") {
                        const date = new Date(book[1]);
                        return (
                          <div key={book._id} className="flex gap-2">
                            <p className="font-semibold capitalize">
                              Created At
                            </p>
                            <p>:</p>
                            <p>{`${date.getDate()}-${
                              date.getMonth() + 1
                            }-${date.getFullYear()} (${date.getHours()}hr ${date.getMinutes()}m)`}</p>
                          </div>
                        );
                      } else {
                        return (
                          <div key={book._id} className="flex gap-2">
                            <p className="font-semibold capitalize">
                              {book[0]}
                            </p>
                            <p>:</p>
                            <p>{book[1]}</p>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
              <div className="flex-1">
                <div className="my-[1vmax]">
                  <h2 className="text-lg text-[#00286b] font-semibold">
                    Booked By:
                  </h2>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <p className="font-semibold capitalize">Name</p>
                      <p>:</p>
                      <p>{BookedBy && BookedBy.name}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-semibold capitalize">Email</p>
                      <p>:</p>
                      <p>{BookedBy && BookedBy.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="font-semibold capitalize">Role</p>
                      <p>:</p>
                      <p>{BookedBy && BookedBy.role}</p>
                    </div>
                  </div>
                </div>
                {me &&
                  booking &&
                  (me.role == "admin" ||
                    me.isIncharge ||
                    booking.bookedBy == me._id) && (
                    <div className="my-[2vmax]">
                      <h2 className="text-lg text-[#00286b] font-semibold">
                        Payment Details:
                      </h2>
                      {pac && pay && pac.paymentType == "Online" && (
                        <div className="flex flex-col gap-1">
                          <div className="flex gap-2 ">
                            <p className="font-semibold capitalize">
                              razorpay_order_id
                            </p>
                            <p>:</p>
                            <p>{pay.razorpay_order_id}</p>
                          </div>
                          <div className="flex gap-2 ">
                            <p className="font-semibold capitalize">
                              razorpay_payment_id
                            </p>
                            <p>:</p>
                            <p>{pay.razorpay_payment_id}</p>
                          </div>
                        </div>
                      )}
                      {pac && pac.paymentType == "Pay After Treatment" && (
                        <p className="text-red-800 font-semibold">
                          Pay After Treatment
                        </p>
                      )}
                      {set ? (
                        <>
                          {(me.role == "admin" || me.isIncharge) && (
                            <>
                              <AssignTher />
                              <AssignFac />
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {(me.role == "admin" || me.isIncharge) && (
                            <button
                              onClick={() => {
                                setSet(true);
                                dispatch(getTher(t));
                                dispatch(getFac(f));
                              }}
                              className="px-[1vmax] py-[0.4vmax] my-[1vmax] w-3/5 mx-auto bg-[#00286b] text-white font-semibold border-2 border-[#00286b] hover:text-[#00286b] hover:bg-white"
                            >
                              Set Therapist / Facilitator
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                {me && me.role == "facilitator" && (
                  <div>
                    <h2 className="text-lg text-[#00286b] font-semibold">
                      Change Status for Facilitator
                    </h2>
                    <form
                      className="flex flex-col gap-2"
                      onSubmit={submitStatus}
                    >
                      <select
                        value={bookingStatus}
                        onChange={(e) => {
                          setBookingStatus(e.target.value);
                        }}
                        className="bg-white px-[0.4vmax] py-[0.7vmax] border-2"
                      >
                        <option value="">Choose</option>
                        <option value="Facilitator on the way...">
                          Facilitator on the way...
                        </option>
                        <option value="Treatment Created / Waiting for Facilitator">
                          Treatment Created / Waiting for Facilitator
                        </option>
                      </select>
                      <input
                        type="submit"
                        value={"save"}
                        className="px-[1vmax] py-[0.4vmax] my-[1vmax] w-3/5 mx-auto bg-[#00286b] text-white font-semibold border-2 border-[#00286b] hover:text-[#00286b] hover:bg-white"
                      />
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
          <TherapistTreatment />
        </>
      )}
    </>
  );
};

export default OrderDetail;
