import React, { useEffect, useState } from "react";
import Consent from "./Consent";
import Container from "./BookingForm";
import { useDispatch, useSelector } from "react-redux";
import PainForm from "./PainForm";
import StiffnessForm from "./StiffnessForm";
import HeadForm from "./HeadForm";
import SclerosisForm from "./SclerosisForm";
import ParalysisForm from "./ParalysisForm";
import { updatePresentingComplaints } from "../../../store/slices/bookingSlice";
import MedicalHistory from "./MedicalHistory";
import { useNavigate } from "react-router-dom";

const problems = [
  "Pain",
  "Parasthesia",
  "Stiffness",
  "Headache",
  "Migraine",
  "Vertigo",
  "Motion Sickness",
  "Multiple sclerosis",
  "Paralysis",
  "Lifestyle and Habits",
  "Others",
];

const Problem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { presentingComplaints: pc } = useSelector((state) => state.booking);

  const [problem, setProblem] = useState("");
  const [problem2, setProblem2] = useState("");

  const [otherComplaints, setOtherComplaints] = useState("");
  const [otherMedicalConditions, setOtherMedicalConditions] = useState("");
  const [oldComplaint, setOldComplaint] = useState("");

  const problemSubmit = (e) => {
    e.preventDefault();
    const data = {
      problem,
      problemDescription: problem2,
      otherComplaints,
      otherMedicalConditions,
      oldComplaint,
    };
    localStorage.setItem("presentingComplaints", JSON.stringify(data));
    dispatch(updatePresentingComplaints());
    navigate("/book/measures");
  };

  const submitLifestyle = (e) => {
    e.preventDefault();
    const data = {
      problem,
      otherComplaints,
      otherMedicalConditions,
      oldComplaint,
    };
    localStorage.setItem("presentingComplaints", JSON.stringify(data));
    dispatch(updatePresentingComplaints());
    navigate("/book/measures");
  };

  useEffect(() => {
    if (pc) {
      setProblem(pc.problem);
    }
    if (pc.problem == "Others") {
      setProblem2(pc.problemDescription);
    }
    if (pc.otherComplaints) {
      setOtherComplaints(pc.otherComplaints);
      setOtherMedicalConditions(pc.otherMedicalConditions);
      setOldComplaint(pc.oldComplaint);
    }
  }, [pc]);

  return (
    <Container>
      <div className="container">
        <Consent />
        <div className="form-with-head">
          <h1 className="book-head">Health Complaints</h1>
          <div className="input-container mx-auto my-4">
            <label className="label-head">Problem:</label>
            <select
              className="book-input"
              value={problem}
              onChange={(e) => {
                setProblem(e.target.value);
              }}
              required
            >
              <option value="">Choose</option>
              {problems.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          {(problem == "Pain" || problem == "Parasthesia") && (
            <PainForm problem={problem} />
          )}
          {problem == "Stiffness" && <StiffnessForm problem={problem} />}
          {(problem == "Headache" ||
            problem == "Migraine" ||
            problem == "Vertigo" ||
            problem == "Motion Sickness") && <HeadForm problem={problem} />}
          {problem == "Multiple sclerosis" && (
            <SclerosisForm problem={problem} />
          )}
          {problem == "Paralysis" && <ParalysisForm problem={problem} />}
          {problem == "Lifestyle and Habits" && (
            <form className="book-form" onSubmit={submitLifestyle}>
              <h1 className="text-[#00286b] text-xl font-bold border-b-2 border-[#00286b] mt-4">
                Medical History
              </h1>
              <MedicalHistory
                otherComplaints={otherComplaints}
                otherMedicalConditions={otherMedicalConditions}
                oldComplaint={oldComplaint}
                setOtherComplaints={setOtherComplaints}
                setOtherMedicalConditions={setOtherMedicalConditions}
                setOldComplaint={setOldComplaint}
              />
              <input
                type="submit"
                className="book-submit"
                value="Save and Continue"
              />
            </form>
          )}
          {problem == "Others" && (
            <form className="book-form" onSubmit={problemSubmit}>
              <div className="book-input-container">
                <div className="input-container">
                  <label className="label-head">Problem description:</label>
                  <input
                    className="book-input"
                    type="text"
                    placeholder="Enter your problem information as much as you know."
                    value={problem2}
                    onChange={(e) => {
                      setProblem2(e.target.value);
                    }}
                  />
                </div>
              </div>
              <h1 className="text-[#00286b] text-xl font-bold border-b-2 border-[#00286b] mt-4">
                Medical History
              </h1>
              <MedicalHistory
                otherComplaints={otherComplaints}
                otherMedicalConditions={otherMedicalConditions}
                oldComplaint={oldComplaint}
                setOtherComplaints={setOtherComplaints}
                setOtherMedicalConditions={setOtherMedicalConditions}
                setOldComplaint={setOldComplaint}
              />
              <input
                type="submit"
                className="book-submit"
                value="Save and Continue"
              />
            </form>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Problem;
