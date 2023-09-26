import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImBin } from "react-icons/im";
import { updateTreatmentExercise } from "../../store/slices/treatmentSlice";

const SingleExercise = ({ exercise, exercises, id }) => {
  const dispatch = useDispatch();
  const { treatments } = useSelector((state) => state.treatment);
  const e = exercises.filter((f) => {
    return f._id == exercise.exercise;
  });
  const deleteExercise = () => {
    const treatment = treatments.filter((treat) => {
      return treat._id == id;
    });
    let ex = [...treatment[0].exercises];
    ex = ex.filter((exe) => {
      return exe._id != exercise._id;
    });
    const options = {
      id: id,
      exercises: ex,
    };
    dispatch(updateTreatmentExercise(options));
  };
  return (
    <div className="flex justify-between w-4/5 mx-auto items-center">
      <img className="w-1/5" src={e[0].gif.url} alt="" />
      <p>{e[0].name}</p>
      <p>{`${exercise.duration.min}m ${exercise.duration.sec}s`}</p>
      <button onClick={deleteExercise}>
        <ImBin className="text-red-700 text-lg" />
      </button>
    </div>
  );
};

export default SingleExercise;
