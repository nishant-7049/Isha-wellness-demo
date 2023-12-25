import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  createExercise,
  deleteExercise,
  getAllExercises,
  resetIsCreated,
  resetIsDeleted,
} from "../../store/slices/exerciseSlice";
import Loader from "../../auth/Loader";

const Exercises = () => {
  const part = [
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
  const dispatch = useDispatch();
  const { loading, exercises, isCreated, isDeleted } = useSelector(
    (state) => state.exercise
  );
  const cols = [
    {
      field: "gif",
      headerName: "GIF",
      minWidth: 200,
      flex: 0.3,
      headerClassName: "text-[#00286b] font-semibold",
      renderCell: (cellValues) => {
        return (
          <div>
            <img src={cellValues.row.gif} alt="" />
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.4,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "part",
      headerName: "Body Part",
      minWidth: 200,
      flex: 0.4,
      headerClassName: "text-[#00286b] font-semibold",
    },
    {
      field: "duration",
      headerName: "Duration",
      minWidth: 100,
      flex: 0.4,
      headerClassName: "text-[#00286b] font-semibold",
      renderCell: (cellValues) => {
        console.log(cellValues);
        return (
          <div>
            <p>
              {cellValues.row.duration.min}m:{cellValues.row.duration.sec}s
            </p>
          </div>
        );
      },
    },
    {
      field: "reps",
      headerName: "Reps",
      minWidth: 100,
      flex: 0.4,
      type: "number",
    },
    {
      field: "action",
      headerName: "Actions",
      minWidth: 100,
      flex: 0.3,
      type: "number",
      headerClassName: "text-[#00286b] font-semibold",
      renderCell: (cellValues) => (
        <div className="flex text-2xl  justify-end">
          <Link to={`/admin/exercise/edit/${cellValues.id}`}>
            <BiEdit className="text-green-400" />
          </Link>
          <button
            onClick={() => {
              dispatch(deleteExercise(cellValues.row.id));
            }}
          >
            <MdOutlineDeleteOutline className="text-red-700" />
          </button>
        </div>
      ),
    },
  ];
  const rows = [];
  exercises &&
    exercises.forEach((exercise) => {
      rows.push({
        id: exercise._id,
        gif: exercise.gif.url,
        name: exercise.name,
        part: exercise.part,
        reps: exercise.reps,
        duration: exercise.duration,
      });
    });

  const [toggle, setToggle] = useState("close");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [bodyPart, setBodyPart] = useState();
  const [reps, setReps] = useState();
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [imagePrev, setImagePrev] = useState();
  const [image, setImage] = useState();
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        console.log(reader.result);
        setImagePrev(reader.result);
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.set("name", name);
    fd.set("description", description);
    fd.set("part", bodyPart);
    fd.set("reps", reps);
    fd.set("min", min);
    fd.set("sec", sec);
    if (image) {
      fd.set("gif", image);
    }
    dispatch(createExercise(fd));
  };
  useEffect(() => {
    dispatch(getAllExercises());
    if (isCreated) {
      dispatch(resetIsCreated());
    }
    if (isDeleted) {
      dispatch(resetIsDeleted());
    }
  }, [dispatch, isCreated, isDeleted]);
  return (
    <>
      <div className="flex">
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full mt-[6vmax]">
            <h1 className="text-3xl border-b-4 border-[#00286b] text-[#00286b] pb-2 font-bold w-fit text-center mx-auto sm:text-2xl sm:w-4/5">
              Exercises
            </h1>
            <button
              onClick={() => setToggle("open")}
              className="absolute top-[6vmax] right-[7vmax] border-2 border-[#00286b] bg-[#00286b] text-white font-semibold px-[1vmax] py-[0.5vmax] hover:bg-white hover:text-[#00286b] sm:static"
            >
              Create Exercise
            </button>
            <DataGrid
              className="my-8 w-4/5 mx-auto sm:w-[95%]"
              rows={rows}
              columns={cols}
              autoHeight
              rowSelection={false}
            />
            {toggle == "open" ? (
              <div className="fixed z-10 w-full h-[100vh] bg-black bg-opacity-60 top-0 left-0 flex justify-center items-center">
                <div
                  className={`relative w-1/3 ${
                    imagePrev ? "w-3/5" : ""
                  } h-[80%]  bg-white`}
                >
                  <button
                    className="absolute top-[2vmax] right-[2vmax]"
                    onClick={() => setToggle("close")}
                  >
                    <RiCloseCircleFill className=" text-[2vmax] font-bold text-[#00286b]" />
                  </button>

                  <form
                    className="w-full flex flex-col h-full justify-evenly items-center "
                    onSubmit={submitHandler}
                  >
                    <h1 className="text-center mx-auto text-2xl font-semibold text-[#00286b] border-b-2 border-[#00286b] pb-4 w-1/2">
                      Create Exercise
                    </h1>
                    <div className="flex gap-8">
                      <div className="flex flex-col gap-4 items-center">
                        <div className="flex  items-center gap-4">
                          {/* <AiOutlineUser className="text-2xl" /> */}
                          <input
                            type="text"
                            required
                            value={name}
                            placeholder="Enter Exercise Name. "
                            onChange={(e) => setName(e.target.value)}
                            className=" bg-white px-[1.5vmax] py-[1vmax] border-2 "
                          />
                        </div>
                        <div className="flex  items-center gap-4">
                          {/* <BiCommentDetail className="text-2xl" /> */}
                          <textarea
                            value={description}
                            required
                            placeholder="Enter Exerise Description"
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-white px-[1.5vmax] py-[1vmax] border-2 "
                          />
                        </div>
                        <div>
                          <select
                            className="bg-white"
                            required
                            onChange={(e) => {
                              setBodyPart(e.target.value);
                            }}
                          >
                            <option value="">Choose Body Part</option>
                            {part.map((part) => (
                              <option value={part}>{part}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex  items-center gap-4">
                          {/* <BiCommentDetail className="text-2xl" /> */}
                          <input
                            type="number"
                            value={reps}
                            required
                            max={100}
                            min={0}
                            placeholder="Enter Exercise Reps."
                            onChange={(e) => setReps(e.target.value)}
                            className="bg-white px-[1.5vmax] py-[1vmax] border-2 "
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
                        <div className="flex justify-center">
                          <input
                            type="file"
                            required
                            accept="image/*"
                            className="w-4/5 border-2 px-[1.5vmax] py-[1vmax]"
                            onChange={imageHandler}
                          />
                        </div>
                      </div>
                      {imagePrev && (
                        <img src={imagePrev} className="w-1/3" alt="" />
                      )}
                    </div>

                    <input
                      type="submit"
                      className="mx-auto py-[1vmax] px-[1.5vmax] bg-[#00286b] w-4/5 hover:bg-[white] border-2 border-[#00286b] hover:text-[#00286b]  text-white cursor-pointer"
                    />
                  </form>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Exercises;
