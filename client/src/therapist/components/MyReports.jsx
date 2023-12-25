import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSessionsForTherapist } from "../../store/slices/dashboardSlice";

const MyReports = () => {
  const dispatch = useDispatch();
  const { dropouts, therapistSessions } = useSelector(
    (state) => state.dashboard
  );
  const [recoveryRate, setRecoveryRate] = useState();
  const [sessionDuration, setSessionDuration] = useState();
  useEffect(() => {
    dispatch(getSessionsForTherapist());
    if (dropouts) {
      const cured = dropouts.filter(
        (dr) =>
          dr.latestSession &&
          dr.latestSession.outcome &&
          dr.latestSession.outcome.outcomeReason == "Cured"
      );
      setRecoveryRate(Math.floor((cured.length / dropouts.length) * 100));
    }
  }, [dropouts]);
  useEffect(() => {
    if (therapistSessions) {
      let min = 0;
      let sec = 0;
      let sessionsLength = 0;
      for (let ts of therapistSessions) {
        for (let session of ts.sessions) {
          min += session.timeSpent.min;
          sec += session.timeSpent.sec;
          sessionsLength++;
        }
      }
      min = Math.floor(min / sessionsLength);
      sec = Math.floor(sec / sessionsLength);
      setSessionDuration(`${min}m ${sec}s`);
    }
  }, [therapistSessions]);
  return (
    <>
      <h1 className="text-[#00286b] text-xl text-center font-semibold mb-4">
        My Reports
      </h1>
      <div className="w-[90%] mx-auto shadow-lg flex justify-center flex-wrap gap-4 mb-12 p-4">
        <div className="text-center shadow-lg w-1/5 py-12 flex flex-col justify-center items-center bg-gradient-to-br from-[#00286b] to-[#005595]  text-white font-semibold md:w-2/5 sm:w-4/5">
          <p className="">{recoveryRate}%</p>
          <p>Patient Recovery Rate</p>
        </div>
        <div className="text-center shadow-lg w-1/5 py-12 flex flex-col justify-center items-center bg-gradient-to-br from-[#00286b] to-[#005595]  text-white font-semibold md:w-2/5 sm:w-4/5">
          <p className="">34</p>
          <p>Patients developed Complications</p>
        </div>
        <div className="text-center shadow-lg w-1/5 py-12 flex flex-col justify-center items-center bg-gradient-to-br from-[#00286b] to-[#005595]  text-white font-semibold md:w-2/5 sm:w-4/5">
          <p className="">34</p>
          <p>No. of Complaints</p>
        </div>
        <div className="text-center shadow-lg w-1/5 py-12 flex flex-col justify-center items-center bg-gradient-to-br from-[#00286b] to-[#005595]  text-white font-semibold md:w-2/5 sm:w-4/5">
          <p className="">{sessionDuration}</p>
          <p>Average session duration</p>
        </div>
      </div>
    </>
  );
};

export default MyReports;
