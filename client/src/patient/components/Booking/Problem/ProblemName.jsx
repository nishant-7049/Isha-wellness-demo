import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

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
  // "Lifestyle and Habits",
  "Others",
];
const ProblemName = ({problem, setProblem, activeStatus, setActiveElement, setCompletedSections}) => {
  const [isActive, setIsActive] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const submitHandler = (e)=>{
    e.preventDefault()
    setCompletedSections((prev)=>({
      ...prev,
      "Problem Name": true
    }))
    setActiveElement("problemDetails")
    setIsCompleted(true)
  }
  useEffect(()=>{
    setIsActive(activeStatus)    
  },[activeStatus])
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between cursor-pointer' onClick={()=>{
      setActiveElement("problemName")
      setIsActive(!isActive)
    }}>
        <div className={`flex items-center gap-4 sm:gap-2 ${isCompleted && 'text-[#00286b]'}`}>
          <div className={`w-6 h-6 font-semibold p-1 rounded-full border-2 flex justify-center items-center text-xs ${isCompleted ? 'border-[#00286b]': 'border-[#000000de]'}`}>{isCompleted?<IoMdCheckmark/>:1}</div>
          <h1 className='font-semibold'>Problem</h1>
        </div>
        {isActive?<FaChevronDown className={`${isCompleted && 'text-[#00286b]'}`}/>:<FaChevronRight className={`${isCompleted && 'text-[#00286b]'}`}/>}
      </div>
      {isActive && (
        <form className='flex justify-center items-center flex-wrap gap-4 mx-auto w-full' onSubmit={submitHandler}>
          <div className='flex flex-col w-1/3 sm:w-full flex-1'>
            <label>Problem *</label>
            <select
                  className='p-1 bg-white border-2 rounded-md'
                  required
                  value={problem?.problem}
                  onChange={(e) => {
                    setProblem((prevValue)=>({
                      ...prevValue,
                      problem: e.target.value
                    }))
                  }}
                >
                  <option value="">Choose</option>
                  {problems.map((problem, index)=>(
                    <option value={problem} key={index}>{problem}</option>
                  ))}
                </select>
          </div>
          
          <div className='flex-shrink-0 w-full'>
            <button className='flex gap-2 py-1 px-2 ml-auto bg-[#00286b] text-white font-semibold' type='submit' >Next</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default ProblemName