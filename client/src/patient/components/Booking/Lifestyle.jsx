import React, { useEffect, useState } from "react";
import Container from "./BookingForm";
import Consent from "./Consent";
import Select from "react-dropdown-select";
import LifestyleProblems from "./LifestyleProblems";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateLifestyleAndHabits } from "../../../store/slices/bookingSlice";

const problems = [
  {
    label: "Diabetes",
    value: "Diabetes",
  },
  {
    label: "Hypertension",
    value: "Hypertension",
  },
  {
    label: "Cardiac problem",
    value: "Cardiac problem",
  },
  {
    label: "Indigestion",
    value: "Indigestion",
  },
  {
    label: "Gas",
    value: "Gas",
  },
  {
    label: "Acidity",
    value: "Acidity",
  },
  {
    label: "Asthma",
    value: "Asthma",
  },
  {
    label: "Prostate",
    value: "Prostate",
  },
  {
    label: "Hernia",
    value: "Hernia",
  },
  {
    label: "Overweight",
    value: "Overweight",
  },
  {
    label: "PCOD",
    value: "PCOD",
  },
  {
    label: "Thyroid",
    value: "Thyroid",
  },
  {
    label: "Infertility",
    value: "Infertility",
  },
  {
    label: "Irregular periods",
    value: "Irregular periods",
  },
  {
    label: "Menopause",
    value: "Menopause",
  },
  {
    label: "Stress",
    value: "Stress",
  },
  {
    label: "Depression/anxiety",
    value: "Depression/anxiety",
  },
];
const allHabits = [
  {
    label: "Smoking",
    value: "Smoking",
  },
  {
    label: "Chewing tobacco",
    value: "Chewing tobacco",
  },
  {
    label: "Drink",
    value: "Drink",
  },
  {
    label: "Pan-masala",
    value: "Pan-masala",
  },
  {
    label: "Supari",
    value: "Supari",
  },
  {
    label: "Nothing",
    value: "Nothing",
  },
];
const Lifestyle = () => {
  const [otherProblem, setOtherProblem] = useState("");
  const [lifestyleProblems, setLifestyleProblems] = useState([]);
  const dispatch = useDispatch();

  const handleOtherLifestyleProblem = (e) => {
    e.preventDefault();
    const copy = lifestyleProblems ? [...lifestyleProblems] : [];
    if (otherProblem) {
      if (!lifestyleProblems) {
        copy[0] = {
          value: otherProblem,
          label: otherProblem,
        };
      } else {
        copy[lifestyleProblems.length] = {
          value: otherProblem,
          label: otherProblem,
        };
      }
    }

    setLifestyleProblems(copy);
  };

  const handleOtherHabit = (e) => {
    e.preventDefault();
    const copy = habits && habits[0] ? [...habits] : [];
    if (otherHabit) {
      if (!habits[0]) {
        copy[0] = {
          value: otherHabit,
          label: otherHabit,
        };
      } else {
        copy[habits.length] = {
          value: otherHabit,
          label: otherHabit,
        };
      }
    }

    setHabits(copy);
  };

  const [problemSinceWhen, setProblemSinceWhen] = useState({});
  const [problemOnMed, setProblemOnMed] = useState({});
  const [problemCause, setProblemCause] = useState({});

  const [healthyDiet, setHealthyDiet] = useState("");
  const [emptyStomach, setEmptyStomach] = useState("");
  const [doBreakfast, setDoBreakfast] = useState("");
  const [breakfastTime, setBreakfastTime] = useState("");
  const [lunchTime, setLunchTime] = useState("");
  const [dinnerTime, setDinnerTIme] = useState("");
  const [doExercises, setDoExercises] = useState("");
  const [exercise, setExercises] = useState("");
  const [exercisePerDay, setExercisePerDay] = useState("");
  const [exercisePerWeek, setExercisePerWeek] = useState("");
  const [properSleep, setProperSleep] = useState("");
  const [sleepTime, setSleepTime] = useState("");
  const [wakeTime, setWakeTime] = useState();
  const [sleepHour, setSleepHour] = useState();
  const [sittingHour, setSittingHour] = useState();
  const [mobileScreenHour, setMobileScreenHour] = useState();
  const [tvScreenHour, setTvScreenHour] = useState();
  const [computerScreenHour, setComputerScreenHour] = useState();
  const [thinker, setThinker] = useState();
  const [thinkingRate, setThinkingRate] = useState();
  const [stressRate, setStressRate] = useState();
  const [disturbanceCause, setDisturbanceCause] = useState();
  const [habits, setHabits] = useState([]);
  const [otherHabit, setOtherHabit] = useState("");

  const { lifestyleAndHabits } = useSelector((state) => state.booking);
  const navigate = useNavigate();

  const LifestyleSubmit = (e) => {
    e.preventDefault();
    const data = {};
    const proInfo = [];
    for (let p in lifestyleProblems) {
      const problemsInfo = { problem: lifestyleProblems[p].value };
      for (let sw in problemSinceWhen) {
        if (lifestyleProblems[p].value == problemSinceWhen[sw].problem) {
          problemsInfo.sinceWhen = problemSinceWhen[sw].sinceWhen;
          break;
        }
      }
      for (let m in problemOnMed) {
        if (lifestyleProblems[p].value == problemOnMed[m].problem) {
          problemsInfo.onMedications = problemOnMed[m].onMed;
          break;
        }
      }
      for (let c in problemCause) {
        if (lifestyleProblems[p].value == problemCause[c].problem) {
          problemsInfo.cause = problemCause[c].cause;
          break;
        }
      }
      proInfo.push(problemsInfo);
    }
    data.problemsInfo = proInfo;
    data.foodDetails = {
      healthyDiet,
      emptyStomach,
      doBreakfast,
      foodTime: { lunchTime, dinnerTime },
    };
    if (breakfastTime) {
      data.foodDetails.foodTime.breakfastTime = breakfastTime;
    }
    data.exerciseDetails = {};
    if (doExercises == "No") {
      data.exerciseDetails.doExercises = doExercises;
    } else {
      data.exerciseDetails = {
        doExercises,
        exercise,
        exercisePerDay,
        exercisePerWeek,
      };
    }
    data.sleepDetails = {
      properSleep,
      sleepTime,
      wakeTime,
      sleepHour,
      sittingHour,
      mobileScreenHour,
      tvScreenHour,
      computerScreenHour,
    };
    data.stressDetails = {
      thinker,
      thinkingRate,
      stressRate,
      disturbanceCause,
    };
    data.habits = [];
    for (let h of habits) {
      data.habits.push(h.value);
    }
    localStorage.setItem("lifestyleAndHabits", JSON.stringify(data));
    dispatch(updateLifestyleAndHabits());
    navigate("/book/occupation");
  };

  useEffect(() => {
    if (lifestyleAndHabits && lifestyleAndHabits.foodDetails) {
      console.log(lifestyleAndHabits);
      setHealthyDiet(lifestyleAndHabits.foodDetails.healthyDiet);
      setEmptyStomach(lifestyleAndHabits.foodDetails.emptyStomach);
      setDoBreakfast(lifestyleAndHabits.foodDetails.doBreakfast);
      setBreakfastTime(lifestyleAndHabits.foodDetails.foodTime.breakfastTime);
      setLunchTime(lifestyleAndHabits.foodDetails.foodTime.lunchTime);
      setDinnerTIme(lifestyleAndHabits.foodDetails.foodTime.dinnerTime);
      setDoExercises(lifestyleAndHabits.exerciseDetails.doExercises);
      setExercises(lifestyleAndHabits.exerciseDetails.exercise);
      setExercisePerDay(lifestyleAndHabits.exerciseDetails.exercisePerDay);
      setExercisePerWeek(lifestyleAndHabits.exerciseDetails.exercisePerWeek);
      setProperSleep(lifestyleAndHabits.sleepDetails.properSleep);
      setSleepTime(lifestyleAndHabits.sleepDetails.sleepTime);
      setWakeTime(lifestyleAndHabits.sleepDetails.wakeTime);
      setSleepHour(lifestyleAndHabits.sleepDetails.sleepHour);
      setSittingHour(lifestyleAndHabits.sleepDetails.sittingHour);
      setMobileScreenHour(lifestyleAndHabits.sleepDetails.mobileScreenHour);
      setTvScreenHour(lifestyleAndHabits.sleepDetails.tvScreenHour);
      setComputerScreenHour(lifestyleAndHabits.sleepDetails.computerScreenHour);
      setThinker(lifestyleAndHabits.stressDetails.thinker);
      setThinkingRate(lifestyleAndHabits.stressDetails.thinkingRate);
      setStressRate(lifestyleAndHabits.stressDetails.stressRate);
      setDisturbanceCause(lifestyleAndHabits.stressDetails.disturbanceCause);
    }
  }, []);

  return (
    <Container>
      <div className="container">
        <Consent />
        <div className="form-with-head">
          <h1 className="book-head">Lifestyle and Habits</h1>
          <form className="book-form" onSubmit={LifestyleSubmit}>
            <div className="book-input-container">
              <div className="input-container">
                <label className="label-head">Lifestyle Problems:</label>
                <Select
                  className="book-input"
                  values={lifestyleProblems}
                  options={problems}
                  color="#00286b"
                  multi
                  onChange={(value) => setLifestyleProblems(value)}
                ></Select>
              </div>
              <div className="input-container">
                <label className="label-head">
                  Other Lifestyle Problems (if not available*):
                </label>
                <div className="flex gap-2 flex-col">
                  <input
                    type="text"
                    className="book-input"
                    maxLength={30}
                    placeholder="Enter Other lifestyle problem"
                    value={otherProblem}
                    onChange={(e) => {
                      setOtherProblem(e.target.value);
                    }}
                  />
                  <button
                    className="book-submit"
                    onClick={handleOtherLifestyleProblem}
                  >
                    Set
                  </button>
                </div>
              </div>
            </div>
            <div className="book-input-container">
              {lifestyleProblems.map((pro) => (
                <LifestyleProblems
                  key={pro.value}
                  problem={pro.value}
                  problemSinceWhen={problemSinceWhen}
                  setProblemSinceWhen={setProblemSinceWhen}
                  problemOnMed={problemOnMed}
                  setProblemOnMed={setProblemOnMed}
                  problemCause={problemCause}
                  setProblemCause={setProblemCause}
                />
              ))}
            </div>
            <h1 className="mx-auto pt-4 border-b-2 border-[#00286b] text-xl font-bold text-[#00286b]">
              Food Related Questions
            </h1>
            <div className="book-input-container">
              <div className="input-container">
                <label className="label-head">
                  Do you think you take healthy diet?
                </label>
                <select
                  className="book-input"
                  required
                  value={healthyDiet}
                  onChange={(e) => {
                    setHealthyDiet(e.target.value);
                  }}
                >
                  <option value="">Choose</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="input-container">
                <label className="label-head">
                  Do you take tea on empty stomach?
                </label>
                <select
                  className="book-input"
                  required
                  value={emptyStomach}
                  onChange={(e) => {
                    setEmptyStomach(e.target.value);
                  }}
                >
                  <option value="">Choose</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="input-container">
                <label className="label-head">Do you do breakfast?</label>
                <select
                  className="book-input"
                  required
                  value={doBreakfast}
                  onChange={(e) => {
                    setDoBreakfast(e.target.value);
                  }}
                >
                  <option value="">Choose</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="input-container gap-2">
                <label className="label-head">Food Timings:</label>
                {doBreakfast == "Yes" && (
                  <div className="flex gap-2 flex-col">
                    <label className="label-head">Breakfast (hh/mm) :</label>
                    <input
                      type="text"
                      required
                      className="book-input"
                      placeholder="Enter Your breakfast timing. (hh/mm)"
                      maxLength={5}
                      value={breakfastTime}
                      onChange={(e) => setBreakfastTime(e.target.value)}
                    />
                  </div>
                )}
                <div className="flex gap-2 flex-col">
                  <label className="label-head">Lunch (hh/mm) :</label>
                  <input
                    type="text"
                    required
                    className="book-input"
                    placeholder="Enter Your lunch timing. (hh/mm)"
                    maxLength={5}
                    value={lunchTime}
                    onChange={(e) => setLunchTime(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-col">
                  <label className="label-head">Dinner (hh/mm) :</label>
                  <input
                    type="text"
                    required
                    className="book-input"
                    placeholder="Enter Your dinner timing. (hh/mm)"
                    maxLength={5}
                    value={dinnerTime}
                    onChange={(e) => setDinnerTIme(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <h1 className="mx-auto pt-4 border-b-2 border-[#00286b] text-xl font-bold text-[#00286b]">
              Exercises related Questions
            </h1>
            <div className="book-input-container">
              <div className="input-container">
                <label className="label-head">
                  Are you doing any exercises?
                </label>
                <select
                  className="book-input"
                  required
                  value={doExercises}
                  onChange={(e) => {
                    setDoExercises(e.target.value);
                  }}
                >
                  <option value="">Choose</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              {doExercises == "Yes" && (
                <div className="input-container">
                  <label className="label-head">
                    Which kind of Exercise you do?
                  </label>
                  <input
                    type="text"
                    required
                    className="book-input"
                    maxLength={20}
                    placeholder="Enter your kind of Exercise"
                    value={exercise}
                    onChange={(e) => {
                      setExercises(e.target.value);
                    }}
                  />
                </div>
              )}
              {doExercises == "Yes" && (
                <div className="input-container">
                  <label className="label-head">How much time in a day?</label>
                  <input
                    type="number"
                    required
                    className="book-input"
                    min={1}
                    max={30}
                    placeholder="Enter number of time you perform exercise per day"
                    value={exercisePerDay}
                    onChange={(e) => {
                      setExercisePerDay(e.target.value);
                    }}
                  />
                </div>
              )}
              {doExercises == "Yes" && (
                <div className="input-container">
                  <label className="label-head">How much time in a Week?</label>
                  <input
                    type="number"
                    required
                    className="book-input"
                    min={1}
                    max={30}
                    placeholder="Enter number of time you perform exercise per Week"
                    value={exercisePerWeek}
                    onChange={(e) => {
                      setExercisePerWeek(e.target.value);
                    }}
                  />
                </div>
              )}
            </div>
            <h1 className="mx-auto pt-4 border-b-2 border-[#00286b] text-xl font-bold text-[#00286b]">
              Sleep related Questions
            </h1>
            <div className="book-input-container">
              <div className="input-container ">
                <label className="label-head">Do you get proper sleep?</label>
                <select
                  className="book-input"
                  value={properSleep}
                  onChange={(e) => {
                    setProperSleep(e.target.value);
                  }}
                  required
                >
                  <option value="">Choose</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="input-container ">
                <label className="label-head">At what time you sleep?</label>
                <input
                  type="text"
                  required
                  className="book-input"
                  placeholder="Enter the time you sleep. (hh/mm)"
                  maxLength={5}
                  value={sleepTime}
                  onChange={(e) => {
                    setSleepTime(e.target.value);
                  }}
                />
              </div>
              <div className="input-container ">
                <label className="label-head">At what time you wake up?</label>
                <input
                  type="text"
                  required
                  className="book-input"
                  placeholder="Enter the time you wake. (hh/mm)"
                  maxLength={5}
                  value={wakeTime}
                  onChange={(e) => {
                    setWakeTime(e.target.value);
                  }}
                />
              </div>
              <div className="input-container ">
                <label className="label-head">Average sleep hours?</label>
                <input
                  type="number"
                  className="book-input"
                  placeholder="Enter average hours of sleep."
                  max={15}
                  min={1}
                  required
                  value={sleepHour}
                  onChange={(e) => {
                    setSleepHour(e.target.value);
                  }}
                />
              </div>
              <div className="input-container ">
                <label className="label-head">Average sitting hours?</label>
                <input
                  type="number"
                  className="book-input"
                  placeholder="Enter average hours of sitting."
                  max={15}
                  min={0}
                  required
                  value={sittingHour}
                  onChange={(e) => {
                    setSittingHour(e.target.value);
                  }}
                />
              </div>
              <div className="input-container ">
                <label className="label-head">
                  Average Mobile screen hours?
                </label>
                <input
                  type="number"
                  className="book-input"
                  placeholder="Enter average hours of Mobile Screen."
                  max={15}
                  min={0}
                  required
                  value={mobileScreenHour}
                  onChange={(e) => {
                    setMobileScreenHour(e.target.value);
                  }}
                />
              </div>
              <div className="input-container ">
                <label className="label-head">Average TV screen hours?</label>
                <input
                  type="number"
                  className="book-input"
                  placeholder="Enter average hours of Mobile Screen."
                  max={15}
                  min={0}
                  required
                  value={tvScreenHour}
                  onChange={(e) => {
                    setTvScreenHour(e.target.value);
                  }}
                />
              </div>
              <div className="input-container ">
                <label className="label-head">
                  Average Laptop/computer screen hours?
                </label>
                <input
                  type="number"
                  className="book-input"
                  placeholder="Enter average hours of Computer Screen."
                  max={15}
                  min={0}
                  required
                  value={computerScreenHour}
                  onChange={(e) => {
                    setComputerScreenHour(e.target.value);
                  }}
                />
              </div>
            </div>
            <h1 className="mx-auto pt-4 border-b-2 border-[#00286b] text-xl font-bold text-[#00286b]">
              Stress related Questions
            </h1>
            <div className="book-input-container">
              <div className="input-container ">
                <label className="label-head">
                  Do you think you are over thinker?
                </label>
                <select
                  className="book-input"
                  required
                  value={thinker}
                  onChange={(e) => {
                    setThinker(e.target.value);
                  }}
                >
                  <option value="">Choose</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="input-container ">
                <label className="label-head">
                  Rate your thinking? (0 to 10)
                </label>
                <input
                  type="number"
                  className="book-input"
                  placeholder="Enter your thinking."
                  required
                  min={0}
                  max={10}
                  value={thinkingRate}
                  onChange={(e) => {
                    setThinkingRate(e.target.value);
                  }}
                />
              </div>
              <div className="input-container ">
                <label className="label-head">
                  Rate your stress? (0 to 10)
                </label>
                <input
                  type="number"
                  className="book-input"
                  placeholder="Enter your stress."
                  required
                  min={0}
                  max={10}
                  value={stressRate}
                  onChange={(e) => {
                    setStressRate(e.target.value);
                  }}
                />
              </div>
              <div className="input-container ">
                <label className="label-head">
                  What kind of/Which thought/occasion disturbed you a lot?
                </label>
                <textarea
                  className="book-input"
                  required
                  placeholder="Enter the cause your disturbance."
                  maxLength={100}
                  value={disturbanceCause}
                  onChange={(e) => {
                    setDisturbanceCause(e.target.value);
                  }}
                />
              </div>
            </div>
            <h1 className="mx-auto pt-4 border-b-2 border-[#00286b] text-xl font-bold text-[#00286b]">
              Habits
            </h1>
            <div className="book-input-container">
              <div className="input-container">
                <label className="label-head">Habits:</label>
                <Select
                  className="book-input"
                  values={habits}
                  options={allHabits}
                  color="#00286b"
                  multi
                  required
                  onChange={(value) => setHabits(value)}
                ></Select>
              </div>
              <div className="input-container">
                <label className="label-head">
                  Other Habits (if not available*):
                </label>
                <div className="flex gap-2 flex-col">
                  <input
                    type="text"
                    className="book-input"
                    maxLength={30}
                    placeholder="Enter Other habits."
                    value={otherHabit}
                    onChange={(e) => {
                      setOtherHabit(e.target.value);
                    }}
                  />
                  <button className="book-submit" onClick={handleOtherHabit}>
                    Set
                  </button>
                </div>
              </div>
            </div>
            <input
              type="submit"
              className="book-submit"
              value="Save and Continue"
            />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Lifestyle;
