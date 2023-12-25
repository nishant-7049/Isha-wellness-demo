import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImBin } from "react-icons/im";
import { updateTreatmentExercise } from "../../store/slices/treatmentSlice";

const SingleExercise = ({ exercise, exercises, id }) => {
  const dispatch = useDispatch();
  const { treatments } = useSelector((state) => state.treatment);
  const e =
    exercises &&
    exercises.filter((f) => {
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
  const { user } = useSelector((state) => state.user);
  return (
    <div className="flex justify-between w-4/5 mx-auto items-center sm:w-full  sm:px-1">
      <img className="w-1/6" src={e && e[0].gif.url} alt="" />
      <p className="w-1/6 text-center">{e && e[0].name}</p>
      <p className="w-1/6 text-center">{e && e[0].reps}</p>
      <p className="w-1/6 text-center">{`${exercise.duration.min}m ${exercise.duration.sec}s`}</p>
      {user && user.role == "therapist" && (
        <div className="w-1/6 flex justify-center">
          <ImBin
            className="text-red-700 text-lg cursor-pointer"
            onClick={deleteExercise}
          />
        </div>
      )}
    </div>
  );
};

export default SingleExercise;
