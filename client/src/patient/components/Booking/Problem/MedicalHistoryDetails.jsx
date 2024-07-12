import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const otherComplaints = [
  "Headache",
  "Vertigo",
  "Migraine",
  "Gas",
  "Acidity",
  "Constipation",
  "Breathlessness on exertion",
  "Evening sickness",
];

const otherMedicalConditions = [
  "Diabetes",
  "High blood pressure",
  "Thyroid",
  "Asthma",
  "Anemia (low Hb)",
  "Hernia",
  "Nothing",
  "Other",
];

const MedicalHistoryDetails = ({
  activeStatus,
  setActiveElement,
  problem,
  setProblem,
  formSubmitHandler,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    formSubmitHandler();
  };
  useEffect(() => {
    setIsActive(activeStatus);
  }, [activeStatus]);
  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => {
          setActiveElement("medicalHistoryDetails");
          setIsActive(!isActive);
        }}
      >
        <div
          className={`flex items-center gap-4 sm:gap-2 ${
            isCompleted && "text-[#00286b]"
          }`}
        >
          <div
            className={`w-6 h-6 font-semibold p-1 rounded-full border-2 flex justify-center items-center text-xs ${
              isCompleted ? "border-[#00286b]" : "border-[#000000de]"
            }`}
          >
            {isCompleted ? (
              <IoMdCheckmark />
            ) : problem?.problem == "Paralysis" ||
              problem?.problem == "Multiple sclerosis" ? (
              6
            ) : (
              5
            )}
          </div>
          <h1 className="font-semibold">Medical History Details</h1>
        </div>
        {isActive ? (
          <FaChevronDown className={`${isCompleted && "text-[#00286b]"}`} />
        ) : (
          <FaChevronRight className={`${isCompleted && "text-[#00286b]"}`} />
        )}
      </div>
      {isActive && (
        <form
          className="flex justify-center items-center flex-wrap gap-4 mx-auto w-full"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col sm:w-1/3 w-1/4 grow">
            <label>Other Complaints</label>
            <select
              placeholder="Enter patient's other complaints"
              maxLength={300}
              type="text"
              className="p-1 bg-white border-2 rounded-md"
              value={problem?.otherComplaints}
              onChange={(e) => {
                setProblem((prev) => ({
                  ...prev,
                  otherComplaints: e.target.value,
                }));
              }}
            >
              {otherComplaints.map((com, index) => (
                <option key={index} value={com}>
                  {com}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:w-1/3 w-1/4 grow">
            <label>Other Medical Conditions</label>
            <select
              placeholder="Enter patient's other medical complaints"
              maxLength={300}
              type="text"
              className="p-1 bg-white border-2 rounded-md"
              value={problem?.otherMedicalConditions}
              onChange={(e) => {
                setProblem((prev) => ({
                  ...prev,
                  otherMedicalConditions: e.target.value,
                }));
              }}
            >
              {otherMedicalConditions.map((com, index) => (
                <option key={index} value={com}>
                  {com}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:w-1/3 w-1/4 grow">
            <label>Old Problem</label>
            <input
              placeholder="Enter patient's other old complaints or Operations done"
              maxLength={300}
              type="text"
              className="p-1 bg-white border-2 rounded-md"
              value={problem?.oldComplaint}
              onChange={(e) => {
                setProblem((prev) => ({
                  ...prev,
                  oldComplaint: e.target.value,
                }));
              }}
            />
          </div>

          <div className="flex-shrink-0 w-full">
            <input
              className="flex gap-2 py-1 px-2 ml-auto bg-[#00286b] text-white font-semibold"
              type="submit"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default MedicalHistoryDetails;
