import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const SleepDetails = ({
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
      "Stress Details": true,
    }));
    setActiveElement("habitDetails");
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
          setActiveElement("stressDetails");
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
            {isCompleted ? <IoMdCheckmark /> : 5}
          </div>
          <h1 className="font-semibold">Stress Details</h1>
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
          <div className="flex flex-col w-full grow">
            <label>Are you overthinker? *</label>
            <select
              className="p-1 bg-white border-2 rounded-md"
              required
              value={lifestyle?.stressDetails?.thinker}
              onChange={(e) => {
                let stressDetails = lifestyle?.stressDetails || {};
                stressDetails = {
                  ...stressDetails,
                  thinker: e.target.value,
                };
                setLifestyle((prev) => ({
                  ...prev,
                  stressDetails,
                }));
              }}
            >
              <option value="">Choose</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex flex-col w-1/4 sm:w-1/3 grow">
            <label>Rate your thinking *</label>
            <input
              className="p-1 bg-white border-2 rounded-md"
              type="number"
              min={0}
              max={10}
              required
              placeholder="Enter patient's thinking rate 0(low)-10(high)"
              value={lifestyle?.stressDetails?.thinkingRate}
              onChange={(e) => {
                let stressDetails = lifestyle?.stressDetails || {};
                stressDetails = {
                  ...stressDetails,
                  thinkingRate: e.target.value,
                };
                setLifestyle((prev) => ({
                  ...prev,
                  stressDetails,
                }));
              }}
            />
          </div>
          <div className="flex flex-col w-1/4 sm:w-1/3 grow">
            <label>Rate your stress *</label>
            <input
              className="p-1 bg-white border-2 rounded-md"
              type="number"
              min={0}
              max={10}
              required
              placeholder="Enter patient's stress rate 0(low)-10(high)"
              value={lifestyle?.stressDetails?.stressRate}
              onChange={(e) => {
                let stressDetails = lifestyle?.stressDetails || {};
                stressDetails = {
                  ...stressDetails,
                  stressRate: e.target.value,
                };
                setLifestyle((prev) => ({
                  ...prev,
                  stressDetails,
                }));
              }}
            />
          </div>
          <div className="flex flex-col w-1/4 sm:w-1/3 grow">
            <label>What kind of/Which thought/occasion disturb you a lot</label>
            <input
              className="p-1 bg-white border-2 rounded-md"
              type="text"
              maxLength={100}
              placeholder="Enter patient's stress enhancer"
              value={lifestyle?.stressDetails?.disturbanceCause}
              onChange={(e) => {
                let stressDetails = lifestyle?.stressDetails || {};
                stressDetails = {
                  ...stressDetails,
                  disturbanceCause: e.target.value,
                };
                setLifestyle((prev) => ({
                  ...prev,
                  stressDetails,
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

export default SleepDetails;
