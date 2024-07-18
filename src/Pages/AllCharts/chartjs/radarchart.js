import React from "react";
import { Radar } from "react-chartjs-2";

import 'chart.js/auto';
import { Chart, CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

const RadarChart = () => {

  const data = {
    labels: [
      "Eating",
      "Drinking",
      "Sleeping",
      "Designing",
      "Coding",
      "Cycling",
      "Running",
    ],
    datasets: [
      {
        label: "Unhealthy",
        backgroundColor: "rgba(223, 227, 233, 0.2)",
        borderColor: "#dfe3e9",
        borderWidth: 1,
        pointBackgroundColor: "#dfe3e9",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#dfe3e9",
        data: [65, 59, 90, 81, 56, 55, 40],
      },
      {
        label: "Healthy",
        backgroundColor: "rgba(61, 142, 248,0.2)",
        borderColor: "#3d8ef8",
        borderWidth: 1,
        pointBackgroundColor: "#3d8ef8",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#3d8ef8",
        data: [28, 48, 40, 19, 96, 27, 100]
      },
      
    ],
  }
  return (
    <React.Fragment>
      <Radar width={537} height={268} data={data} className="chartjs-chart" />
    </React.Fragment>
  )
}

export default RadarChart;
