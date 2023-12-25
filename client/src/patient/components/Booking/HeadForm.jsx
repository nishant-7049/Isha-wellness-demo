import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePresentingComplaints } from "../../../store/slices/bookingSlice";
import { useNavigate } from "react-router-dom";
import MedicalHistory from "./MedicalHistory";

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

const HeadForm = ({ problem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { presentingComplaints: pc } = useSelector((state) => state.booking);

  const [headPsr, setHeadPsr] = useState();
  const [headSince, setHeadSince] = useState("");
  const [headConsult, setHeadConsult] = useState("");
  const [headInv, setHeadInv] = useState("");
  const [headCause, setHeadCause] = useState("");

  const [otherComplaints, setOtherComplaints] = useState("");
  const [otherMedicalConditions, setOtherMedicalConditions] = useState("");
  const [oldComplaint, setOldComplaint] = useState("");
  const headSubmit = (e) => {
    e.preventDefault();
    const data = {
      problem,
      psr: headPsr,
      since: headSince,
      consult: headConsult,
      inv: headInv,
      cause: headCause,
      otherComplaints,
      otherMedicalConditions,
      oldComplaint,
    };
    localStorage.setItem("presentingComplaints", JSON.stringify(data));
    dispatch(updatePresentingComplaints());
    navigate("/book/measures");
  };
  useEffect(() => {
    if (pc && pc.psr) {
      setHeadPsr(pc.psr);
      setHeadSince(pc.since);
      setHeadConsult(pc.consult);
      setHeadInv(pc.inv);
      setHeadCause(pc.cause);
      if (pc.otherComplaints) {
        setOtherComplaints(pc.otherComplaints);
        setOtherMedicalConditions(pc.otherMedicalConditions);
        setOldComplaint(pc.oldComplaint);
      }
    }
  }, [pc]);
  return (
    <form className="book-form" onSubmit={headSubmit}>
      <div className="book-input-container">
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
            value={headPsr}
            onChange={(e) => {
              setHeadPsr(e.target.value);
            }}
            required
          />
        </div>
        <div className="input-container">
          <label className="label-head">Since When:</label>
          <select
            className="book-input"
            value={headSince}
            onChange={(e) => {
              setHeadSince(e.target.value);
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
            value={headConsult}
            onChange={(e) => {
              setHeadConsult(e.target.value);
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
            value={headInv}
            onChange={(e) => {
              setHeadInv(e.target.value);
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
            value={headCause}
            onChange={(e) => {
              setHeadCause(e.target.value);
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

export default HeadForm;
