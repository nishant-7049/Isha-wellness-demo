import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePresentingComplaints } from "../../../store/slices/bookingSlice";
import { useNavigate } from "react-router-dom";
import MedicalHistory from "./MedicalHistory";

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

const ParalysisForm = ({ problem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { presentingComplaints: pc } = useSelector((state) => state.booking);

  const [paraSince, setParaSince] = useState("");
  const [paraCause, setParaCause] = useState("");
  const [paraCause2, setParaCause2] = useState("");
  const [paraType, setParaType] = useState("");
  const [paraPart, setParaPart] = useState("");
  const [paraTone, setParaTone] = useState();
  const [paraActivity, setParaActivity] = useState("");
  const [paraWork, setParaWork] = useState("");

  const [otherComplaints, setOtherComplaints] = useState("");
  const [otherMedicalConditions, setOtherMedicalConditions] = useState("");
  const [oldComplaint, setOldComplaint] = useState("");

  const paraSubmit = (e) => {
    e.preventDefault();
    const data = {
      problem,
      since: paraSince,
      type: paraType,
      tone: paraTone,
      activity: paraActivity,
      work: paraWork,
      otherComplaints,
      otherMedicalConditions,
      oldComplaint,
    };
    if (paraCause == "Other") {
      data.cause = paraCause2;
    } else {
      data.cause = paraCause;
    }
    if (paraPart) {
      data.part = paraPart;
    }
    localStorage.setItem("presentingComplaints", JSON.stringify(data));
    dispatch(updatePresentingComplaints());
    navigate("/book/measures");
  };

  useEffect(() => {
    if (pc && pc.since) {
      setParaSince(pc.since);
      setParaCause(pc.cause);
      setParaType(pc.type);
      if (pc.part) {
        setParaPart(pc.part);
      }
      setParaTone(pc.tone);
      setParaActivity(pc.activity);
      setParaWork(pc.work);
      if (pc.otherComplaints) {
        setOtherComplaints(pc.otherComplaints);
        setOtherMedicalConditions(pc.otherMedicalConditions);
        setOldComplaint(pc.oldComplaint);
      }
    }
  }, [pc]);

  return (
    <form className="book-form" onSubmit={paraSubmit}>
      <div className="book-input-container">
        <div className="input-container">
          <label className="label-head">Since When:</label>
          <select
            className="book-input"
            value={paraSince}
            onChange={(e) => {
              setParaSince(e.target.value);
            }}
            required
          >
            <option value="">Choose</option>
            <option value="Days">Days</option>
            <option value="Months">Months</option>
            <option value="Years">Years</option>
          </select>
        </div>
        <div className="input-container">
          <label className="label-head">Cause:</label>
          <select
            className="book-input"
            value={paraCause}
            onChange={(e) => {
              setParaCause(e.target.value);
            }}
            required
          >
            <option value="">Choose</option>
            <option value="Spinal Cord Injury">Spinal Cord Injury</option>
            <option value="Brain Haemorrhage">Brain Haemorrhage</option>
            <option value="Ischemia">Ischemia</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {paraCause == "Other" && (
          <div className="input-container">
            <label className="label-head">Cause Other:</label>
            <input
              className="book-input"
              type="text"
              maxLength={100}
              value={paraCause2}
              placeholder="Enter the cause of problem."
              onChange={(e) => {
                setParaCause2(e.target.value);
              }}
            />
          </div>
        )}
        <div className="input-container">
          <label className="label-head">Type:</label>
          <select
            className="book-input"
            value={paraType}
            onChange={(e) => {
              setParaType(e.target.value);
            }}
            required
          >
            <option value="">Choose</option>
            <option value="Quadriplegia">Quadriplegia</option>
            <option value="Paraplegia">Paraplegia</option>
            <option value="Hemiplegia">Hemiplegia</option>
            <option value="Monoplegia">Monoplegia</option>
          </select>
        </div>
        {paraType == "Hemiplegia" && (
          <div className="input-container">
            <label className="label-head">Hemiplegia Part:</label>
            <select
              className="book-input"
              value={paraPart}
              onChange={(e) => {
                setParaPart(e.target.value);
              }}
            >
              <option value="">Choose</option>
              <option value="Left">Left</option>
              <option value="Right">Right</option>
            </select>
          </div>
        )}
        {paraType == "Monoplegia" && (
          <div className="input-container">
            <label className="label-head">Monoplegia Part:</label>
            <select
              className="book-input"
              value={paraPart}
              onChange={(e) => {
                setParaPart(e.target.value);
              }}
            >
              <option value="">Choose</option>
              <option value="Left Lower limb">Left Lower limb</option>
              <option value="Left Upper limb">Left Upper limb</option>
              <option value="Right Lower limb">Right Lower limb</option>
              <option value="Right Upper limb">Right Upper limb</option>
            </select>
          </div>
        )}
      </div>

      <h1 className="text-[#00286b] text-xl font-bold border-b-2 border-[#00286b] mt-4">
        Functionality
      </h1>
      <div className="book-input-container">
        <div className="input-container">
          <label className="label-head">
            Muscle Tone (0-10) (Flaccid to Rigid):{" "}
          </label>
          <input
            type="number"
            className="book-input"
            max={10}
            min={0}
            value={paraTone}
            onChange={(e) => {
              setParaTone(e.target.value);
            }}
            placeholder="Enter Muscle Tone (0-10) (Flaccid to Rigid)"
          />
        </div>
        <div className="input-container">
          <label className="label-head">Activity Status (Any One): </label>
          <select
            className="book-input"
            value={paraActivity}
            onChange={(e) => {
              setParaActivity(e.target.value);
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
            value={paraWork}
            onChange={(e) => {
              setParaWork(e.target.value);
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

export default ParalysisForm;
