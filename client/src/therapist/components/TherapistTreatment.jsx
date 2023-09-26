import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createTreatment,
  deleteTreatment,
  getTreatmentsByTherapist,
  resetIsTreatmentCreated,
  resetIsTreatmentDeleted,
  resetIsTreatmentUpdated,
  updateTreatmentExercise,
} from "../../store/slices/treatmentSlice";
import { getAllExercises } from "../../store/slices/exerciseSlice";
import { RiCloseCircleFill } from "react-icons/ri";
import SingleExercise from "../../therapist/components/SingleExercise";
import { setBookingStatus } from "../../store/slices/bookingSlice";

const parts = [
  "Head",
  "Neck",
  "collar",
  "shoulder",
  "Chest",
  "Upper Back",
  "Arm",
  "Elbow",
  "Forearm",
  "Wrist",
  "Hand",
  "Thumb",
  "Index finger",
  "Middle finger",
  "Ring finger",
  "Little finger",
  "Stomach",
  "Abdomen",
  "Lower back",
  "Hip",
  "Anal region",
  "Thigh",
  "Knee",
  "leg",
  "Ankle",
  "Foot",
  "Heel",
];

const TherapistTreatment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [ther, setTher] = useState();
  const [part, setPart] = useState(parts[0]);
  const [partEx, setPartEx] = useState();
  const [toggle, setToggle] = useState("close");
  const [exercise, setExercise] = useState();
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [exerciseId, setExerciseId] = useState();
  const { user: me } = useSelector((state) => state.user);
  const { exercises } = useSelector((state) => state.exercise);
  const [treatmentId, setTreatmentId] = useState();
  const {
    loading,
    error,
    treatments,
    isTreatmentCreated,
    isTreatmentUpdated,
    isTreatmentDeleted,
  } = useSelector((state) => state.treatment);
  const addExe = (e) => {
    e.preventDefault();
    const treatment = treatments.filter((treat) => {
      return treat._id == treatmentId;
    });
    const ex = [...treatment[0].exercises];
    ex.push({
      exercise: exercise,
      duration: {
        min,
        sec,
      },
    });
    console.log(ex);
    const options = {
      id: treatmentId,
      exercises: ex,
    };
    dispatch(updateTreatmentExercise(options));
    setToggle("close");
  };
  const submitTreatment = () => {
    const options = {
      createdBy: me._id,
      booking: id,
    };
    const data = {
      id,
      status: "Treatment Created / Waiting for Facilitator",
    };
    dispatch(setBookingStatus(data));
    dispatch(createTreatment(options));
  };
  useEffect(() => {
    if (!exercises) {
      dispatch(getAllExercises());
    }
    if (!treatments) {
      dispatch(getTreatmentsByTherapist(id));
    }
    if (isTreatmentCreated) {
      dispatch(resetIsTreatmentCreated());
      dispatch(getTreatmentsByTherapist(id));
    }
    if (isTreatmentUpdated) {
      dispatch(resetIsTreatmentUpdated());
      dispatch(getTreatmentsByTherapist(id));
    }

    if (isTreatmentDeleted) {
      dispatch(resetIsTreatmentDeleted());
      dispatch(getTreatmentsByTherapist(id));
    }
  }, [isTreatmentCreated, isTreatmentUpdated, isTreatmentDeleted]);
  useEffect(() => {
    if (treatments) {
      setTher(treatments);
    }
  }, [treatments]);
  useEffect(() => {
    if (part && exercises) {
      setPartEx(
        exercises.filter((ex) => {
          return ex.part === part;
        })
      );
    }
  }, [part]);
  useEffect(() => {
    if (exercise) {
      const e = exercises.filter((ex) => {
        return ex._id === exercise;
      });
      setMin(e[0].duration.min);
      setSec(e[0].duration.sec);
    }
  }, [exercise]);
  return (
    <div className="relative w-4/5 mx-auto">
      <h1 className="text-2xl text-[#00286b] font-bold text-center border-b-2 border-[#00286b] w-1/4 mx-auto">
        Treatments
      </h1>
      {me && me.role == "therapist" && (
        <button
          onClick={submitTreatment}
          className="absolute top-0 right-0 font-semibold border-2 border-[#00286b] text-white bg-[#00286b] px-[1vmax] py-[0.5vmax] hover:bg-white hover:text-[#00286b]"
        >
          Create Treatment
        </button>
      )}
      <div className="my-[5vmax] flex flex-col gap-4">
        {ther ? (
          <>
            {ther.map((the) => {
              return (
                <div
                  key={the._id}
                  className="border-2 border-[#00286b] flex flex-col"
                >
                  <div className="border-2 border-[#00286b] px-4 py-2 flex justify-between items-center">
                    <h2 className="text-[#00286b] font-semibold">
                      Treatment: {the._id}
                    </h2>
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          setToggle("open");
                          setTreatmentId(the._id);
                        }}
                        className="font-semibold border-2 border-[#00286b] text-white bg-[#00286b] px-[1vmax] py-[0.5vmax] hover:bg-white hover:text-[#00286b]"
                      >
                        Add Exercise
                      </button>
                      <button
                        onClick={() => {
                          dispatch(deleteTreatment(the._id));
                        }}
                        className="font-semibold border-2 border-red-800 text-white bg-red-800 px-[1vmax] py-[0.5vmax] hover:bg-white hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {the.exercises[0] && (
                    <div className="my-4 flex flex-col gap-4">
                      <div className="flex justify-between w-4/5 mx-auto">
                        <h2 className="font-bold text-[#00286b]">
                          Exercise Gif
                        </h2>
                        <h2 className="font-bold text-[#00286b]">
                          Exercise Name
                        </h2>
                        <h2 className="font-bold text-[#00286b]">Duration</h2>
                        <h2 className="font-bold text-[#00286b]">Action</h2>
                      </div>
                      {the.exercises.map((e) => {
                        return (
                          <SingleExercise
                            exercise={e}
                            exercises={exercises}
                            id={the._id}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <p className="my-[3vmax] text-center">No Treatments Yet.</p>
        )}
      </div>
      {toggle == "open" && (
        <div className="fixed w-full h-[100vh] bg-black bg-opacity-60 top-0 left-0 flex justify-center items-center">
          <div className="relative w-1/3 flex flex-col gap-4 items-center bg-white p-[2vmax]">
            <h1 className="text-2xl text-[#00286b] font-bold text-center">
              Add Exercise
            </h1>
            <button
              onClick={() => {
                setToggle("close");
              }}
              className="absolute top-[2vmax] right-[2vmax]"
            >
              <RiCloseCircleFill className=" text-[2vmax] font-bold text-[#00286b]" />
            </button>
            <form className="flex flex-col gap-4" onSubmit={addExe}>
              <select
                className="bg-white px-[1vmax] py-[0.5vmax] border-2"
                value={part}
                onChange={(e) => {
                  setPart(e.target.value);
                }}
              >
                {parts.map((part) => {
                  return (
                    <option key={part} value={part}>
                      {part}
                    </option>
                  );
                })}
              </select>
              <select
                className="bg-white px-[1vmax] py-[0.5vmax] border-2"
                value={exercise}
                onChange={(e) => {
                  setExerciseId(e.target.value);
                  setExercise(e.target.value);
                }}
              >
                <option value="">Choose</option>
                {partEx.map((ex) => {
                  return (
                    <option key={ex._id} value={ex._id}>
                      {ex.name}
                    </option>
                  );
                })}
              </select>
              <div className="flex border-2 w-fit items-center">
                <input
                  type="number"
                  value={min}
                  onChange={(e) => {
                    setMin(e.target.value);
                  }}
                  max={60}
                  min={0}
                  className="bg-white px-[0.5vmax] py-[1vmax] w-[3.5rem]"
                />
                <p className="mr-4">min.</p>
                <input
                  type="number"
                  value={sec}
                  min={0}
                  onChange={(e) => {
                    if (e.target.value < 60) {
                      setSec(e.target.value);
                    } else {
                      setMin(min + Math.floor(e.target.value / 60));
                      setSec(e.target.value % 60);
                    }
                  }}
                  className="bg-white px-[0.5vmax] py-[1vmax] w-[3.5rem]"
                />
                <p className="mr-4">sec.</p>
              </div>
              <input
                type="submit"
                value={"submit"}
                className="font-semibold border-2 border-[#00286b] text-white bg-[#00286b] px-[1vmax] py-[0.5vmax] hover:bg-white hover:text-[#00286b]"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TherapistTreatment;
