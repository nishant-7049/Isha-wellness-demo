import React, { useEffect, useState } from "react";
import Consent from "./Consent";
import { useDispatch, useSelector } from "react-redux";
import { clearError, setError, updatePresentingComplaints } from "../../../store/slices/bookingSlice";
import { useNavigate } from "react-router-dom";
import ProblemName from "./Problem/ProblemName";
import ProblemDetails from "./Problem/ProblemDetails";
import DurationAndConsultation from "./Problem/DurationAndConsultation";
import AdditionalDetails from "./Problem/AdditionalDetail";
import PatientFunctionality from "./Problem/PatientFunctionality";
import MedicalHistoryDetails from "./Problem/MedicalHistoryDetails";
import ErrorAlert from "../../../auth/ErrorAlert";

const dataToSubmit = {
  part: [
    "Pain",
    "Parasthesia",
    "Stiffness",
    "Multiple sclerosis",
  ],
  side: [
    "Pain",
    "Parasthesia",
    "Stiffness",
    "Headache",
    "Migraine",
    "Vertigo",
    "Motion Sickness",
    "Multiple sclerosis",
    "Paralysis",
  ],
  aspect: [
    "Pain",
    "Parasthesia",
  ],
  psr: [
    "Pain",
    "Parasthesia",
    "Stiffness",
    "Headache",
    "Migraine",
    "Vertigo",
    "Motion Sickness",
    "Multiple sclerosis",
    "Paralysis",
    "Others",
  ],
  type: [
    "Paralysis",
  ],
  paralysisType: [
    "Paralysis",
  ],
  since: [
    "Pain",
    "Parasthesia",
    "Stiffness",
    "Headache",
    "Migraine",
    "Vertigo",
    "Motion Sickness",
    "Multiple sclerosis",
    "Paralysis",
    "Others",
  ],
  consult: [
    "Pain",
    "Parasthesia",
    "Stiffness",
    "Headache",
    "Migraine",
    "Vertigo",
    "Motion Sickness",
    "Multiple sclerosis",
    "Paralysis",
    "Others",
  ],
  cause: [
    "Pain",
    "Parasthesia",
    "Stiffness",
    "Headache",
    "Migraine",
    "Vertigo",
    "Motion Sickness",
    "Multiple sclerosis",
    "Paralysis",
    "Others",
  ],
  inv: [
    "Pain",
    "Parasthesia",
    "Stiffness",
    "Headache",
    "Migraine",
    "Vertigo",
    "Motion Sickness",
    "Multiple sclerosis",
    "Others",
  ],
  tone: [
    "Paralysis",
  ],
  activity: [
    "Multiple sclerosis",
    "Paralysis",
  ],
  work: [
    "Multiple sclerosis",
    "Paralysis",
  ],
  otherComplaints: [
    "Pain",
    "Parasthesia",
    "Stiffness",
    "Headache",
    "Migraine",
    "Vertigo",
    "Motion Sickness",
    "Multiple sclerosis",
    "Paralysis",
    "Others",
  ],
  otherMedicalConditions: [
    "Pain",
    "Parasthesia",
    "Stiffness",
    "Headache",
    "Migraine",
    "Vertigo",
    "Motion Sickness",
    "Multiple sclerosis",
    "Paralysis",
    "Others",
  ],
  oldComplaint: [
    "Pain",
    "Parasthesia",
    "Stiffness",
    "Headache",
    "Migraine",
    "Vertigo",
    "Motion Sickness",
    "Multiple sclerosis",
    "Paralysis",
    "Others",
  ],
}

const Problem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeElement, setActiveElement] = useState("problemName")
  const { presentingComplaints: pc, error } = useSelector((state) => state.booking);
  const {user} = useSelector((state)=> state.user)

  const [problem, setProblem] = useState({})

  const [completedSections, setCompletedSections] = useState({
    "Problem Name": false,
    "Problem Details": false,
    "Duration And Consultation": false,
    "Additional Details": false,
    "Patient Functionality": false,
  })

  // const submitLifestyle = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     problem,
  //     otherComplaints,
  //     otherMedicalConditions,
  //     oldComplaint,
  //   };
  //   
  // };

  const submitHandler = ()=>{
    if(pc){
      const data = {
        problem: problem?.problem
      }
      for(let input in dataToSubmit){
        if(dataToSubmit[input].includes(problem?.problem)){
          data[input] = problem[input]
        }
      }
      for(let section in completedSections){
        if(!completedSections[section]){
          if(section == "Patient Functionality" && (problem?.problem !== "Multiple sclerosis" && problem?.problem !== "Paralysis")){
            continue
          }
          dispatch(setError(`${section} is not filled completely`))

        }
      }
      localStorage.setItem("presentingComplaints", JSON.stringify(data));
      dispatch(updatePresentingComplaints());
      navigate("/book/measures");
    }
  }
  useEffect(() => {
    if (pc) {
      const tempObject = {}
      for(let complaint in pc){
        tempObject[complaint] = pc[complaint]
      }
      setProblem(tempObject) 
    }
  }, [pc]);

  return (
    <div className={`bg-[#00286b10] w-full min-h-screen flex justify-center items-center`}>
      <Consent/>
      <div className={`w-3/5 min-h-[60vh] bg-white shadow-xl py-4 px-8 flex flex-col gap-4 sm:w-full sm:min-h-screen ${(user?.role == "user" && !user?.isIncharge)?'sm:pt-20':'sm:pt-8'}`} >
        <h1 className="text-xl font-semibold border-b-2 text-[#00286b] border-[#00286b]">Health Complaints</h1>
        <ProblemName setActiveElement={setActiveElement} activeStatus={activeElement=="problemName"} problem={problem} setProblem={setProblem} setCompletedSections={setCompletedSections}/>
        <ProblemDetails setActiveElement={setActiveElement} activeStatus={activeElement=="problemDetails"} problem={problem} setProblem={setProblem} setCompletedSections={setCompletedSections}/>
        <DurationAndConsultation setActiveElement={setActiveElement} activeStatus={activeElement=="durationAndConsultation"} problem={problem} setProblem={setProblem} setCompletedSections={setCompletedSections}/>
        <AdditionalDetails setActiveElement={setActiveElement} activeStatus={activeElement=="additionalDetails"} problem={problem} setProblem={setProblem} setCompletedSections={setCompletedSections}/>
        {(problem?.problem == "Multiple sclerosis" || problem?.problem == "Paralysis") && 
          <PatientFunctionality setActiveElement={setActiveElement} activeStatus={activeElement=="patientFunctionality"} problem={problem} setProblem={setProblem} setCompletedSections={setCompletedSections}/>
        }
        <MedicalHistoryDetails setActiveElement={setActiveElement} activeStatus={activeElement=="medicalHistoryDetails"} problem={problem} setProblem={setProblem} formSubmitHandler={submitHandler} setCompletedSections={setCompletedSections}/>
      </div>
      <ErrorAlert message={error} alert clearError={clearError}/>
    </div>

  );
};

export default Problem;
