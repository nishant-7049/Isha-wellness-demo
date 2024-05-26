import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";


const PersonalInformation = ({activeStatus, setActiveElement, values, functions, setCompletedSections}) => {
  const [isActive, setIsActive] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const submitHandler = (e)=>{
    e.preventDefault()
    setCompletedSections(prevValue=>({
      ...prevValue,
      "Personal Details": true
    }))
    setIsCompleted(true)
    setActiveElement("contactInformation")
  }
  useEffect(()=>{
    setIsActive(activeStatus)    
  },[activeStatus])
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between cursor-pointer' onClick={()=>{
      setActiveElement("personalInformation")
      setIsActive(!isActive)
    }}>
        <div className={`flex items-center gap-4 sm:gap-2 ${isCompleted && 'text-[#00286b]'}`}>
          <div className={`w-6 h-6 font-semibold p-1 rounded-full border-2 flex justify-center items-center text-xs ${isCompleted ? 'border-[#00286b]': 'border-[#000000de]'}`}>{isCompleted?<IoMdCheckmark/>:1}</div>
          <h1 className='font-semibold'>Personal Details</h1>
        </div>
        {isActive?<FaChevronDown className={`${isCompleted && 'text-[#00286b]'}`}/>:<FaChevronRight className={`${isCompleted && 'text-[#00286b]'}`}/>}
      </div>
      {isActive && (
        <form className='flex justify-center items-center flex-wrap gap-4 mx-auto w-fit' onSubmit={submitHandler}>
          <div className='flex flex-col w-1/4 grow sm:w-full flex-shrink-0'>
            <label>Name *</label>
            <input placeholder="Enter patient's full name." className='bg-white border-2 p-1 rounded-md' maxLength={30} type="text" required value={values[0]} onChange={(e)=>{
              functions[0](e.target.value)
            }} />
          </div>
          <div className='flex flex-col w-1/4 grow sm:w-1/3 sm:flex-1'>
            <label>Age *</label>
            <input placeholder= "Enter patient's age." className='bg-white border-2 p-1 rounded-md' max={120} type="number" required value={values[1]} onChange={(e)=>{
              functions[1](e.target.value)
            }} />
          </div>
          <div className='flex flex-col w-1/4 grow sm:w-1/3 sm:flex-1'>
            <label>Gender *</label>
            <select className='p-1 bg-white border-2 rounded-md' value={values[2]} required onChange={(e)=>{
              functions[2](e.target.value)
            }}>
              <option value="">Choose</option>  
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Transgender">Transgender</option>
              <option value="Prefer not to mention">
                     Prefer not to mention
              </option>
            </select> 
          </div>
          <div className='flex flex-col w-1/3 grow sm:w-full'>
            <label>Martial Status *</label>
            <select
                  className="bg-white p-1 border-2 rounded-md"
                  required
                  value={values[3]}
                  onChange={(e) => {
                    functions[3](e.target.value);
                  }}
                >
                  <option value="">Choose</option>

                  <option value="Married">Married</option>
                  <option value="Unmarried">Unmarried</option>
                  <option value="Saperated">Saperated</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
          </div>
          <div className='flex-shrink-0 w-full'>
            <input className='flex gap-2 py-1 px-2 ml-auto bg-[#00286b] text-white font-semibold cursor-pointer' type='submit' value={"Next"} />
          </div>
        </form>
      )}
    </div>
  )
}

export default PersonalInformation