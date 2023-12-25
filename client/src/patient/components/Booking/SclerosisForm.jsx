import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePresentingComplaints } from "../../../store/slices/bookingSlice";
import { useNavigate } from "react-router-dom";
import MedicalHistory from "./MedicalHistory";

const parts = [
  "Head",
  "Neck",
  "collar",
  "shoulder",
  "Chest",
  "Upper  Back",
  "Arm",
  "Elbow",
  "Forearm",
  "Wrist",
  "Hand",
  "Thumb",
  "Index finger",
  "Middle finger",
  "Ring finger",
  "Little finger",
  "Stomach",
  "Abdomen",
  "Lower back",
  "Hip",
  "Anal region",
  "Thigh",
  "Knee",
  "leg",
  "Ankle",
  "Foot",
  "Heel",
];
const consulted = [
  "Self-medication",
  "Near by hospital",
  "Orthopaedic",
  "Neurologist",
  "Other specialist",
  "Ayurvedic",
  "Homeopathy",
  "Therapy",
  "Massage or local healers",
  "No one",
  "Other",
];
const investigations = [
  "X-ray",
  "MRI",
  "CT scan",
  "Sonography",
  "Lab test",
  "Nothing",
  "Other",
];
const causes = [
  "Any movement",
  "Standing",
  "Walking",
  "Sitting on chair",
  "Sitting on ground",
  "Sitting with crossed legs",
  "Lying Down",
  "Sleep",
  "Forward bending",
  "Gas-Acidity ",
  "Constipation",
  "Travel",
  "Stress",
  "None",
  "Don't Know",
  "Other",
];
const activities = [
  "Completely bed ridden",
  "Can turn over bed",
  "Can sit with support",
  "Can sit independently",
  "Can stand with support",
  "Can stand independently",
  "Can walk with support",
  "Can walk independently",
];
const works = [
  "Urine",
  "Stool",
  "Bath",
  "Dressing",
  "Eat",
  "Mobile",
  "TV Remote",
];

const Sclerosis = ({ problem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { presentingComplaints: pc } = useSelector((state) => state.booking);

  const [slerPart, setSlerPart] = useState("");
  const [slerSide, setSlerSide] = useState("");
  const [slerPsr, setSlerPsr] = useState();
  const [slerSince, setSlerSince] = useState("");
  const [slerConsult, setSlerConsult] = useState("");
  const [slerInv, setSlerInv] = useState("");
  const [slerCause, setSlerCause] = useState("");
  const [slerActivity, setSlerActivity] = useState("");
  const [slerWork, setSlerWork] = useState("");

  const [otherComplaints, setOtherComplaints] = useState("");
  const [otherMedicalConditions, setOtherMedicalConditions] = useState("");
  const [oldComplaint, setOldComplaint] = useState("");
  const slerSubmit = (e) => {
    e.preventDefault();
    const data = {
      problem,
      part: slerPart,
      side: slerSide,
      psr: slerPsr,
      since: slerSince,
      consult: slerConsult,
      inv: slerInv,
      cause: slerCause,
      activity: slerActivity,
      work: slerWork,
      otherComplaints,
      otherMedicalConditions,
      oldComplaint,
    };
    localStorage.setItem("presentingComplaints", JSON.stringify(data));
    dispatch(updatePresentingComplaints());
    navigate("/book/measures");
  };
  useEffect(() => {
    if (pc.part) {
      setSlerPart(pc.part);
      setSlerSide(pc.side);
      setSlerPsr(pc.psr);
      setSlerSince(pc.since);
      setSlerConsult(pc.consult);
      setSlerInv(pc.inv);
      setSlerCause(pc.cause);
      setSlerActivity(pc.activity);
      setSlerWork(pc.work);
      if (pc.otherComplaints) {
        setOtherComplaints(pc.otherComplaints);
        setOtherMedicalConditions(pc.otherMedicalConditions);
        setOldComplaint(pc.oldComplaint);
      }
    }
  }, [pc]);
  return (
    <form className="book-form" onSubmit={slerSubmit}>
      <div className="book-input-container">
        <div className="input-container">
          <label className="label-head">Body Part:</label>
          <select
            className="book-input"
            value={slerPart}
            onChange={(e) => {
              setSlerPart(e.target.value);
            }}
            required
          >
            <option value="">Choose</option>
            {parts.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <label className="label-head">Body Side:</label>
          <select
            className="book-input"
            value={slerSide}
            onChange={(e) => {
              setSlerSide(e.target.value);
            }}
            required
          >
            <option value="">Choose</option>
            <option value="Left">Left</option>
            <option value="Right">Right</option>
            <option value="Bilateral">Bilateral</option>
            <option value="Center">Center</option>
          </select>
        </div>

        <div className="input-container">
          <label className="label-head">
            Problem Scale Rating (PSR)(0-10):
          </label>
          <input
            type="number"
            max={10}
            min={0}
            placeholder="Enter Patient's PSR."
            className="book-input"
            value={slerPsr}
            onChange={(e) => {
              setSlerPsr(e.target.value);
            }}
            required
          />
        </div>
        <div className="input-container">
          <label className="label-head">Since When:</label>
          <select
            className="book-input"
            value={slerSince}
            onChange={(e) => {
              setSlerSince(e.target.value);
            }}
            required
          >
            <option value="">Choose</option>
            <option value="Days">Days</option>
            <option value="Months">Months </option>
            <option value="Years">Years</option>
          </select>
        </div>
        <div className="input-container">
          <label className="label-head">Consulted Before:</label>
          <select
            className="book-input"
            value={slerConsult}
            onChange={(e) => {
              setSlerConsult(e.target.value);
            }}
            required
          >
            <option value="">Choose</option>
            {consulted.map((c) => (
              <option value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <label className="label-head">Investigations done :</label>
          <select
            className="book-input"
            value={slerInv}
            onChange={(e) => {
              setSlerInv(e.target.value);
            }}
            required
          >
            <option value="">Choose</option>
            {investigations.map((i) => (
              <option value={i}>{i}</option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <label className="label-head">What Increases your problem? </label>
          <select
            className="book-input"
            value={slerCause}
            onChange={(e) => {
              setSlerCause(e.target.value);
            }}
            required
          >
            <option value="">Choose</option>
            {causes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h1 className="text-[#00286b] text-xl font-bold border-b-2 border-[#00286b] mt-4">
        Functionality
      </h1>
      <div className="book-input-container">
        <div className="input-container">
          <label className="label-head">Activity Status (Any One): </label>
          <select
            className="book-input"
            value={slerActivity}
            onChange={(e) => {
              setSlerActivity(e.target.value);
            }}
            required
          >
            <option value="">Choose</option>
            {activities.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <label className="label-head">
            Personal Work which can be done by person :{" "}
          </label>
          <select
            className="book-input"
            value={slerWork}
            onChange={(e) => {
              setSlerWork(e.target.value);
            }}
            required
          >
            <option value="">Choose</option>
            {works.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h1 className="text-[#00286b] text-xl font-bold border-b-2 border-[#00286b] mt-4">
        Medical History
      </h1>
      <MedicalHistory
        otherComplaints={otherComplaints}
        otherMedicalConditions={otherMedicalConditions}
        oldComplaint={oldComplaint}
        setOtherComplaints={setOtherComplaints}
        setOtherMedicalConditions={setOtherMedicalConditions}
        setOldComplaint={setOldComplaint}
      />
      <input className="book-submit" type="submit" value="Save and Continue" />
    </form>
  );
};

export default Sclerosis;
