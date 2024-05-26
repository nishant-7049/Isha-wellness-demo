import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const DietDetails = ({
  lifestyle,
  setLifestyle,
  activeStatus,
  setActiveElement,
  setCompletedSections,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const changeTime = (e, foodType) => {
    let tempObject = lifestyle?.foodDetails?.foodTime || {};
    let value = e.target.value.replace(/[^0-9]/g, "");
    let hours = value.slice(0, 2);
    if (hours > 24) hours = 24;
    let minutes = value.slice(2);
    if (minutes > 60) minutes = 60;
    let formattedValue = hours + (minutes.length ? ":" : "") + minutes;

    tempObject[foodType] = formattedValue;
    let foodDetails = lifestyle?.foodDetails || {};
    foodDetails = {
      ...foodDetails,
      foodTime: tempObject,
    };
    setLifestyle((prev) => ({
      ...prev,
      foodDetails,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setCompletedSections((prev) => ({
      ...prev,
      "Diet Details": true,
    }));
    setActiveElement("exerciseDetails");
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
          setActiveElement("dietDetails");
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
          <h1 className="font-semibold">Diet Details</h1>
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
            <label>Do you take healthy diet? *</label>
            <select
              className="p-1 bg-white border-2 rounded-md"
              required
              value={lifestyle?.foodDetails?.healthyDiet}
              onChange={(e) => {
                let tempObject = lifestyle?.foodDetails || {};
                tempObject = {
                  ...tempObject,
                  healthyDiet: e.target.value,
                };
                setLifestyle((prev) => ({
                  ...prev,
                  foodDetails: tempObject,
                }));
              }}
            >
              <option value="">Choose</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex flex-col w-1/3 grow">
            <label>Do you get tea empty stomach? *</label>
            <select
              className="p-1 bg-white border-2 rounded-md"
              required
              value={lifestyle?.foodDetails?.emptyStomach}
              onChange={(e) => {
                let tempObject = lifestyle?.foodDetails || {};
                tempObject = {
                  ...tempObject,
                  emptyStomach: e.target.value,
                };
                setLifestyle((prev) => ({
                  ...prev,
                  foodDetails: tempObject,
                }));
              }}
            >
              <option value="">Choose</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Do you do breakfast? *</label>
            <select
              className="p-1 bg-white border-2 rounded-md"
              required
              value={lifestyle?.foodDetails?.doBreakfast}
              onChange={(e) => {
                let tempObject = lifestyle?.foodDetails || {};
                tempObject = {
                  ...tempObject,
                  doBreakfast: e.target.value,
                };
                setLifestyle((prev) => ({
                  ...prev,
                  foodDetails: tempObject,
                }));
              }}
            >
              <option value="">Choose</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="w-full">
            <h2>Diet Timing:</h2>
            <div className="flex flex-wrap gap-4">
              {lifestyle?.foodDetails?.doBreakfast == "Yes" && (
                <div className="flex flex-col w-1/4 sm:w-1/3 grow">
                  <label>Breakfast Time *</label>
                  <input
                    type="text"
                    maxLength={5}
                    minLength={5}
                    required
                    placeholder="Enter patient's breakfast time (hhmm)"
                    value={lifestyle?.foodDetails?.foodTime?.breakfastTime}
                    onChange={(e) => {
                      changeTime(e, "breakfastTime");
                    }}
                    className="p-1 bg-white border-2 rounded-md"
                  />
                </div>
              )}
              <div className="flex flex-col w-1/4 sm:w-1/3 grow">
                <label>Lunch Time *</label>
                <input
                  type="text"
                  maxLength={5}
                  minLength={5}
                  required
                  placeholder="Enter patient's lunch time (hhmm)"
                  value={lifestyle?.foodDetails?.foodTime?.lunchTime}
                  onChange={(e) => {
                    changeTime(e, "lunchTime");
                  }}
                  className="p-1 bg-white border-2 rounded-md"
                />
              </div>
              <div className="flex flex-col w-1/4 sm:w-1/3 grow">
                <label>Dinner Time *</label>
                <input
                  type="text"
                  maxLength={5}
                  minLength={5}
                  required
                  placeholder="Enter patient's dinner time (hhmm)"
                  value={lifestyle?.foodDetails?.foodTime?.dinnerTime}
                  onChange={(e) => {
                    changeTime(e, "dinnerTime");
                  }}
                  className="p-1 bg-white border-2 rounded-md"
                />
              </div>
            </div>
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

export default DietDetails;
