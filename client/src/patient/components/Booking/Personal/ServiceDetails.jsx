import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const ServiceDetails = ({values, functions, activeStatus, setActiveElement, setCompletedSections}) => {
  const [isActive, setIsActive] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const submitHandler = (e)=>{
    e.preventDefault()
    setCompletedSections(prevValue=>({
      ...prevValue,
      "Service Details": true
    }))
    setIsCompleted(true)
    setActiveElement("additionalInformation")

  }
  useEffect(()=>{
    setIsActive(activeStatus)    
  },[activeStatus])
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between cursor-pointer' onClick={()=>{
      setActiveElement("serviceDetails")
      setIsActive(!isActive)
    }}>
        <div className={`flex items-center gap-4 sm:gap-2 ${isCompleted && 'text-[#00286b]'}`}>
          <div className={`w-6 h-6 font-semibold p-1 rounded-full border-2 flex justify-center items-center text-xs ${isCompleted ? 'border-[#00286b]': 'border-[#000000de]'}`}>{isCompleted?<IoMdCheckmark/>:3}</div>
          <h1 className='font-semibold'>Service Details</h1>
        </div>
        {isActive?<FaChevronDown className={`${isCompleted && 'text-[#00286b]'}`}/>:<FaChevronRight className={`${isCompleted && 'text-[#00286b]'}`}/>}
      </div>
      {isActive && (
        <form className='flex justify-center items-center flex-wrap gap-4 mx-auto w-full' onSubmit={submitHandler}>
          <div className='flex flex-col w-1/3 sm:w-full flex-1'>
            <label>City *</label>
            <select
                  className='p-1 bg-white border-2 rounded-md'
                  required
                  value={values[0]}
                  onChange={(e) => {
                    functions[0](e.target.value);
                  }}
                >
                  <option value="">Choose</option>

                  <option value="Indore">Indore</option>
                  <option value="Ratlam">Ratlam</option>
                  <option value="Jaora">Jaora</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                </select>
          </div>
          <div className='flex flex-col w-1/3 sm:w-1/3 flex-1'>
            <label>Location Preferance *</label>
            <select
                  className='p-1 bg-white border-2 rounded-md'
                  value={values[1]}
                  required
                  onChange={(e) => {
                    functions[1](e.target.value);
                  }}
                >
                  <option value="">Choose</option>
                  <option value="Center">Center</option>
                  <option value="Visit Address">Visit Address</option>
            </select>
          </div>
          
          <div className='flex-shrink-0 w-full'>
            <input className='flex gap-2 py-1 px-2 ml-auto bg-[#00286b] text-white font-semibold cursor-pointer' type='submit' value={"Next"}/>
          </div>
        </form>
      )}
    </div>
  )
}

export default ServiceDetails