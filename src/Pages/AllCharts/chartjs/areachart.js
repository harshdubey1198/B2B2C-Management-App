import React from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import { Chart, CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

const AreaChart = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Drixo",
        fill: true,
        borderWidth: 1,
        lineTension: 0,
        borderColor: "#f1b44c",
        backgroundColor: "#f1b44c",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#556ee6",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBackgroundColor: "#556ee6",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 0,
        pointRadius: 0,
        pointHitRadius: 0,
        data: [22, 23, 28, 20, 27, 20, 20, 24, 10, 25, 20, 25],
      },
      {
        label: "Zinger",
        fill: true,
        lineTension: 0,
        borderWidth: 1,
        backgroundColor: "rgba(124, 138, 150, 0.3)",
        borderColor: "#7c8a96",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: "miter",
        pointBorderColor: "#ebeff2",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBackgroundColor: "#ebeff2",
        pointHoverBorderColor: "#eef0f2",
        pointHoverBorderWidth: 0,
        pointRadius: 0,
        pointHitRadius: 0,
        data: [50, 40, 48, 70, 50, 63, 63, 42, 42, 51, 35, 35],
      },
      {
        label: "Upclub",
        fill: true,
        lineTension: 0,
        borderWidth: 1,
        backgroundColor: "rgba(223, 227, 233, 0.2)",
        borderColor: "#ebeff2",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: "miter",
        pointBorderColor: "#ebeff2",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 0,
        pointHoverRadius: 0,
        pointHoverBackgroundColor: "#ebeff2",
        pointHoverBorderColor: "#eef0f2",
        pointHoverBorderWidth: 0,
        pointRadius: 0,
        pointHitRadius: 0,
        data: [95, 75, 90, 105, 95, 95, 95, 100, 75, 95, 90, 105],
      },
    ],
  };
  var option = {
    y: {
      ticks: {
        max: 110,
        min: 0,
        stepSize: 10,
      },
  },
  };
  return (
    <React.Fragment>
      <Line width={537} height={268} data={data} options={option} />
    </React.Fragment>
  );
};

export default AreaChart;
