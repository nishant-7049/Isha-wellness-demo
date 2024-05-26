import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const activities = [
  "Completely bed ridden",
  "Can turn over bed",
  "Can sit with support",
  "Can sit independently",
  "Can stand with support",
  "Can stand independently",
  "Can walk with support",
  "Can walk independently",
];
const works = [
  "Urine",
  "Stool",
  "Bath",
  "Dressing",
  "Eat",
  "Mobile",
  "TV Remote",
];

const inputForProblem = {
    tone: ["Paralysis"],
    activity: ["Multiple sclerosis", "Paralysis"],
    work: ["Multiple sclerosis", "Paralysis"]
}

const PatientFunctionality = ({activeStatus, setActiveElement, problem, setProblem, setCompletedSections}) => {
  const [isActive, setIsActive] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const multipleSelect = (value)=>{
    if(!problem.work){
      setProblem((prev)=>({
        ...prev,
        work : []
      }))
    }
    if(problem.work.includes(value)){
      const filteredArray = problem?.work?.filter((v)=>v!==value)
      setProblem((prev)=>({
        ...prev,
        work: filteredArray
      }))
    }else{
      setProblem((prev)=>({
        ...prev,
        work: [...problem.work, value]
      }))
    }
  }
  const submitHandler = (e)=>{
    e.preventDefault()
    setCompletedSections((prev)=>({
      ...prev,
      "Patient Functionality": true
    }))
    setActiveElement("medicalHistoryDetails")
    setIsCompleted(true)
  }
  useEffect(()=>{
    setIsActive(activeStatus)    
  },[activeStatus])
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between cursor-pointer' onClick={()=>{
      setActiveElement("patientFunctionaliy")
      setIsActive(!isActive)
    }}>
        <div className={`flex items-center gap-4 sm:gap-2 ${isCompleted && 'text-[#00286b]'}`}>
          <div className={`w-6 h-6 font-semibold p-1 rounded-full border-2 flex justify-center items-center text-xs ${isCompleted ? 'border-[#00286b]': 'border-[#000000de]'}`}>{isCompleted?<IoMdCheckmark/>:5}</div>
          <h1 className='font-semibold'>Patient Functionality</h1>
        </div>
        {isActive?<FaChevronDown className={`${isCompleted && 'text-[#00286b]'}`}/>:<FaChevronRight className={`${isCompleted && 'text-[#00286b]'}`}/>}
      </div>
      {isActive && (
        <form className='flex justify-center items-center flex-wrap gap-4 mx-auto w-full' onSubmit={submitHandler}>
          {inputForProblem.tone.includes(problem?.problem) &&
          <div className='flex flex-col sm:w-full w-1/4 grow'>
            <label>Muscle Tone *</label>
            <input placeholder="Enter patient's muscle tone 0(Flaccid)-10(Rigid)" className='p-1 bg-white border-2 rounded-md' type="number" min={0} max={10} value={problem?.tone} onChange={(e)=>{setProblem((prev)=>({
              ...prev,
              tone: e.target.value
            }))}}/>
          </div>
          }
          {inputForProblem.activity.includes(problem?.problem) &&
          <div className='flex flex-col sm:w-1/3 w-1/4 grow'>
            <label>Activity Status *</label>
            <select className='p-1 bg-white border-2 rounded-md' value={problem?.activity} required onChange={(e)=>{
              setProblem((prev)=>({
                ...prev,
                activity: e.target.value
              }))
            }}>
              <option value="">Choose</option>  
              {activities.map((activity, index)=>(
                <option value={activity} key={index}>{activity}</option>
              ))}
            </select> 
          </div>
          }
          {inputForProblem.work.includes(problem?.problem) && <div className='flex flex-col sm:w-1/3 w-1/4 grow'>
            <label>Personal work which can be done by the person *</label>
            <select className='p-1 bg-white border-2 rounded-md' value={problem?.work} onChange={()=>{}} multiple required>
              <option value="">Choose</option>  
              {works.map((work, index)=>(
                <option value={work} key={index} onClick={(e)=>{multipleSelect(e.target.value)}}>{work}</option>
              ))}
            </select> 
          </div>}
          
          <div className='flex-shrink-0 w-full'>
            <button className='flex gap-2 py-1 px-2 ml-auto bg-[#00286b] text-white font-semibold' type='submit'>Next</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default PatientFunctionality