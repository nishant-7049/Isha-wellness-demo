import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const parts = [
  "Head",
  "Neck",
  "collar",
  "shoulder",
  "Chest",
  "Upper  Back",
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
const sides = [
  "Left",
  "Right",
  "Bilateral",
  "Center"
]
const aspects = [
  "Lateral",
  "Medial",
  "Anterior",
  "Posterior"  
]
const paralysisTypes = [
  "Quadriplegia",
  "Paraplegia",
  "Hemiplegia",
  "Monoplegia"
]

const inputForProblem = {
    part: ["Pain", "Parasthesia", "Stiffness", "Multiple sclerosis"],
    side: ["Pain", "Parasthesia", "Stiffness", "Multiple sclerosis"],
    aspect: ["Pain", "Parasthesia"],
    type: ["Paralysis"],
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
    ]
}

const MedicalHistoryDetails = ({activeStatus, setActiveElement, problem, setProblem, formSubmitHandler}) => {
  const [isActive, setIsActive] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const submitHandler = (e)=>{
    e.preventDefault()
    formSubmitHandler()
  }
  useEffect(()=>{
    setIsActive(activeStatus)    
  },[activeStatus])
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between cursor-pointer' onClick={()=>{
      setActiveElement("medicalHistoryDetails")
      setIsActive(!isActive)
    }}>
        <div className={`flex items-center gap-4 sm:gap-2 ${isCompleted && 'text-[#00286b]'}`}>
          <div className={`w-6 h-6 font-semibold p-1 rounded-full border-2 flex justify-center items-center text-xs ${isCompleted ? 'border-[#00286b]': 'border-[#000000de]'}`}>{isCompleted?<IoMdCheckmark/>:problem=="Paralysis"||problem=="Multiple sclerosis"?6:5}</div>
          <h1 className='font-semibold'>Medical History Details</h1>
        </div>
        {isActive?<FaChevronDown className={`${isCompleted && 'text-[#00286b]'}`}/>:<FaChevronRight className={`${isCompleted && 'text-[#00286b]'}`}/>}
      </div>
      {isActive && (
        <form className='flex justify-center items-center flex-wrap gap-4 mx-auto w-full' onSubmit={submitHandler}>
          <div className='flex flex-col sm:w-1/3 w-1/4 grow'>
            <label>Other Complaints</label>
            <input placeholder="Enter patient's other complaints" maxLength={300} type="text" className='p-1 bg-white border-2 rounded-md' value={problem?.otherComplaints} onChange={(e)=>{setProblem((prev)=>({
              ...prev,
              otherComplaints: e.target.value
            }))}}/>
          </div>
          <div className='flex flex-col sm:w-1/3 w-1/4 grow'>
            <label>Other Medical Conditions</label>
            <input placeholder="Enter patient's other medical complaints" maxLength={300} type="text" className='p-1 bg-white border-2 rounded-md' value={problem?.otherMedicalConditions} onChange={(e)=>{setProblem((prev)=>({
              ...prev,
              otherMedicalConditions: e.target.value
            }))}}/>
          </div>
          
          <div className='flex flex-col sm:w-1/3 w-1/4 grow'>
            <label>Other Old Complaint or Operation</label>
            <input placeholder="Enter patient's other old complaints or Operations done" maxLength={300} type="text" className='p-1 bg-white border-2 rounded-md' value={problem?.oldComplaint} onChange={(e)=>{setProblem((prev)=>({
              ...prev,
              oldComplaint: e.target.value
            }))}}/>
          </div>
          
          <div className='flex-shrink-0 w-full'>
            <input className='flex gap-2 py-1 px-2 ml-auto bg-[#00286b] text-white font-semibold' type='submit' />
          </div>
        </form>
      )}
    </div>
  )
}

export default MedicalHistoryDetails