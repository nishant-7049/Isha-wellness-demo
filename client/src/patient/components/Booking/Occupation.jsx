import React, { useEffect, useState } from "react";
import Consent from "./Consent";
import { useSelector, useDispatch } from "react-redux";
import {
  updateAdminForm,
  updateDateAndTime,
  updateOccupation,
  clearError,
  setError,
} from "../../../store/slices/bookingSlice";
import PackageCard from "../../../admin/components/PackageCard";
import { useNavigate } from "react-router-dom";
import OccupationDetails from "./Occupation/OccupationDetails";
import AdminDetails from "./Occupation/AdminDetails";
import ErrorAlert from "../../../auth/ErrorAlert";
import ScheduleTreatment from "./Occupation/ScheduleTreatment";
import { getAllPackages } from "../../../store/slices/packageSlice";

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
  const {
    occupation: occ,
    adminForm,
    error,
  } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.user);
  const { packages } = useSelector((state) => state.package);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeElement, setActiveElement] = useState("occupationDetails");
  const [completedSecions, setCompletedSections] = useState({
    "Occupation Details": false,
    "Admin Details": false,
  });
  const [occupation, setOccupation] = useState("");
  const [admin, setAdmin] = useState();

  const submitOccupation = () => {
    localStorage.setItem("occupation", JSON.stringify(occupation));
    dispatch(updateOccupation());
  };

  const submitAdmin = () => {
    localStorage.setItem("adminForm", JSON.stringify(admin));
    dispatch(updateAdminForm());
  };

  const submitSchedule = () => {
    for (let section in completedSecions) {
      if (!completedSecions[section]) {
        dispatch(setError(`${section} is not completely filled`));
        return;
      }
    }
    dispatch(updateDateAndTime());
    navigate("/book/confirmBooking");
  };

  useEffect(() => {
    if (packages) {
      dispatch(getAllPackages());
    }
    if (occ) {
      setOccupation(occ);
    }
    if (adminForm) {
      setAdmin({ getToKnow: adminForm?.getToKnow });
    }
  }, []);

  return (
    <div
      className={`bg-[#00286b10] w-full min-h-screen flex justify-center items-center`}
    >
      <Consent />
      <div
        className={`w-3/5 min-h-[60vh] bg-white shadow-xl py-4 px-8 flex flex-col gap-4 sm:w-full sm:min-h-screen ${
          !user || (user?.role == "user" && !user?.isIncharge)
            ? "sm:pt-20"
            : "sm:pt-8"
        }`}
      >
        <h1 className="text-xl font-semibold border-b-2 text-[#00286b] border-[#00286b]">
          Lifestyle And Habits
        </h1>
        <OccupationDetails
          setActiveElement={setActiveElement}
          activeStatus={activeElement == "occupationDetails"}
          occupation={occupation}
          setOccupation={setOccupation}
          submitOccupation={submitOccupation}
          setCompletedSections={setCompletedSections}
        />
        <AdminDetails
          setActiveElement={setActiveElement}
          activeStatus={activeElement == "adminDetails"}
          admin={admin}
          setAdmin={setAdmin}
          submitAdmin={submitAdmin}
          setCompletedSections={setCompletedSections}
        />
        <ScheduleTreatment
          setActiveElement={setActiveElement}
          activeStatus={activeElement == "scheduleTreatment"}
          submitSchedule={submitSchedule}
          setCompletedSections={setCompletedSections}
        />
        <div className="flex flex-wrap gap-4 my-4">
          {packages?.map((pac) => (
            <PackageCard pac={pac} role={"user"} key={pac._id} />
          ))}
        </div>
      </div>
      <ErrorAlert message={error} alert clearError={clearError} />
    </div>
  );
};

export default Occupation;
