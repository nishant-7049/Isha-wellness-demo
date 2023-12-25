import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const NoOfPatientChart = () => {
  const [totalPatientCenter, setTotalPatientCenter] = useState();
  const [totalPatientVisit, setTotalPatientVisit] = useState();

  const { patientsData } = useSelector((state) => state.dashboard);
  const setData = (patientsData) => {
    const centerNo = patientsData.filter((pd) => pd.location == "Center");
    setTotalPatientCenter(centerNo.length);
    const visitNo = patientsData.filter((pd) => pd.location == "Visit Address");
    setTotalPatientVisit(visitNo.length);
  };
  const data = {
    labels: ["At center", "At visit"],
    datasets: [
      {
        label: "Patient's Number",
        data: [totalPatientCenter, totalPatientVisit],
        backgroundColor: ["#ff9c00", "#00286b"],
      },
    ],
  };
  useEffect(() => {
    if (patientsData) {
      setData(patientsData);
    }
  }, [patientsData]);
  return (
    <Doughnut
      className="mx-auto"
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: true,

        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Total Number of Patients based on Location of treatement.",
          },
        },
      }}
    ></Doughnut>
  );
};

export default NoOfPatientChart;
