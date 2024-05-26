import React, { useEffect, useState } from "react";
import Consent from "./Consent";
import LifestyleProblems from "./Lifestyle/LifestyleProblems";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateLifestyleAndHabits,
  clearError,
  setError,
} from "../../../store/slices/bookingSlice";
import ErrorAlert from "../../../auth/ErrorAlert";
import DietDetails from "./Lifestyle/DietDetails";
import ExerciseDetails from "./Lifestyle/ExerciseDetails";
import SleepDetails from "./Lifestyle/SleepDetails";
import StressDetails from "./Lifestyle/StressDetails";
import HabitDetails from "./Lifestyle/HabitDetails";

const Lifestyle = () => {
  const [lifestyle, setLifestyle] = useState({});
  const [activeElement, setActiveElement] = useState("lifestyleProblems");
  const { user } = useSelector((state) => state.user);
  const [completedSections, setCompletedSections] = useState({
    "Lifestyle Problems": false,
    "Diet Details": false,
    "Exercise Details": false,
    "Sleep Details": false,
    "Stress Details": false,
  });
  const { lifestyleAndHabits, error } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    for (let section in completedSections) {
      if (!completedSections[section]) {
        dispatch(setError(`${section} is not completely filled`));
        return;
      }
    }
    localStorage.setItem("lifestyleAndHabits", JSON.stringify(lifestyle));
    dispatch(updateLifestyleAndHabits());
    navigate("/book/occupation");
  };

  useEffect(() => {
    if (lifestyleAndHabits) {
      setLifestyle(lifestyleAndHabits);
    }
  }, [lifestyleAndHabits]);

  return (
    <div
      className={`bg-[#00286b10] w-full min-h-screen flex justify-center items-center`}
    >
      <Consent />
      <div
        className={`w-3/5 min-h-[60vh] bg-white shadow-xl py-4 px-8 flex flex-col gap-4 sm:w-full sm:min-h-screen ${
          !user || (user?.role == "user" && !user?.isIncharge)
            ? "sm:pt-20"
            : "sm:pt-8"
        }`}
      >
        <h1 className="text-xl font-semibold border-b-2 text-[#00286b] border-[#00286b]">
          Lifestyle And Habits
        </h1>
        <LifestyleProblems
          setActiveElement={setActiveElement}
          activeStatus={activeElement == "lifestyleProblems"}
          lifestyle={lifestyle}
          setLifestyle={setLifestyle}
          setCompletedSections={setCompletedSections}
        />
        <DietDetails
          setActiveElement={setActiveElement}
          activeStatus={activeElement == "dietDetails"}
          lifestyle={lifestyle}
          setLifestyle={setLifestyle}
          setCompletedSections={setCompletedSections}
        />
        <ExerciseDetails
          setActiveElement={setActiveElement}
          activeStatus={activeElement == "exerciseDetails"}
          lifestyle={lifestyle}
          setLifestyle={setLifestyle}
          setCompletedSections={setCompletedSections}
        />
        <SleepDetails
          setActiveElement={setActiveElement}
          activeStatus={activeElement == "sleepDetails"}
          lifestyle={lifestyle}
          setLifestyle={setLifestyle}
          setCompletedSections={setCompletedSections}
        />
        <StressDetails
          setActiveElement={setActiveElement}
          activeStatus={activeElement == "stressDetails"}
          lifestyle={lifestyle}
          setLifestyle={setLifestyle}
          setCompletedSections={setCompletedSections}
        />
        <HabitDetails
          setActiveElement={setActiveElement}
          activeStatus={activeElement == "habitDetails"}
          lifestyle={lifestyle}
          setLifestyle={setLifestyle}
          setCompletedSections={setCompletedSections}
          formSubmitHandler={handleSubmit}
        />
      </div>
      <ErrorAlert message={error} alert clearError={clearError} />
    </div>
  );
};

export default Lifestyle;
