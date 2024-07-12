import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const occupations = [
  "Business",
  "Government Employee",
  "Private Employee",
  "Daily Wage Worker (Other than farm labour)",
  "Farm Labour",
  "Farmer (Land Owner)",
  "Housewife",
  "Student",
  "Retired",
  "Other",
];

const works = [
  "Sitting",
  "Standing",
  "Walking",
  "Travel",
  "Weight Lifting",
  "Lying",
  "Other",
];

const OccupationDetails = ({
  occupation,
  setOccupation,
  activeStatus,
  setActiveElement,
  submitOccupation,
  setCompletedSections,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setCompletedSections((prev) => ({
      ...prev,
      "Occupation Details": true,
    }));
    setActiveElement("adminDetails");
    setIsCompleted(true);
    submitOccupation();
  };
  useEffect(() => {
    setIsActive(activeStatus);
  }, [activeStatus]);

  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => {
          setActiveElement("occupationDetails");
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
            {isCompleted ? <IoMdCheckmark /> : 2}
          </div>
          <h1 className="font-semibold">Occupation Details</h1>
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
          <div className="flex flex-col w-1/4  grow">
            <label>Occupation *</label>
            <select
              className="p-1 bg-white border-2 rounded-md"
              required
              value={occupation?.occupation}
              onChange={(e) => {
                setOccupation((prev) => ({
                  ...prev,
                  occupation: e.target.value,
                }));
              }}
            >
              <option value="">Choose</option>
              {occupations.map((occupation, index) => (
                <option key={index} value={occupation}>
                  {occupation}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-1/4  grow">
            <label>Type of Work *</label>
            <select
              className="p-1 bg-white border-2 rounded-md"
              required
              value={occupation?.work}
              onChange={(e) => {
                setOccupation((prev) => ({
                  ...prev,
                  work: e.target.value,
                }));
              }}
            >
              <option value="">Choose</option>
              {works.map((work, index) => (
                <option key={index} value={work}>
                  {work}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-1/4 sm:w-full grow">
            <label>Work experience (in months) *</label>
            <input
              type="number"
              min={0}
              max={1000}
              placeholder="Enter patient's work experience"
              className="p-1 bg-white border-2 rounded-md"
              required
              value={occupation?.experience}
              onChange={(e) => {
                setOccupation((prev) => ({
                  ...prev,
                  experience: e.target.value,
                }));
              }}
            />
          </div>

          <div className="flex-shrink-0 w-full">
            <button
              className="flex gap-2 py-1 px-2 ml-auto bg-[#00286b] text-white font-semibold"
              type="submit"
            >
              Next
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default OccupationDetails;
