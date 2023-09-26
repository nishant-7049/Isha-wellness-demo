import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPackages } from "../../store/slices/packageSlice";
import PackageCard from "../../admin/components/PackageCard";
import { updateBookingDetails } from "../../store/slices/bookingSlice";

const data = {
  part: [
    "Head",
    "Neck",
    "collar",
    "shoulder",
    "Chest",
    "Upper Back",
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
  ],
  problem: [
    "Choose",
    "Pain",
    "Paranthesia",
    "Stiffness",
    "Headache",
    "Migraine",
    "Vertigo",
    "Motion Sickness",
    "paralysis",
    "Other",
  ],
  occupation: [
    "goverment job",
    "private job",
    "daily wage",
    "farmer labour",
    "farmer(owrner)",
    "student",
    "other",
  ],
  HowYouGotToKnow: [
    "news paper",
    "google",
    "facilater",
    "pempplates",
    "social media",
    "patients",
    "doctor",
    "relatives or friends",
  ],
  work: ["Sitted", "Lie", "Stand", "Walking", "Travelling", "Weight Lifting"],
  batch: ["8:30-10:30", "10:30-12:30", "2:00-4:00", "4:00-6:00", "6:00-8:00"],
};

const BookNow = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { packages: pacs } = useSelector((state) => state.package);
  const { ref, inView } = useInView();
  const animation = useAnimation();

  const presentDate = new Date();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState();
  const [whatsapp, setWhatsapp] = useState();
  const [work, setWork] = useState();
  const [tempWork, setTempWork] = useState();
  const [age, setAge] = useState();
  const [problem, setProblem] = useState("");
  const [gender, setGender] = useState("");
  const [martial, setmartial] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [part, setPart] = useState("");
  const [education, setEducation] = useState("");
  const [packages, setPackage] = useState("");
  const [know, setKnow] = useState("");
  const [date, setDate] = useState(
    `${presentDate.getFullYear()}-${presentDate.getMonth()}-${presentDate.getDate()}`
  );
  const [batch, setBatch] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name,
      mobile,
      whatsapp,
      work: tempWork && work === "none" ? tempWork : work,
      age,
      problem,
      gender,
      martial,
      address,
      city,
      occupation,
      part,
      education,
      packages,
      know,
      date,
      batch,
    };
    localStorage.setItem("bookingDetails", JSON.stringify(data));
    dispatch(updateBookingDetails());
    navigate("/confirmBooking");
  };

  const { bookingDetails } = useSelector((state) => state.booking);

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        x: 0,
        transition: { type: "spring", duration: 0.5, bounce: 0.5 },
      });
    }
  }, [inView]);
  useEffect(() => {
    dispatch(getAllPackages());
    if (bookingDetails) {
      setName(bookingDetails.name);
      setMobile(bookingDetails.mobile);
      setWhatsapp(bookingDetails.whatsapp);
      setAge(bookingDetails.age);
      setAddress(bookingDetails.address);
      setCity(bookingDetails.city);
      setProblem(bookingDetails.problem);
      setGender(bookingDetails.gender);
      setmartial(bookingDetails.martial);
      setOccupation(bookingDetails.occupation);
      setPart(bookingDetails.part);
      setEducation(bookingDetails.education);
      setPackage(bookingDetails.packages);
      setWork(bookingDetails.work);
      setKnow(bookingDetails.know);
      setBatch(bookingDetails.batch);
    }
  }, [dispatch]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -200 }}
      animate={animation}
      className="bg-[#F0F0F0] pt-[6vmax] pb-[4vmax]"
    >
      <div className="shadow-lg p-[4vmax] w-[90%] mx-auto bg-white  border-2 pt-[2vmax]">
        <h1 className="text-3xl border-b-[#00286b] border-b-4 w-1/3 mx-auto mb-[4vmax]  text-center  pb-4  font-bold text-[#00286b]">
          Book Appointment
        </h1>
        <form
          className="h-[80vh] flex flex-col justify-between flex-wrap gap-4"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              Name
            </label>
            <input
              className="bg-white px-[1vmax] py-[0.7vmax] border-2"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter Patient Name."
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              Mobile No.
            </label>
            <input
              className="appearance-none bg-white px-[1vmax] py-[0.7vmax] border-2 "
              type="tel"
              required
              min={10}
              max={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter Your Mobile No."
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              Whatsapp No.
            </label>
            <input
              className="appearance-none bg-white px-[1vmax] py-[0.7vmax] border-2 "
              type="number"
              required
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
              placeholder="Enter Your Whatsapp No."
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              Age
            </label>
            <input
              className="bg-white px-[1vmax] py-[0.7vmax] border-2"
              type="number"
              required
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              placeholder="Enter Age of Patient."
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              {" "}
              Problem
            </label>
            <select
              required
              className="bg-white border-2 px-[1vmax] py-[0.7vmax]"
              value={problem}
              onChange={(e) => {
                setProblem(e.target.value);
              }}
            >
              {data.problem.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              {" "}
              gender
            </label>
            <select
              className="bg-white px-[1vmax] py-[0.7vmax] border-2"
              required
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <option value=""> Choose</option>
              <option value="Male"> Male</option>
              <option value="Female"> Female</option>
              <option value="Other"> Other</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              {" "}
              martial status
            </label>
            <select
              className="bg-white px-[1vmax] py-[0.7vmax] border-2"
              required
              value={martial}
              onChange={(e) => {
                setmartial(e.target.value);
              }}
            >
              <option value=""> Choose</option>
              <option value="married"> married</option>
              <option value="unmarried"> unmarried</option>
              <option value="divorced"> divorced</option>
              <option value="widow"> widow</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              Address
            </label>
            <textarea
              className="bg-white px-[1vmax] py-[0.7vmax] border-2"
              required
              placeholder="Enter Your Address in (House No., Street, City) format. "
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              City
            </label>
            <select
              className="bg-white px-[1vmax] py-[0.7vmax] border-2"
              required
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            >
              <option value="">Choose</option>
              <option value="Indore">Indore</option>
              <option value="Ratlam">Ratlam</option>
              <option value="Ahmedabad">Ahmedabad</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              {" "}
              occupation
            </label>
            <select
              className="bg-white px-[1vmax] py-[0.7vmax] border-2"
              required
              value={occupation}
              onChange={(e) => {
                setOccupation(e.target.value);
              }}
            >
              <option value="">Choose</option>
              {data.occupation.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              {" "}
              Part
            </label>
            <select
              className="bg-white px-[1vmax] py-[0.7vmax] border-2"
              required
              value={part}
              onChange={(e) => {
                setPart(e.target.value);
              }}
            >
              <option value="">Choose</option>
              {data.part.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              {" "}
              education
            </label>
            <select
              className="bg-white px-[1vmax] py-[0.7vmax] border-2 "
              required
              value={education}
              onChange={(e) => {
                setEducation(e.target.value);
              }}
            >
              <option value="">Choose</option>
              <option value="No education"> No education</option>
              <option value="primary education"> primary eduction</option>
              <option value="Secondary"> Secondary</option>
              <option value="Higher Secondary"> Higher Secondary</option>
              <option value="Graduation or PG"> Graduation or PG</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              {" "}
              packages
            </label>
            <select
              className="bg-white px-[1vmax] py-[0.7vmax] border-2"
              required
              value={packages}
              onChange={(e) => {
                setPackage(e.target.value);
              }}
            >
              <option value="">Choose</option>
              {pacs &&
                pacs.map((pac) => {
                  return (
                    <option key={pac._id} value={pac._id}>
                      {pac.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              Type of Work
            </label>
            <select
              value={work}
              className="bg-white px-[1vmax] py-[0.7vmax] border-2 "
              required
              onChange={(e) => {
                setWork(e.target.value);
              }}
            >
              <option value="">Choose</option>
              {data.work.map((w) => {
                return (
                  <option key={w} value={w}>
                    {w}
                  </option>
                );
              })}
              <option value="none">none of them</option>
            </select>
          </div>
          {work === "none" ? (
            <div className="flex flex-col">
              <label className="text-[#00286b] capitalize font-semibold">
                Specify if type of work is not given above
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setTempWork(e.target.value);
                }}
                className="bg-white px-[1vmax] py-[0.7vmax] border-2"
              />
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              How you get to known about IWC
            </label>
            <select
              className="bg-white px-[1vmax] py-[0.7vmax] border-2"
              required
              value={know}
              onChange={(e) => {
                setKnow(e.target.value);
              }}
            >
              <option value="">Choose</option>
              {data.HowYouGotToKnow.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              Date of Treatment
            </label>
            <input
              className="bg-white border-2 px-[1.5vmax] py-[0.7vmax]"
              type="date"
              value={date}
              min={`${presentDate.getFullYear()}-${presentDate.getMonth()}-${presentDate.getDate()}`}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#00286b] capitalize font-semibold">
              {" "}
              batch
            </label>
            <select
              className="bg-white px-[1vmax] py-[0.7vmax] border-2"
              value={batch}
              onChange={(e) => {
                setBatch(e.target.value);
              }}
            >
              {data.batch.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <input
            type="submit"
            value="Save & Continue"
            className=" bg-[#00286b] text-semibold px-[1vmax] py-[0.7vmax] text-white border-[#00286b] border-2 hover:bg-white hover:text-[#00286b]"
          />
        </form>
        <div className="my-[2vmax] flex gap-[3vmax] flex-wrap">
          {pacs &&
            pacs.map((pac) => {
              return <PackageCard pac={pac} role={"user"} />;
            })}
        </div>
      </div>
    </motion.div>
  );
};

export default BookNow;
