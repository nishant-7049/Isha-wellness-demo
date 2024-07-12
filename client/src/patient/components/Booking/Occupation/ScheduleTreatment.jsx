import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPackages,
  getPackageDetail,
} from "../../../../store/slices/packageSlice";
import { setError } from "../../../../store/slices/bookingSlice";

const batchs = [
  {
    batch: "8:30-10:30",
    value: 3 * 60 * 60 * 1000,
  },
  {
    batch: "10:30-12:30",
    value: 5 * 60 * 60 * 1000,
  },
  {
    batch: "2:00-4:00",
    value: 8.5 * 60 * 60 * 1000,
  },
  {
    batch: "4:00-6:00",
    value: 10.5 * 60 * 60 * 1000,
  },
  {
    batch: "6:00-8:00",
    value: 12.5 * 60 * 60 * 1000,
  },
];

const ScheduleTreatment = ({
  activeStatus,
  setActiveElement,
  setCompletedSections,
  submitSchedule,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { packages, pac: pack } = useSelector((state) => state.package);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [batch, setBatch] = useState();
  const [pac, setPac] = useState();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const dateAndTime = new Date(date).getTime() + Number(batch);
    if (dateAndTime < Date.now() + 30 * 60 * 1000) {
      dispatch(
        setError("Selected date and time must have difference of half hour")
      );
      return;
    }
    if (pack) {
      const pacAndTime = {
        package: pack,
        dateAndTime,
      };
      localStorage.setItem("pacAndTime", JSON.stringify(pacAndTime));
      submitSchedule();
    }
    setCompletedSections((prev) => ({
      ...prev,
      "SchedData Treatment": true,
    }));
    setIsCompleted(true);
    submitSchedule();
  };
  useEffect(() => {
    if (!packages) {
      dispatch(getAllPackages());
    }
  }, []);
  useEffect(() => {
    setIsActive(activeStatus);
  }, [activeStatus]);
  useEffect(() => {
    if (pac) {
      dispatch(getPackageDetail(pac));
    }
  }, [pac]);

  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => {
          setActiveElement("scheduleTreatment");
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
          <h1 className="font-semibold">Schedule Treatment</h1>
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
          <div className="flex flex-col w-1/4 sm:w-1/3  grow">
            <label>Select Package (listed below) *</label>
            <select
              className="p-1 bg-white border-2 rounded-md"
              required
              value={pac}
              onChange={(e) => {
                setPac(e.target.value);
              }}
            >
              <option value="">Choose</option>
              {packages.map((pac) => (
                <option key={pac._id} value={pac._id}>
                  {pac.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-1/4 sm:w-1/3  grow">
            <label>Date of Treatment *</label>
            <input
              className="p-1 bg-white border-2 rounded-md"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(e) => {
                setDate(new Date(e.target.value).toISOString().split("T")[0]);
              }}
            />
          </div>
          <div className="flex flex-col w-1/4 sm:w-full grow">
            <label>Batch *</label>
            <select
              className="p-1 bg-white border-2 rounded-md"
              type="text"
              required
              min={new Date().toISOString().split("T")[0]}
              value={batch}
              onChange={(e) => {
                setBatch(e.target.value);
              }}
            >
              <option value="">Choose</option>
              {batchs.map((batch, index) => (
                <option value={batch.value} key={index}>
                  {batch.batch}
                </option>
              ))}
            </select>
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

export default ScheduleTreatment;
