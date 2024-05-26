import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const allHabits = [
  "Smoking",
  "Chewing tobacco",
  "Drink",
  "Pan-masala",
  "Supari",
  "Nothing",
];

const HabitDetails = ({
  lifestyle,
  setLifestyle,
  activeStatus,
  setActiveElement,
  formSubmitHandler,
  setCompletedSections,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [otherHabit, setOtherHabit] = useState("");

  const multipleSelect = (value) => {
    let habits = lifestyle?.habits || [];
    if (habits.includes(value)) {
      const tempHabits = habits.filter((h) => h !== value);
      habits = tempHabits;
    } else {
      habits.push(value);
    }
    setLifestyle((prev) => ({
      ...prev,
      habits,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setCompletedSections((prev) => ({
      ...prev,
      "Habit Details": true,
    }));
    setIsCompleted(true);
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
          setActiveElement("habitDetails");
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
          <h1 className="font-semibold">Habit Details</h1>
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
            <label>Select your habits *</label>
            <select
              multiple
              className="p-1 bg-white border-2 rounded-md"
              required
              value={lifestyle?.habits}
              onChange={() => {}}
            >
              {allHabits.map((habit, index) => (
                <option
                  key={index}
                  value={habit}
                  onClick={(e) => {
                    multipleSelect(e.target.value);
                  }}
                >
                  {habit}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full grow">
            <label>Enter your habits </label>
            <input
              className="p-1 bg-white border-2 rounded-md"
              maxLength={50}
              placeholder="Enter patient's habit if not included"
              value={otherHabit}
              onChange={(e) => {
                setOtherHabit(e.target.value);
              }}
            />
            <button
              type="button"
              className="text-white font-semibold bg-[#00286b] w-fit px-2 py-1 mx-auto mt-2"
              onClick={() => {
                allHabits.push(otherHabit);
                const habits = lifestyle?.habits || [];
                habits.unshift(otherHabit);
                setLifestyle((prev) => ({
                  ...prev,
                  habits,
                }));
              }}
            >
              Include
            </button>
          </div>

          <div className="flex-shrink-0 w-full">
            <button
              className="flex gap-2 py-1 px-2 ml-auto bg-[#00286b] text-white font-semibold"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default HabitDetails;
