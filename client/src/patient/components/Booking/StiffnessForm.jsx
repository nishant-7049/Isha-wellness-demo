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

const StiffnessForm = ({ problem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { presentingComplaints: pc } = useSelector((state) => state.booking);

  const [stifPart, setStifPart] = useState("");
  const [stifSide, setStifSide] = useState("");
  const [stifPsr, setStifPsr] = useState();
  const [stifSince, setStifSince] = useState("");
  const [stifConsult, setStifConsult] = useState("");
  const [stifInv, setStifInv] = useState("");
  const [stifCause, setStifCause] = useState("");

  const [otherComplaints, setOtherComplaints] = useState("");
  const [otherMedicalConditions, setOtherMedicalConditions] = useState("");
  const [oldComplaint, setOldComplaint] = useState("");

  const stifSubmit = (e) => {
    e.preventDefault();
    const data = {
      problem,
      part: stifPart,
      side: stifSide,
      psr: stifPsr,
      since: stifSince,
      consult: stifConsult,
      inv: stifInv,
      cause: stifCause,
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
      setStifPart(pc.part);
      setStifSide(pc.side);
      setStifPsr(pc.psr);
      setStifSince(pc.since);
      setStifConsult(pc.consult);
      setStifInv(pc.inv);
      setStifCause(pc.cause);
      if (pc.otherComplaints) {
        setOtherComplaints(pc.otherComplaints);
        setOtherMedicalConditions(pc.otherMedicalConditions);
        setOldComplaint(pc.oldComplaint);
      }
    }
  }, [pc]);
  return (
    <form className="book-form" onSubmit={stifSubmit}>
      <div className="book-input-container">
        <div className="input-container">
          <label className="label-head">Body Part:</label>
          <select
            className="book-input"
            value={stifPart}
            onChange={(e) => {
              setStifPart(e.target.value);
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
            value={stifSide}
            onChange={(e) => {
              setStifSide(e.target.value);
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
            value={stifPsr}
            onChange={(e) => {
              setStifPsr(e.target.value);
            }}
            required
          />
        </div>
        <div className="input-container">
          <label className="label-head">Since When:</label>
          <select
            className="book-input"
            value={stifSince}
            onChange={(e) => {
              setStifSince(e.target.value);
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
            value={stifConsult}
            onChange={(e) => {
              setStifConsult(e.target.value);
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
            value={stifInv}
            onChange={(e) => {
              setStifInv(e.target.value);
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
            value={stifCause}
            onChange={(e) => {
              setStifCause(e.target.value);
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

export default StiffnessForm;
