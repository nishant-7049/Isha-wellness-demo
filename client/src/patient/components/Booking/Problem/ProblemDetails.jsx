import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

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
const sides = ["Left", "Right", "Bilateral", "Center"];
const aspects = ["Lateral", "Medial", "Anterior", "Posterior"];
const paralysisTypes = [
  "Quadriplegia",
  "Paraplegia",
  "Hemiplegia",
  "Monoplegia",
];

const inputForProblem = {
  part: ["Pain", "Parasthesia", "Stiffness", "Multiple sclerosis"],
  side: ["Pain", "Parasthesia", "Stiffness", "Multiple sclerosis"],
  aspect: ["Pain", "Parasthesia"],
  type: ["Paralysis"],
  psr: [
    "Pain",
    "Parasthesia",
    "Stiffness",
    "Headache",
    "Migraine",
    "Vertigo",
    "Motion Sickness",
    "Multiple sclerosis",
    "Paralysis",
    "Others",
  ],
};

const ProblemDetails = ({
  activeStatus,
  setActiveElement,
  problem,
  setProblem,
  setCompletedSections,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [problemDetails, setProblemDetails] = useState([]);
  const addNewPart = () => {
    const emptyProblemDetail = {};
    if (inputForProblem.part.includes(problem?.problem))
      emptyProblemDetail["part"] = "";
    if (inputForProblem.side.includes(problem?.problem))
      emptyProblemDetail["side"] = "";
    if (inputForProblem.aspect.includes(problem?.problem))
      emptyProblemDetail["aspect"] = "";
    if (inputForProblem.type.includes(problem?.problem))
      emptyProblemDetail["type"] = "";
    if (inputForProblem.psr.includes(problem?.problem))
      emptyProblemDetail["psr"] = undefined;
    setProblemDetails((prev) => [...prev, emptyProblemDetail]);
  };
  const deletePart = (index) => {
    if (problemDetails.length > 1) {
      const filteredDetails = problemDetails.filter((_, i) => i != index);
      setProblemDetails(filteredDetails);
    }
  };
  useEffect(() => {
    const emptyProblemDetail = {};
    if (inputForProblem.part.includes(problem?.problem))
      emptyProblemDetail["part"] = "";
    if (inputForProblem.side.includes(problem?.problem))
      emptyProblemDetail["side"] = "";
    if (inputForProblem.aspect.includes(problem?.problem))
      emptyProblemDetail["aspect"] = "";
    if (inputForProblem.type.includes(problem?.problem))
      emptyProblemDetail["type"] = "";
    if (inputForProblem.psr.includes(problem?.problem))
      emptyProblemDetail["psr"] = undefined;
    setProblemDetails([{ ...emptyProblemDetail }]);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setProblem((prev) => ({
      ...prev,
      details: problemDetails,
    }));
    setCompletedSections((prev) => ({
      ...prev,
      "Problem Details": true,
    }));
    setActiveElement("durationAndConsultation");
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
          setActiveElement("problemDetails");
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
          <h1 className="font-semibold">Problem Details</h1>
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
          {problemDetails?.map((details, index) => (
            <div className="w-full flex gap-4 flex-col">
              <div
                key={index}
                className="flex justify-center items-center flex-wrap gap-4 mx-auto w-full"
              >
                {inputForProblem.part.includes(problem?.problem) && (
                  <div className="flex flex-col sm:w-1/3 w-1/4 grow">
                    <label>Body Part *</label>
                    <select
                      className="p-1 bg-white border-2 rounded-md"
                      value={details?.part}
                      required
                      onChange={(e) => {
                        // setProblem((prev) => ({
                        //   ...prev,
                        //   part: e.target.value,
                        // }));
                        setProblemDetails((prev) => {
                          const tempArray = [...prev];
                          const tempObject = { ...tempArray[index] };
                          tempObject["part"] = e.target.value;
                          tempArray[index] = tempObject;
                          return tempArray;
                        });
                      }}
                    >
                      <option value="">Choose</option>
                      {parts.map((part, index) => (
                        <option value={part} key={index}>
                          {part}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {inputForProblem.side.includes(problem?.problem) && (
                  <div className="flex flex-col sm:w-1/3 w-1/4 grow">
                    <label>Body Side *</label>
                    <select
                      className="p-1 bg-white border-2 rounded-md"
                      value={details?.side}
                      required
                      onChange={(e) => {
                        setProblemDetails((prev) => {
                          const tempArray = [...prev];
                          const tempObject = { ...tempArray[index] };
                          tempObject["side"] = e.target.value;
                          tempArray[index] = tempObject;
                          return tempArray;
                        });
                      }}
                    >
                      <option value="">Choose</option>
                      {sides.map((side, index) => (
                        <option value={side} key={index}>
                          {side}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {inputForProblem.aspect.includes(problem?.problem) && (
                  <div className="flex flex-col sm:w-1/3 w-1/4 grow">
                    <label>Body Aspect *</label>
                    <select
                      className="p-1 bg-white border-2 rounded-md"
                      value={details?.aspect}
                      required
                      onChange={(e) => {
                        setProblemDetails((prev) => {
                          const tempArray = [...prev];
                          const tempObject = { ...tempArray[index] };
                          tempObject["aspect"] = e.target.value;
                          tempArray[index] = tempObject;
                          return tempArray;
                        });
                      }}
                    >
                      <option value="">Choose</option>
                      {aspects.map((aspect, index) => (
                        <option value={aspect} key={index}>
                          {aspect}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {inputForProblem.type.includes(problem?.problem) && (
                  <div className="flex flex-col w-1/3 grow">
                    <label>Type*</label>
                    <select
                      className="bg-white p-1 border-2 rounded-md"
                      required
                      value={details?.type}
                      onChange={(e) => {
                        setProblemDetails((prev) => {
                          const tempArray = [...prev];
                          const tempObject = { ...tempArray[index] };
                          tempObject["type"] = e.target.value;
                          tempArray[index] = tempObject;
                          return tempArray;
                        });
                      }}
                    >
                      <option value="">Choose</option>
                      {paralysisTypes.map((type, index) => (
                        <option value={type} key={index}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {problem?.problem == "Paralysis" &&
                  details?.type == "Hemiplegia" && (
                    <div className="flex flex-col w-1/3  grow">
                      <label>Hemiplegia Part *</label>
                      <select
                        className="bg-white p-1 border-2 rounded-md"
                        value={details?.part}
                        required
                        onChange={(e) => {
                          setProblemDetails((prev) => {
                            const tempArray = [...prev];
                            const tempObject = { ...tempArray[index] };
                            tempObject["part"] = e.target.value;
                            tempArray[index] = tempObject;
                            return tempArray;
                          });
                        }}
                      >
                        <option value="">Choose</option>
                        <option value="Left">Left</option>
                        <option value="Right">Right</option>
                      </select>
                    </div>
                  )}
                {problem?.problem == "Paralysis" &&
                  details?.type == "Monoplegia" && (
                    <div className="flex flex-col w-1/3  grow">
                      <label className="label-head">Monoplegia Part *</label>
                      <select
                        className="bg-white p-1 border-2 rounded-md"
                        value={details?.part}
                        onChange={(e) => {
                          setProblemDetails((prev) => {
                            const tempArray = [...prev];
                            const tempObject = { ...tempArray[index] };
                            tempObject["part"] = e.target.value;
                            tempArray[index] = tempObject;
                            return tempArray;
                          });
                        }}
                      >
                        <option value="">Choose</option>
                        <option value="Left Lower limb">Left Lower limb</option>
                        <option value="Left Upper limb">Left Upper limb</option>
                        <option value="Right Lower limb">
                          Right Lower limb
                        </option>
                        <option value="Right Upper limb">
                          Right Upper limb
                        </option>
                      </select>
                    </div>
                  )}
                {inputForProblem.psr.includes(problem?.problem) && (
                  <div className="flex flex-col w-1/3 sm:w-full  grow">
                    <label>PSR *</label>
                    <input
                      min={0}
                      max={10}
                      className="p-1 bg-white border-2 rounded-md"
                      type="number"
                      value={details?.psr}
                      onChange={(e) => {
                        setProblemDetails((prev) => {
                          const tempArray = [...prev];
                          const tempObject = { ...tempArray[index] };
                          tempObject["psr"] = e.target.value;
                          tempArray[index] = tempObject;
                          return tempArray;
                        });
                      }}
                      placeholder="Enter patient's pain level 0(lowest)-10(highest)"
                    />
                  </div>
                )}

                {problem?.problem == "Others" && (
                  <div className="flex flex-col w-1/3 sm:w-full  grow">
                    <label>Problem Description *</label>
                    <input
                      maxLength={400}
                      className="p-1 bg-white border-2 rounded-md"
                      type="text"
                      value={problem?.description}
                      onChange={(e) => {
                        setProblem((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }));
                      }}
                      placeholder="Enter patient's problem description"
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-4 justify-end">
                {index == problemDetails.length - 1 && (
                  <button
                    className=" py-1 px-2  bg-[#1CB91C]  text-white font-semibold"
                    type="button"
                    onClick={addNewPart}
                  >
                    Add
                  </button>
                )}
                <button
                  className=" py-1 px-2 bg-red-700  text-white font-semibold"
                  type="button"
                  onClick={() => {
                    deletePart(index);
                  }}
                >
                  Remove
                </button>
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

export default ProblemDetails;
