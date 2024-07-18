import React from "react";
import ReactApexChart from "react-apexcharts";

const dountchartData = {
  series: [44, 55, 41, 17, 15],
  options: {
    labels: ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"],
    colors: ["rgb(61, 142, 248)", "rgb(17, 196, 110)",  "#f1b44c", "#f46a6a", "rgb(239, 242, 247)"],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      verticalAlign: "middle",
      floating: false,
      fontSize: "14px",
      offsetX: 0,
      offsetY: -10,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  },
}



const dountchart = () => {
  return(
    <React.Fragment>
        <ReactApexChart
          options={dountchartData.options}
          series={dountchartData.series}
          type="donut"
          height="320"
          className="apex-charts"
        />
      </React.Fragment>
  )
}

export default dountchart;


