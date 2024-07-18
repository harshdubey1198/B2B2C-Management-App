import React from "react";
import { Line } from "react-chartjs-2";

import 'chart.js/auto';
import { Chart, CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

const LineChart = () => {
  const data = {
    labels: ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"],
    datasets: [
      {
        label: "Apple",
        lineTension: 0.2,
        borderColor: ["#0db4d6"],
        borderWidth: 3,
        fill: false,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#0db4d6",

        data: [120, 180, 140, 210, 160, 240, 180, 210],
      },
      {
        label: "Samsung",
        lineTension: 0.2,
        backgroundColor: "rgba(235, 239, 242, 0)",
        borderColor: ["#7c8a96"],
        borderWidth: 3,
        fill: false,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#7c8a96",

        data: [80, 140, 100, 170, 120, 200, 140, 170],
      },
    ],
  };
  var option = {
    y: {
      ticks: {
        max: 250,
        min: 0,
        stepSize: 50,
        zeroLineColor: "#7b919e",
        borderDash: [3, 3],

      },
    },
  };
  return (
    <React.Fragment>
      <Line width={537} height={268} data={data} options={option} />
    </React.Fragment>
  );
};

export default LineChart;
