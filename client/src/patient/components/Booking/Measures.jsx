import React, { useEffect, useState } from "react";
import Consent from "./Consent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateMeasures, clearError } from "../../../store/slices/bookingSlice";
import ErrorAlert from "../../../auth/ErrorAlert";
import { IoMdCheckmark } from "react-icons/io";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const Measures = ({ activeStatus, setActiveElement, setCompletedSections }) => {
  const [isActive, setIsActive] = useState();
  const [isCompleted, setIsCompleted] = useState(false);
  const { measures, error } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sugarLevel, setSugarLevel] = useState();
  const [sugar, setSugar] = useState("");
  const [bp, setBp] = useState("");
  const [bpLevel, setBpLevel] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      weight,
      height,
      sugar,
      sugarLevel,
      bp,
      bpLevel,
    };
    localStorage.setItem("measures", JSON.stringify(data));
    setCompletedSections((prev) => ({
      ...prev,
      Measures: true,
    }));
    setActiveElement("occupationDetails");
    setIsCompleted(true);
    dispatch(updateMeasures());
    // navigate("/book/lifestyle");
  };
  useEffect(() => {
    if (measures && measures.weight) {
      setWeight(measures.weight);
      setHeight(measures.height);
      setSugar(measures.sugar);
      setBp(measures.bp);
      setSugarLevel(measures?.sugarLevel);
      setBpLevel(measures.bpLevel);
    }
  }, [measures]);
  useEffect(() => {
    setIsActive(activeStatus);
  }, [activeStatus]);
  return (
    // <div
    //   className={`bg-[#00286b10] w-full min-h-screen flex justify-center items-center`}
    // >
    //   <Consent />
    // <div
    //   className={`w-3/5 min-h-[60vh] bg-white shadow-xl py-4 px-8 flex flex-col gap-4 sm:w-full sm:min-h-screen ${
    //     user?.role == "user" && !user?.isIncharge ? "sm:pt-20" : "sm:pt-8"
    //   }`}
    // >
    // <h1 className="text-xl font-semibold border-b-2 text-[#00286b] border-[#00286b]">
    //   Measures
    // </h1>
    <div className="flex flex-col gap-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => {
          setActiveElement("measures");
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
          <h1 className="font-semibold">Measures</h1>
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
            <label>Weight (kg) *</label>
            <input
              type="number"
              placeholder="Enter Patients weight in kgs."
              className="p-1 bg-white border-2 rounded-md"
              required
              min={0}
              max={300}
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col w-1/4 sm:w-1/3 grow">
            <label>Height (cm) *</label>
            <input
              type="number"
              placeholder="Enter Patients height in cms."
              className="p-1 bg-white border-2 rounded-md"
              required
              min={0}
              max={300}
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col w-1/4 sm:w-1/3 grow">
            <label>Sugar</label>
            <select
              className="p-1 bg-white border-2 rounded-md"
              value={sugar}
              onChange={(e) => {
                setSugar(e.target.value);
              }}
            >
              <option value="">Choose</option>
              <option value="RBS">RBS</option>
              <option value="FBS">FBS</option>
              <option value="PPBS">PPBS</option>
              <option value="HBA1C">HBA1C</option>
            </select>
          </div>
          <div className="flex flex-col w-1/4 sm:w-1/3 grow">
            <label>Sugar Level</label>
            <input
              type="number"
              min={0}
              max={300}
              placeholder="Enter patient's sugar level"
              className="p-1 bg-white border-2 rounded-md"
              value={sugarLevel}
              onChange={(e) => {
                setSugarLevel(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col w-1/3 sm:w-full flex-grow">
            <label>Blood Pressure</label>
            <select
              className="p-1 bg-white border-2 rounded-md"
              value={bp}
              onChange={(e) => {
                setBp(e.target.value);
              }}
            >
              <option value="">Choose</option>
              <option value="Normal">Normal (Below 120/80)</option>
              <option value="Elevated">
                Elevated (120 to 129/less than 80)
              </option>
              <option value="Stage 1 high blood pressure">
                Stage 1 high blood pressure (130 to 139/80 to 89)
              </option>
              <option value="Stage 2 high blood pressure">
                Stage 2 high blood pressure (140 and above/90 and above)
              </option>
              <option value="Hypertension Crisis">
                Hypertension Crisis (Above 180/above 120)
              </option>
            </select>
          </div>
          <div className="flex flex-col w-full flex-shrink-0">
            <label>Blood Pressure Level</label>
            <input
              placeholder="Enter blood pressure in this format (__/__)"
              className="p-1 bg-white border-2 rounded-md"
              value={bpLevel}
              onChange={(e) => {
                setBpLevel(e.target.value);
              }}
            />
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
//   </div>
//   <ErrorAlert message={error} alert clearError={clearError} />
// </div>
//   );
// };

export default Measures;
