import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

const CollectionLineChart = ({
  interval,
  year,
  month,
  months,
  years,
  collectionCentre,
  collectionVisit,
}) => {
  const [daysOfMonth, setDaysOfMonth] = useState([]);

  const data = {
    labels:
      interval == "day" ? daysOfMonth : interval == "month" ? months : years,
    datasets: [
      {
        label: ["At Centre"],
        data: collectionCentre,
        backgroundColor: "#ff9c00",
        tension: 0.4,
      },
      {
        label: ["At Visit"],
        data: collectionVisit,
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
            text: "Collection by treatments.",
          },
        },
      }}
    ></Line>
  );
};

export default CollectionLineChart;
