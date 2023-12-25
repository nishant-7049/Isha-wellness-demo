import React, { useEffect, useState } from "react";
import Container from "./BookingForm";
import Consent from "./Consent";
import { getAllPackages } from "../../../store/slices/packageSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  updateAdminForm,
  updateDateAndTime,
  updateOccupation,
} from "../../../store/slices/bookingSlice";
import PackageCard from "../../../admin/components/PackageCard";
import { useNavigate } from "react-router-dom";

const occs = [
  "Business",
  "Government Employee",
  "Private Employee",
  "Daily Wage Worker (Other than farm labour)",
  "Farm Labour",
  "Farmer (Land Owner)",
  "Housewife",
  "Student",
  "Retired",
  "Other",
];
const works = [
  "Sitting",
  "Standing",
  "Walking",
  "Travel",
  "Weight Lifting",
  "Lying",
  "Other",
];
const knows = [
  "News Paper",
  "Google",
  "Pemphlets",
  "Social Media",
  "Facilitator",
  "Patient",
  "Doctor",
  "Friend or Family",
  "Other",
];
const batchs = [
  {
    label: "8:30-10:30",
    value: (8 + 1 / 2) * 60 * 60 * 1000,
  },
  {
    label: "10:30-12:30",
    value: (10 + 1 / 2) * 60 * 60 * 1000,
  },
  {
    label: "2:00-4:00",
    value: 14 * 60 * 60 * 1000,
  },
  {
    label: "4:00-6:00",
    value: 16 * 60 * 60 * 1000,
  },
  {
    label: "6:00-8:00",
    value: 18 * 60 * 60 * 1000,
  },
];
const Occupation = () => {
  const { packages: pacs } = useSelector((state) => state.package);
  const {
    occupation: occ,
    adminForm,
    dateAndTime,
  } = useSelector((state) => state.booking);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [occupation, setOccupation] = useState("");
  const [occupation2, setOccupation2] = useState("");
  const [work, setWork] = useState("");
  const [work2, setWork2] = useState("");
  const [experience, setExperience] = useState("");
  const [getToKnow, setGetToKnow] = useState("");
  const [getToKnow2, setGetToKnow2] = useState("");
  const [pac, setPac] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      occupation:
        occupation == "Other" && occupation2 ? occupation2 : occupation,
      work: work == "Other" && work2 ? work2 : work,
      experience,
    };
    localStorage.setItem("occupation", JSON.stringify(data));
    const admin = {
      getToKnow: getToKnow == "Other" && getToKnow2 ? getToKnow2 : getToKnow,
    };
    localStorage.setItem("getToKnow", JSON.stringify(admin));

    const adminData = {
      getToKnow,
    };
    localStorage.setItem("adminForm", JSON.stringify(adminData));
    dispatch(updateOccupation());
    dispatch(updateAdminForm());
    const timeData = {
      package: pac,
      dateAndTime: new Date(
        new Date(dateInput).getTime() -
          (5 + 1 / 2) * 60 * 60 * 1000 +
          parseInt(batch)
      ),
    };
    localStorage.setItem("pacAndTime", JSON.stringify(timeData));
    dispatch(updateDateAndTime());
    navigate("/book/confirmBooking");
  };

  const tomorrowDate = Date.now() + 1 * 24 * 60 * 60 * 1000;
  const [dateInput, setDateInput] = useState(
    new Date(tomorrowDate).toISOString().split("T")[0]
  );

  const [batch, setBatch] = useState(0);
  useEffect(() => {
    dispatch(getAllPackages());
  }, []);
  useEffect(() => {
    if (occ) {
      setOccupation(occ.occupation);
      setExperience(occ.experience);
      setWork(occ.work);
    }
  }, [occ]);
  useEffect(() => {
    if (adminForm) {
      setGetToKnow(adminForm.getToKnow);
    }
  }, [adminForm]);
  useEffect(() => {
    if (dateAndTime && dateAndTime.dateAndTime) {
      setPac(dateAndTime.package);
      setDateInput(
        new Date(dateAndTime.dateAndTime).toISOString().split("T")[0]
      );
      setBatch(
        new Date(dateAndTime.dateAndTime).getHours() * 60 * 60 * 1000 +
          new Date(dateAndTime.dateAndTime).getMinutes() * 60 * 1000
      );
    }
  }, [dateAndTime]);
  return (
    <Container>
      <div className="container">
        <Consent />
        <div className="form-with-head">
          <form className="book-form" onSubmit={submitHandler}>
            <h1 className="text-[#00286b] text-xl font-bold border-b-2 mx-auto w-fit border-[#00286b] mt-4">
              Occupation Details
            </h1>
            <div className="book-input-container">
              <div className="input-container mx-auto my-4">
                <label className="label-head">Occupation:</label>
                <select
                  className="book-input"
                  required
                  value={occupation}
                  onChange={(e) => {
                    setOccupation(e.target.value);
                  }}
                >
                  <option value="">Choose</option>
                  {occs.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              {occupation == "Other" && (
                <div className="input-container mx-auto my-4">
                  <label className="label-head">
                    Other occupation (if not available):
                  </label>
                  <input
                    type="text"
                    className="book-input"
                    value={occupation2}
                    onChange={(e) => setOccupation2(e.target.value)}
                    maxLength={20}
                    required
                    placeholder="Enter your occupation if not available on list."
                  />
                </div>
              )}
              <div className="input-container mx-auto my-4">
                <label className="label-head">Type of Work:</label>
                <select
                  className="book-input"
                  required
                  value={work}
                  onChange={(e) => {
                    setWork(e.target.value);
                  }}
                >
                  <option value="">Choose</option>
                  {works.map((w) => (
                    <option value={w} key={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
              {work == "Other" && (
                <div className="input-container mx-auto my-4">
                  <label className="label-head">
                    Other work (if not available):
                  </label>
                  <input
                    type="text"
                    className="book-input"
                    value={work2}
                    onChange={(e) => setWork2(e.target.value)}
                    maxLength={20}
                    required
                    placeholder="Enter your work if not available on list."
                  />
                </div>
              )}
              <div className="input-container mx-auto my-4">
                <label className="label-head">
                  Work experience of this type of work (in a months):
                </label>
                <input
                  type="number"
                  className="book-input"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  min={0}
                  max={720}
                  required
                  placeholder="Enter your work if not available on list."
                />
              </div>
            </div>
            <h1 className="text-[#00286b] text-xl font-bold border-b-2 mx-auto w-fit border-[#00286b] mt-4">
              Admin Questions
            </h1>
            <div className="book-input-container ">
              <div className="input-container">
                <label className="label-head">
                  How you came to know about IWC?
                </label>
                <select
                  className="book-input"
                  required
                  value={getToKnow}
                  onChange={(e) => {
                    setGetToKnow(e.target.value);
                  }}
                >
                  <option value="">Choose</option>
                  {knows.map((know) => (
                    <option value={know} key={know}>
                      {know}
                    </option>
                  ))}
                </select>
              </div>
              {getToKnow == "Other" && (
                <div className="input-container mx-auto my-4">
                  <label className="label-head">
                    Other work (if not available):
                  </label>
                  <input
                    type="text"
                    className="book-input"
                    value={getToKnow2}
                    onChange={(e) => setGetToKnow2(e.target.value)}
                    maxLength={20}
                    required
                    placeholder="Enter your how you get to know about us if not available on list."
                  />
                </div>
              )}
            </div>
            <h1 className="text-[#00286b] text-xl font-bold border-b-2 mx-auto w-fit border-[#00286b] mt-4">
              Schedule Treatment
            </h1>
            <div className="book-input-container">
              <div className="input-container">
                <label className="label-head">
                  Select Package (Packages are listed below):
                </label>
                <select
                  className="book-input"
                  required
                  value={pac}
                  onChange={(e) => {
                    setPac(e.target.value);
                  }}
                >
                  <option value="">Choose</option>
                  {pacs &&
                    pacs.map((pac) => (
                      <option key={pac._id} value={pac._id}>
                        {pac.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="input-container">
                <label className="label-head">Date of Treatment</label>
                <input
                  className="book-input"
                  type="date"
                  value={dateInput}
                  required
                  min={new Date(tomorrowDate).toISOString().split("T")[0]}
                  onChange={(e) => {
                    setDateInput(
                      new Date(e.target.value).toISOString().split("T")[0]
                    );
                  }}
                />
              </div>
              <div className="input-container">
                <label className="label-head"> batch</label>
                <select
                  className="book-input"
                  required
                  value={batch}
                  onChange={(e) => {
                    setBatch(e.target.value);
                  }}
                >
                  <option value={""}>Choose</option>
                  {batchs.map((item) => {
                    return (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="my-[2vmax] flex gap-[3vmax] flex-wrap w-full">
              {pacs &&
                pacs.map((pac) => {
                  return <PackageCard key={pac._id} pac={pac} role={"user"} />;
                })}
            </div>
            <input
              type="submit"
              className="book-submit"
              value="Save and Continue"
            />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Occupation;
