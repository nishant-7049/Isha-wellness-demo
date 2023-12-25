import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MedicalHistory from "./MedicalHistory";
import { updatePresentingComplaints } from "../../../store/slices/bookingSlice";

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
const PainForm = ({ problem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { presentingComplaints: pc } = useSelector((state) => state.booking);

  const [painPart, setPainPart] = useState("");
  const [painSide, setPainSide] = useState("");
  const [painAspect, setPainAspect] = useState("");
  const [painPsr, setPainPsr] = useState();
  const [painSince, setPainSince] = useState("");
  const [painConsult, setPainConsult] = useState("");
  const [painInv, setPainInv] = useState("");
  const [painCause, setPainCause] = useState("");

  const [otherComplaints, setOtherComplaints] = useState("");
  const [otherMedicalConditions, setOtherMedicalConditions] = useState("");
  const [oldComplaint, setOldComplaint] = useState("");
  const painSubmit = (e) => {
    e.preventDefault();
    const data = {
      problem,
      part: painPart,
      side: painSide,
      aspect: painAspect,
      psr: painPsr,
      since: painSince,
      consult: painConsult,
      inv: painInv,
      cause: painCause,
      otherComplaints,
      otherMedicalConditions,
      oldComplaint,
    };
    localStorage.setItem("presentingComplaints", JSON.stringify(data));
    dispatch(updatePresentingComplaints());
    navigate("/book/measures");
  };

  useEffect(() => {
    if (pc && pc.part) {
      setPainPart(pc.part);
      setPainSide(pc.side);
      setPainAspect(pc.aspect);
      setPainPsr(pc.psr);
      setPainSince(pc.since);
      setPainConsult(pc.consult);
      setPainInv(pc.inv);
      setPainCause(pc.cause);
      if (pc.otherComplaints) {
        setOtherComplaints(pc.otherComplaints);
        setOtherMedicalConditions(pc.otherMedicalConditions);
        setOldComplaint(pc.oldComplaint);
      }
    }
  }, [pc]);
  return (
    <form className="book-form" onSubmit={painSubmit}>
      <div className="book-input-container">
        <div className="input-container">
          <label className="label-head">Body Part:</label>
          <select
            className="book-input"
            value={painPart}
            onChange={(e) => {
              setPainPart(e.target.value);
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
            value={painSide}
            onChange={(e) => {
              setPainSide(e.target.value);
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
          <label className="label-head">Body Aspect:</label>
          <select
            className="book-input"
            value={painAspect}
            onChange={(e) => {
              setPainAspect(e.target.value);
            }}
            required
          >
            <option value="">Choose</option>
            <option value="Lateral">Lateral</option>
            <option value="Medial">Medial </option>
            <option value="Anterior">Anterior</option>
            <option value="Posterior">Posterior</option>
          </select>
        </div>
        <div className="input-container">
          <label className="label-head">
            Problem Scale Rating (PSR)(0-10):
          </label>
          <input
            type="number"
            min={0}
            max={10}
            placeholder="Enter Patient's PSR."
            className="book-input"
            value={painPsr}
            onChange={(e) => {
              setPainPsr(e.target.value);
            }}
            required
          />
        </div>
        <div className="input-container">
          <label className="label-head">Since When:</label>
          <select
            className="book-input"
            value={painSince}
            onChange={(e) => {
              setPainSince(e.target.value);
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
            value={painConsult}
            onChange={(e) => {
              setPainConsult(e.target.value);
            }}
            required
          >
            <option value="">Choose</option>
            {consulted.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <label className="label-head">Investigations done :</label>
          <select
            className="book-input"
            value={painInv}
            onChange={(e) => {
              setPainInv(e.target.value);
            }}
            required
          >
            <option value="">Choose</option>
            {investigations.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <label className="label-head">What Increases your problem? </label>
          <select
            className="book-input"
            value={painCause}
            onChange={(e) => {
              setPainCause(e.target.value);
            }}
            required
          >
            <option value="">Choose</option>
            {causes.map((c) => (
              <option value={c}>{c}</option>
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

export default PainForm;
