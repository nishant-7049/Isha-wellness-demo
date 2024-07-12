import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

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

const paralysisCauses = [
  "Spinal Cord Injury",
  "Brain Haemorrhage",
  "Ischemia",
  "Other",
];
const inputForProblem = {
  cause: [
    "Pain",
    "Parasthesia",
    "Stiffness",
    "Headache",
    "Migraine",
    "Vertigo",
    "Motion Sickness",
    "Multiple sclerosis",
    "Paralysis",
  ],
  inv: [
    "Pain",
    "Parasthesia",
    "Stiffness",
    "Headache",
    "Migraine",
    "Vertigo",
    "Motion Sickness",
    "Multiple sclerosis",
  ],
};

const AdditionalDetails = ({
  activeStatus,
  setActiveElement,
  problem,
  setProblem,
  setCompletedSections,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const multipleSelect = (value, field) => {
    if (problem?.[field]?.includes(value)) {
      const filteredArray = problem?.[field]?.filter((p) => p !== value);
      setProblem((prev) => {
        const temp = { ...prev };
        temp[field] = filteredArray;
        return temp;
      });
    } else {
      setProblem((prev) => {
        const temp = {
          ...prev,
        };
        temp[field] = [...(problem?.[field] || []), value];
        return temp;
      });
    }
    console.log(problem);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      problem?.problem == "Multiple sclerosis" ||
      problem?.problem == "Paralysis"
    ) {
      setActiveElement("patientFunctionality");
    } else {
      setActiveElement("medicalHistoryDetails");
    }
    setCompletedSections((prev) => ({
      ...prev,
      "Additional Details": true,
    }));
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
          setActiveElement("additionalDetails");
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
            {isCompleted ? <IoMdCheckmark /> : 4}
          </div>
          <h1 className="font-semibold">Additional Details</h1>
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
          {inputForProblem.cause.includes(problem?.problem) &&
          problem?.problem == "Paralysis" ? (
            <div className="flex flex-col sm:w-1/3 w-1/4 grow">
              <label>Cause *</label>
              <select
                className="p-1 bg-white border-2 rounded-md"
                value={problem?.cause}
                required
                onChange={(e) => {
                  setProblem((prev) => ({
                    ...prev,
                    cause: e.target.value,
                  }));
                }}
              >
                <option value="">Choose</option>
                {paralysisCauses.map((cause, index) => (
                  <option value={cause} key={index}>
                    {cause}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex flex-col sm:w-1/3 w-1/4 grow">
              <label>What Increases your problem? *</label>
              <div
                className="p-1 bg-white border-2 rounded-md h-24 overflow-y-auto"
                multiple
                required
              >
                <option value="">Choose</option>
                {causes.map((cause, index) => (
                  <option
                    className={`${
                      problem?.cause?.includes(cause)
                        ? "bg-gray-400 text-white"
                        : ""
                    }`}
                    value={cause}
                    key={index}
                    onClick={(e) => {
                      multipleSelect(e.target.value, "cause");
                    }}
                  >
                    {cause}
                  </option>
                ))}
              </div>
            </div>
          )}
          {problem?.cause == "Other" && (
            <div className="flex flex-col sm:w-full w-1/4 grow">
              <label>Other cause *</label>
              <input
                maxLength={50}
                placeholder="Enter patient's cause if not available in cause."
                required
                type="text"
                className="p-1 bg-white border-2 rounded-md"
                value={problem?.otherCause}
                onChange={(e) => {
                  setProblem((prev) => ({
                    ...prev,
                    otherCause: e.target.value,
                  }));
                }}
              />
            </div>
          )}
          {inputForProblem.inv.includes(problem?.problem) && (
            <div className="flex flex-col sm:w-1/3 w-1/4 grow">
              <label>Investigations done *</label>
              <div
                className="p-1 bg-white border-2 rounded-md h-24 overflow-y-auto"
                required
              >
                <option value="">Choose</option>
                {investigations.map((investigation, index) => (
                  <option
                    className={`${
                      problem?.inv?.includes(investigation)
                        ? "bg-gray-400 text-white"
                        : ""
                    }`}
                    value={investigation}
                    key={index}
                    onClick={(e) => {
                      multipleSelect(e.target.value, "inv");
                    }}
                  >
                    {investigation}
                  </option>
                ))}
              </div>
            </div>
          )}

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

export default AdditionalDetails;
