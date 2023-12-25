import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../auth/Loader";
import ErrorAlert from "../../auth/ErrorAlert";
import {
  editExercise,
  getExerciseDetail,
  resetIsUpdated,
} from "../../store/slices/exerciseSlice";

const EditExercise = () => {
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
  const { loading, error, exercise, isUpdated } = useSelector(
    (state) => state.exercise
  );
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [part, setPart] = useState("");
  const [reps, setReps] = useState("");
  const [gif, setGif] = useState();
  const [gifPrev, setGifPrev] = useState();
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const { id } = useParams();

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setGif(reader.result);
        setGifPrev(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.set("name", name);
    fd.set("description", description);
    fd.set("part", part);
    fd.set("reps", reps);
    fd.set("min", min);
    fd.set("sec", sec);
    if (gif) {
      fd.set("gif", gif);
    }
    const options = {
      id,
      fd,
    };
    dispatch(editExercise(options));
    dispatch(getExerciseDetail(id));
  };

  useEffect(() => {
    dispatch(getExerciseDetail(id));

    if (isUpdated) {
      dispatch(resetIsUpdated());
    }
  }, [dispatch, isUpdated]);
  useEffect(() => {
    if (exercise && exercise.duration) {
      setName(exercise.name);
      setDescription(exercise.description);
      setPart(exercise.part);
      setReps(exercise.reps);
      setMin(exercise.duration.min);
      setSec(exercise.duration.sec);
      if (exercise.gif) {
        setGifPrev(exercise.gif.url);
      }
    }
  }, [exercise]);

  return (
    <>
      <div className="flex sm:flex-col">
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full ">
            <form
              onSubmit={submitHandler}
              className="flex flex-col relative top-[2vmax] gap-8 mx-auto my-[6vmax] shadow-lg shadow-[#00286b] border-2 p-[2vmax] items-center w-4/5 sm:shadow-none sm:w-[95%] sm:p-[1vmax]"
            >
              <h1 className="text-2xl font-bold border-b-4 text-[# ] border-[#00286b] w-3/5 text-center mx-auto">
                Edit Exercise
              </h1>
              <div className="flex gap-4 items-center w-4/5 ">
                {/* <AiOutlineUser className="text-xl" /> */}
                <input
                  className=" px-[1vmax] py-[0.5vmax] bg-white border-2 w-full  "
                  type="text"
                  placeholder="Enter Title of Video"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-4 items-center w-4/5 ">
                {/* <BiCommentDetail className="text-xl" /> */}
                <textarea
                  className=" px-[1vmax] py-[0.5vmax] bg-white border-2 w-full "
                  type="text"
                  cols={30}
                  rows={4}
                  placeholder="Paste Video Link"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div>
                <select
                  onChange={(e) => {
                    setPart(e.target.value);
                  }}
                  className="bg-white"
                >
                  <option value={part}>{part}</option>
                  {parts.map((part) => {
                    return <option value={part}>{part}</option>;
                  })}
                </select>
              </div>
              <div className="flex gap-4 items-center w-4/5 ">
                {/* <BiCommentDetail className="text-xl" /> */}
                <input
                  className=" px-[1vmax] py-[0.5vmax] bg-white border-2 w-full "
                  type="number"
                  max={100}
                  min={0}
                  placeholder="Enter number of reps."
                  value={reps}
                  onChange={(e) => {
                    setReps(e.target.value);
                  }}
                />
              </div>
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
              <div className="flex flex-col  items-center gap-4">
                {gifPrev && <img src={gifPrev} alt="img" className=" w-1/3" />}
                <input
                  type="file"
                  accept="image/*"
                  onChange={imageHandler}
                  className="w-[10vmax] border-2 p-[0.5vmax] bg-[#e5e7eb]"
                />
              </div>

              <input
                type="submit"
                className="py-[0.8vmax] bg-[#00286b] w-3/5 text-white font-semibold cursor-pointer"
              />
            </form>
          </div>
        )}
      </div>
      {error && <ErrorAlert message={error} alert={true} />}
    </>
  );
};

export default EditExercise;
