import React, { useEffect, useState } from "react";
import Consent from "./Consent";
import Container from "./BookingForm"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, setError, updatePersonalInfo } from "../../../store/slices/bookingSlice";
import {  createEnquiry } from "../../../store/slices/enquirySlice";
import PersonalInformation from "./Personal/PersonalInformation";
import ContactInformation from "./Personal/ContactInformation";
import ServiceDetails from "./Personal/ServiceDetails";
import AdditionalInformation from "./Personal/AdditionalInformation";
import ErrorAlert from "../../../auth/ErrorAlert";

const Personal = () => {
  const dispatch = useDispatch();
  const [activeElement, setActiveElement] = useState("personalInformation")
  const { personalInfo, error } = useSelector((state) => state.booking);
  const {user} = useSelector((state)=> state.user)
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [city2, setCity2] = useState("");
  const [phone, setPhone] = useState();
  const [whatsapp, setWhatsapp] = useState();
  const [martial, setMartial] = useState("");
  const [education, setEducation] = useState("");
  const [location, setLocation] = useState("");
  const [completedSections, setCompletedSections] = useState({
    "Personal Details": false,
    "Contact Details": false,
    "Service Details": false
  })

  useEffect(() => {
    if (personalInfo) {
      setName(personalInfo.name);
      setAge(personalInfo.age);
      setGender(personalInfo.gender);
      setAddress(personalInfo.address);
      setCity(personalInfo.city);
      setPhone(personalInfo.phone);
      if (personalInfo.whatsapp) {
        setWhatsapp(personalInfo.whatsapp);
      }
      setMartial(personalInfo.martial);
      setEducation(personalInfo.education);
      setLocation(personalInfo.location);
    }
  }, [personalInfo]);

  const handleSubmit = () => {
    for(let section in completedSections){
      if(!completedSections[section]){
        dispatch(setError(`${section} is not filled completely.`))
        return
      }
    }
    const data = {
      name,
      age,
      gender,
      address,
      city: city == "Other" && city2 ? city2 : city,
      location,
      phone,
      whatsapp,
      martial,
      education,
    };
    localStorage.setItem("personalInfo", JSON.stringify(data));
    dispatch(updatePersonalInfo());
    dispatch(createEnquiry(data));
    if(error){
      setTimeout(()=>{
        navigate("/book/problemform");
      },3000)
    }else{
      navigate("/book/problemform")
    }
  };
  return (
    <div className={`bg-[#00286b10] w-full min-h-screen flex justify-center items-center`}>
      <Consent/>
      <div className={`w-3/5 min-h-[60vh] bg-white shadow-xl py-4 px-8 flex flex-col gap-4 sm:w-full sm:min-h-screen ${(user?.role == "user" && !user?.isIncharge)?'sm:pt-20':'sm:pt-8'}`} >
        <h1 className="text-xl font-semibold border-b-2 text-[#00286b] border-[#00286b]">Personal Information</h1>
        <PersonalInformation setActiveElement={setActiveElement} activeStatus={activeElement=="personalInformation"} values={[name, age, gender, martial]} functions={[setName, setAge, setGender, setMartial] } setCompletedSections={setCompletedSections}/>
        <ContactInformation setActiveElement={setActiveElement} activeStatus={activeElement=="contactInformation"} values={[address, phone, whatsapp]} functions={[setAddress, setPhone, setWhatsapp]} setCompletedSections={setCompletedSections}/>
        <ServiceDetails setActiveElement={setActiveElement} activeStatus={activeElement=="serviceDetails"} values={[city, location]} functions={[setCity, setLocation]} setCompletedSections={setCompletedSections}/>
        <AdditionalInformation setActiveElement={setActiveElement} activeElement={activeElement} values={[education]} functions={[setEducation]} handleSubmit={handleSubmit} formSubmitHandler={handleSubmit}/>
      </div>
        <ErrorAlert message={error} alert clearError={clearError}/>
    </div>
    // <Container>
    //   <div className="container">
    //     <Consent />
    //     <div className="form-with-head">
    //       <h1 className="book-head">Personal Information</h1>

    //       <form className="book-form" onSubmit={handleSubmit}>
    //         <div className="book-input-container">
    //           <div className="input-container">
    //             <label className="label-head">Name:</label>
    //             <input
    //               className="book-input"
    //               type="text"
    //               placeholder="Enter Patients Name."
    //               maxLength="50"
    //               required
    //               value={name}
    //               onChange={(e) => {
    //                 setName(e.target.value);
    //               }}
    //             />
    //           </div>
    //           <div className="input-container">
    //             <label className="label-head">Age:</label>
    //             <input
    //               className="book-input"
    //               type="number"
    //               maxLength="3"
    //               placeholder="Enter Patients Age."
    //               required
    //               value={age}
    //               onChange={(e) => {
    //                 setAge(e.target.value);
    //               }}
    //             />
    //           </div>
    //           <div className="input-container">
    //             <label className="label-head">Gender:</label>
    //             <select
    //               className="book-input"
    //               required
    //               value={gender}
    //               onChange={(e) => {
    //                 setGender(e.target.value);
    //               }}
    //             >
    //               <option value="">Choose</option>
    //               <option value="Male">Male</option>
    //               <option value="Female">Female</option>
    //               <option value="Transgender">Transgender</option>
    //               <option value="Prefer not to mention">
    //                 Prefer not to mention
    //               </option>
    //             </select>
    //           </div>
    //           <div className="input-container">
    //             <label className="label-head">Address:</label>
    //             <textarea
    //               className="book-input"
    //               required
    //               maxLength="100"
    //               placeholder="Enter your address (House No., Street)"
    //               value={address}
    //               onChange={(e) => {
    //                 setAddress(e.target.value);
    //               }}
    //             />
    //           </div>
    //           <div className="input-container">
    //             <label className="label-head">
    //               City (Services provided to this cities, mention your if not
    //               given):
    //             </label>
    //             <select
    //               className="book-input"
    //               required
    //               value={city}
    //               onChange={(e) => {
    //                 setCity(e.target.value);
    //               }}
    //             >
    //               <option value="">Choose</option>
    //               <option value="Indore">Indore</option>
    //               <option value="Ratlam">Ratlam</option>
    //               <option value="Jaora">Jaora</option>
    //               <option value="Ahmedabad">Ahmedabad</option>
    //               <option value="Other">Other</option>
    //             </select>
    //           </div>
    //           {city == "Other" && (
    //             <div className="input-container">
    //               <label className="label-head">Other City:</label>
    //               <input
    //                 type="text"
    //                 maxLength={30}
    //                 className="book-input"
    //                 placeholder="Enter your city."
    //                 required
    //                 value={city2}
    //                 onChange={(e) => {
    //                   setCity2(e.target.value);
    //                 }}
    //               />
    //             </div>
    //           )}
    //           <div className="input-container">
    //             <label className="label-head">Location Preference:</label>
    //             <select
    //               className="book-input"
    //               value={location}
    //               required
    //               onChange={(e) => {
    //                 setLocation(e.target.value);
    //               }}
    //             >
    //               <option value="">Choose</option>
    //               <option value="Center">Center</option>
    //               <option value="Visit Address">Visit Address</option>
    //             </select>
    //           </div>
    //           <div className="input-container">
    //             <label className="label-head">Phone No.:</label>
    //             <input
    //               required
    //               className="book-input"
    //               type="phone"
    //               maxLength="10"
    //               minLength="10"
    //               placeholder="Enter Patient's Phone Number"
    //               value={phone}
    //               onChange={(e) => {
    //                 setPhone(e.target.value);
    //               }}
    //             />
    //           </div>
    //           <div className="input-container">
    //             <label className="label-head">Whatsapp No. (optional):</label>
    //             <input
    //               className="book-input"
    //               type="phone"
    //               placeholder="Enter Patient's Whatsapp Number"
    //               value={whatsapp}
    //               onChange={(e) => {
    //                 setWhatsapp(e.target.value);
    //               }}
    //             />
    //           </div>
    //           <div className="input-container">
    //             <label className="label-head">Martial Status:</label>
    //             <select
    //               className="book-input"
    //               required
    //               value={martial}
    //               onChange={(e) => {
    //                 setMartial(e.target.value);
    //               }}
    //             >
    //               <option value="">Choose</option>

    //               <option value="Married">Married</option>
    //               <option value="Unmarried">Unmarried</option>
    //               <option value="Saperated">Saperated</option>
    //               <option value="Divorced">Divorced</option>
    //               <option value="Widowed">Widowed</option>
    //             </select>
    //           </div>
    //           <div className="input-container">
    //             <label className="label-head">Education:</label>
    //             <select
    //               className="book-input"
    //               required
    //               value={education}
    //               onChange={(e) => {
    //                 setEducation(e.target.value);
    //               }}
    //             >
    //               <option value="">Choose</option>
    //               <option value="No formal education">
    //                 No formal education
    //               </option>
    //               <option value="Primary School">Primary School</option>
    //               <option value="Middle or High School">
    //                 Middle or High School
    //               </option>
    //               <option value="Graduation">Graduation</option>
    //               <option value="Post education or higher">
    //                 Post education or higher
    //               </option>
    //             </select>
    //           </div>
    //         </div>
    //         <input
    //           className="book-submit"
    //           type="submit"
    //           value="Save and Continue"
    //         />
    //       </form>
    //     </div>
    //   </div>
    // </Container>
    
  );
};

export default Personal;
