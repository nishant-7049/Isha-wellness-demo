import React, { useEffect, useState } from "react";
import {
  checkout,
  createBooking,
  getKey,
  resetPaymentVerified,
  verifyPayment,
} from "../../../store/slices/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPackageDetail } from "../../../store/slices/packageSlice";
import { useNavigate } from "react-router-dom";
import Container from "./patientDetails";
import OrderCard from "./OrderCard";

const ConfirmBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, key, order, booking, paymentVerified } = useSelector(
    (state) => state.booking
  );
  const { user } = useSelector((state) => state.user);

  const [isToggleDisabled, setIsToggleDisabled] = useState(false);
  const [paymentID, setPaymentID] = useState("");

  const submitBooking = () => {
    const bookingDetails = {
      personal: personalInfo,
      complaints,
      measures,
      lifestyleAndHabits: life,
      occupation,
      admin: adminForm,
      packageAndDate: dateAndTime,
      days: dateAndTime.package.days,
      sessions: dateAndTime.package.sessions,
      bookedBy: user._id,
    };
    dispatch(createBooking(bookingDetails));
    if (dateAndTime.package.paymentType == "Cash") {
      navigate("/paymentConfirmation");
    }
    setIsToggleDisabled(true);
  };
  const checkoutHandler = () => {
    dispatch(checkout(dateAndTime.package.price));

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
          name: user.name,
          email: user.email,
          contact: personalInfo.phone,
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
  const {
    personalInfo,
    presentingComplaints: complaints,
    measures,
    lifestyleAndHabits: life,
    occupation,
    adminForm,
    dateAndTime,
  } = useSelector((state) => state.booking);
  const scheduledTime = new Date(dateAndTime.dateAndTime);
  useEffect(() => {
    dispatch(getKey());

    if (paymentVerified) {
      dispatch(resetPaymentVerified());
      navigate(`/paymentConfirmation/${paymentID}`);
    }
  }, [paymentVerified]);
  return (
    <Container>
      <h1 className="main-head">Confirm Booking</h1>
      <div className="flex justify-between p-4 md:flex-col sm:flex-col">
        <div className="flex flex-col gap-8">
          <div className=" flex flex-wrap gap-8">
            <div className="det-con">
              <h1 className="det-head">Personal Details</h1>
              <div className="ques-ans">
                <div className="ques-ans-con">
                  <p className="ques">Name:</p>
                  <p className="ans">{personalInfo.name}</p>
                </div>
                <div className="ques-ans-con">
                  <p className="ques">Age:</p>
                  <p className="ans">{personalInfo.age}</p>
                </div>
                <div className="ques-ans-con">
                  <p className="ques">Gender:</p>
                  <p className="ans">{personalInfo.gender}</p>
                </div>
                <div className="ques-ans-con">
                  <p className="ques">Address:</p>
                  <p className="ans">{personalInfo.address}</p>
                </div>
                <div className="ques-ans-con">
                  <p className="ques">City:</p>
                  <p className="ans">{personalInfo.city}</p>
                </div>
                <div className="ques-ans-con">
                  <p className="ques">Location Preference:</p>
                  <p className="ans">{personalInfo.location}</p>
                </div>
                <div className="ques-ans-con">
                  <p className="ques">Mobile:</p>
                  <p className="ans">{personalInfo.phone}</p>
                </div>
                <div className="ques-ans-con">
                  <p className="ques">Whatsapp:</p>
                  <p className="ans">{personalInfo.whatsapp}</p>
                </div>
                <div className="ques-ans-con">
                  <p className="ques">Martial Status:</p>
                  <p className="ans">{personalInfo.martial}</p>
                </div>
                <div className="ques-ans-con">
                  <p className="ques">Education:</p>
                  <p className="ans">{personalInfo.education}</p>
                </div>
              </div>
            </div>
            {complaints &&
              (complaints.problem == "Pain" ||
                complaints.problem == "Paranthesis") && (
                <div className="det-con">
                  <h1 className="det-head">Presenting Complaints</h1>
                  <div className="ques-ans">
                    <div className="ques-ans-con">
                      <p className="ques">Problem:</p>
                      <p className="ans">{complaints.problem}</p>
                    </div>
                    <div className="ques-ans-con">
                      <p className="ques">Body Part:</p>
                      <p className="ans">{complaints.part}</p>
                    </div>
                    <div className="ques-ans-con">
                      <p className="ques">Body Side:</p>
                      <p className="ans">{complaints.side}</p>
                    </div>
                    <div className="ques-ans-con">
                      <p className="ques">Body Aspect:</p>
                      <p className="ans">{complaints.aspect}</p>
                    </div>
                    <div className="ques-ans-con">
                      <p className="ques">Problem Scale Rating (PSR):</p>
                      <p className="ans">{complaints.psr}</p>
                    </div>
                    <div className="ques-ans-con">
                      <p className="ques">Since When:</p>
                      <p className="ans">{complaints.since}</p>
                    </div>
                    <div className="ques-ans-con">
                      <p className="ques">Consulted Before:</p>
                      <p className="ans">{complaints.consult}</p>
                    </div>
                    <div className="ques-ans-con">
                      <p className="ques">Investigations done:</p>
                      <p className="ans">{complaints.inv}</p>
                    </div>
                    <div className="ques-ans-con">
                      <p className="ques">What increases your problem?</p>
                      <p className="ans">{complaints.cause}</p>
                    </div>
                  </div>
                </div>
              )}
            {complaints && complaints.problem == "Stiffness" && (
              <div className="det-con">
                <h1 className="det-head">Presenting Complaints</h1>
                <div className="ques-ans">
                  <div className="ques-ans-con">
                    <p className="ques">Problem:</p>
                    <p className="ans">{complaints.problem}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Body Part:</p>
                    <p className="ans">{complaints.part}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Body Side:</p>
                    <p className="ans">{complaints.side}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Problem Scale Rating (PSR):</p>
                    <p className="ans">{complaints.psr}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Since When:</p>
                    <p className="ans">{complaints.since}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Consulted Before:</p>
                    <p className="ans">{complaints.consult}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Investigations done:</p>
                    <p className="ans">{complaints.inv}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">What increases your problem?</p>
                    <p className="ans">{complaints.cause}</p>
                  </div>
                </div>
              </div>
            )}
            {complaints && complaints.problem == "Multiple sclerosis" && (
              <div className="det-con">
                <h1 className="det-head">Presenting Complaints</h1>
                <div className="ques-ans">
                  <div className="ques-ans-con">
                    <p className="ques">Problem:</p>
                    <p className="ans">{complaints.problem}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Body Part:</p>
                    <p className="ans">{complaints.part}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Body Side:</p>
                    <p className="ans">{complaints.side}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Problem Scale Rating (PSR):</p>
                    <p className="ans">{complaints.psr}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Since When:</p>
                    <p className="ans">{complaints.since}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Consulted Before:</p>
                    <p className="ans">{complaints.consult}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Investigations done:</p>
                    <p className="ans">{complaints.inv}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">What increases your problem?</p>
                    <p className="ans">{complaints.cause}</p>
                  </div>
                  <h1 className="text-[#00286b] mx-auto font-bold border-b-2 border-[#00286b]">
                    Functionality
                  </h1>
                  <div className="ques-ans-con">
                    <p className="ques">Activity Status:</p>
                    <p className="ans">{complaints.activity}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">
                      Personal Work which can be done by person:
                    </p>
                    <p className="ans">{complaints.work}</p>
                  </div>
                </div>
              </div>
            )}
            {complaints && complaints.problem == "Paralysis" && (
              <div className="det-con">
                <h1 className="det-head">Presenting Complaints</h1>
                <div className="ques-ans">
                  <div className="ques-ans-con">
                    <p className="ques">Problem:</p>
                    <p className="ans">{complaints.problem}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Since When:</p>
                    <p className="ans">{complaints.since}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Cause:</p>
                    <p className="ans">{complaints.cause}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Type:</p>
                    <p className="ans">{complaints.type}</p>
                  </div>
                  <h1 className="text-[#00286b] mx-auto font-bold border-b-2 border-[#00286b]">
                    Functionality
                  </h1>
                  <div className="ques-ans-con">
                    <p className="ques">Muscle Tone:</p>
                    <p className="ans">{complaints.tone}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Activity Status:</p>
                    <p className="ans">{complaints.activity}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">
                      Personal Work which can be done by person:
                    </p>
                    <p className="ans">{complaints.work}</p>
                  </div>
                </div>
              </div>
            )}
            {complaints && complaints.problem == "Others" && (
              <div className="det-con">
                <h1 className="det-head">Presenting Complaints</h1>
                <div className="ques-ans">
                  <div className="ques-ans-con">
                    <p className="ques">Problem:</p>
                    <p className="ans">{complaints.problem}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Problem description:</p>
                    <p className="ans">{complaints.problemDescription}</p>
                  </div>
                </div>
              </div>
            )}
            {complaints &&
              (complaints.problem == "Headache" ||
                complaints.problem == "Migraine" ||
                complaints.problem == "Vertigo" ||
                complaints.problem == "Motion Sickness") && (
                <div className="det-con">
                  <h1 className="det-head">Presenting Complaints</h1>
                  <div className="ques-ans">
                    <div className="ques-ans-con">
                      <p className="ques">Problem:</p>
                      <p className="ans">{complaints.problem}</p>
                    </div>
                    <div className="ques-ans-con">
                      <p className="ques">Problem Scale Rating (PSR):</p>
                      <p className="ans">{complaints.psr}</p>
                    </div>
                    <div className="ques-ans-con">
                      <p className="ques">Since When:</p>
                      <p className="ans">{complaints.since}</p>
                    </div>
                    <div className="ques-ans-con">
                      <p className="ques">Consulted Before:</p>
                      <p className="ans">{complaints.consult}</p>
                    </div>
                    <div className="ques-ans-con">
                      <p className="ques">Investigations done:</p>
                      <p className="ans">{complaints.inv}</p>
                    </div>
                    <div className="ques-ans-con">
                      <p className="ques">What increases your problem?</p>
                      <p className="ans">{complaints.cause}</p>
                    </div>
                  </div>
                </div>
              )}
            <div className="det-con">
              <h1 className="det-head">Medical History</h1>
              <div className="ques-ans">
                <div className="ques-ans-con">
                  <p className="ques">Other Complaints:</p>
                  <p className="ans">{complaints.otherComplaints}</p>
                </div>
                <div className="ques-ans-con">
                  <p className="ques">Other Medical Condition:</p>
                  <p className="ans">{complaints.otherMedicalConditions}</p>
                </div>
                <div className="ques-ans-con">
                  <p className="ques">Other old Complaint or Operation:</p>
                  <p className="ans">{complaints.oldComplaint}</p>
                </div>
                <h1 className="det-head">Admin Questions</h1>
                <div className="ques-ans">
                  <div className="ques-ans-con">
                    <p className="ques">How you came to know about IWC?</p>
                    <p className="ans">{adminForm.getToKnow}</p>
                  </div>
                </div>
                <h1 className="det-head">Schedule Treatment</h1>
                <div className="ques-ans">
                  <div className="ques-ans-con">
                    <p className="ques">Scheduled date and time:</p>
                    <p className="ans">
                      {scheduledTime.getDate()}/{scheduledTime.getMonth() + 1}/
                      {scheduledTime.getFullYear()} {scheduledTime.getHours()}:
                      {scheduledTime.getMinutes()} IST
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="det-con">
              {complaints && complaints.problem == "Lifestyle and Habits" && (
                <div>
                  <h1 className="det-head">Presenting Complaints</h1>
                  <div className="ques-ans">
                    <div className="ques-ans-con">
                      <p className="ques">Problem:</p>
                      <p className="ans">{complaints.problem}</p>
                    </div>
                  </div>
                </div>
              )}
              <h1 className="det-head">Measures</h1>
              <div className="ques-ans">
                <div className="ques-ans-con">
                  <p className="ques">Weight (in kg.):</p>
                  <p className="ans">{measures.weight}</p>
                </div>
                <div className="ques-ans-con">
                  <p className="ques">Height (in cm.):</p>
                  <p className="ans">{measures.height}</p>
                </div>
                <div className="ques-ans-con">
                  <p className="ques">Sugar:</p>
                  <p className="ans">{measures.sugar}</p>
                </div>
                <div className="ques-ans-con">
                  <p className="ques">Blood Pressure:</p>
                  <p className="ans">{measures.bp}</p>
                </div>
              </div>
            </div>

            <div className="det-con">
              <h1 className="det-head">Occupation Details</h1>
              <div className="ques-ans">
                <div className="ques-ans-con">
                  <p className="ques">Occupation:</p>
                  <p className="ans">{occupation.occupation}</p>
                </div>
                <div className="ques-ans-con">
                  <p className="ques">Type of Work:</p>
                  <p className="ans">{occupation.work}</p>
                </div>
                <div className="ques-ans-con">
                  <p className="ques">Work experience of this type of work:</p>
                  <p className="ans">{occupation.experience}</p>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-xl text-[#00286b] font-bold text-center border-b-2 border-[#00286b] ">
            Lifestyle And Habits
          </h1>
          <div className=" flex flex-wrap gap-8">
            <div className="flex flex-wrap gap-8">
              {life &&
                life.problemsInfo &&
                life.problemsInfo.map((pro, index) => (
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
                          Possible cause for this problem according to patient?
                        </p>
                        <p className="ans">{pro.cause}</p>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="det-con">
                <h1 className="det-head">Food Related Questions</h1>
                <div className="ques-ans">
                  <div className="ques-ans-con">
                    <p className="ques">Do you think you take healthy diet?</p>
                    <p className="ans">{life.foodDetails.healthyDiet}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Do you take tea on empty stomach?</p>
                    <p className="ans">{life.foodDetails.emptyStomach}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Do you do breakfast?</p>
                    <p className="ans">{life.foodDetails.doBreakfast}</p>
                  </div>
                  <h1 className="text-[#00286b] mx-auto font-bold border-b-2 border-[#00286b]">
                    Food Timings
                  </h1>
                  {life.foodDetails.doBreakfast == "Yes" && (
                    <div className="ques-ans-con">
                      <p className="ques">Breakfast (hh/mm)</p>
                      <p className="ans">
                        {life.foodDetails.foodTime.breakfastTime}
                      </p>
                    </div>
                  )}
                  <div className="ques-ans-con">
                    <p className="ques">Lunch (hh/mm)</p>
                    <p className="ans">{life.foodDetails.foodTime.lunchTime}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Dinner (hh/mm)</p>
                    <p className="ans">
                      {life.foodDetails.foodTime.dinnerTime}
                    </p>
                  </div>
                </div>
              </div>
              <div className="det-con">
                <h1 className="det-head">Exercises related Questions</h1>
                <div className="ques-ans">
                  <div className="ques-ans-con">
                    <p className="ques">Are you doing any exercises?</p>
                    <p className="ans">{life.exerciseDetails.doExercises}</p>
                  </div>
                  {life.exerciseDetails.doExercises == "Yes" && (
                    <div className="ques-ans">
                      <div className="ques-ans-con">
                        <p className="ques">Which kind of Exercise you do?</p>
                        <p className="ans">{life.exerciseDetails.exercise}</p>
                      </div>
                      <div className="ques-ans-con">
                        <p className="ques">How much time in a day?</p>
                        <p className="ans">
                          {life.exerciseDetails.exercisePerDay}
                        </p>
                      </div>
                      <div className="ques-ans-con">
                        <p className="ques">How much time in a week?</p>
                        <p className="ans">
                          {life.exerciseDetails.exercisePerWeek}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <h1 className="det-head">Habits</h1>
                <div className="ques-ans">
                  <div className="ques-ans-con">
                    <p className="ques">Habits:</p>
                    {life.habits.map((hab, index) => (
                      <p className="ans" key={index}>
                        {index + 1}. {hab}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="det-con">
                <h1 className="det-head">Sleep related Questions</h1>
                <div className="ques-ans">
                  <div className="ques-ans-con">
                    <p className="ques">Do you get proper sleep?</p>
                    <p className="ans">{life.sleepDetails.properSleep}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">At what time you sleep?</p>
                    <p className="ans">{life.sleepDetails.sleepTime}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">At what time you wake up?</p>
                    <p className="ans">{life.sleepDetails.wakeTime}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Average sleep hours?</p>
                    <p className="ans">{life.sleepDetails.sleepHour}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Average sitting hours?</p>
                    <p className="ans">{life.sleepDetails.sittingHour}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Average Mobile screen hours?</p>
                    <p className="ans">{life.sleepDetails.mobileScreenHour}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Average TV screen hours?</p>
                    <p className="ans">{life.sleepDetails.tvScreenHour}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">
                      Average Laptop/computer screen hours?
                    </p>
                    <p className="ans">
                      {life.sleepDetails.computerScreenHour}
                    </p>
                  </div>
                </div>
              </div>
              <div className="det-con">
                <h1 className="det-head">Stress related Questions</h1>
                <div className="ques-ans">
                  <div className="ques-ans-con">
                    <p className="ques">Do you think you are over thinker?</p>
                    <p className="ans">{life.stressDetails.thinker}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Rate your thinking?</p>
                    <p className="ans">{life.stressDetails.thinkingRate}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">Rate your stress? </p>
                    <p className="ans">{life.stressDetails.stressRate}</p>
                  </div>
                  <div className="ques-ans-con">
                    <p className="ques">
                      What kind of/Which thought/occasion disturbed you a lot?
                    </p>
                    <p className="ans">{life.stressDetails.disturbanceCause}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[80vh] sticky right-0 top-[5rem] flex flex-col  justify-center items-center sm:static md:h-[50vh] sm:h-fit">
          <h1 className="det-head">Order Details</h1>

          <OrderCard pac={dateAndTime.package} />
          <button
            className="text-white my-4 bg-gradient-to-br  from-[#00286b] to-[#b7becb] p-2 hover:from-[#b7becb] hover:to-[#00286b] "
            disabled={isToggleDisabled}
            onClick={submitBooking}
          >
            Confirm Booking
          </button>
          {isToggleDisabled && (
            <button
              className="text-white  bg-gradient-to-br  from-[#00286b] to-[#b7becb] p-2 hover:from-[#b7becb] hover:to-[#00286b] "
              onClick={checkoutHandler}
            >
              Pay ₹{dateAndTime.package.price}
            </button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ConfirmBooking;
