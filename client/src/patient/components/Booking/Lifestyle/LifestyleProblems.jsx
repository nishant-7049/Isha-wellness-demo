import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const problems = [
  "Diabetes",
  "Hypertension",
  "Cardiac problem",
  "Indigestion",
  "Gas",
  "Acidity",
  "Asthma",
  "Prostate",
  "Hernia",
  "Overweight",
  "PCOD",
  "Thyroid",
  "Infertility",
  "Irregular periods",
  "Menopause",
  "Stress",
  "Depression/anxiety",
];

const LifestyleProblems = ({
  lifestyle,
  setLifestyle,
  activeStatus,
  setActiveElement,
  setCompletedSections,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lifesyleProblem, setLifestyleProblem] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    setCompletedSections((prev) => ({
      ...prev,
      "Lifestyle Problems": true,
    }));
    setActiveElement("dietDetails");
    setIsCompleted(true);
  };

  const includeObject = (value, list) => {
    for (let problem of list) {
      if (value == problem.problem) {
        return true;
      }
    }
    return false;
  };

  const multipleSelect = (value) => {
    if (includeObject(value, lifestyle?.problemInfo)) {
      const filteredArray = lifestyle.problemInfo.filter(
        (p) => p.problem !== value
      );
      setLifestyle((prev) => ({
        ...prev,
        problemInfo: filteredArray,
      }));
    } else {
      setLifestyle((prev) => ({
        ...prev,
        problemInfo: [...lifestyle.problemInfo, { problem: value }],
      }));
    }
  };
  useEffect(() => {
    if (!lifestyle?.problemInfo) {
      setLifestyle((prev) => ({
        ...prev,
        problemInfo: [],
      }));
    }
  }, []);
  useEffect(() => {
    setIsActive(activeStatus);
  }, [activeStatus]);
  useEffect(() => {
    if (lifestyle?.problemInfo) {
      const tempArray = [];
      for (let value of lifestyle?.problemInfo) {
        tempArray.push(value.problem);
      }
      setLifestyleProblem(tempArray);
    }
  }, [lifestyle]);
  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => {
          setActiveElement("lifestyleProblems");
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
            {isCompleted ? <IoMdCheckmark /> : 1}
          </div>
          <h1 className="font-semibold">Lifestyle Problems</h1>
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
          <div className="flex flex-col w-full">
            <label>Lifestyle Problems</label>
            <select
              className="p-1 bg-white border-2 rounded-md"
              multiple
              value={lifesyleProblem}
              onChange={() => {}}
            >
              <option value="">Choose</option>
              {problems.map((problem, index) => (
                <option
                  value={problem}
                  key={index}
                  onClick={(e) => {
                    multipleSelect(e.target.value);
                  }}
                >
                  {problem}
                </option>
              ))}
            </select>
          </div>
          {lifesyleProblem?.map((problem, index) => (
            <div key={index} className="w-full flex flex-wrap gap-4">
              <h1 className="w-full">{problem} Details </h1>
              <div className="flex flex-col w-1/4 grow">
                <label>Since When (months) *</label>
                <input
                  className="p-1 bg-white border-2 rounded-md"
                  type="number"
                  min={0}
                  required
                  placeholder="Since when have you been feeling this problem? (in months) "
                  value={lifestyle?.problemInfo[index]?.sinceWhen}
                  onChange={(e) => {
                    setLifestyle((prev) => {
                      const updatedProblemInfo =
                        [...lifestyle?.problemInfo] || [];
                      updatedProblemInfo[index] = {
                        ...updatedProblemInfo[index],
                        sinceWhen: e.target.value,
                      };
                      return { ...prev, problemInfo: updatedProblemInfo };
                    });
                  }}
                />
              </div>
              <div className="flex flex-col w-1/4 grow">
                <label>On Medication*</label>
                <select
                  className="p-1 bg-white border-2 rounded-md"
                  required
                  value={lifestyle?.problemInfo[index]?.onMedication}
                  onChange={(e) => {
                    setLifestyle((prev) => {
                      const updatedProblemInfo =
                        [...lifestyle?.problemInfo] || [];
                      updatedProblemInfo[index] = {
                        ...updatedProblemInfo[index],
                        onMedication: e.target.value,
                      };
                      return { ...prev, problemInfo: updatedProblemInfo };
                    });
                  }}
                >
                  <option value="">Choose</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="flex flex-col w-1/4 sm:w-full grow">
                <label>Cause *</label>
                <input
                  className="p-1 bg-white border-2 rounded-md"
                  type="text"
                  required
                  placeholder="Enter cause of problem "
                  value={lifestyle?.problemInfo[index]?.cause}
                  onChange={(e) => {
                    setLifestyle((prev) => {
                      const updatedProblemInfo =
                        [...lifestyle?.problemInfo] || [];
                      console.log(updatedProblemInfo[index]);
                      updatedProblemInfo[index] = {
                        ...updatedProblemInfo[index],
                        cause: e.target.value,
                      };
                      return { ...prev, problemInfo: updatedProblemInfo };
                    });
                  }}
                />
              </div>
            </div>
          ))}

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

export default LifestyleProblems;
