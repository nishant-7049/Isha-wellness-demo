import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const AdditionalInformation = ({values, functions, setActiveElement, handleSubmit, activeElement, formSubmitHandler}) => {
  const [isActive, setIsActive] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  
  const submitHandler = (e)=>{
    e.preventDefault()
    setIsCompleted(true)
    formSubmitHandler()
  }
  useEffect(()=>{
    setIsActive(activeElement=="additionalInformation")    
  },[activeElement]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between cursor-pointer' onClick={()=>{
      setActiveElement("additionalInformation")
      setIsActive(!isActive)
    }}>
        <div className={`flex items-center gap-4 sm:gap-2 ${isCompleted && 'text-[#00286b]'}`}>
          <div className={`w-6 h-6 font-semibold p-1 rounded-full border-2 flex justify-center items-center text-xs ${isCompleted ? 'border-[#00286b]': 'border-[#000000de]'}`}>{isCompleted?<IoMdCheckmark/>:4}</div>
          <h1 className='font-semibold'>Additional Details</h1>
        </div>
        {isActive?<FaChevronDown className={`${isCompleted && 'text-[#00286b]'}`}/>:<FaChevronRight className={`${isCompleted && 'text-[#00286b]'}`}/>}
      </div>
      {isActive && (
        <form className='flex justify-center items-center flex-wrap gap-4 mx-auto w-full' onSubmit={submitHandler}>
          <div className='flex flex-col w-1/3 flex-1'>
            <label>Education *</label>
            <select
                  className='p-1 bg-white border-2 rounded-md'
                  required
                  value={values[0]}
                  onChange={(e) => {
                    functions[0](e.target.value);
                  }}
                >
                  <option value="">Choose</option>
                   <option value="No formal education">
                     No formal education
                   </option>
                   <option value="Primary School">Primary School</option>
                   <option value="Middle or High School">
                     Middle or High School
                   </option>
                   <option value="Graduation">Graduation</option>
                   <option value="Post education or higher">
                     Post education or higher
                   </option>
                </select>
          </div>
          
          
          <div className='flex-shrink-0 w-full'>
            <input className='flex gap-2 py-1 px-2 ml-auto bg-[#00286b] text-white font-semibold cursor-pointer' type='submit'  value={"Continue"}/>
          </div>
        </form>
      )}
    </div>
  )
}

export default AdditionalInformation