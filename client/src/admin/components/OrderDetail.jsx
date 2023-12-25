import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Container from "../../patient/components/Booking/patientDetails.jsx";
import {
  clearPayment,
  getBookingDetail,
  getBookingDetailForUser,
  getPaymentDetail,
  getPaymentDetailForUser,
  rescheduleTime,
  resetBookingUpdated,
  resetIsRescheduled,
  resetIsStatusUpdated,
} from "../../store/slices/bookingSlice";
import { getBooker, getFac, getTher } from "../../store/slices/allUserSlice";
import { getPackageDetail } from "../../store/slices/packageSlice";
import AssignTher from "./AssignTher.jsx";
import AssignFac from "./AssignFac";
import Loader from "../../auth/Loader";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const batchs = [
  {
    label: "8:30-10:30",
    value: (8 + 1 / 2) * 60 * 60 * 1000,
  },
  {
    label: "10:30-12:30",
    value: (10 + 1 / 2) * 60 * 60 * 1000,
  },
  {
    label: "2:00-4:00",
    value: 14 * 60 * 60 * 1000,
  },
  {
    label: "4:00-6:00",
    value: 16 * 60 * 60 * 1000,
  },
  {
    label: "6:00-8:00",
    value: 18 * 60 * 60 * 1000,
  },
];
const OrderDetail = () => {
  const dispatch = useDispatch();
  const {
    loading,
    booking,
    payment,
    isStatusUpdated,
    bookingUpdated,
    isRescheduled,
  } = useSelector((state) => state.booking);
  const { loading: userLoading, booker } = useSelector(
    (state) => state.allUsers
  );
  const { loading: packageLoading, pac } = useSelector(
    (state) => state.package
  );
  const { user: me } = useSelector((state) => state.user);
  const [BookedBy, setBookedBy] = useState();
  const [pay, setPay] = useState();
  const [set, setSet] = useState(false);
  const [toggleSchedule, setToggleSchedule] = useState(false);
  const [newDate, setNewDate] = useState();
  const [newDateAndTime, setNewDateAndTime] = useState();
  const [filteredBatches, setFilteredBatches] = useState([]);

  useEffect(() => {
    const updatedBatches = batchs.filter((b) => {
      const batchTime =
        new Date(newDate).getTime() + b.value - 5.5 * 60 * 60 * 1000;
      return batchTime > Date.now() + 2 * 60 * 60 * 1000;
    });

    setFilteredBatches(updatedBatches);
  }, [newDate]);

  const { id } = useParams();

  const [scheduledTime, setScheduledTime] = useState(new Date());
  const [validTillDate, setValidTillDate] = useState(new Date());

  const submitNewDate = (e) => {
    e.preventDefault();
    dispatch(rescheduleTime({ bookingId: id, dateAndTime: newDateAndTime }));
  };
  useEffect(() => {
    if (
      (!booking && me && me.role == "user") ||
      (booking && booking._id != id && me && me.role == "user")
    ) {
      dispatch(getBookingDetailForUser(id));
    }
    if (
      (!booking && me && me.role !== "user") ||
      (booking && booking._id != id && me && me.role != "user")
    ) {
      dispatch(getBookingDetail(id));
    }
    if (booking && me) {
      if (booking.payment && me.role == "user") {
        dispatch(getPaymentDetailForUser(id));
      } else {
        dispatch(getPaymentDetail(id));
      }
      dispatch(getPackageDetail(booking.packageAndDate.package));
    }
    if (booking) {
      setScheduledTime(new Date(booking.packageAndDate.dateAndTime));
      setValidTillDate(new Date(booking.validTill));
    }

    if (booking && me && me.role !== "user") {
      dispatch(getBooker(booking.bookedBy));
    }
    if (booking && me && me.role == "user") {
      setBookedBy(me);
    }
  }, [booking]);
  useEffect(() => {
    if (booking && booker && booking.bookedBy == booker._id) {
      setBookedBy(booker);
    }
  }, [booker]);
  useEffect(() => {
    if (isRescheduled) {
      if (me.role == "user") {
        dispatch(getBookingDetailForUser(id));
      } else {
        dispatch(getBookingDetail(id));
      }
      dispatch(resetIsRescheduled());
    }
  }, [isRescheduled]);
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
          <Container>
            <div className="w-[90%] mx-auto">
              <h1 className="text-2xl text-[#00286b] font-bold">
                Order Details
              </h1>
              <p className="text-sm">ID: {id}</p>
              <div className="flex gap-2">
                <h2 className="font-semibold ">Status: </h2>
                <p
                  className={`${
                    booking && booking.status == "Completed"
                      ? " text-green-500"
                      : "text-red-800"
                  } font-bold`}
                >
                  {booking && booking.status}
                </p>
              </div>
              <div className="flex justify-between p-4 md:flex-col sm:flex-col">
                <div className="flex flex-col gap-8">
                  <div className=" flex flex-wrap gap-8">
                    <div className="det-con">
                      <h1 className="det-head">Personal Details</h1>
                      <div className="ques-ans">
                        <div className="ques-ans-con">
                          <p className="ques">Name:</p>
                          <p className="ans">
                            {booking && booking.personal.name}
                          </p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Age:</p>
                          <p className="ans">
                            {booking && booking.personal.age}
                          </p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Gender:</p>
                          <p className="ans">
                            {booking && booking.personal.gender}
                          </p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Address:</p>
                          <p className="ans">
                            {booking && booking.personal.address}
                          </p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">City:</p>
                          <p className="ans">
                            {booking && booking.personal.city}
                          </p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Location Preference:</p>
                          <p className="ans">
                            {booking && booking.personal.location}
                          </p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Mobile:</p>
                          <p className="ans">
                            {booking && booking.personal.phone}
                          </p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Whatsapp:</p>
                          <p className="ans">
                            {booking && booking.personal.whatsapp}
                          </p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Martial Status:</p>
                          <p className="ans">
                            {booking && booking.personal.martial}
                          </p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Education:</p>
                          <p className="ans">
                            {booking && booking.personal.education}
                          </p>
                        </div>
                      </div>
                    </div>
                    {booking &&
                      booking.complaints &&
                      (booking.complaints.problem == "Pain" ||
                        booking.complaints.problem == "Paranthesis") && (
                        <div className="det-con">
                          <h1 className="det-head">Presenting Complaints</h1>
                          <div className="ques-ans">
                            <div className="ques-ans-con">
                              <p className="ques">Problem:</p>
                              <p className="ans">
                                {booking.complaints.problem}
                              </p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Body Part:</p>
                              <p className="ans">{booking.complaints.part}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Body Side:</p>
                              <p className="ans">{booking.complaints.side}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Body Aspect:</p>
                              <p className="ans">{booking.complaints.aspect}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">
                                Problem Scale Rating (PSR):
                              </p>
                              <p className="ans">{booking.complaints.psr}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Since When:</p>
                              <p className="ans">{booking.complaints.since}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Consulted Before:</p>
                              <p className="ans">
                                {booking.complaints.consult}
                              </p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Investigations done:</p>
                              <p className="ans">{booking.complaints.inv}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">
                                What increases your problem?
                              </p>
                              <p className="ans">{booking.complaints.cause}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    {booking &&
                      booking.complaints &&
                      booking.complaints.problem == "Stiffness" && (
                        <div className="det-con">
                          <h1 className="det-head">Presenting Complaints</h1>
                          <div className="ques-ans">
                            <div className="ques-ans-con">
                              <p className="ques">Problem:</p>
                              <p className="ans">
                                {booking.complaints.problem}
                              </p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Body Part:</p>
                              <p className="ans">{booking.complaints.part}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Body Side:</p>
                              <p className="ans">{booking.complaints.side}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">
                                Problem Scale Rating (PSR):
                              </p>
                              <p className="ans">{booking.complaints.psr}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Since When:</p>
                              <p className="ans">{booking.complaints.since}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Consulted Before:</p>
                              <p className="ans">
                                {booking.complaints.consult}
                              </p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Investigations done:</p>
                              <p className="ans">{booking.complaints.inv}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">
                                What increases your problem?
                              </p>
                              <p className="ans">{booking.complaints.cause}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    {booking &&
                      booking.complaints &&
                      booking.complaints.problem == "Multiple sclerosis" && (
                        <div className="det-con">
                          <h1 className="det-head">Presenting Complaints</h1>
                          <div className="ques-ans">
                            <div className="ques-ans-con">
                              <p className="ques">Problem:</p>
                              <p className="ans">
                                {booking.complaints.problem}
                              </p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Body Part:</p>
                              <p className="ans">{booking.complaints.part}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Body Side:</p>
                              <p className="ans">{booking.complaints.side}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">
                                Problem Scale Rating (PSR):
                              </p>
                              <p className="ans">{booking.complaints.psr}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Since When:</p>
                              <p className="ans">{booking.complaints.since}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Consulted Before:</p>
                              <p className="ans">
                                {booking.complaints.consult}
                              </p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Investigations done:</p>
                              <p className="ans">{booking.complaints.inv}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">
                                What increases your problem?
                              </p>
                              <p className="ans">{booking.complaints.cause}</p>
                            </div>
                            <h1 className="text-[#00286b] mx-auto font-bold border-b-2 border-[#00286b]">
                              Functionality
                            </h1>
                            <div className="ques-ans-con">
                              <p className="ques">Activity Status:</p>
                              <p className="ans">
                                {booking.complaints.activity}
                              </p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">
                                Personal Work which can be done by person:
                              </p>
                              <p className="ans">{booking.complaints.work}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    {booking &&
                      booking.complaints &&
                      booking.complaints.problem == "Paralysis" && (
                        <div className="det-con">
                          <h1 className="det-head">Presenting Complaints</h1>
                          <div className="ques-ans">
                            <div className="ques-ans-con">
                              <p className="ques">Problem:</p>
                              <p className="ans">
                                {booking.complaints.problem}
                              </p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Since When:</p>
                              <p className="ans">{booking.complaints.since}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Cause:</p>
                              <p className="ans">{booking.complaints.cause}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Type:</p>
                              <p className="ans">{booking.complaints.type}</p>
                            </div>
                            <h1 className="text-[#00286b] mx-auto font-bold border-b-2 border-[#00286b]">
                              Functionality
                            </h1>
                            <div className="ques-ans-con">
                              <p className="ques">Muscle Tone:</p>
                              <p className="ans">{booking.complaints.tone}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Activity Status:</p>
                              <p className="ans">
                                {booking.complaints.activity}
                              </p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">
                                Personal Work which can be done by person:
                              </p>
                              <p className="ans">{booking.complaints.work}</p>
                            </div>
                          </div>
                        </div>
                      )}

                    {booking &&
                      booking.complaints &&
                      booking.complaints.problem == "Others" && (
                        <div className="det-con">
                          <h1 className="det-head">Presenting Complaints</h1>
                          <div className="ques-ans">
                            <div className="ques-ans-con">
                              <p className="ques">Problem:</p>
                              <p className="ans">
                                {booking.complaints.problem}
                              </p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Problem description:</p>
                              <p className="ans">
                                {booking.complaints.problemDescription}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    {booking &&
                      booking.complaints &&
                      (booking.complaints.problem == "Headache" ||
                        booking.complaints.problem == "Migraine" ||
                        booking.complaints.problem == "Vertigo" ||
                        booking.complaints.problem == "Motion Sickness") && (
                        <div className="det-con">
                          <h1 className="det-head">Presenting Complaints</h1>
                          <div className="ques-ans">
                            <div className="ques-ans-con">
                              <p className="ques">Problem:</p>
                              <p className="ans">
                                {booking.complaints.problem}
                              </p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">
                                Problem Scale Rating (PSR):
                              </p>
                              <p className="ans">{booking.complaints.psr}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Since When:</p>
                              <p className="ans">{booking.complaints.since}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Consulted Before:</p>
                              <p className="ans">
                                {booking.complaints.consult}
                              </p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">Investigations done:</p>
                              <p className="ans">{booking.complaints.inv}</p>
                            </div>
                            <div className="ques-ans-con">
                              <p className="ques">
                                What increases your problem?
                              </p>
                              <p className="ans">{booking.complaints.cause}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    <div className="det-con">
                      <h1 className="det-head">Medical History</h1>
                      <div className="ques-ans">
                        <div className="ques-ans-con">
                          <p className="ques">Other Complaints:</p>
                          <p className="ans">
                            {booking && booking.complaints.otherComplaints}
                          </p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Other Medical Condition:</p>
                          <p className="ans">
                            {booking &&
                              booking.complaints.otherMedicalConditions}
                          </p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">
                            Other old Complaint or Operation:
                          </p>
                          <p className="ans">
                            {booking && booking.complaints.oldComplaint}
                          </p>
                        </div>
                        <h1 className="det-head">Admin Questions</h1>
                        <div className="ques-ans">
                          <div className="ques-ans-con">
                            <p className="ques">
                              How you came to know about IWC?
                            </p>
                            <p className="ans">
                              {booking && booking.admin.getToKnow}
                            </p>
                          </div>
                        </div>
                        <h1 className="det-head">Schedule Treatment</h1>
                        <div className="ques-ans">
                          <div className="ques-ans-con">
                            <p className="ques">Scheduled date and time:</p>
                            <p className="ans">
                              {scheduledTime.getDate()}/
                              {scheduledTime.getMonth() + 1}/
                              {scheduledTime.getFullYear()}{" "}
                              {scheduledTime.getHours()}:
                              {scheduledTime.getMinutes()} IST
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="det-con">
                      {booking &&
                        booking.complaints &&
                        booking.complaints.problem ==
                          "Lifestyle and Habits" && (
                          <div>
                            <h1 className="det-head">Presenting Complaints</h1>
                            <div className="ques-ans">
                              <div className="ques-ans-con">
                                <p className="ques">Problem:</p>
                                <p className="ans">
                                  {booking.complaints.problem}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      <h1 className="det-head">Measures</h1>
                      <div className="ques-ans">
                        <div className="ques-ans-con">
                          <p className="ques">Weight (in kg.):</p>
                          <p className="ans">
                            {booking && booking.measures.weight}
                          </p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Height (in cm.):</p>
                          <p className="ans">
                            {booking && booking.measures.height}
                          </p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Sugar:</p>
                          <p className="ans">
                            {booking && booking.measures.sugar}
                          </p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Blood Pressure:</p>
                          <p className="ans">
                            {booking && booking.measures.bp}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="det-con">
                      <h1 className="det-head">Occupation Details</h1>
                      <div className="ques-ans">
                        <div className="ques-ans-con">
                          <p className="ques">Occupation:</p>
                          <p className="ans">
                            {booking && booking.occupation.occupation}
                          </p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Type of Work:</p>
                          <p className="ans">
                            {booking && booking.occupation.work}
                          </p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">
                            Work experience of this type of work:
                          </p>
                          <p className="ans">
                            {booking && booking.occupation.experience}
                          </p>
                        </div>
                      </div>
                      <h1 className="det-head">Booked by</h1>
                      <div className="ques-ans">
                        <div className="ques-ans-con">
                          <p className="ques">Booker Name:</p>
                          <p className="ans">{BookedBy && BookedBy.name}</p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Booker Role:</p>
                          <p className="ans">{BookedBy && BookedBy.role}</p>
                        </div>
                      </div>
                    </div>
                    {me && booking && (
                      <div className="det-con">
                        <h2 className="det-head">Package Details</h2>
                        <div className="ques-ans">
                          <div className="ques-ans-con">
                            <p className="ques">Payment Type:</p>
                            <p className="ans">{pac && pac.paymentType}</p>
                          </div>
                          {pac && pay && pac.paymentType == "Online" && (
                            <div className="ques-ans">
                              <div className="ques-ans-con">
                                <p className="ques">razorpay_order_id:</p>
                                <p className="ans">{pay.razorpay_order_id}</p>
                              </div>
                              <div className="ques-ans-con">
                                <p className="ques">razorpay_payment_id:</p>
                                <p className="ans">{pay.razorpay_payment_id}</p>
                              </div>
                            </div>
                          )}
                          {!pay && (
                            <div className="ques-ans-con">
                              <p className="ques">Payment Status:</p>
                              <p className="text-red-800 font-semibold">
                                Unpaid
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Package Name:</p>
                          <p className="ans">{pac && pac.name}</p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Package Sessions Left:</p>
                          <p className="ans">{booking && booking.sessions}</p>
                        </div>
                        <div className="ques-ans-con">
                          <p className="ques">Package Valid till:</p>
                          <p className="ans">
                            {validTillDate.getDate()}/
                            {validTillDate.getMonth() + 1}/
                            {validTillDate.getFullYear()}{" "}
                            {validTillDate.getHours()}:
                            {validTillDate.getMinutes()} IST
                          </p>
                        </div>

                        <div className="ques-ans-con">
                          <p className="ques">Package price:</p>
                          <p className="ans">₹{pac && pac.price}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <h1 className="text-xl text-[#00286b] font-bold text-center border-b-2 border-[#00286b] ">
                    Lifestyle And Habits
                  </h1>
                  <div className=" flex flex-wrap gap-8">
                    <div className="flex flex-wrap gap-8">
                      {booking &&
                        booking.lifestyleAndHabits &&
                        booking.lifestyleAndHabits.problemsInfo &&
                        booking.lifestyleAndHabits.problemsInfo.map(
                          (pro, index) => (
                            <div className="det-con" key={index}>
                              <p className="det-head">Lifestyle Problem:</p>
                              <div className="ques-ans">
                                <div className="ques-ans-con ">
                                  <p className="ques">{index + 1} Problem:</p>
                                  <p className="ans">{pro.problem}</p>
                                </div>
                                <div className="ques-ans-con pl-8">
                                  <p className="ques">Since When?</p>
                                  <p className="ans">{pro.sinceWhen}</p>
                                </div>
                                <div className="ques-ans-con pl-8">
                                  <p className="ques">Are you on Medication?</p>
                                  <p className="ans">{pro.onMedications}</p>
                                </div>
                                <div className="ques-ans-con pl-8">
                                  <p className="ques">
                                    Possible cause for this problem according to
                                    patient?
                                  </p>
                                  <p className="ans">{pro.cause}</p>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      <div className="det-con">
                        <h1 className="det-head">Food Related Questions</h1>
                        <div className="ques-ans">
                          <div className="ques-ans-con">
                            <p className="ques">
                              Do you think you take healthy diet?
                            </p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.foodDetails
                                  .healthyDiet}
                            </p>
                          </div>
                          <div className="ques-ans-con">
                            <p className="ques">
                              Do you take tea on empty stomach?
                            </p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.foodDetails
                                  .emptyStomach}
                            </p>
                          </div>
                          <div className="ques-ans-con">
                            <p className="ques">Do you do breakfast?</p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.foodDetails
                                  .doBreakfast}
                            </p>
                          </div>
                          <h1 className="text-[#00286b] mx-auto font-bold border-b-2 border-[#00286b]">
                            Food Timings
                          </h1>
                          {booking &&
                            booking.lifestyleAndHabits.foodDetails
                              .doBreakfast == "Yes" && (
                              <div className="ques-ans-con">
                                <p className="ques">Breakfast (hh/mm)</p>
                                <p className="ans">
                                  {booking &&
                                    booking.lifestyleAndHabits.foodDetails
                                      .foodTime.breakfastTime}
                                </p>
                              </div>
                            )}
                          <div className="ques-ans-con">
                            <p className="ques">Lunch (hh/mm)</p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.foodDetails.foodTime
                                  .lunchTime}
                            </p>
                          </div>
                          <div className="ques-ans-con">
                            <p className="ques">Dinner (hh/mm)</p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.foodDetails.foodTime
                                  .dinnerTime}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="det-con">
                        <h1 className="det-head">
                          Exercises related Questions
                        </h1>
                        <div className="ques-ans">
                          <div className="ques-ans-con">
                            <p className="ques">Are you doing any exercises?</p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.exerciseDetails
                                  .doExercises}
                            </p>
                          </div>
                          {booking &&
                            booking.lifestyleAndHabits.exerciseDetails
                              .doExercises == "Yes" && (
                              <div className="ques-ans">
                                <div className="ques-ans-con">
                                  <p className="ques">
                                    Which kind of Exercise you do?
                                  </p>
                                  <p className="ans">
                                    {booking &&
                                      booking.lifestyleAndHabits.exerciseDetails
                                        .exercise}
                                  </p>
                                </div>
                                <div className="ques-ans-con">
                                  <p className="ques">
                                    How much time in a day?
                                  </p>
                                  <p className="ans">
                                    {booking &&
                                      booking.lifestyleAndHabits.exerciseDetails
                                        .exercisePerDay}
                                  </p>
                                </div>
                                <div className="ques-ans-con">
                                  <p className="ques">
                                    How much time in a week?
                                  </p>
                                  <p className="ans">
                                    {booking &&
                                      booking.lifestyleAndHabits.exerciseDetails
                                        .exercisePerWeek}
                                  </p>
                                </div>
                              </div>
                            )}
                        </div>
                        <h1 className="det-head">Habits</h1>
                        <div className="ques-ans">
                          <div className="ques-ans-con">
                            <p className="ques">Habits:</p>
                            {booking &&
                              booking.lifestyleAndHabits.habits.map(
                                (hab, index) => (
                                  <p className="ans" key={index}>
                                    {index + 1}. {hab}
                                  </p>
                                )
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="det-con">
                        <h1 className="det-head">Sleep related Questions</h1>
                        <div className="ques-ans">
                          <div className="ques-ans-con">
                            <p className="ques">Do you get proper sleep?</p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.sleepDetails
                                  .properSleep}
                            </p>
                          </div>
                          <div className="ques-ans-con">
                            <p className="ques">At what time you sleep?</p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.sleepDetails
                                  .sleepTime}
                            </p>
                          </div>
                          <div className="ques-ans-con">
                            <p className="ques">At what time you wake up?</p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.sleepDetails
                                  .wakeTime}
                            </p>
                          </div>
                          <div className="ques-ans-con">
                            <p className="ques">Average sleep hours?</p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.sleepDetails
                                  .sleepHour}
                            </p>
                          </div>
                          <div className="ques-ans-con">
                            <p className="ques">Average sitting hours?</p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.sleepDetails
                                  .sittingHour}
                            </p>
                          </div>
                          <div className="ques-ans-con">
                            <p className="ques">Average Mobile screen hours?</p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.sleepDetails
                                  .mobileScreenHour}
                            </p>
                          </div>
                          <div className="ques-ans-con">
                            <p className="ques">Average TV screen hours?</p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.sleepDetails
                                  .tvScreenHour}
                            </p>
                          </div>
                          <div className="ques-ans-con">
                            <p className="ques">
                              Average Laptop/computer screen hours?
                            </p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.sleepDetails
                                  .computerScreenHour}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="det-con">
                        <h1 className="det-head">Stress related Questions</h1>
                        <div className="ques-ans">
                          <div className="ques-ans-con">
                            <p className="ques">
                              Do you think you are over thinker?
                            </p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.stressDetails
                                  .thinker}
                            </p>
                          </div>
                          <div className="ques-ans-con">
                            <p className="ques">Rate your thinking?</p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.stressDetails
                                  .thinkingRate}
                            </p>
                          </div>
                          <div className="ques-ans-con">
                            <p className="ques">Rate your stress? </p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.stressDetails
                                  .stressRate}
                            </p>
                          </div>
                          <div className="ques-ans-con">
                            <p className="ques">
                              What kind of/Which thought/occasion disturbed you
                              a lot?
                            </p>
                            <p className="ans">
                              {booking &&
                                booking.lifestyleAndHabits.stressDetails
                                  .disturbanceCause}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {pac &&
                booking &&
                Date.now() < new Date(booking.validTill).getTime() &&
                booking.sessions > 0 ? (
                  <div className="w-full h-[90vh] sticky right-0 top-[5rem] flex flex-col  justify-center items-center sm:static md:h-[50vh] sm:h-fit sm:my-12">
                    <div className="flex flex-col justify-center items-center w-full">
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
                                booking &&
                                  booking.assignTherapist &&
                                  dispatch(getTher(booking.assignTherapist));
                                booking &&
                                  booking.assignFacilitator &&
                                  dispatch(getFac(booking.assignFacilitator));
                              }}
                              className="px-4 py-2 my-[1vmax] w-3/5 mx-auto bg-[#00286b] text-white font-semibold border-2 border-[#00286b] hover:text-[#00286b] hover:bg-white"
                            >
                              Set Therapist / Facilitator
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    <Link
                      className=" font-semibold border-2 bg-[#00286b] border-[#00286b] w-3/5 text-center my-2 px-4 py-2 text-white hover:bg-white hover:text-[#00286b] sm:w-4/5"
                      to={`/treatment/${id} `}
                    >
                      {me.role == "therapist" && "View and Create Treatments"}
                      {me.role == "facilitator" && "View Treatments"}
                      {me.role == "user" && "View Treatments"}
                      {me.role == "admin" && "View Treatments"}
                    </Link>

                    {me && me.role == "facilitator" && (
                      <Link
                        className=" font-semibold border-2 bg-[#00286b] border-[#00286b] w-3/5 text-center my-2 px-4 py-2 text-white hover:bg-white hover:text-[#00286b] sm:w-4/5"
                        to={`/treatment/start/${id}`}
                      >
                        Start Treatment
                      </Link>
                    )}
                    {me &&
                      (me.role != "facilitator" ||
                        booking.bookedBy == me._id) && (
                        <div className="w-3/5 sm:w-4/5">
                          <div className=" w-full border-[#00286b] border-2 my-2">
                            <div
                              onClick={() => {
                                setToggleSchedule(!toggleSchedule);
                              }}
                              className="cursor-pointer flex gap-4 items-center justify-center font-semibold  bg-white  text-center  px-4 py-2 text-[#00286b] "
                            >
                              <h1>Reschedule Appointment</h1>
                              {toggleSchedule ? (
                                <FaChevronUp />
                              ) : (
                                <FaChevronDown />
                              )}
                            </div>
                            {toggleSchedule && (
                              <form className="my-4" onSubmit={submitNewDate}>
                                <div className="px-4 my-2 flex gap-4 justify-center items-center text-[#00286b] font-semibold sm:flex-col sm:items-start sm:gap-1">
                                  <label>Date:</label>
                                  <input
                                    className="bg-white text-gray-400 border-2 py-2 px-4"
                                    type="date"
                                    value={newDate}
                                    min={new Date().toISOString().split("T")[0]}
                                    required
                                    onChange={(e) => {
                                      setNewDate(e.target.value);
                                    }}
                                  />
                                </div>
                                <div className="px-4 my-2 flex gap-4 justify-center items-center text-[#00286b] font-semibold sm:flex-col sm:items-start sm:gap-1">
                                  <label>Batch:</label>
                                  <select
                                    className="bg-white text-gray-400 border-2 py-2 px-4"
                                    required
                                    onChange={(e) => {
                                      setNewDateAndTime(
                                        new Date(newDate).getTime() +
                                          parseInt(e.target.value) -
                                          5.5 * 60 * 60 * 1000
                                      );
                                    }}
                                  >
                                    <option value="">Choose</option>
                                    {filteredBatches.map((b, index) => (
                                      <option key={index} value={b.value}>
                                        {b.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="my-2 flex flex-col gap-4 items-center justify-center">
                                  <input
                                    type="submit"
                                    className="curosr-pointer mx-auto w-fit px-4 py-2 bg-[#00286b] text-white border-2 border-[#00286b] hover:text-[#00286b] hover:bg-white"
                                  />
                                  <p className="text-[#00286b] text-sm text-center w-4/5">
                                    You can Reschedule treatment 2 hours before
                                    your desired time.
                                  </p>
                                </div>
                              </form>
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="w-full h-[90vh] sticky right-0 top-[5rem] flex flex-col  justify-center items-center sm:static md:h-[50vh] sm:h-[60vh]">
                    <p className="text-red-800 font-semibold">
                      Package Days or Sessions are over.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default OrderDetail;
