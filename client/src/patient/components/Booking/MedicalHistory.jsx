import React from "react";

const MedicalHistory = ({
  otherComplaints,
  setOtherComplaints,
  otherMedicalConditions,
  setOtherMedicalConditions,
  oldComplaint,
  setOldComplaint,
}) => {
  return (
    <div className="book-input-container">
      <div className="input-container">
        <label className="label-head">Other Complaints</label>
        <select
          className="book-input"
          value={otherComplaints}
          onChange={(e) => {
            setOtherComplaints(e.target.value);
          }}
          required
        >
          <option value="">Choose</option>
          <option value="Breathlessness on exertion">
            Breathlessness on exertion
          </option>
          <option value="Evening sickness">Evening sickness</option>
          <option value="Nothing">Nothing</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="input-container">
        <label>Other medical conditions </label>
        <select
          className="book-input"
          value={otherMedicalConditions}
          onChange={(e) => {
            setOtherMedicalConditions(e.target.value);
          }}
          required
        >
          <option value="">Choose</option>
          <option value="Uric acid imbalance">Uric acid imbalance</option>
          <option value="Anemia (low Hb)">Anemia (low Hb)</option>
          <option value="Nothing">Nothing</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="input-container">
        <label className="label-head">Other old Complaint or Operation </label>
        <textarea
          className="book-input"
          placeholder="Enter Your old but ongoing health problem or operations done on you"
          value={oldComplaint}
          onChange={(e) => {
            setOldComplaint(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default MedicalHistory;
