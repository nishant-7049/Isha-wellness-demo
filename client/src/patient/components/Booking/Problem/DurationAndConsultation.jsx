import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const sinces = ["Days", "Months", "Years"];

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

const DurationAndConsultation = ({
  activeStatus,
  setActiveElement,
  problem,
  setProblem,
  setCompletedSections,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setCompletedSections((prev) => ({
      ...prev,
      "Duration And Consultation": true,
    }));
    setActiveElement("additionalDetails");
    setIsCompleted(true);
  };
  useEffect(() => {
    setIsActive(activeStatus);
  }, [activeStatus]);
  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => {
          setActiveElement("durationAndConsultation");
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
            {isCompleted ? <IoMdCheckmark /> : 3}
          </div>
          <h1 className="font-semibold">Duration and Consultation</h1>
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
          {/* {inputForProblem.part.includes(problem) && */}
          <div className="flex flex-col sm:w-1/3 w-1/4 grow">
            <label>Since When *</label>
            <select
              className="p-1 bg-white border-2 rounded-md"
              value={problem?.since}
              required
              onChange={(e) => {
                setProblem((prev) => ({
                  ...prev,
                  since: e.target.value,
                }));
              }}
            >
              <option value="">Choose</option>
              {sinces.map((since, index) => (
                <option value={since} key={index}>
                  {since}
                </option>
              ))}
            </select>
          </div>
          {/* } */}
          {problem?.since && (
            <div className="flex flex-col sm:w-1/3 w-1/4 grow">
              <label>Since When (in {problem?.since})*</label>
              <input
                type="number"
                min={0}
                max={100}
                placeholder={`Enter in number from how many ${problem?.since} are you having problem`}
                className="p-1 bg-white border-2 rounded-md"
                value={problem?.sinceNumbers}
                required
                onChange={(e) => {
                  setProblem((prev) => ({
                    ...prev,
                    sinceNumbers: e.target.value,
                  }));
                }}
              />
            </div>
          )}

          <div className="flex flex-col sm:w-1/3 w-1/4 grow">
            <label>Consulted Before *</label>
            <select
              className="p-1 bg-white border-2 rounded-md"
              value={problem?.consult}
              required
              onChange={(e) => {
                setProblem((prev) => ({
                  ...prev,
                  consult: e.target.value,
                }));
              }}
            >
              <option value="">Choose</option>
              {consulted.map((consult, index) => (
                <option value={consult} key={index}>
                  {consult}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-shrink-0 w-full">
            <input
              className="flex gap-2 py-1 px-2 ml-auto bg-[#00286b] text-white font-semibold"
              type="submit"
              value={"Next"}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default DurationAndConsultation;
