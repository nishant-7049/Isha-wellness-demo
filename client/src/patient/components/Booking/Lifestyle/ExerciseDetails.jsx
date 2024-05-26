import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const ExerciseDetails = ({
  lifestyle,
  setLifestyle,
  activeStatus,
  setActiveElement,
  setCompletedSections,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setCompletedSections((prev) => ({
      ...prev,
      "Exercise Details": true,
    }));
    setActiveElement("sleepDetails");
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
          setActiveElement("exerciseDetails");
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
          <h1 className="font-semibold">Exercise Details</h1>
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
          <div className="flex flex-col w-1/3 grow">
            <label>Are you doing any exercises? *</label>
            <select
              className="p-1 bg-white border-2 rounded-md"
              required
              value={lifestyle?.exerciseDetails?.doExercise}
              onChange={(e) => {
                let exerciseDetails = lifestyle?.exerciseDetails || {};
                exerciseDetails = {
                  ...exerciseDetails,
                  doExercise: e.target.value,
                };
                setLifestyle((prev) => ({
                  ...prev,
                  exerciseDetails,
                }));
              }}
            >
              <option value="">Choose</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {lifestyle?.exerciseDetails?.doExercise == "Yes" && (
            <div className="w-full flex flex-wrap gap-4">
              <div className="flex flex-col w-1/4 sm:w-1/3 grow">
                <label>What kind of exercise you do? *</label>
                <input
                  type="text"
                  maxLength={50}
                  placeholder="Enter type of patient's exercise"
                  className="p-1 bg-white border-2 rounded-md"
                  required
                  value={lifestyle?.exerciseDetails?.exercise}
                  onChange={(e) => {
                    let exerciseDetails = lifestyle?.exerciseDetails || {};
                    exerciseDetails = {
                      ...exerciseDetails,
                      exercise: e.target.value,
                    };
                    setLifestyle((prev) => ({
                      ...prev,
                      exerciseDetails,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col w-1/4 sm:w-1/3 grow">
                <label>How many times in a day? *</label>
                <input
                  type="number"
                  min={0}
                  max={5}
                  placeholder="Enter patient's exercise number per day"
                  className="p-1 bg-white border-2 rounded-md"
                  required
                  value={lifestyle?.exerciseDetails?.exercisePerDay}
                  onChange={(e) => {
                    let exerciseDetails = lifestyle?.exerciseDetails || {};
                    exerciseDetails = {
                      ...exerciseDetails,
                      exercisePerDay: e.target.value,
                    };
                    setLifestyle((prev) => ({
                      ...prev,
                      exerciseDetails,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col w-1/4 sm:w-1/3 grow">
                <label>How many times in a week? *</label>
                <input
                  type="number"
                  min={0}
                  max={40}
                  placeholder="Enter patient's exercise number per week"
                  className="p-1 bg-white border-2 rounded-md"
                  required
                  value={lifestyle?.exerciseDetails?.exercisePerWeek}
                  onChange={(e) => {
                    let exerciseDetails = lifestyle?.exerciseDetails || {};
                    exerciseDetails = {
                      ...exerciseDetails,
                      exercisePerWeek: e.target.value,
                    };
                    setLifestyle((prev) => ({
                      ...prev,
                      exerciseDetails,
                    }));
                  }}
                />
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

export default ExerciseDetails;
