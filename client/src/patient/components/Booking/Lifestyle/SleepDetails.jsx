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

  const changeTime = (e, type) => {
    let tempObject = lifestyle?.sleepDetails || {};
    let value = e.target.value.replace(/[^0-9]/g, "");
    let hours = value.slice(0, 2);
    if (hours > 24) hours = 24;
    let minutes = value.slice(2);
    if (minutes > 60) minutes = 60;
    let formattedValue = hours + (minutes.length ? ":" : "") + minutes;

    tempObject[type] = formattedValue;

    setLifestyle((prev) => ({
      ...prev,
      sleepDetails: tempObject,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setCompletedSections((prev) => ({
      ...prev,
      "Sleep Details": true,
    }));
    setActiveElement("stressDetails");
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
          setActiveElement("sleepDetails");
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
          <h1 className="font-semibold">Sleep Details</h1>
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
          <div className="flex flex-col w-1/4 sm:w-1/3 grow">
            <label>Do you get proper sleep? *</label>
            <select
              className="p-1 bg-white border-2 rounded-md"
              required
              value={lifestyle?.sleepDetails?.properSleep}
              onChange={(e) => {
                let sleepDetails = lifestyle?.sleepDetails || {};
                sleepDetails = {
                  ...sleepDetails,
                  properSleep: e.target.value,
                };
                setLifestyle((prev) => ({
                  ...prev,
                  sleepDetails,
                }));
              }}
            >
              <option value="">Choose</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex flex-col w-1/4 sm:w-1/3 grow">
            <label>At what time do you sleep? *</label>
            <input
              className="p-1 bg-white border-2 rounded-md"
              type="text"
              placeholder="Enter patient's sleep time (hhmm)"
              required
              value={lifestyle?.sleepDetails?.sleepTime}
              onChange={(e) => {
                changeTime(e, "sleepTime");
              }}
            />
          </div>
          <div className="flex flex-col w-1/4 sm:w-1/3 grow">
            <label>At what time do you wake? *</label>
            <input
              className="p-1 bg-white border-2 rounded-md"
              type="text"
              placeholder="Enter patient's wake time (hhmm)"
              required
              value={lifestyle?.sleepDetails?.wakeTime}
              onChange={(e) => {
                changeTime(e, "wakeTime");
              }}
            />
          </div>
          <div className="flex flex-col w-1/4 sm:w-1/3 grow">
            <label>Average Sleep hours *</label>
            <input
              className="p-1 bg-white border-2 rounded-md"
              type="number"
              min={0}
              max={24}
              placeholder="Enter patient's average sleep hour"
              required
              value={lifestyle?.sleepDetails?.sleepHour}
              onChange={(e) => {
                const sleepDetails = lifestyle?.sleepDetails;
                sleepDetails["sleepHour"] = e.target.value;
                setLifestyle((prev) => ({
                  ...prev,
                  sleepDetails,
                }));
              }}
            />
          </div>
          <div className="flex flex-col w-1/4 sm:w-1/3 grow">
            <label>Average Sitting hours *</label>
            <input
              className="p-1 bg-white border-2 rounded-md"
              type="number"
              min={0}
              max={24}
              placeholder="Enter patient's average sitting hour"
              required
              value={lifestyle?.sleepDetails?.sittingHour}
              onChange={(e) => {
                const sleepDetails = lifestyle?.sleepDetails;
                sleepDetails["sittingHour"] = e.target.value;
                setLifestyle((prev) => ({
                  ...prev,
                  sleepDetails,
                }));
              }}
            />
          </div>
          <div className="flex flex-col w-1/4 sm:w-1/3 grow">
            <label>Average hours spend on mobile screen *</label>
            <input
              className="p-1 bg-white border-2 rounded-md"
              type="number"
              min={0}
              max={24}
              placeholder="Enter patient's average hours of mobile screen"
              required
              value={lifestyle?.sleepDetails?.mobileScreenHour}
              onChange={(e) => {
                const sleepDetails = lifestyle?.sleepDetails;
                sleepDetails["mobileScreenHour"] = e.target.value;
                setLifestyle((prev) => ({
                  ...prev,
                  sleepDetails,
                }));
              }}
            />
          </div>
          <div className="flex flex-col w-1/4 sm:w-1/3 grow">
            <label>Average hours spend on TV screen *</label>
            <input
              className="p-1 bg-white border-2 rounded-md"
              type="number"
              min={0}
              max={24}
              placeholder="Enter patient's average hours of tv screen"
              required
              value={lifestyle?.sleepDetails?.tvScreenHour}
              onChange={(e) => {
                const sleepDetails = lifestyle?.sleepDetails;
                sleepDetails["tvScreenHour"] = e.target.value;
                setLifestyle((prev) => ({
                  ...prev,
                  sleepDetails,
                }));
              }}
            />
          </div>
          <div className="flex flex-col w-1/4 sm:w-1/3 grow">
            <label>Average hours spend on Computer/Laptop screen *</label>
            <input
              className="p-1 bg-white border-2 rounded-md"
              type="number"
              min={0}
              max={24}
              placeholder="Enter patient's average hours of computer screen"
              required
              value={lifestyle?.sleepDetails?.compuerScreenHour}
              onChange={(e) => {
                const sleepDetails = lifestyle?.sleepDetails;
                sleepDetails["compuerScreenHour"] = e.target.value;
                setLifestyle((prev) => ({
                  ...prev,
                  sleepDetails,
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
