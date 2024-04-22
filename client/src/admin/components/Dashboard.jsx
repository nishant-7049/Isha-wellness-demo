import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import AdminPatientMeter from "./AdminPatientMeter";
import CenterReport from "./CenterReport";
import { useDispatch } from "react-redux";
import {
  getCentreData,
  getPatientMeterData,
} from "../../store/slices/dashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientMeterData());
    
  }, []);
  return (
    <div >
      <Sidebar />
      <div className="w-full">
        <div className="bg-[#F0F0F0]">
          <div className=" bg-white my-[2vmax] ">
            <h1 className="text-[#00286b] text-3xl font-bold border-b-4 border-[#00286b] pb-2 w-fit mx-auto">
              Dashboard
            </h1>
            <AdminPatientMeter />
            <CenterReport />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
