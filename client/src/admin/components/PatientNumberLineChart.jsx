import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Title,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Title
);

const PatientNumberLineChart = ({
  interval,
  year,
  month,
  months,
  years,
  patientsAtCentre,
  patientsAtVisit,
}) => {
  const [daysOfMonth, setDaysOfMonth] = useState([]);

  const data = {
    labels:
      interval == "Day" ? daysOfMonth : interval == "Month" ? months : years,
    datasets: [
      {
        label: ["At Centre"],
        data: patientsAtCentre,
        backgroundColor: "#ff9c00",
        tension: 0.4,
      },
      {
        label: ["At Visit"],
        data: patientsAtVisit,
        backgroundColor: "#00286b",
        tension: 0.4,
      },
    ],
  };
  useEffect(() => {
    let days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    setDaysOfMonth(days);
  }, []);
  return (
    <Line
      className="mx-auto"
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Number of patients joined.",
          },
        },
      }}
    ></Line>
  );
};

export default PatientNumberLineChart;
