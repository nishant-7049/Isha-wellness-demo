import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTreatmentsByTherapist } from "../../store/slices/treatmentSlice";
import { getAllExercises } from "../../store/slices/exerciseSlice";
import SingleExercise from "../../therapist/components/SingleExercise";
import Container from "../../patient/components/Booking/BookingForm";
import {
  getBookingDetail,
  setBookingStatus,
} from "../../store/slices/bookingSlice";
import { createSession, getSession } from "../../store/slices/sessionSlice";
import { getPackageDetail } from "../../store/slices/packageSlice";

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

const TreatmentStart = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ther, setTher] = useState();
  const [part, setPart] = useState(parts[0]);
  const [partEx, setPartEx] = useState();
  const [exercise, setExercise] = useState();
  const [state, setState] = useState("duringTreatment");
  const [psr, setPsr] = useState();
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [startedAt, setStartedAt] = useState();
  const [endedAt, setendedAt] = useState();
  const [satisfaction, setSatisfaction] = useState();
  const [questions, setQuestions] = useState();
  const [feedback, setFeedback] = useState();
  const [weight, setWeight] = useState();
  const [bp, setBp] = useState();
  const [sugar, setSugar] = useState();
  const [rating, setRating] = useState();
  const [isActive, setIsActive] = useState(false);
  const [restartToggle, setRestartToggle] = useState(false);
  const [endToggle, setEndToggle] = useState(false);
  const [isLastSession, setIsLastSession] = useState(false);
  const [functionality, setFunctionality] = useState();
  const { user: me } = useSelector((state) => state.user);
  const { exercises } = useSelector((state) => state.exercise);
  const { treatments } = useSelector((state) => state.treatment);

  const postFormSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      timeSpent: {
        min,
        sec,
      },
      startedAt,
      endedAt,
      treatmentId: ther[0]._id,
      questions: {
        weight,
        bp,
      },
    };
    if (psr) {
      data.questions.psr = psr;
    }
    if (satisfaction) {
      data.questions.satisfaction = satisfaction;
    }
    if (feedback) {
      data.questions.feedback = feedback;
    }
    if (functionality) {
      data.questions.functionality = functionality;
    }
    if (rating) {
      data.questions.facilitatorRating = rating;
    }
    console.log(data);
    dispatch(createSession(data));
    if (isLastSession) {
      dispatch(setBookingStatus({ id, status: "Treatment Completed" }));
    } else {
      dispatch(setBookingStatus({ id, status: "Session Completed" }));
    }
    navigate("/facilitator/session/completed");
  };

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        if (sec === 59) {
          setMin((prevMinutes) => prevMinutes + 1);
          setSec(0);
        } else {
          setSec((prevSeconds) => prevSeconds + 1);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => {
      if (sec != 0 && min != 0) {
        setStartedAt(new Date());
      }
      clearInterval(timer);
    };
  }, [isActive, sec, min]);
  const { sessions, loading } = useSelector((state) => state.session);
  const { booking } = useSelector((state) => state.booking);
  const { pac } = useSelector((state) => state.package);
  useEffect(() => {
    if (!exercises) {
      dispatch(getAllExercises());
    }
    if (!treatments) {
      dispatch(getTreatmentsByTherapist(id));
    }
    if (!booking || (booking && booking._id != id)) {
      dispatch(getBookingDetail(id));
    }
    dispatch(getSession(id));
  }, []);
  useEffect(() => {
    if (booking) {
      dispatch(getPackageDetail(booking.packageAndDate.package));
    }
  }, [booking]);
  useEffect(() => {
    if (pac && booking) {
      setIsLastSession(pac.sessions - booking.sessions == 1);
    }
  }, [pac]);
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
      setReps(e[0].reps);
    }
  }, [exercise]);
  return (
    <div className=" mt-24">
      <h1 className="text-2xl mb-12 text-[#00286b] font-bold text-center border-b-2 border-[#00286b] w-1/4 mx-auto sm:w-fit">
        Treatment Start
      </h1>
      <div className="mt-[1vmax] mb-20 flex flex-col gap-4">
        {ther && ther[0] ? (
          <div
            key={ther[0]._id}
            className="border-2 mx-4 border-[#00286b] flex flex-col"
          >
            <div
              className={` px-12 py-2 flex justify-between items-center ${
                ther[0].exercises.length > 0
                  ? "border-b-2 border-[#00286b]"
                  : ""
              }`}
            >
              <div className="flex gap-2 text-[#00286b] text-sm sm:flex-col sm:text-xs">
                <h2 className="">Treatment: {ther[0]._id}</h2>
                <p>Created At: {ther[0].createdAt}</p>
              </div>
            </div>
            {ther[0].exercises[0] && (
              <div className="my-4 flex flex-col gap-4">
                <div className="flex justify-between w-4/5 mx-auto sm:w-full border-b-2 border-[#00286b] pb-2 px-1">
                  <div className="w-1/6">
                    <h2 className="font-bold text-[#00286b] text-center sm:text-xs">
                      Exercise Gif
                    </h2>
                  </div>
                  <div className="w-1/6">
                    <h2 className="font-bold text-[#00286b] text-center sm:text-xs">
                      Exercise Name
                    </h2>
                  </div>
                  <div className="w-1/6">
                    <h2 className="font-bold text-[#00286b] text-center sm:text-xs">
                      Reps
                    </h2>
                  </div>
                  <div className="w-1/6">
                    <h2 className="font-bold text-[#00286b] text-center sm:text-xs">
                      Duration
                    </h2>
                  </div>
                  {me && me.role == "therapist" && (
                    <div className="w-1/6">
                      <h2 className="font-bold text-[#00286b] text-center sm:text-xs">
                        Action
                      </h2>
                    </div>
                  )}
                </div>
                {ther[0].exercises.map((e) => {
                  return (
                    <SingleExercise
                      key={e._id}
                      exercise={e}
                      exercises={exercises}
                      id={ther[0]._id}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <p className="my-[3vmax] text-center">No Treatments Yet.</p>
        )}
      </div>
      {state == "post" && (
        <div>
          <h1 className="text-2xl mb-12 text-[#00286b] font-bold text-center border-b-2 border-[#00286b] w-1/4 mx-auto sm:w-fit">
            {" "}
            Session Questions
          </h1>
          <Container>
            <form className="book-form" onSubmit={postFormSubmitHandler}>
              <div className="book-input-container">
                {((sessions.length != 0 && sessions.length % 3 == 0) ||
                  isLastSession) && (
                  <div className="input-container">
                    <label className="label-head">
                      PSR level (0 to 10) (0 lowest pain - 10 highest pain):
                    </label>
                    <input
                      type="number"
                      placeholder="Enter patient's pain level."
                      className="book-input"
                      required
                      min={0}
                      max={10}
                      value={psr}
                      onChange={(e) => {
                        setPsr(e.target.value);
                      }}
                    />
                  </div>
                )}
                {((sessions.length != 0 && sessions.length % 3 == 0) ||
                  isLastSession) && (
                  <div className="input-container">
                    <label className="label-head">
                      Satisfaction level (0 to 10):
                    </label>
                    <input
                      type="number"
                      placeholder="Enter patient's satisfaction level."
                      className="book-input"
                      required
                      min={0}
                      max={10}
                      value={satisfaction}
                      onChange={(e) => {
                        setSatisfaction(e.target.value);
                      }}
                    />
                  </div>
                )}
                <div className="input-container">
                  <label className="label-head">
                    Any Questions (optional):
                  </label>
                  <textarea
                    placeholder="Enter patient's questions."
                    className="book-input"
                    min={0}
                    max={10}
                    value={questions}
                    onChange={(e) => {
                      setQuestions(e.target.value);
                    }}
                  />
                </div>
                <div className="input-container">
                  <label className="label-head">Feedback (optional):</label>
                  <textarea
                    placeholder="Enter patient's feedback of session."
                    className="book-input"
                    min={0}
                    max={10}
                    value={feedback}
                    onChange={(e) => {
                      setFeedback(e.target.value);
                    }}
                  />
                </div>
                <div className="input-container">
                  <label className="label-head">Weight:</label>
                  <input
                    type="number"
                    placeholder="Enter patient's weight (in kgs)."
                    className="book-input"
                    min={0}
                    max={200}
                    required
                    value={weight}
                    onChange={(e) => {
                      setWeight(e.target.value);
                    }}
                  />
                </div>
                <div className="input-container">
                  <label className="label-head">Blood Pressure:</label>
                  <select
                    className="book-input"
                    value={bp}
                    onChange={(e) => {
                      setBp(e.target.value);
                    }}
                    required
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
                <div className="input-container">
                  <label className="label-head">Sugar (optional):</label>
                  <select
                    className="book-input"
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
                <div className="input-container">
                  <label className="label-head">
                    Rate Facilitator (0 to 5) :
                  </label>
                  <input
                    type="number"
                    placeholder="Rate facilitator (0 to 5)."
                    className="book-input"
                    min={0}
                    max={5}
                    value={rating}
                    onChange={(e) => {
                      setRating(e.target.value);
                    }}
                  />
                </div>
                {((sessions.length != 0 && sessions.length % 7 == 0) ||
                  isLastSession) && (
                  <div className="input-container">
                    <label className="label-head">
                      Functionality improvement :
                    </label>
                    <select
                      className="book-input"
                      value={functionality}
                      onChange={(e) => {
                        setFunctionality(e.target.value);
                      }}
                    >
                      <option value="">Choose</option>
                      <option value={false}>Yes</option>
                      <option value={true}>No</option>
                    </select>
                  </div>
                )}
              </div>
              <input type="submit" className="book-submit" />
            </form>
          </Container>
        </div>
      )}
      {state == "duringTreatment" ? (
        <div className="flex flex-col items-center gap-8 mb-20">
          <h1 className="text-2xl text-[#00286b] font-bold mb-8 text-center border-b-2 border-[#00286b] w-1/4 mx-auto sm:w-fit">
            Session Timing
          </h1>
          <div className="w-[20vw] h-[20vw] rounded-full border-2  flex justify-center items-center  text-5xl text-gray-400  sm:w-3/5 sm:h-[60vw]">
            {min} : {sec}
          </div>
          <button
            onClick={() => {
              if (!isActive && min == 0 && sec == 0) {
                setStartedAt(new Date());
              }
              setIsActive(!isActive);
            }}
            className="border-2 border-[#00286b] text-[white] bg-[#00286b] w-fit px-4 py-2 hover:bg-[white] hover:text-[#00286b]"
          >
            {isActive ? "Pause" : "Start"} Session
          </button>
          {(sec > 0 || min > 0) && !isActive && (
            <button
              onClick={() => {
                setRestartToggle(!restartToggle);
              }}
              className="border-2 border-[#00286b] text-[white] bg-[#00286b] w-fit px-4 py-2 hover:bg-[white] hover:text-[#00286b]"
            >
              Restart Session
            </button>
          )}
          {(sec > 0 || min > 0) && !isActive && (
            <button
              onClick={() => {
                setEndToggle(!endToggle);
              }}
              className="border-2 border-[#00286b] text-[white] bg-[#00286b] w-fit px-4 py-2 hover:bg-[white] hover:text-[#00286b]"
            >
              End Session
            </button>
          )}
          {restartToggle && (
            <div className="w-full h-[100vh] flex justify-center items-center fixed top-0 left-0 bg-opacity-60 bg-black">
              <div className="w-3/5 bg-white p-4">
                <h1 className="text-[#00286b] border-b-2 border-[#00286b]">
                  Restart Session
                </h1>
                <p className="text-gray-400">Do you want to restart session?</p>
                <div className="flex justify-around mt-8">
                  <button
                    onClick={() => {
                      setMin(0);
                      setSec(0);
                      setRestartToggle(!restartToggle);
                    }}
                    className="border-2 px-4 py-2 border-[#00286b] bg-[#00286b] text-white hover:bg-white hover:text-[#00286b]"
                  >
                    Restart
                  </button>
                  <button
                    onClick={() => {
                      setRestartToggle(!restartToggle);
                    }}
                    className="border-2 px-4 py-2 border-[#00286b] bg-[#00286b] text-white hover:bg-white hover:text-[#00286b]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {endToggle && (
            <div className="w-full h-[100vh] flex justify-center items-center fixed top-0 left-0 bg-opacity-60 bg-black">
              <div className="w-3/5 bg-white p-4">
                <h1 className="text-[#00286b] border-b-2 border-[#00286b]">
                  End Session
                </h1>
                <p className="text-gray-400">Do you want to end session?</p>
                <div className="flex justify-around mt-8">
                  <button
                    onClick={() => {
                      setState("post");
                      setendedAt(new Date());
                      setEndToggle(!endToggle);
                    }}
                    className="border-2 px-4 py-2 border-[#00286b] bg-[#00286b] text-white hover:bg-white hover:text-[#00286b]"
                  >
                    End
                  </button>
                  <button
                    onClick={() => {
                      setEndToggle(!endToggle);
                    }}
                    className="border-2 px-4 py-2 border-[#00286b] bg-[#00286b] text-white hover:bg-white hover:text-[#00286b]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TreatmentStart;
