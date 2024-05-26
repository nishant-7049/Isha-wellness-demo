import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const ContactInformation = ({values, functions, activeStatus, setActiveElement, setCompletedSections}) => {
  const [isActive, setIsActive] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  useEffect(()=>{
    setIsActive(activeStatus)    
  },[activeStatus])
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between cursor-pointer' onClick={()=>{
      setActiveElement("contactInformation")
      setIsActive(!isActive)
    }}>
        <div className={`flex items-center gap-4 sm:gap-2 ${isCompleted && 'text-[#00286b]'}`}>
          <div className={`w-6 h-6 font-semibold p-1 rounded-full border-2 flex justify-center items-center text-xs ${isCompleted ? 'border-[#00286b]': 'border-[#000000de]'}`}>{isCompleted?<IoMdCheckmark/>:2}</div>
          <h1 className='font-semibold'>Contact Details</h1>
        </div>
        {isActive?<FaChevronDown className={`${isCompleted && 'text-[#00286b]'}`}/>:<FaChevronRight className={`${isCompleted && 'text-[#00286b]'}`}/>}
      </div>
      {isActive && (
        <form className='flex justify-center items-center flex-wrap gap-4 mx-auto w-full' onSubmit={(e)=>{
          e.preventDefault()
          setCompletedSections(prevValue=>({
            ...prevValue,
            "Contact Details": true
          }))
          setIsCompleted(true)
          setActiveElement("serviceDetails")
        }}>
          <div className='flex flex-col w-full flex-shrink-0'>
            <label>Address *</label>
            <input placeholder="Enter patient's address" className='bg-white border-2 p-1 rounded-md' maxLength={100} type="text" required value={values[0]} onChange={(e)=>{
              functions[0](e.target.value)
            }} />
          </div>
          <div className='flex flex-col w-1/3 grow sm:flex-1'>
            <label>Phone No. *</label>
            <input placeholder="Enter patient's phone number" className='bg-white border-2 p-1 rounded-md' maxLength={10} minLength={10} type="number" required value={values[1]} onChange={(e)=>{
              functions[1](e.target.value)
            }} />
          </div>
          <div className='flex flex-col w-1/3 grow sm:flex-1'>
            <label>Whatsapp No. </label>
            <input placeholder="Enter patient's whatsapp number" type='number' maxLength={10} minLength={10} className='p-1 bg-white border-2 rounded-md' value={values[2]} onChange={(e)=>{
              functions[2](e.target.value)
            }}/>
              
          </div>
          
          <div className='flex-shrink-0 w-full'>
            <button className='flex gap-2 py-1 px-2 ml-auto bg-[#00286b] text-white font-semibold cursor-pointer' type='submit'>Next</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default ContactInformation